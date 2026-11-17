/* Автопроверка платформы в Chrome (Playwright).
   node tests/qa.js http://localhost:8765/ [папка-для-скриншотов]
   Проверяет на 375 / 820 / 1366 px: каждый урок открывается без ошибок в консоли, нет горизонтальной прокрутки,
   все картинки загружаются, учительские элементы скрыты в режиме ученика; в режиме учителя каждое задание
   с ключом после «Ключ (учитель)» → «Check Answers» даёт 100 %; аудиофайлы отдаются (200); прогресс сохраняется. */
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = process.argv[2] || 'http://localhost:8765/';
const SHOTS = process.argv[3] || null;
let pass = 0, fail = 0; const fails = [];
const ok = (c, msg) => { if (c) pass++; else { fail++; fails.push(msg); console.log('FAIL ' + msg); } };

(async () => {
  const browser = await chromium.launch();
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push('HTTP ' + r.status() + ' ' + r.url()); });
  await page.goto(BASE); await page.waitForTimeout(500);
  const info = await page.evaluate(() => ({
    lessons: BOOK.units.filter(u => u.ready).flatMap(u => u.lessons),
    units: BOOK.units.length, soon: BOOK.units.filter(u => u.soon).map(u => u.id),
    audio: [...new Set(Object.values(LESSONS).flatMap(L => L.sections.flatMap(s => s.items.filter(i => i.audio && i.audio.file).map(i => i.audio.file))))]
  }));
  ok(info.units >= 11, 'course map lists Starter + 10 units (+ reviews)');
  ok(['u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10'].every(u => info.soon.includes(u)), 'Units 2–10 are marked soon');
  const soonCards = await page.$$eval('.cm.soon', els => els.length);
  ok(soonCards >= 9, 'home shows “Скоро” cards: ' + soonCards);
  const soonLinks = await page.$$eval('.cm.soon a', els => els.length);
  ok(soonLinks === 0, 'soon units are not links');

  /* audio files */
  for (const f of info.audio) {
    const r = await page.request.get(BASE + f);
    ok(r.status() === 200 && (await r.body()).length > 50000, 'audio ' + f + ' → ' + r.status());
  }

  /* every lesson, three widths, student mode */
  for (const w of [375, 820, 1366]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const id of info.lessons) {
      errors.length = 0;
      await page.goto(BASE + '#/lesson/' + id); await page.waitForTimeout(250);
      await page.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; }));
      await page.waitForTimeout(350);
      const r = await page.evaluate(() => {
        const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
        const imgs = [...document.querySelectorAll('main img')].filter(i => !i.closest('[hidden]'));
        const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
        const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        const tutorVisible = [...document.querySelectorAll('.tutor-only, .model-ans, .keysrc, .tnote')].filter(vis).length;
        const wide = [...document.querySelectorAll('main *')].filter(el => { const b = el.getBoundingClientRect(); return b.right > iw + 2 && vis(el) && !el.closest('.wtable-wrap,.gridx-wrap,.lnav-in,.lnav'); }).slice(0, 3).map(el => el.tagName + '.' + el.className);
        return { sw, iw, broken, tutorVisible, wide, cards: document.querySelectorAll('.ex').length };
      });
      ok(r.cards > 0, `${id}@${w}: has exercises (${r.cards})`);
      ok(r.sw <= r.iw + 1, `${id}@${w}: no horizontal scroll (${r.sw} > ${r.iw}) ${r.wide.join(' ')}`);
      ok(!r.broken.length, `${id}@${w}: images load ${r.broken.join(', ')}`);
      ok(r.tutorVisible === 0, `${id}@${w}: teacher-only content hidden in student mode (${r.tutorVisible})`);
      ok(!errors.length, `${id}@${w}: no console errors ${errors.join(' | ')}`);
      if (SHOTS && w !== 820) await page.screenshot({ path: `${SHOTS}/${id}-${w}.png`, fullPage: false });
    }
  }

  /* student: answers are not shown before an attempt */
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(BASE + '#/lesson/u1-2'); await page.waitForTimeout(300);
  const rev = await page.$$eval('.ex .reveal', b => b.filter(x => !x.hidden).length);
  ok(rev === 0, 'student: “Show answers” hidden before the first check');
  await page.click('#ex-u12-1 .btn.primary'); await page.waitForTimeout(150);
  ok(await page.$eval('#ex-u12-1 .reveal', b => !b.hidden), 'student: “Show answers” appears after a check with mistakes');

  /* teacher: every keyed exercise gives 100 % */
  await page.evaluate(() => { sessionStorage.setItem('tutorUnlock', '1'); Core.Tutor.set(true); });
  for (const id of info.lessons) {
    errors.length = 0;
    await page.goto(BASE + '#/lesson/' + id); await page.waitForTimeout(250);
    const res = await page.evaluate(async () => {
      const out = [];
      for (const card of document.querySelectorAll('.ex')) {
        const btns = [...card.querySelectorAll('.ex-tools button')];
        const key = btns.find(b => b.textContent.includes('Ключ (учитель)'));
        const check = btns.find(b => b.textContent === 'Check Answers');
        if (!key || !check) continue;
        const reset = btns.find(b => b.textContent === 'Reset Exercise');
        key.click(); check.click();
        const pct = (card.querySelector('.ex-fb .pct') || {}).textContent;
        out.push([card.dataset.id, pct]);
      }
      return out;
    });
    res.forEach(([ex, pct]) => ok(pct === '100%', `teacher key ${ex} → ${pct}`));
    const seen = await page.$$eval('.keysrc', els => els.filter(e => e.getBoundingClientRect().height > 0).length);
    if (!/-ref$/.test(id)) ok(seen > 0, `${id}: key provenance labels visible in teacher mode (${seen})`);
    ok(!errors.length, `${id} (teacher): no console errors ${errors.join(' | ')}`);
  }

  /* progress persists after reload */
  const before = await page.evaluate(() => Object.values(Core.Store.data().ex).filter(e => e.attempts && e.attempts.length).length);
  await page.reload(); await page.waitForTimeout(300);
  const after = await page.evaluate(() => Object.values(Core.Store.data().ex).filter(e => e.attempts && e.attempts.length).length);
  ok(before > 0 && before === after, `progress saved in localStorage (${before} → ${after})`);

  /* other pages */
  for (const r of ['#/', '#/vocab', '#/vocab/u1-3/flash', '#/revision', '#/progress', '#/tutor', '#/coverage']) {
    errors.length = 0; await page.goto(BASE + r); await page.waitForTimeout(400);
    ok(!errors.length, `page ${r}: no console errors ${errors.join(' | ')}`);
  }
  await browser.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log(fails.slice(0, 40).join('\n')); process.exit(1); }
})();
