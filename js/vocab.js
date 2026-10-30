/* ========== VOCABULARY LAB: spaced repetition + 10 training modes ========== */
(function () {
  'use strict';
  const { h, norm, matches, shuffle, Store, toast } = Core;
  const MIN = 60e3, DAY = 864e5;
  const INTERVALS = [0, 10 * MIN, DAY, 3 * DAY, 7 * DAY, 16 * DAY];
  const MASTER_BOX = 4;

  const byW = {}; VOCAB.forEach(v => { byW[v.w] = v; });
  const accepted = v => [v.w].concat(v.alt || []);

  /* ---------- SRS ---------- */
  const SRS = {
    st(w) { return Store.data().vocab[w] || { box: 0, due: 0, seen: false, c: 0, x: 0 }; },
    mut(w) { const d = Store.data().vocab; return d[w] || (d[w] = { box: 0, due: 0, seen: false, c: 0, x: 0 }); },
    seen(w) { const s = this.mut(w); if (!s.seen) { s.seen = true; s.first = Date.now(); Store.save(); } },
    grade(w, ok, kind) {
      const s = this.mut(w), now = Date.now(), before = s.box; s.seen = true; s.last = now;
      if (kind === 'intro') { if (!s.first) s.first = now; s.due = Math.min(s.due || now, now); }   // «Not yet» на карточке — слово новое, а не «ошибка»
      else if (ok) {
        s.c++;
        if (kind === 'recall') { if (now >= s.due || s.box === 0) { s.box = Math.min(5, s.box + 1); s.due = now + INTERVALS[s.box]; } }
        else if (s.box === 0) { s.box = 1; s.due = now + INTERVALS[1]; }   // узнавание не отодвигает уже назначенное повторение
      } else { s.x++; s.box = Math.min(s.box, 1); s.due = now; s.lastWrong = now; }
      Store.save();
      document.dispatchEvent(new CustomEvent('vocab-graded', { detail: { w, ok, kind, before, after: s.box } }));
      document.dispatchEvent(new CustomEvent('progress-changed'));
    },
    status(w) { const s = this.st(w); if (!s.seen) return 'new'; if (s.box >= MASTER_BOX) return 'mastered'; if (s.x > 0 && s.box < 3) return 'difficult'; return 'learning'; },
    due(list) { const now = Date.now(); return list.filter(v => { const s = this.st(v.w); return s.seen && s.due <= now && s.box < 5; }); },
    difficult(list) { return list.filter(v => { const s = this.st(v.w); return s.x > 0 && s.box < MASTER_BOX; }); },
    stats(list) { const r = { new: 0, learning: 0, difficult: 0, mastered: 0 }; list.forEach(v => r[this.status(v.w)]++); return r; }
  };

  /* ---------- speech (browser voice, only for single words; optional) ---------- */
  const canSpeak = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';
  function speak(t) { if (!canSpeak) return; try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = .9; speechSynthesis.speak(u); } catch (e) {} }
  function sayBtn(t) { return canSpeak ? h('button', { class: 'say', 'aria-label': 'Listen: ' + t, title: 'Произношение (голос браузера)', onclick: e => { e.stopPropagation(); speak(t); } }, '🔊') : null; }

  /* ---------- question kinds ---------- */
  function typed(v, prompt, sub, kind, done, opts) {
    opts = opts || {};
    const inp = h('input', { class: 'inp big', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Type the word' });
    const fb = h('div', { class: 'q-fb', role: 'status', 'aria-live': 'polite' });
    const go = h('button', { class: 'btn primary' }, 'Check');
    let answered = false;
    const submit = () => {
      if (answered) { done(); return; }
      if (!inp.value.trim()) { inp.focus(); return; }
      const ok = matches(inp.value, opts.acc || accepted(v), opts.strict ? { noContr: true } : null);
      answered = true; inp.readOnly = true; inp.classList.add(ok ? 'ok' : 'bad');
      fb.className = 'q-fb ' + (ok ? 'ok' : 'bad');
      fb.textContent = ok ? 'Correct! ' : 'Not quite. Correct answer: ' + (opts.acc ? opts.acc[0] : v.w);
      SRS.grade(v.w, ok, kind); go.textContent = 'Next →'; go.focus();
      done.result = ok;
    };
    go.onclick = submit; inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    setTimeout(() => inp.focus(), 30);
    return h('div', { class: 'q' }, h('div', { class: 'q-prompt' }, prompt), sub ? h('div', { class: 'q-sub' }, sub) : null, inp, h('div', { class: 'row' }, go), fb);
  }
  function choice(v, prompt, options, correctIdx, kind, done, sub) {
    const fb = h('div', { class: 'q-fb', role: 'status' }); let answered = false; const btns = [];
    const next = h('button', { class: 'btn primary', hidden: true, onclick: () => done() }, 'Next →');
    options.forEach((o, i) => btns.push(h('button', { class: 'opt', onclick: () => {
      if (answered) return; answered = true; const ok = i === correctIdx; btns[i].classList.add(ok ? 'ok' : 'bad'); btns[correctIdx].classList.add('ok');
      fb.className = 'q-fb ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Correct!' : 'The answer is: ' + options[correctIdx]; SRS.grade(v.w, ok, kind); done.result = ok; next.hidden = false; next.focus();
    } }, o)));
    return h('div', { class: 'q' }, h('div', { class: 'q-prompt' }, prompt), sub ? h('div', { class: 'q-sub' }, sub) : null, h('div', { class: 'opts col' }, btns), fb, next);
  }
  function distractors(v, pool, field) { return shuffle(pool.filter(x => x.w !== v.w)).slice(0, 3).map(x => x[field]); }

  const KINDS = {
    type: (v) => d => typed(v, v.ru, v.def + (v.pos ? ' (' + v.pos + ')' : ''), 'recall', d),
    spell: (v) => d => typed(v, h('span', null, sayBtn(v.w), ' ', v.ipa), v.ru + ' — spell it correctly', 'recall', d, { strict: true }),
    ctx: (v) => d => { const s = (v.ctx && v.ctx[0]) || v.ex.replace(new RegExp(v.w, 'i'), '___'); return typed(v, s, h('details', { class: 'mini' }, h('summary', null, 'Hint'), v.ru + ' — ' + v.w.replace(/[a-z]/gi, (c, i) => i ? '•' : c)), 'recall', d, v.acc2 ? { acc: v.acc2.concat(accepted(v)) } : null); },
    missing: (v) => d => { const letters = v.w.split(''); const idx = shuffle(letters.map((c, i) => /[a-z]/i.test(c) ? i : -1).filter(i => i > 0)).slice(0, Math.max(1, Math.round(letters.length * .4))); const masked = letters.map((c, i) => idx.includes(i) ? '_' : c).join(''); return typed(v, h('span', { class: 'masked' }, masked), v.ru + ' — type the full word', 'recog', d, { strict: true }); },
    toRu: (v, pool) => d => { const opts = shuffle([v.ru].concat(distractors(v, pool, 'ru'))); return choice(v, h('span', null, v.w, ' ', sayBtn(v.w)), opts, opts.indexOf(v.ru), 'recog', d); },
    toEn: (v, pool) => d => { const opts = shuffle([v.w].concat(distractors(v, pool, 'w'))); return choice(v, v.ru, opts, opts.indexOf(v.w), 'recog', d); },
    def: (v, pool) => d => { const opts = shuffle([v.w].concat(distractors(v, pool, 'w'))); return choice(v, v.def, opts, opts.indexOf(v.w), 'recog', d); },
    build: (v) => d => builder(v, d),
    // Use: выбери слово, которое подходит по смыслу и сочетаемости (новое предложение, не пример с карточки)
    ctxChoice: (v, pool) => d => { const s = (v.ctx && v.ctx[0]) || v.ex.replace(new RegExp(v.w, 'i'), '___'); const same = pool.filter(x => x.pos === v.pos && x.w !== v.w); const opts = shuffle([v.w].concat(shuffle(same.length >= 3 ? same : pool.filter(x => x.w !== v.w)).slice(0, 3).map(x => x.w))); return choice(v, s, opts, opts.indexOf(v.w), 'recog', d, v.acc2 ? 'Which word fits? (In the sentence it may change its form.)' : 'Which word fits the sentence?'); },
    // Use: собери пример из частей — слово в естественном контексте и порядок слов
    sent: (v) => d => sentence(v, d)
  };

  function chunks(text) {
    let t = text.split(/\s+/).filter(Boolean);
    while (t.length > 9) { const out = []; for (let i = 0; i < t.length; i += 2) out.push(t.slice(i, i + 2).join(' ')); t = out; }
    return t;
  }
  function sentence(v, done) {
    const parts = chunks(v.ex); let tiles = shuffle(parts.map((c, i) => ({ c, i })));
    if (parts.length > 2 && tiles.every((t, i) => t.i === i)) tiles = tiles.slice(1).concat(tiles[0]);
    let picked = []; let finished = false;
    const line = h('div', { class: 'sb-line', 'aria-live': 'polite' }); const pool = h('div', { class: 'sb-pool' }); const fb = h('div', { class: 'q-fb', role: 'status' });
    const next = h('button', { class: 'btn primary', hidden: true, onclick: () => done() }, 'Next →');
    const key = x => x.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, '').replace(/\s+/g, ' ').trim();
    function paint() {
      line.innerHTML = ''; picked.forEach((t, k) => line.appendChild(h('button', { class: 'sb-chip on', disabled: finished || null, onclick: () => { picked.splice(k, 1); paint(); } }, t.c)));
      if (!picked.length) line.appendChild(h('span', { class: 'muted small' }, 'Tap the pieces in the right order…'));
      pool.innerHTML = ''; tiles.forEach(t => { if (!picked.includes(t)) pool.appendChild(h('button', { class: 'sb-chip', disabled: finished || null, onclick: () => { picked.push(t); paint(); if (picked.length === tiles.length) finish(); } }, t.c)); });
    }
    function finish() {
      finished = true; const built = picked.map(t => t.c).join(' '); const ok = key(built) === key(v.ex);
      fb.className = 'q-fb ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Correct! ' + v.ex : 'Model: “' + v.ex + '”';
      if (ok) SRS.grade(v.w, true, 'recog');   // ошибка в порядке слов — не ошибка в слове: в Difficult Words не попадает
      done.result = ok; line.classList.add(ok ? 'ok' : 'bad'); paint(); next.hidden = false; next.focus();
    }
    paint();
    return h('div', { class: 'q' }, h('div', { class: 'q-prompt' }, h('span', { class: 'hlw' }, v.w), ' ', sayBtn(v.w)), h('div', { class: 'q-sub' }, 'Build the example sentence with “' + v.w + '” (' + v.ru + ').'), line, pool,
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: () => { if (finished) return; picked = []; paint(); } }, '↺ Clear'), next), fb);
  }

  function builder(v, done) {
    const chars = v.w.split(''); const fixed = c => c === ' ' || c === '-';
    let tiles = shuffle(chars.map((c, i) => ({ c, i })).filter(t => !fixed(t.c))); let picked = [];
    const slots = h('div', { class: 'slots', 'aria-live': 'polite' }); const pool = h('div', { class: 'tiles' }); const fb = h('div', { class: 'q-fb' });
    const next = h('button', { class: 'btn primary', hidden: true, onclick: () => done() }, 'Next →');
    function paint() {
      slots.innerHTML = ''; let k = 0;
      chars.forEach(c => { if (fixed(c)) slots.appendChild(h('span', { class: 'slot fixed' }, c === ' ' ? '␣' : c)); else { const p = picked[k++]; slots.appendChild(h('span', { class: 'slot' + (p ? ' f' : '') }, p ? p.c : '')); } });
      pool.innerHTML = ''; tiles.forEach((t, ti) => pool.appendChild(h('button', { class: 'tile', disabled: picked.includes(t) || null, onclick: () => { picked.push(t); paint(); if (picked.length === tiles.length) finish(); } }, t.c)));
    }
    function finish() {
      let k = 0; const built = chars.map(c => fixed(c) ? c : picked[k++].c).join(''); const ok = built.toLowerCase() === v.w.toLowerCase();
      fb.className = 'q-fb ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Correct! ' + v.w : 'You built “' + built + '”. Correct: ' + v.w; SRS.grade(v.w, ok, 'recog'); done.result = ok; next.hidden = false; pool.querySelectorAll('button').forEach(b => b.disabled = true); next.focus();
    }
    paint();
    return h('div', { class: 'q' }, h('div', { class: 'q-prompt' }, v.ru), h('div', { class: 'q-sub' }, v.def), slots, pool,
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: () => { if (fb.textContent) return; picked.pop(); paint(); } }, '⌫ Back'), next), fb);
  }

  /* ---------- Runner: one question at a time ---------- */
  function Runner(host, words, kindFor, opts) {
    opts = opts || {};
    const qs = Array.isArray(kindFor) ? kindFor.slice() : words.map(v => ({ v, k: kindFor(v) })); let i = 0, right = 0; const wrong = [];
    const pool = opts.pool || VOCAB;
    const bar = h('div', { class: 'pbar' }, h('i')); const stage = h('div', { class: 'stage' }); const count = h('div', { class: 'muted small' });
    const label = opts.label ? h('span', { class: 'chip run-stage' }) : null;
    host.innerHTML = ''; host.append(h('div', { class: 'run-top' }, count, label, bar), stage);
    function step() {
      if (i >= qs.length) return end();
      count.textContent = (i + 1) + ' / ' + qs.length; bar.firstChild.style.width = (i / qs.length * 100) + '%';
      const q = qs[i]; if (label) label.textContent = opts.label(q);
      const done = () => { if (done.result) right++; else if (!wrong.includes(q.v)) wrong.push(q.v); i++; step(); };
      stage.innerHTML = ''; stage.appendChild(KINDS[q.k](q.v, pool)(done));
    }
    function end() {
      bar.firstChild.style.width = '100%'; const pct = Math.round(right / qs.length * 100);
      if (opts.test) { Store.data().tests.push({ t: Date.now(), name: opts.test, score: right, max: qs.length }); Store.save(); }
      document.dispatchEvent(new CustomEvent('vocab-run-end', { detail: { right, total: qs.length, pct, test: opts.test || null, bonus: !!opts.bonus, guided: !!opts.guided } }));
      stage.innerHTML = '';
      const again = Array.isArray(kindFor) ? null : h('button', { class: 'btn ghost', onclick: () => Runner(host, shuffle(words), kindFor, opts) }, 'Play again');
      stage.append(h('div', { class: 'run-end' }, h('div', { class: 'big-score ' + (pct >= 80 ? 'ok' : 'low') }, right + ' / ' + qs.length),
        h('p', null, opts.test ? (pct >= 80 ? '🏆 Boss defeated! (≥ 80%)' : 'Boss wins this time. You need 80%. Train the red words and try again!') : pct === 100 ? 'Perfect!' : 'Good work! Train the words you missed.'),
        wrong.length ? h('div', { class: 'wlist' }, wrong.map(v => h('span', { class: 'wtag bad' }, v.w + ' — ' + v.ru))) : null,
        h('div', { class: 'row' }, wrong.length ? h('button', { class: 'btn primary', onclick: () => Runner(host, shuffle(wrong), Array.isArray(kindFor) ? v => qs.find(q => q.v === v).k : kindFor, Object.assign({}, opts, { label: null })) }, 'Train mistakes again') : null,
          again,
          opts.onExit ? h('button', { class: 'btn ghost', onclick: () => opts.onExit() }, opts.exitLabel || '← All modes') : null)));
      if (opts.onEnd) opts.onEnd(right, qs.length);
    }
    step();
  }

  /* ---------- Guided session: Learn → Recognise → Use → Recall для одного набора слов ---------- */
  function pickGuided(words, n) {
    const rank = v => { const s = SRS.st(v.w); const st = SRS.status(v.w); return st === 'difficult' ? 0 : (s.seen && s.due <= Date.now() && st !== 'mastered') ? 1 : st === 'new' ? 2 : st === 'learning' ? 3 : 4; };
    return shuffle(words).sort((a, b) => rank(a) - rank(b)).slice(0, n || 8);
  }
  const GSTAGE = { toRu: 'Recognise', ctxChoice: 'Use', type: 'Recall', ctx: 'Recall' };
  function Guided(host, words, onExit) {
    const set = pickGuided(words, 8);
    const list = [].concat(shuffle(set).map(v => ({ v, k: 'toRu' })), shuffle(set).map(v => ({ v, k: 'ctxChoice' })), shuffle(set).map(v => ({ v, k: Math.random() < .5 ? 'type' : 'ctx' })));
    host.innerHTML = '';
    host.append(h('div', { class: 'guided-intro' }, h('p', { class: 'muted' }, 'Keks выбрал ' + set.length + ' слов: сначала сложные и те, что пора повторить, потом новые. Каждое слово пройдёт 3 шага: узнать → употребить в контексте → вспомнить и написать.'),
      h('div', { class: 'wlist' }, set.map(v => h('span', { class: 'wtag' }, v.w))),
      h('div', { class: 'row center' }, h('button', { class: 'btn primary lg', onclick: () => Runner(host, set, list, { onExit, guided: true, label: q => GSTAGE[q.k] }) }, 'Start session →'))));
  }

  /* ---------- Keks Blitz: 60 секунд на узнавание ---------- */
  function Blitz(host, words, onExit, setId) {
    const SEC = 60; let left = SEC, score = 0, streak = 0, best = 0, timer = null, misses = [];
    const pool = words.length >= 4 ? words : VOCAB;
    const t = h('b', { class: 'bz-t' }, SEC + 's'); const sc = h('b', { class: 'bz-s' }, '0'); const st = h('span', { class: 'bz-k' }); const stage = h('div', { class: 'stage' });
    const rec = () => ((Store.data().game || {}).blitz || {})[setId || 'all'] || 0;
    function q() {
      const v = pool[Math.floor(Math.random() * pool.length)]; const k = ['toRu', 'toEn', 'def'][Math.floor(Math.random() * 3)];
      const field = k === 'toRu' ? 'ru' : 'w'; const opts = shuffle([v[field]].concat(distractors(v, pool, field))); const ci = opts.indexOf(v[field]);
      const prompt = k === 'toRu' ? v.w : k === 'toEn' ? v.ru : v.def;
      stage.innerHTML = ''; stage.append(h('div', { class: 'q' }, h('div', { class: 'q-prompt' }, prompt), h('div', { class: 'opts grid2' }, opts.map((o, i) => h('button', { class: 'opt', onclick: e => {
        if (!timer) return; const ok = i === ci;
        if (ok) { score += 1 + Math.min(2, Math.floor(streak / 3)); streak++; best = Math.max(best, streak); SRS.grade(v.w, true, 'recog'); }
        else { streak = 0; if (!misses.includes(v)) misses.push(v); }
        e.currentTarget.classList.add(ok ? 'ok' : 'bad'); sc.textContent = score; st.textContent = streak >= 3 ? '🔥 ×' + (1 + Math.min(2, Math.floor(streak / 3))) : '';
        setTimeout(q, ok ? 180 : 450);
      } }, o)))));
    }
    function end() {
      clearInterval(timer); timer = null; const g = Store.data().game = Store.data().game || {}; g.blitz = g.blitz || {}; const prev = g.blitz[setId || 'all'] || 0; if (score > prev) g.blitz[setId || 'all'] = score; Store.save();
      document.dispatchEvent(new CustomEvent('blitz-end', { detail: { score, best, record: score > prev } }));
      stage.innerHTML = ''; stage.append(h('div', { class: 'run-end' }, h('div', { class: 'big-score ok' }, score), h('p', null, score > prev ? '🏆 New record!' : 'Record: ' + prev), h('p', { class: 'muted' }, 'Best streak: ' + best + '. Серия из 3 правильных подряд удваивает очки, из 6 — утраивает.'),
        misses.length ? h('div', null, h('p', { class: 'small muted' }, 'Эти слова стоит повторить (ошибки в блице не штрафуют):'), h('div', { class: 'wlist' }, misses.map(v => h('span', { class: 'wtag bad' }, v.w + ' — ' + v.ru)))) : null,
        h('div', { class: 'row center' }, h('button', { class: 'btn primary', onclick: () => Blitz(host, words, onExit, setId) }, 'Play again'), h('button', { class: 'btn ghost', onclick: onExit }, '← All modes'))));
    }
    function start() { score = 0; streak = 0; best = 0; misses = []; left = SEC; sc.textContent = '0'; t.textContent = SEC + 's'; timer = setInterval(() => { left--; t.textContent = left + 's'; t.parentNode.classList.toggle('warn', left <= 10); if (left <= 0) end(); }, 1000); q(); }
    host.innerHTML = '';
    host.append(h('div', { class: 'bz-bar' }, h('span', { class: 'bz-box' }, '⏱ ', t), h('span', { class: 'bz-box' }, 'Score ', sc), st, h('span', { class: 'muted small' }, 'Record: ' + rec())), stage);
    stage.append(h('div', { class: 'run-end' }, h('p', null, '60 секунд. Узнай как можно больше слов: перевод, значение, английское слово. Серия правильных ответов умножает очки.'), h('button', { class: 'btn primary lg', onclick: start }, 'Go!')));
  }

  /* ---------- Board games: Matching & Memory ---------- */
  function Matching(host, words, onExit) {
    const set = shuffle(words).slice(0, 6); const L = shuffle(set), R = shuffle(set); let sel = null, left = set.length; const firstTry = new Set(set.map(v => v.w));
    const colL = h('div', { class: 'mcol' }), colR = h('div', { class: 'mcol' }); const fb = h('div', { class: 'q-fb', role: 'status' });
    const mk = (v, side) => { const b = h('button', { class: 'mitem', onclick: () => pick(b, v, side) }, side === 'L' ? v.w : v.ru); return b; };
    L.forEach(v => colL.appendChild(mk(v, 'L'))); R.forEach(v => colR.appendChild(mk(v, 'R')));
    function pick(b, v, side) {
      if (b.classList.contains('done')) return;
      if (!sel || sel.side === side) { if (sel) sel.b.classList.remove('sel'); sel = { b, v, side }; b.classList.add('sel'); return; }
      if (sel.v.w === v.w) { [sel.b, b].forEach(x => { x.classList.remove('sel'); x.classList.add('done'); x.disabled = true; }); SRS.grade(v.w, firstTry.has(v.w), 'recog'); left--; sel = null; if (!left) { fb.className = 'q-fb ok'; fb.textContent = 'All pairs matched!'; } }
      else { firstTry.delete(v.w); firstTry.delete(sel.v.w); const a = sel.b; [a, b].forEach(x => x.classList.add('shake')); setTimeout(() => [a, b].forEach(x => x.classList.remove('shake', 'sel')), 450); sel = null; }
    }
    host.innerHTML = ''; host.append(h('p', { class: 'muted' }, 'Tap an English word, then its translation.'), h('div', { class: 'mboard' }, colL, colR), fb,
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: () => Matching(host, words, onExit) }, 'New round'), h('button', { class: 'btn ghost', onclick: onExit }, '← All modes')));
  }
  function Memory(host, words, onExit) {
    const set = shuffle(words).slice(0, 6); let cards = shuffle(set.flatMap(v => [{ v, t: v.w, k: 'en' }, { v, t: v.ru, k: 'ru' }])); let open = [], moves = 0, found = 0, lock = false;
    const grid = h('div', { class: 'mem' }); const info = h('div', { class: 'muted', role: 'status' }, 'Moves: 0');
    cards.forEach(c => { c.b = h('button', { class: 'mcard', 'aria-label': 'Hidden card', onclick: () => flip(c) }, h('span', { class: 'back' }, '?'), h('span', { class: 'front ' + c.k }, c.t)); grid.appendChild(c.b); });
    function flip(c) {
      if (lock || c.b.classList.contains('up')) return; c.b.classList.add('up'); c.b.setAttribute('aria-label', c.t); open.push(c);
      if (open.length === 2) { moves++; info.textContent = 'Moves: ' + moves; const [a, b] = open; open = [];
        if (a.v.w === b.v.w && a.k !== b.k) { a.b.classList.add('ok'); b.b.classList.add('ok'); SRS.grade(a.v.w, true, 'recog'); found++; if (found === set.length) info.textContent = '🎉 Done in ' + moves + ' moves!'; }
        else { lock = true; setTimeout(() => { [a, b].forEach(x => { x.b.classList.remove('up'); x.b.setAttribute('aria-label', 'Hidden card'); }); lock = false; }, 900); } }
    }
    host.innerHTML = ''; host.append(h('p', { class: 'muted' }, 'Find the pairs: English word + Russian translation.'), info, grid,
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: () => Memory(host, words, onExit) }, 'New game'), h('button', { class: 'btn ghost', onclick: onExit }, '← All modes')));
  }
  function Flashcards(host, words, onExit) {
    let i = 0; const list = shuffle(words);
    const wrap = h('div'); host.innerHTML = ''; host.appendChild(wrap);
    function show() {
      if (i >= list.length) { wrap.innerHTML = ''; wrap.append(h('div', { class: 'run-end' }, h('p', null, 'You have seen all ' + list.length + ' cards. Now try Recognise and Recall modes!'), h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => Flashcards(host, words, onExit) }, 'Again'), h('button', { class: 'btn ghost', onclick: onExit }, '← All modes')))); return; }
      const v = list[i]; SRS.seen(v.w);
      const card = h('button', { class: 'fcard', 'aria-label': 'Flip card', onclick: () => card.classList.toggle('flip') },
        h('div', { class: 'fc-face front' }, h('div', { class: 'fc-emo', 'aria-hidden': 'true' }, v.emoji || '★'), h('div', { class: 'fc-w' }, v.w), h('div', { class: 'fc-ipa' }, v.ipa + '  ·  ' + v.pos), h('div', { class: 'muted small' }, 'tap to flip')),
        h('div', { class: 'fc-face back' }, h('div', { class: 'fc-ru' }, v.ru), h('div', { class: 'fc-def' }, v.def), h('div', { class: 'fc-ex' }, '“' + v.ex + '”')));
      wrap.innerHTML = '';
      wrap.append(h('div', { class: 'muted small' }, (i + 1) + ' / ' + list.length + ' · Stage 1 — Learn'), card,
        h('div', { class: 'row center' }, sayBtn(v.w), h('button', { class: 'btn ghost', onclick: () => { SRS.grade(v.w, false, 'intro'); i++; show(); } }, 'Not yet'), h('button', { class: 'btn primary', onclick: () => { SRS.grade(v.w, true, 'recog'); i++; show(); } }, 'I know it ✓')));
    }
    show();
  }
  function Personalise(host, words, onExit) {
    const set = shuffle(words).slice(0, 5); const st = Store.data(); st.personal = st.personal || {};
    host.innerHTML = '';
    host.append(h('p', { class: 'muted' }, 'Stage 5 — Personalise. Write a TRUE sentence about you with each word. The site checks that the word is used; your tutor checks the meaning and grammar.'),
      h('ol', { class: 'pers' }, set.map(v => {
        const ta = h('textarea', { class: 'inp', rows: 2, 'aria-label': 'Sentence with ' + v.w }); ta.value = st.personal[v.w] || '';
        const fb = h('div', { class: 'q-fb' });
        const chk = () => { const t = norm(ta.value); const stem = norm(v.w).replace(/(e|s|es)$/, ''); const ok = t.split(' ').length >= 5 && t.includes(stem); fb.className = 'q-fb ' + (ok ? 'ok' : 'bad'); fb.textContent = ok ? 'Great — show it to your tutor!' : 'Use “' + v.w + '” in a sentence of at least 5 words.'; st.personal[v.w] = ta.value; Store.save(); if (ok) SRS.seen(v.w); };
        return h('li', null, h('b', null, v.w), ' — ', h('span', { class: 'muted' }, v.ru), ta, h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: chk }, 'Check'), h('span', { class: 'tutor-only' }, 'Tutor: ', h('label', { class: 'cb' }, h('input', { type: 'checkbox' }), 'OK'))), fb);
      })),
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: onExit }, '← All modes')));
  }

  /* ---------- Modes catalogue ---------- */
  const MODES = [
    { id: 'guided', stage: 'Smart session', name: 'Learn with Keks', desc: '8 words × 3 steps: recognise → use → recall. Starts with tricky words.', star: true, run: (h0, w, x) => Guided(h0, w, x) },
    { id: 'flash', stage: 'Learn', name: 'Flashcards', desc: 'Word, transcription, example. Flip the card.', run: (h0, w, x) => Flashcards(h0, w, x) },
    { id: 'match', stage: 'Recognise', name: 'Word Matching', desc: 'Match English words and translations.', run: (h0, w, x) => Matching(h0, w, x) },
    { id: 'memory', stage: 'Recognise', name: 'Memory Game', desc: 'Find the pairs.', run: (h0, w, x) => Memory(h0, w, x) },
    { id: 'trans', stage: 'Recognise → Recall', name: 'Translation Challenge', desc: 'EN → RU choice, then RU → EN typed.', run: (h0, w, x) => Runner(h0, shuffle(w), v => Math.random() < .5 ? 'toRu' : 'type', { onExit: x }) },
    { id: 'missing', stage: 'Recall', name: 'Missing Letters', desc: 'Complete the word.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'missing', { onExit: x }) },
    { id: 'build', stage: 'Recall', name: 'Word Builder', desc: 'Build the word from letters.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'build', { onExit: x }) },
    { id: 'type', stage: 'Recall', name: 'Type the Word', desc: 'See the translation — type the word.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'type', { onExit: x }) },
    { id: 'spell', stage: 'Recall', name: 'Spelling Challenge', desc: 'Transcription + translation → exact spelling.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'spell', { onExit: x }) },
    { id: 'ctx', stage: 'Use', name: 'Vocabulary in Context', desc: 'Complete new sentences.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'ctx', { onExit: x }) },
    { id: 'choose', stage: 'Use', name: 'Right Word, Right Place', desc: 'Choose the word that fits a new sentence.', run: (h0, w, x) => Runner(h0, shuffle(w), () => 'ctxChoice', { onExit: x, pool: w.length >= 4 ? w : VOCAB }) },
    { id: 'sent', stage: 'Use', name: 'Sentence Builder', desc: 'Put the example sentence together.', run: (h0, w, x) => Runner(h0, shuffle(w).slice(0, 10), () => 'sent', { onExit: x }) },
    { id: 'pers', stage: 'Personalise', name: 'Make it yours', desc: 'Write true sentences about you.', run: (h0, w, x) => Personalise(h0, w, x) },
    { id: 'blitz', stage: 'Game', name: 'Keks Blitz', desc: '60 seconds. Streaks multiply your score.', run: (h0, w, x, name, setId) => Blitz(h0, w, x, setId) },
    { id: 'boss', stage: 'Review', name: 'Vocabulary Boss Challenge', desc: 'Mixed test. Beat the boss with 80%.', boss: true, run: (h0, w, x, name) => Runner(h0, shuffle(w).slice(0, 12), () => ['type', 'ctx', 'def', 'spell', 'toEn'][Math.floor(Math.random() * 5)], { onExit: x, test: name || 'Boss Challenge' }) }
  ];

  window.Vocab = { SRS, MODES, Runner, Guided, Blitz, pickGuided, KINDS, byW, speak, sayBtn, canSpeak, MASTER_BOX, INTERVALS };
})();
