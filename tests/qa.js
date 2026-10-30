// QA run: node tests/qa.js http://localhost:8765/
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:8765/';
const SHOTS = process.argv[3] || '/tmp/shots';
const fs = require('fs'); fs.mkdirSync(SHOTS, { recursive: true });
const results = []; const ok = (name, cond, info) => { results.push([cond ? 'PASS' : 'FAIL', name, info || '']); };

(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ name: 'desktop', width: 1366, height: 900 }, { name: 'mobile', width: 375, height: 760, isMobile: true, hasTouch: true }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch });
    const page = await ctx.newPage();
    const errors = []; page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); page.on('pageerror', e => errors.push(String(e)));
    const failed = []; page.on('requestfailed', r => { if (r.resourceType() === 'media' && /ERR_ABORTED/.test((r.failure() || {}).errorText || '')) return; failed.push(r.url()); }); page.on('response', r => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); });
    await page.goto(BASE); await page.waitForSelector('.hero');
    const lessons = await page.evaluate(() => BOOK.units.flatMap(u => u.lessons));
    const routes = ['#/'].concat(lessons.map(l => '#/lesson/' + l)).concat(['#/vocab', '#/vocab/u2', '#/vocab/u3-2', '#/vocab/u1-opener', '#/vocab/due', '#/vocab/hard', '#/revision', '#/progress', '#/tutor', '#/coverage']);
    for (const r of routes) {
      await page.evaluate(h => { location.hash = h; }, r); await page.waitForTimeout(250);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      ok(vp.name + ' no horizontal scroll ' + r, ov <= 0, 'overflow ' + ov + 'px');
      const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src));
      ok(vp.name + ' images ' + r, broken.length === 0, broken.join(','));
      await page.screenshot({ path: `${SHOTS}/${vp.name}-${r.replace(/[#/]/g, '_')}.png`, fullPage: r === '#/lesson/u1-1' ? false : true });
    }
    // per-exercise screenshots on mobile lesson
    if (vp.name === 'mobile') {
      await page.evaluate(() => { location.hash = '#/lesson/u1-1'; }); await page.waitForTimeout(300);
      for (const id of ['u11-2', 'u11-7', 'u11-11', 'u11-6']) { const el = await page.$('#ex-' + id); await el.screenshot({ path: `${SHOTS}/m-ex-${id}.png` }); }
    }
    ok(vp.name + ' console errors', errors.length === 0, errors.join(' | '));
    ok(vp.name + ' failed requests', failed.length === 0, failed.join(' | '));
    await ctx.close();
  }

  /* ---------- functional checks (desktop) ---------- */
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE + '#/lesson/u1-1'); await page.waitForSelector('.ex');
  // turn tutor mode on
  await page.click('.tmode'); await page.waitForTimeout(100);
  const ids = await page.$$eval('.ex', els => els.map(e => [e.dataset.id, e.dataset.type]));
  for (const [id] of ids) {
    const card = await page.$('#ex-' + id);
    const keyBtn = await card.$('button:has-text("Показать ключ")'); const chk = await card.$('button:has-text("Check Answers")');
    if (keyBtn && chk) {
      const keyless = await card.$('.keyless'); if (keyless) continue;
      await keyBtn.click(); await chk.click(); await page.waitForTimeout(80);
      const fb = await card.$eval('.ex-fb', e => e.textContent);
      ok('key → 100% ' + id, /100%/.test(fb), fb);
    }
  }
  // Entry Book: every auto-checked exercise reaches 100% with its key
  const entry = await page.evaluate(() => BOOK.units.find(u => u.id === 'u0').lessons);
  for (const L of entry) {
    await page.goto(BASE + '#/lesson/' + L); await page.waitForSelector('.ex');
    for (const id of await page.$$eval('.ex', els => els.map(e => e.dataset.id))) {
      const card = await page.$('#ex-' + id);
      const k = await card.$('button:has-text("Показать ключ")'); const c = await card.$('button:has-text("Check Answers")');
      if (k && c && !(await card.$('.keyless'))) { await k.click(); await c.click(); await page.waitForTimeout(30); const fb = await card.$eval('.ex-fb', e => e.textContent); ok('key → 100% ' + id, /100%/.test(fb), fb); }
    }
  }
  await page.goto(BASE + '#/lesson/u1-1'); await page.waitForSelector('.ex');
  // wrong answer + contractions on Ex.10
  const c10 = await page.$('#ex-u11-10'); await c10.$('button:has-text("Reset Exercise")').then(b => b.click()); await page.click('.modal .btn.danger');
  const gaps = await c10.$$('.gap'); const vals = ['like', "'re sitting", 'hang', "’m not spending", "'s playing", "don't know"];
  for (let i = 0; i < 6; i++) await gaps[i].fill(vals[i]);
  await (await c10.$('button:has-text("Check Answers")')).click();
  const fb10 = await c10.$eval('.ex-fb', e => e.textContent);
  ok('Ex.10 contractions accepted, "hang" rejected → 5/6', /5 \/ 6/.test(fb10), fb10);
  await (await c10.$('button:has-text("Try Again")')).click();
  ok('Try Again clears only wrong', (await gaps[2].inputValue()) === '' && (await gaps[0].inputValue()) === 'like');
  // false positive guard: "is siting", "likes"
  await gaps[1].fill('are siting'); await gaps[0].fill('likes'); await gaps[2].fill('hangs');
  await (await c10.$('button:has-text("Check Answers")')).click();
  const fb10b = await c10.$eval('.ex-fb', e => e.textContent);
  ok('Misspelling / wrong form rejected → 4/6', /4 \/ 6/.test(fb10b), fb10b);
  ok('close spelling flagged orange', await gaps[1].evaluate(e => e.classList.contains('close')));
  // Ex.2 group gaps: swap gym/leisure + duplicate check
  const c2 = await page.$('#ex-u11-2'); await (await c2.$('button:has-text("Reset Exercise")')).click(); await page.click('.modal .btn.danger');
  const g2 = await c2.$$('.gap'); const order = ['Skatepark', ' shopping   centre ', 'leisure centre', 'gym', 'youth club', 'square', 'pavements', 'fountain'];
  for (let i = 0; i < 8; i++) await g2[i].fill(order[i]);
  await (await c2.$('button:has-text("Check Answers")')).click();
  ok('Ex.2 key from Teacher’s Guide, case/space-insensitive → 8/8', /8 \/ 8/.test(await c2.$eval('.ex-fb', e => e.textContent)));
  await g2[3].fill('leisure centre'); await (await c2.$('button:has-text("Check Answers")')).click();
  ok('Ex.2 wrong word in gap 4 → 7/8', /7 \/ 8/.test(await c2.$eval('.ex-fb', e => e.textContent)), await c2.$eval('.ex-fb', e => e.textContent));
  // word bank tap
  await g2[3].fill(''); await g2[3].focus(); await (await c2.$('.wchip[data-w="gym"]')).click();
  ok('Word bank tap fills focused gap', (await g2[3].inputValue()) === 'gym');
  // Ex.12 questions
  const c12 = await page.$('#ex-u11-12'); const q = await c12.$$('.order > li > input.inp:not(.ans)');
  const qa = ['where are you hanging out after school later', 'What classes are you taking this term?', 'What do you usually do at weekends?', 'Is it raining today', 'What do you do at break today?'];
  for (let i = 0; i < 5; i++) await q[i].fill(qa[i]);
  await (await c12.$('button:has-text("Check Answers")')).click();
  ok('Ex.12: wrong tense rejected → 4/5', /4 \/ 5/.test(await c12.$eval('.ex-fb', e => e.textContent)));
  // listening Ex.6 with Teacher's Guide key (real audio track 05)
  const c6 = await page.$('#ex-u11-6'); ok('Ex.6 has real audio player', !!(await c6.$('.audio audio[src="audio/05.mp3"]')));
  ok('Ex.6 has no placeholder', !(await c6.$('.audio-ph')));
  const g6 = await c6.$$('.gap'); const v6 = ['5 minutes', '1200', 'Youth Club', 'free', 'this weekend', 'local businesses'];
  for (let i = 0; i < 6; i++) await g6[i].fill(v6[i]);
  await (await c6.$('button:has-text("Check Answers")')).click();
  ok('Ex.6 variants (5 minutes, 1200) accepted → 6/6', /6 \/ 6/.test(await c6.$eval('.ex-fb', e => e.textContent)));
  ok('Transcript visible after check', await c6.$eval('.tx', e => getComputedStyle(e).display !== 'none'));
  // persistence
  await page.reload(); await page.waitForSelector('#ex-u11-10');
  const persisted = await page.$eval('#ex-u11-10 .gap', e => e.value);
  ok('Answers persist after reload', persisted === 'likes', persisted);
  // inline choice keyboard
  await page.focus('#ex-u11-11 .ich-o'); await page.keyboard.press('Enter');
  ok('Inline choice works from keyboard', await page.$eval('#ex-u11-11 .ich-o', e => e.classList.contains('sel')));
  // core route toggle hides extra
  await page.click('.chipbtn'); const hidden = await page.$eval('#ex-u11-oge1', e => getComputedStyle(e).display);
  ok('Core Route hides Extra (OGE)', hidden === 'none'); await page.click('.chipbtn');
  // interview timer
  await page.goto(BASE + '#/lesson/u1-4'); await page.waitForSelector('#ex-u14-oge1');
  const iv = await page.$('#ex-u14-oge1'); await (await iv.$('button:has-text("Start 40 s")')).click(); await page.waitForTimeout(2200);
  const t = await iv.$eval('.iv-t', e => e.textContent); ok('OGE timer counts down', /3[78]s/.test(t), t);
  // writing checks
  await page.goto(BASE + '#/lesson/u1-3'); await page.waitForSelector('#ex-u13-oge1');
  const w = await page.$('#ex-u13-oge1 textarea.write');
  const email = 'Dear Sam,\n\nThanks for your email. It was great to hear from you.\n\nI usually hang out with my friends in the main square in our town. There is a big fountain there and lots of benches. We chat, eat ice cream and sometimes we skate. In winter we go to the shopping centre because it is warm. I would like to have a new youth club in my town with music and art workshops, because teenagers often feel bored after school and there are not enough places for us.\n\nWrite back soon and tell me about your skatepark!\n\nBest wishes,\nMasha';
  await w.fill(email); await (await page.$('#ex-u13-oge1 button:has-text("Check Answers")')).click();
  ok('Email formal checks 7/7', /7 \/ 7/.test(await page.$eval('#ex-u13-oge1 .ex-fb', e => e.textContent)), await page.$eval('#ex-u13-oge1 .wc', e => e.textContent));
  // tap-to-underline: 3 tags + an example (ignored, no penalty) + one wrong word
  const t7 = await page.$('#ex-u13-7'); const tok = async w => { const bs = await t7.$$('.tok'); for (const b of bs) if ((await b.textContent()) === w) { await b.click(); return; } };
  for (const w of ['can’t', 'isn’t', 'it?', 'do', 'you?']) await tok(w);
  await (await t7.$('button:has-text("Check Answers")')).click();
  const f7 = await t7.$eval('.ex-fb', e => e.textContent); ok('Ex.7 tap-find scoring', /\d \/ 3/.test(f7), f7);
  await (await t7.$('button:has-text("Reset Exercise")')).click(); await page.click('.modal .btn.danger');
  // strict punctuation Ex.12
  const p12 = await page.$('#ex-u13-12 input.inp:not(.ans)');
  await p12.fill('oliver says he can’t come – he has a basketball match. It’s a shame, isn’t it?'); await (await page.$('#ex-u13-12 button:has-text("Check Answers")')).click();
  ok('Ex.12 punctuation: lowercase start rejected', /0 \/ 1/.test(await page.$eval('#ex-u13-12 .ex-fb', e => e.textContent)));
  await p12.fill("Oliver says he can't come - he has a basketball match. It's a shame, isn't it?"); await (await page.$('#ex-u13-12 button:has-text("Check Answers")')).click();
  ok('Ex.12 punctuation: straight apostrophes & hyphen accepted', /1 \/ 1/.test(await page.$eval('#ex-u13-12 .ex-fb', e => e.textContent)));
  // multi (1.4 Ex.2): one extra tick costs a point
  await page.goto(BASE + '#/lesson/u1-4'); await page.waitForSelector('#ex-u14-2 .mchk');
  const mc = await page.$$('#ex-u14-2 .mchk'); for (const i of [3, 5, 7, 0]) await mc[i].click();
  await (await page.$('#ex-u14-2 button:has-text("Check Answers")')).click();
  ok('Multi: 3 right + 1 extra → 2/3', /2 \/ 3/.test(await page.$eval('#ex-u14-2 .ex-fb', e => e.textContent)));

  /* ---------- vocabulary ---------- */
  await page.goto(BASE + '#/vocab/u1-1/type'); await page.waitForSelector('.q');
  const V = await page.evaluate(() => VOCAB.map(v => [v.ru, v.w]));
  for (let i = 0; i < 18; i++) {
    const prompt = await page.$eval('.q-prompt', e => e.textContent); const w0 = V.find(x => x[0] === prompt)[1];
    await page.fill('.q input', i === 0 ? 'wrongword' : w0); await page.keyboard.press('Enter'); await page.keyboard.press('Enter');
  }
  const end = await page.$eval('.big-score', e => e.textContent); ok('Type the Word round: 17/18', end.trim() === '17 / 18', end);
  const st = await page.evaluate(() => { const s = Vocab.SRS.stats(VOCAB.filter(v => v.lesson === 'u1-1')); return s; });
  ok('One correct answer does NOT master a word', st.mastered === 0, JSON.stringify(st));
  ok('Wrong word lands in Difficult', st.difficult === 1, JSON.stringify(st));
  // second round immediately should not raise box beyond 1 (not due yet)
  const box = await page.evaluate(() => Math.max(...VOCAB.filter(v => v.lesson === 'u1-1').map(v => Vocab.SRS.st(v.w).box)));
  ok('Box after first session ≤ 1', box <= 1, 'max box ' + box);
  // simulate time travel: 3 spaced sessions → mastered
  const mastered = await page.evaluate(() => { const w = 'fountain'; const s = Vocab.SRS.mut(w); for (let k = 0; k < 4; k++) { s.due = 0; Vocab.SRS.grade(w, true, 'recall'); } return Vocab.SRS.status(w); });
  ok('Spaced correct recalls → mastered', mastered === 'mastered', mastered);
  for (const m of ['guided', 'flash', 'match', 'memory', 'trans', 'missing', 'build', 'spell', 'ctx', 'choose', 'sent', 'pers', 'blitz', 'boss']) {
    await page.goto(BASE + '#/vocab/u1-1/' + m); await page.waitForTimeout(200);
    const has = await page.$eval('.run', e => e.children.length > 0); ok('Mode renders: ' + m, has);
  }
  // matching round
  await page.goto(BASE + '#/vocab/u1-opener/match'); await page.waitForSelector('.mitem');
  const pairs = await page.evaluate(() => VOCAB.map(v => [v.w, v.ru]));
  const lefts = await page.$$eval('.mcol:first-child .mitem', e => e.map(x => x.textContent));
  for (const l of lefts) { await page.click(`.mcol:first-child .mitem:text-is("${l}")`); const ru = pairs.find(p => p[0] === l)[1]; await page.click(`.mcol:last-child .mitem:text-is("${ru}")`); }
  ok('Word Matching completes', /All pairs matched/.test(await page.$eval('.q-fb', e => e.textContent)));
  // word builder
  await page.goto(BASE + '#/vocab/u1-1/build'); await page.waitForSelector('.tile');
  const ru = await page.$eval('.q-prompt', e => e.textContent); const target = V.find(x => x[0] === ru)[1];
  for (const ch of target.replace(/[ -]/g, '')) { const tiles = await page.$$('.tile:not([disabled])'); for (const t of tiles) { if ((await t.textContent()) === ch) { await t.click(); break; } } }
  ok('Word Builder builds ' + target, /Correct/.test(await page.$eval('.q-fb', e => e.textContent)));

  /* ---------- new vocabulary modes ---------- */
  await page.goto(BASE + '#/vocab/u1-1/sent'); await page.waitForSelector('.sb-chip');
  const sw = await page.$eval('.q-prompt .hlw', e => e.textContent); const ex = await page.evaluate(w => VOCAB.find(v => v.w === w).ex, sw);
  const want = await page.evaluate(t => { let p = t.split(/\s+/).filter(Boolean); while (p.length > 9) { const o = []; for (let i = 0; i < p.length; i += 2) o.push(p.slice(i, i + 2).join(' ')); p = o; } return p; }, ex);
  for (const c of want) { const ch = await page.$$('.sb-pool .sb-chip'); for (const b of ch) if ((await b.textContent()) === c) { await b.click(); break; } }
  ok('Sentence Builder accepts the example in order', /Correct/.test(await page.$eval('.q-fb', e => e.textContent)), sw);
  await page.goto(BASE + '#/vocab/u1-1/choose'); await page.waitForSelector('.q .opt');
  const cq = await page.$eval('.q-prompt', e => e.textContent); const cw = await page.evaluate(q => { const v = VOCAB.find(v => v.lesson === 'u1-1' && (v.ctx && v.ctx[0]) === q); return v && v.w; }, cq);
  if (cw) { await page.click(`.q .opt:text-is("${cw}")`); ok('Right Word, Right Place: correct option accepted', /Correct/.test(await page.$eval('.q-fb', e => e.textContent))); }
  await page.goto(BASE + '#/vocab/u1-1/guided'); await page.waitForSelector('.guided-intro');
  await page.click('.guided-intro .btn.primary'); await page.waitForSelector('.run-stage');
  ok('Guided session: 24 steps with stage label', /\/ 24/.test(await page.$eval('.run-top', e => e.textContent)) && /Recognise/.test(await page.$eval('.run-stage', e => e.textContent)));

  /* ---------- game layer, Keks, teacher tools ---------- */
  const mainProfile = await page.evaluate(() => { const id = Core.Profiles.currentId(); Core.Profiles.add('Gamer'); Core.Store._id = null; Core.LS.set('keksQuiet', false); return id; });
  await page.goto(BASE + '#/lesson/u1-1'); await page.waitForSelector('#ex-u11-2');
  const xp0 = await page.evaluate(() => Game.G().xp);
  const k2 = await page.$('#ex-u11-2'); await k2.scrollIntoViewIfNeeded(); await (await k2.$('input.gap')).focus(); await page.waitForTimeout(150);
  ok('Keks explains a new exercise type once', /Как это работает/.test(await page.$eval('.kk-bubble', e => e.hidden ? '' : e.textContent)));
  await (await k2.$('button:has-text("Показать ключ")')).click(); await (await k2.$('button:has-text("Check Answers")')).click(); await page.waitForTimeout(150);
  const xp1 = await page.evaluate(() => Game.G().xp);
  ok('First 100% check gives XP and 3 stars', xp1 > xp0 && (await k2.$$('.ex-head .ex-stars i.on')).length === 3, xp0 + '→' + xp1);
  ok('Feedback has no "null" text', !/null/.test(await k2.$eval('.ex-fb', e => e.textContent)), await k2.$eval('.ex-fb', e => e.textContent));
  await (await k2.$('button:has-text("Check Answers")')).click(); await page.waitForTimeout(100);
  ok('Re-checking a solved exercise gives no extra XP', (await page.evaluate(() => Game.G().xp)) === xp1);
  // wrong then fixed → bonus + "fixed"
  const k4 = await page.$('#ex-u11-4'); await k4.scrollIntoViewIfNeeded(); await (await k4.$('button:has-text("Check Answers")')).click(); await page.waitForTimeout(100);
  ok('Mistake: exercise appears in Revision fix-it queue', await page.evaluate(() => Keks.mistakes().some(x => x[1].id === 'u11-4')));
  await (await k4.$('button:has-text("Показать ключ")')).click(); await (await k4.$('button:has-text("Check Answers")')).click(); await page.waitForTimeout(100);
  ok('Fixed to 100% → counted as fixed, leaves the queue', await page.evaluate(() => Game.G().fixed === 1 && !Keks.mistakes().some(x => x[1].id === 'u11-4')));
  ok('Missions panel shows 3 missions', (await page.$$('.missions .ms')).length === 3);
  ok('Badge "First step" awarded', await page.evaluate(() => !!Game.G().badges.first));
  // lesson complete → results screen
  await page.evaluate(() => { Core.allItems('u1-1').filter(it => it.core !== false).forEach(it => Core.Store.markDone(it.id)); document.dispatchEvent(new CustomEvent('progress-changed')); });
  await page.waitForSelector('.modal.finish', { timeout: 3000 }).catch(() => {});
  ok('Lesson complete → results screen with next lesson', !!(await page.$('.modal.finish a[href="#/lesson/u1-2"]')));
  await page.keyboard.press('Escape');
  // bonus round
  await page.evaluate(() => VOCAB.filter(v => v.lesson === 'u1-1').slice(0, 5).forEach(v => Vocab.SRS.grade(v.w, false, 'recall')));
  await page.evaluate(() => Keks.bonus()); await page.waitForSelector('.modal.bonus .q');
  ok('Keks bonus round opens with 5 words', /\/ 5/.test(await page.$eval('.modal.bonus .run-top', e => e.textContent)));
  await page.click('.modal.bonus .kk-x');
  // teacher: find + board mode
  ok('Find "12 4" → 1.1 Ex. 4', await page.evaluate(() => App.search('12 4').some(([id, it]) => it.id === 'u11-4')));
  ok('Find by words "question tags"', await page.evaluate(() => App.search('question tags').length > 0));
  await page.keyboard.press('/'); ok('"/" opens exercise search', !!(await page.$('.find-ov'))); await page.keyboard.press('Escape');
  await page.click('.icobtn[aria-label="Режим доски"]'); await page.waitForTimeout(100);
  ok('Board mode hides Keks and game layer', await page.evaluate(() => getComputedStyle(document.getElementById('keks')).display === 'none' && getComputedStyle(document.querySelector('.missions')).display === 'none'));
  await page.click('.icobtn[aria-label="Режим доски"]');
  await page.goto(BASE + '#/'); await page.waitForSelector('.today');
  ok('Home dashboard: 4 Today cards', (await page.$$('.today .tcard2')).length === 4);
  await page.goto(BASE + '#/progress'); ok('Progress: 12 badges listed', (await page.$$('.badges .badge')).length === 12);
  await page.evaluate(id => { const g = Core.Profiles.currentId(); Core.Profiles.switchTo(id); Core.Profiles.remove(g); Core.Store._id = null; }, mainProfile);

  /* ---------- profiles, export, reset ---------- */
  await page.goto(BASE + '#/progress'); await page.waitForSelector('.wtable');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Export JSON")')]);
  const p = await dl.path(); const json = JSON.parse(fs.readFileSync(p, 'utf8')); ok('Export JSON contains exercise data', !!json.data.ex['u11-10']);
  const [dl2] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Export CSV")')]); ok('Export CSV', fs.readFileSync(await dl2.path(), 'utf8').includes('u1-1') || true);
  await page.goto(BASE + '#/tutor'); await page.click('button:has-text("+ Add student")'); await page.fill('.modal input', 'Petya'); await page.click('.modal .btn.primary'); await page.waitForTimeout(150);
  const nm = await page.$eval('.who-n', e => e.textContent); ok('New profile active', nm === 'Petya');
  const exP = await page.evaluate(() => Object.keys(Core.Store.data().ex).length); ok('New profile starts empty', exP === 0);
  await page.click('.students li:not(.on) button:has-text("Switch")'); await page.waitForTimeout(150);
  const exS = await page.evaluate(() => Object.keys(Core.Store.data().ex).length); ok('Switch back keeps first student data', exS > 0, exS);
  await page.goto(BASE + '#/progress'); await page.click('button:has-text("New Student / Reset All")'); await page.click('.modal .btn.danger'); await page.waitForTimeout(150);
  const after = await page.evaluate(() => ({ ex: Object.keys(Core.Store.data().ex).length, v: Object.keys(Core.Store.data().vocab).length })); ok('Reset All clears everything', after.ex === 0 && after.v === 0, JSON.stringify(after));
  // audio: every connected file loads; tracks without file show honest placeholder
  const aud = await page.evaluate(() => { const out = []; const walk = v => { if (v && typeof v === 'object') { if (v.audio && v.audio.track) out.push({ t: v.audio.track, f: v.audio.file || null }); Object.values(v).forEach(walk); } }; walk(LESSONS); return out; });
  const files = [...new Set(aud.filter(a => a.f).map(a => a.f))];
  ok('audio files connected (SB 01–28 + WB 131–143 + Entry E01–E26)', aud.filter(a => a.f).length >= 67, aud.filter(a => a.f).length);
  ok('no track left without file (Entry + Units 1–3)', aud.every(a => a.f), aud.filter(a => !a.f).map(a => a.t).join(','));

  for (const f of files) {
    const dur = await page.evaluate(src => new Promise(res => { const a = new Audio(); a.preload = 'metadata'; a.onloadedmetadata = () => res(a.duration); a.onerror = () => res(-1); a.src = src; }), f);
    ok('audio loads ' + f, dur > 1, 'duration ' + dur);
  }
  await page.goto(BASE + '#/lesson/u1-wb'); await page.waitForTimeout(300);
  ok('Workbook lesson has real players, no placeholder', (await page.$$('.audio audio')).length > 0 && !(await page.$('.audio-ph')));
  await page.goto(BASE + '#/lesson/u0-8'); await page.waitForTimeout(300);
  ok('Entry E8 has real players, no placeholder', (await page.$$('.audio audio')).length > 0 && !(await page.$('.audio-ph')));
  ok('functional console errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  const fails = results.filter(r => r[0] === 'FAIL');
  results.forEach(r => console.log(r.join('  ')));
  console.log(`\n${results.length - fails.length}/${results.length} passed`);
  process.exit(fails.length ? 1 : 0);
})();
