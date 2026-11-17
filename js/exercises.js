/* ========== EXERCISE ENGINE ========== */
(function () {
  'use strict';
  const { h, md, norm, matches, closeTo, Store, toast, shuffle } = Core;

  const TAGCLR = { VIDEO: 'pink', LISTEN: 'pink', READ: 'blue', SPEAK: 'blue', WRITE: 'navy', VOCABULARY: 'pink', GRAMMAR: 'blue', EXAM: 'yellow', ME: 'pink', THINK: 'ink', RESEARCH: 'navy', CULTURE: 'navy', LEARN: 'navy', 'LEARNING TO LEARN': 'navy', COMMUNITY: 'navy' };

  /* ---------- Audio player (real <audio>, or honest placeholder) ---------- */
  function AudioPlayer(audio) {
    if (!audio || !audio.file) {
      return h('div', { class: 'audio-ph', role: 'note' },
        h('span', { class: 'audio-ph-ic', 'aria-hidden': 'true' }, '♪'),
        h('div', null, h('strong', null, 'Аудио ' + (audio ? audio.track : '') + ' пока нет на сайте.'),
          h('span', { class: 'muted' }, ' Файл этой дорожки не входил в присланные материалы. Задание можно выполнить по тексту учебника; плеер появится, когда файл добавят в папку audio/.')));
    }
    const el = h('audio', { preload: 'metadata', src: audio.file });
    const play = h('button', { class: 'ap-btn', 'aria-label': 'Play' }, '▶');
    const back = h('button', { class: 'ap-btn sm', 'aria-label': 'Назад на 5 секунд', title: '−5 s' }, '−5');
    const fwd = h('button', { class: 'ap-btn sm', 'aria-label': 'Вперёд на 5 секунд', title: '+5 s' }, '+5');
    const bar = h('input', { type: 'range', min: 0, max: 1000, value: 0, class: 'ap-bar', 'aria-label': 'Playback position' });
    const time = h('span', { class: 'ap-time' }, '0:00');
    const rate = h('select', { class: 'ap-rate', 'aria-label': 'Скорость воспроизведения', title: 'Скорость' }, ['0.75', '0.9', '1', '1.25'].map(r => h('option', { value: r, selected: r === '1' || null }, r + '×')));
    const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
    play.onclick = () => { if (el.paused) { document.querySelectorAll('audio').forEach(a => { if (a !== el) a.pause(); }); el.play().catch(() => {}); } else el.pause(); };
    back.onclick = () => { el.currentTime = Math.max(0, el.currentTime - 5); };
    fwd.onclick = () => { if (el.duration) el.currentTime = Math.min(el.duration, el.currentTime + 5); };
    rate.onchange = () => { el.playbackRate = +rate.value; };
    el.onplay = () => { play.textContent = '❚❚'; play.setAttribute('aria-label', 'Pause'); };
    el.onpause = () => { play.textContent = '▶'; play.setAttribute('aria-label', 'Play'); };
    const paintT = () => { if (el.duration) bar.value = Math.round(el.currentTime / el.duration * 1000); time.textContent = fmt(el.currentTime) + ' / ' + fmt(el.duration); };
    el.ontimeupdate = paintT; el.onloadedmetadata = paintT;
    el.onerror = () => { wrap.replaceWith(h('div', { class: 'audio-ph bad' }, 'Файл ' + audio.file + ' не найден. Проверьте папку audio/.')); };
    bar.oninput = () => { if (el.duration) el.currentTime = bar.value / 1000 * el.duration; };
    const wrap = h('div', { class: 'audio' }, el, play, back, fwd, h('div', { class: 'ap-mid' }, bar, time), rate, h('span', { class: 'ap-track' }, '🔊 ' + audio.track + (audio.label ? ' · ' + audio.label : '')));
    return wrap;
  }

  /* ---------- Video from the book (not supplied) ---------- */
  function VideoNote(v) {
    return h('div', { class: 'audio-ph video', role: 'note' }, h('span', { class: 'audio-ph-ic', 'aria-hidden': 'true' }, '▶'),
      h('div', null, h('strong', null, 'Видео «' + v.title + '»'), h('span', { class: 'muted' }, ' — не входило в присланные материалы. Учитель может показать его из Digital Student’s Book / Classroom Presentation Kit; ответы можно записать здесь.')));
  }

  /* ---------- Pictures from the book: zoom on tap ---------- */
  function Lightbox(src, alt) {
    const close = () => { ov.remove(); document.removeEventListener('keydown', k); };
    const k = e => { if (e.key === 'Escape') close(); };
    const ov = h('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': alt || 'Picture', onclick: close },
      h('img', { src, alt: alt || '' }), h('button', { class: 'lb-x', 'aria-label': 'Закрыть' }, '✕'));
    document.body.appendChild(ov); document.addEventListener('keydown', k); ov.querySelector('.lb-x').focus();
  }
  function Figures(figs) {
    if (!figs || !figs.length) return null;
    return h('div', { class: 'figs n' + figs.length + (figs.length > 1 && figs.every(f => f.small) ? ' smalls' : '') }, figs.map(f => {
      const im = h('img', { src: f.src, alt: f.alt || '', loading: 'lazy', decoding: 'async', width: f.w || 1200, height: f.h || 800 });
      im.onerror = () => console.error('[Figure] Не загрузилась картинка: ' + f.src);
      const marks = (f.marks || []).map(([x, y, t]) => h('span', { class: 'fmark', style: { left: x + '%', top: y + '%' }, 'aria-hidden': 'true' }, t));
      const btn = h('button', { class: 'fzoom', 'aria-label': 'Увеличить картинку' + (f.alt ? ': ' + f.alt : ''), onclick: () => Lightbox(f.src, f.alt) }, im, marks, h('span', { class: 'fz-ic', 'aria-hidden': 'true' }, '⤢'));
      return h('figure', { class: 'bfig' + (f.wide ? ' wide' : '') + (f.marks ? ' marked' : '') }, btn, f.cap ? h('figcaption', { html: md(f.cap) }) : null);
    }));
  }
  /* где взят ключ: Teacher’s Book или подготовлен для платформы */
  const KEYSRC = { tb: ['Ключ: Teacher’s Book', 'ks-tb'], 'tb-sug': ['Ключ: Teacher’s Book (suggested answers)', 'ks-tb'], own: ['Ключ подготовлен для платформы — не из Teacher’s Book', 'ks-own'], free: ['Свободные ответы (Teacher’s Book: Students’ own answers)', 'ks-free'], none: ['Ключа нет: ответы зависят от видео/аудио, которых нет в материалах', 'ks-own'] };

  /* ---------- Generic card wrapper ---------- */
  function Box(b) { return h('aside', { class: 'skillbox ' + (b.kind || '') }, h('div', { class: 'sk-t' }, b.title), h('div', { html: b.html })); }
  function Stars(n) { return [1, 2, 3].map(i => h('i', { class: i <= n ? 'on' : null, 'aria-hidden': 'true' }, '★')); }
  function Card(it, body, api) {
    const isBook = it.source !== 'added';
    const G = window.Game; const starable = !!(G && G.starable(it));
    const starsEl = starable ? h('span', { class: 'ex-stars', title: '★ ≥ 50 % · ★★ ≥ 80 % · ★★★ = 100 % (лучшая попытка)' }) : null;
    const paintStars = () => { if (!starsEl) return; const n = G.stars(it.id); starsEl.innerHTML = ''; starsEl.append(...Stars(n)); starsEl.setAttribute('aria-label', n + ' of 3 stars'); starsEl.classList.toggle('full', n === 3); };
    paintStars();
    const head = h('header', { class: 'ex-head' },
      h('div', { class: 'ex-badges' },
        isBook ? h('span', { class: 'ex-num', title: 'Номер в учебнике' }, it.num) : h('span', { class: 'ex-num added', title: 'Добавлено, не из учебника' }, '+'),
        isBook ? h('span', { class: 'chip pg', title: 'Страница учебника' }, 'p.' + it.page) : h('span', { class: 'chip added' }, 'Добавлено'),
        (it.tags || []).map(t => h('span', { class: 'chip tag ' + (TAGCLR[t] || 'ink') }, t)),
        it.audio ? h('span', { class: 'chip tag pink' }, '🔊 ' + it.audio.track) : null,
        it.type === 'discuss' || it.type === 'interview' ? h('span', { class: 'chip turn' }, '🗣 Устно') : it.type === 'writing' ? h('span', { class: 'chip turn' }, '✍ Письмо') : null,
        starsEl),
      it.title ? h('h3', { class: 'ex-title' }, it.title) : null,
      h('p', { class: 'ex-instr', html: md(it.instruction || '') }),
      it.adapted ? h('p', { class: 'ex-adapt' }, h('b', null, 'Как выполнять на сайте. '), it.adapted) : null,
      it.video ? VideoNote(it.video) : null,
      (it.boxes || []).filter(b => !b.after).map(Box),
      Figures(it.figs),
      it.article ? h('div', { class: 'frame article' }, it.article.title ? h('h4', { class: 'frame-h art-h' }, it.article.title) : null, h('div', { class: 'art-body', html: it.article.html })) : null,
      it.articleRef ? h('details', { class: 'artref' }, h('summary', null, '📄 Текст: ' + it.articleRef.title), h('div', { class: 'frame article' }, h('div', { class: 'art-body', html: it.articleRef.html }))) : null,
      it.keySrc ? h('p', { class: 'tutor-only keysrc ' + KEYSRC[it.keySrc][1] }, KEYSRC[it.keySrc][0] + (it.keyNote ? ' · ' + it.keyNote : '')) : null,
      it.tutorNote ? h('details', { class: 'tutor-only tnote' }, h('summary', null, 'Методическая заметка'), h('div', { html: md(it.tutorNote) })) : null);

    const fb = h('div', { class: 'ex-fb', role: 'status', 'aria-live': 'polite' });
    const tools = h('div', { class: 'ex-tools' });
    const hintBox = h('div', { class: 'ex-hint', hidden: true });
    const explBox = h('div', { class: 'ex-expl', hidden: true });
    const add = (label, cls, fn, title) => { const b = h('button', { class: 'btn ' + cls, onclick: fn, title: title || null }, label); tools.appendChild(b); return b; };

    let peeked = false;
    if (api.check) add('Check Answers', 'primary', () => { const r = api.check(); show(r); });
    if (api.retry) add('Try Again', 'ghost', () => { api.retry(); fb.textContent = ''; fb.className = 'ex-fb'; });
    if (it.hint) add('Need a Hint?', 'ghost', () => { hintBox.hidden = !hintBox.hidden; hintBox.textContent = '💡 ' + it.hint; });
    /* Пояснение часто содержит ключ, поэтому у заданий с проверкой оно открывается только после первой попытки */
    const explBtn = it.explanation ? add('Show Explanation', 'ghost', () => { explBox.hidden = !explBox.hidden; explBox.innerHTML = '💬 ' + md(it.explanation); }, api.check ? 'Доступно после первой проверки' : null) : null;
    if (explBtn && api.check && !Store.ex(it.id).attempts.length) explBtn.hidden = true;
    /* Ученик может открыть ответ только после своей попытки (если задание это допускает) */
    const reveal = api.key && api.check && !it.noReveal ? add('Show answers', 'ghost reveal', async () => {
      if (!(await Core.confirmBox('Показать правильные ответы?', 'Ответы появятся в задании. Звёзды за проверку после этого не начисляются — попробуй сначала исправить ошибки сам (Try Again, Hint).', 'Показать'))) return;
      peeked = true; Store.ex(it.id).peeked = true; Store.save(); api.key(); fb.className = 'ex-fb show mid'; fb.textContent = 'Правильные ответы показаны. Прочитай их, затем нажми Reset и выполни задание ещё раз.';
    }, 'Доступно после первой проверки') : null;
    if (reveal) reveal.hidden = !Store.ex(it.id).attempts.length;
    if (api.reset) add('Reset Exercise', 'ghost subtle', async () => { if (await Core.confirmBox('Сбросить упражнение?', 'Ответы этого упражнения будут очищены. Результаты прошлых попыток останутся в истории.', 'Сбросить')) { api.reset(); peeked = false; fb.textContent = ''; fb.className = 'ex-fb'; Store.saveState(it.id, null); } });
    if (api.key) add('Ключ (учитель)', 'ghost tutor-only', () => api.key(), 'Только в режиме учителя');
    if (api.done) add(api.doneLabel || 'Mark as done', 'ghost', () => { const was = !!Store.ex(it.id).done; api.done(); paintDone(); const now = !!Store.ex(it.id).done; const xp = now && G ? G.exerciseDone(it, !was) : 0; toast(now ? 'Отмечено как выполненное' + (xp ? ' · +' + xp + ' XP' : '') : 'Отмечено как выполненное'); });

    function show(r) {
      if (!r) return;
      const pct = r.max ? Math.round(r.score / r.max * 100) : 0;
      const msg = pct === 100 ? 'Excellent! Everything is correct.' : pct >= 70 ? 'Good job! Correct the red answers and press Check again.' : 'Keep going! Use “Need a Hint?” and try again.';
      fb.className = 'ex-fb show ' + (pct === 100 ? 'ok' : pct >= 70 ? 'mid' : 'low');
      fb.innerHTML = '';
      if (reveal && pct < 100) reveal.hidden = false;
      if (explBtn) explBtn.hidden = false;
      const prevBest = Store.ex(it.id).best;
      Store.record(it.id, r.score, r.max, peeked ? { peek: true } : null);
      const g = G && !peeked ? G.exerciseChecked(it, r, prevBest) : null;
      const praise = peeked ? 'Ответы были открыты — результат сохранён без звёзд.' : g && g.fixed ? 'Fixed! Mistakes turned into 100%.' : msg;
      fb.append(...[h('span', { class: 'score' }, r.score + ' / ' + r.max), h('span', { class: 'pct' }, pct + '%'), h('span', null, praise), r.note ? h('span', { class: 'muted' }, ' ' + r.note) : null,
        g && (g.xp || starable) ? h('span', { class: 'reward' }, starable ? h('span', { class: 'rw-stars' }, Stars(g.stars)) : null, g.xp ? h('b', { class: 'rw-xp' }, '+' + g.xp + ' XP') : null) : null].filter(Boolean));   // append(null) печатал бы «null»
      if (pct < 100 && it.hint && hintBox.hidden) fb.append(h('button', { class: 'linkbtn', onclick: () => { hintBox.hidden = false; hintBox.textContent = '💡 ' + it.hint; } }, '💡 Hint'));
      paintDone(); paintStars();
      if (window.innerWidth < 640 && fb.scrollIntoView) fb.scrollIntoView({ block: 'center', behavior: 'smooth' });   // на телефоне результат не уходит под клавиатуру и реплику Кекса
      if (pct === 100) { card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop'); }
      document.dispatchEvent(new CustomEvent('progress-changed'));
    }

    const tcomment = h('textarea', { class: 'inp tcomment', rows: 2, placeholder: 'Комментарий учителя…', 'aria-label': 'Комментарий учителя' });
    const ex = Store.ex(it.id); tcomment.value = ex.tcomment || '';
    tcomment.addEventListener('change', () => { Store.ex(it.id).tcomment = tcomment.value; Store.save(); });

    const ask = h('details', { class: 'askbox' }, h('summary', null, '✋ Ask your teacher'),
      h('textarea', { class: 'inp', rows: 2, placeholder: 'Напиши вопрос учителю — он появится в разделе Teacher', 'aria-label': 'Вопрос учителю', onchange: e => { Store.ex(it.id).ask = e.target.value; Store.save(); } }));
    ask.querySelector('textarea').value = ex.ask || '';

    const follow = it.followUp ? h('div', { class: 'followup tutor-only' }, h('div', { class: 'fu-title' }, 'Вопросы учителя (follow-up)'), h('ul', null, it.followUp.map(q => h('li', null, q)))) : null;
    const extra = it.extra ? ExtraChallenge(it) : null;

    const links = it.links ? h('div', { class: 'plinks' }, h('span', null, 'PRACTICE'), it.links.map(([label, lesson, ex]) => h('a', { href: '#/lesson/' + lesson + (ex ? '/' + ex : '') }, label + ' ›'))) : null;
    const tx = it.type !== 'listen' && it.audio && it.audio.transcript ? Transcript(it.audio) : null;
    const sample = it.sample ? h('details', { class: 'tutor-only model-ans' }, h('summary', null, it.sample.src === 'tb' ? 'Teacher’s Book: suggested answers' : 'Образец ответа — подготовлен для платформы (не из Teacher’s Book)'), h('div', { html: it.sample.html })) : null;
    const after = (it.boxes || []).filter(b => b.after).map(Box);
    const card = h('article', { class: 'ex', id: 'ex-' + it.id, 'data-id': it.id, 'data-type': it.type }, head, it.type !== 'listen' && it.audio ? AudioPlayer(it.audio) : null, body, tx, after, links, hintBox, explBox, tools, fb, sample, follow, extra,
      h('div', { class: 'ex-foot' }, ask, h('div', { class: 'tutor-only tc-wrap' }, tcomment)));

    card.addEventListener('focusin', () => { if (card._seen) return; card._seen = true; document.dispatchEvent(new CustomEvent('exercise-focus', { detail: { id: it.id, type: it.type === 'listen' ? (it.inner || {}).type || 'listen' : it.type, listen: it.type === 'listen', hint: !!it.hint } })); });
    function paintDone() { const e = Store.ex(it.id); card.classList.toggle('is-done', !!e.done); }
    paintDone();
    card._show = show;
    return card;
  }

  function ExtraChallenge(it) {
    const ta = h('textarea', { class: 'inp', rows: 3, 'aria-label': 'Extra challenge answer' });
    const st = Store.ex(it.id); ta.value = st.extra || '';
    ta.addEventListener('input', () => { Store.ex(it.id).extra = ta.value; Store.save(); });
    return h('details', { class: 'extra' }, h('summary', null, '⚡ Extra Challenge'), h('p', null, it.extra), ta);
  }

  /* ---------- tutor ✓/✗ marker for keyless items ---------- */
  function Marker() {
    let v = null;
    const yes = h('button', { class: 'mk yes', 'aria-pressed': 'false', title: 'Верно', 'aria-label': 'Верно' }, '✓');
    const no = h('button', { class: 'mk no', 'aria-pressed': 'false', title: 'Неверно', 'aria-label': 'Неверно' }, '✗');
    const set = x => { v = x; yes.setAttribute('aria-pressed', String(x === true)); no.setAttribute('aria-pressed', String(x === false)); };
    yes.onclick = () => set(v === true ? null : true); no.onclick = () => set(v === false ? null : false);
    const el = h('span', { class: 'marker' }, yes, no);
    return { el, get: () => v, set };
  }

  /* ---------- Save helper ---------- */
  function autosave(it, getState) { let t; return () => { clearTimeout(t); t = setTimeout(() => Store.saveState(it.id, getState()), 250); }; }

  /* =============== GAPS (typed, select, free, example, keyless) =============== */
  function Gaps(it, inner) {
    const src = inner || it;
    const keyless = src.answers === null;
    const gaps = []; let lastFocus = null; let gn = 0;
    const bankWrap = src.bank ? h('div', { class: 'bank', role: 'group', 'aria-label': 'Word bank' }) : null;
    const save = autosave(it, () => gaps.map(g => g.el.value));
    function mkSeg(seg) {
      if (typeof seg === 'string') return h('span', { html: md(seg) });
      if (seg.br) return h('br');
      if (seg.given != null) return h('span', { class: 'gapwrap' }, h('input', { class: 'gap given', value: seg.given, readonly: true, tabindex: -1, 'aria-label': 'Example', style: { width: Math.min(seg.given.length + 3, 34) + 'ch' } }));
      if (seg.sel) {
        const el = h('select', { class: 'inp sel gsel', 'aria-label': 'Choice ' + (gaps.length + 1) }, h('option', { value: '' }, seg.ph || '…'), seg.sel.map(o => h('option', { value: o }, o)));
        const g = { el, seg, kind: 'sel' }; el.addEventListener('change', () => { el.classList.remove('ok', 'bad'); save(); }); gaps.push(g);
        return h('span', { class: 'gapwrap' }, el);
      }
      const longest = seg.w || Math.max(...((seg.a || ['xxxxxxxxxx']).map(x => x.length)), seg.open ? 24 : 8);
      const el = h('input', { class: 'gap' + (seg.open ? ' free' : ''), type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': (seg.open ? 'Your answer ' : 'Gap ') + (gaps.length + 1), placeholder: seg.ph || null, style: { width: Math.min(longest + 3, 40) + 'ch' } });
      const g = { el, seg, kind: seg.open ? 'free' : 'text', mk: keyless && !seg.open ? Marker() : null };
      el.addEventListener('focus', () => { lastFocus = g; });
      el.addEventListener('input', () => { el.classList.remove('ok', 'bad', 'close'); paintBank(); save(); });
      gaps.push(g);
      const showNum = !src.numbered && !seg.open && !src.noNums;
      if (showNum) gn++;
      return h('span', { class: 'gapwrap' }, showNum ? h('sup', { class: 'gn' }, seg.n || gn) : null, el, g.mk ? g.mk.el : null);
    }
    const paras = src.paras.map((p, pi) => h('p', { class: 'gline' + (src.numbered ? ' numbered' : '') }, src.numbered ? h('b', { class: 'ln' }, (src.numStart != null ? src.numStart + pi : pi + 1) + ' ') : null, h('span', { class: 'gl-body' }, p.map(mkSeg))));
    function paintBank() {
      if (!bankWrap) return;
      const used = gaps.filter(g => g.kind === 'text').map(g => norm(g.el.value));
      [...bankWrap.children].forEach(c => { c.classList.toggle('used', src.uniqueBank && used.includes(norm(c.dataset.w))); });
    }
    if (bankWrap) src.bank.forEach(w => bankWrap.appendChild(h('button', { class: 'wchip', 'data-w': w, onclick: () => {
      const texts = gaps.filter(g => g.kind === 'text');
      const target = (lastFocus && lastFocus.kind === 'text' && !lastFocus.el.value) ? lastFocus : (texts.find(g => !g.el.value) || lastFocus);
      if (!target) return; target.el.value = w; target.el.dispatchEvent(new Event('input')); const nx = texts.find(g => !g.el.value); (nx || target).el.focus();
    } }, w)));
    const intro = src.intro ? h('ul', { class: 'intro-list' }, src.intro.map(x => h('li', { html: md(x) }))) : null;
    let body;
    if (src.frame || src.heading) {
      body = h('div', { class: 'frame ' + (src.frame || 'plain') },
        src.frameTitle ? h('div', { class: 'frame-bar' }, src.frame === 'blog' ? h('span', { 'aria-hidden': 'true' }, '≡ ') : null, src.frameTitle) : null,
        src.heading ? h('h4', { class: 'frame-h' }, src.heading) : null,
        src.meta ? h('div', { class: 'frame-meta' }, src.meta) : null, paras, src.source ? h('p', { class: 'src' }, src.source) : null);
    } else body = h('div', { class: 'glines' + (src.cols ? ' cols' : '') }, paras);
    const wrap = h('div', null, intro, bankWrap, body);
    const graded = () => gaps.filter(g => g.kind !== 'free');
    function okFor(g, groups) {
      if (g.kind === 'sel') return g.el.value !== '' && [].concat(g.seg.a).includes(g.el.value);
      if (g.seg.group) { const peers = groups[g.seg.group]; const val = norm(g.el.value); return matches(g.el.value, g.seg.a, g.seg.strict ? { strict: true } : null) && peers.filter(p => norm(p.el.value) === val).length === 1; }
      return matches(g.el.value, g.seg.a, g.seg.strict ? { strict: true } : null);
    }
    function evalGaps() {
      let score = 0; const groups = {};
      graded().forEach(g => { if (g.seg.group) (groups[g.seg.group] = groups[g.seg.group] || []).push(g); });
      graded().forEach(g => {
        const ok = okFor(g, groups); g.ok = ok; if (ok) score++;
        g.el.classList.toggle('ok', ok); g.el.classList.toggle('bad', !ok);
        const close = g.kind === 'text' && !ok && closeTo(g.el.value, g.seg.a);
        g.el.classList.toggle('close', close); g.el.title = close ? 'Almost! Check the spelling.' : '';
        g.el.setAttribute('aria-invalid', String(!ok));
      });
      const close = gaps.filter(g => g.el.classList.contains('close')).length;
      return { score, max: graded().length, note: close ? 'Orange = almost right, check the spelling.' : '' };
    }
    return {
      el: wrap,
      check: keyless ? null : evalGaps,
      retry: keyless ? null : () => { graded().forEach(g => { if (!g.ok) { g.el.value = ''; g.el.classList.remove('bad', 'close'); } }); paintBank(); },
      reset: () => { gaps.forEach(g => { g.el.value = ''; g.el.classList.remove('ok', 'bad', 'close'); g.mk && g.mk.set(null); }); paintBank(); },
      key: keyless ? () => toast('Ключ появится вместе с аудио') : () => { const used = {}; graded().forEach(g => { const opts = [].concat(g.seg.a); if (g.seg.group) { const k = used[g.seg.group] = used[g.seg.group] || []; const v = opts.find(o => !k.includes(o)) || opts[0]; k.push(v); g.el.value = v; } else g.el.value = opts[0]; }); gaps.filter(g => g.kind === 'free' && g.seg.key).forEach(g => { g.el.value = g.seg.key; }); evalGaps(); paintBank(); },
      setState: st => { if (Array.isArray(st)) gaps.forEach((g, i) => { g.el.value = st[i] || ''; }); paintBank(); },
      tutorSave: keyless ? () => { const m = gaps.filter(g => g.mk).map(g => g.mk.get()); if (m.some(x => x === null)) { toast('Отметьте ✓ или ✗ у каждого ответа'); return null; } return { score: m.filter(Boolean).length, max: m.length, note: 'Оценено учителем.' }; } : null
    };
  }

  /* =============== MCQ (optional passage with numbered gaps) =============== */
  function MCQ(it, inner) {
    const src = inner || it; const keyless = src.answers === null; const qs = []; const holes = {};
    const save = autosave(it, () => qs.map(q => q.sel));
    let passage = null;
    if (src.passage) {
      passage = h('div', { class: 'frame ' + (src.frame || 'plain') }, src.heading ? h('h4', { class: 'frame-h' }, src.heading) : null,
        src.passage.map(p => h('p', { class: 'ptext' }, p.map(seg => typeof seg === 'string' ? h('span', { html: md(seg) }) : (holes[seg.n] = h('span', { class: 'hole' }, h('sup', null, seg.n), '_____'))))),
        src.source ? h('p', { class: 'src' }, src.source) : null);
    }
    const list = h('div', { class: 'mcq' + (src.compact ? ' compact' : '') }, src.questions.map((q, qi) => {
      const rec = { q, sel: null, btns: [], mk: keyless ? Marker() : null, n: q.n || qi + 1 };
      const opts = h('div', { class: 'opts', role: 'radiogroup', 'aria-label': q.q || ('Question ' + rec.n) }, q.options.map((o, oi) => {
        const b = h('button', { class: 'opt', role: 'radio', 'aria-checked': 'false', onclick: () => { rec.sel = oi; paint(rec); save(); } }, o);
        rec.btns.push(b); return b;
      }));
      qs.push(rec);
      return h('div', { class: 'mq' }, q.q ? h('div', { class: 'mq-q' }, h('span', { html: md(q.q) }), rec.mk ? rec.mk.el : null) : h('div', { class: 'mq-q' }, String(rec.n), rec.mk ? rec.mk.el : null), opts);
    }));
    function paint(r) {
      r.btns.forEach((b, i) => { b.setAttribute('aria-checked', String(i === r.sel)); b.classList.toggle('sel', i === r.sel); b.classList.remove('ok', 'bad'); });
      const hole = holes[r.n]; if (hole) { hole.lastChild.textContent = r.sel == null ? '_____' : r.q.options[r.sel].replace(/^[A-D]\s+/, ''); hole.classList.toggle('filled', r.sel != null); }
    }
    return {
      el: h('div', null, passage, list),
      check: keyless ? null : () => { let s = 0; qs.forEach(r => { r.btns.forEach(b => b.classList.remove('ok', 'bad')); if (r.sel === r.q.a) { s++; r.btns[r.sel].classList.add('ok'); } else if (r.sel != null) r.btns[r.sel].classList.add('bad'); r.ok = r.sel === r.q.a; }); return { score: s, max: qs.length }; },
      retry: keyless ? null : () => qs.forEach(r => { if (!r.ok) { r.sel = null; paint(r); } }),
      reset: () => qs.forEach(r => { r.sel = null; paint(r); r.mk && r.mk.set(null); }),
      key: keyless ? () => toast('Ключ появится вместе с аудио') : () => qs.forEach(r => { r.sel = r.q.a; paint(r); r.btns[r.sel].classList.add('ok'); }),
      setState: s => { if (Array.isArray(s)) qs.forEach((r, i) => { r.sel = s[i] == null ? null : s[i]; paint(r); }); },
      tutorSave: keyless ? () => { const m = qs.map(r => r.mk.get()); if (m.some(x => x === null)) { toast('Отметьте ✓ или ✗ у каждого ответа'); return null; } return { score: m.filter(Boolean).length, max: m.length, note: 'Оценено учителем.' }; } : null
    };
  }

  /* =============== OPEN answers (model answers; tutor marks) =============== */
  function Open(it, inner) {
    const src = inner || it; const rows = []; const save = autosave(it, () => rows.map(r => r.ta.value));
    const el = h('ol', { class: 'openq', start: src.start || null }, src.questions.map((q, qi) => {
      const ta = h('textarea', { class: 'inp', rows: src.rows || 2, 'aria-label': q || ('Answer ' + (qi + 1)) }); ta.addEventListener('input', save);
      const mk = src.free ? { el: null, get: () => true, set: () => {} } : Marker(); const model = src.key && src.key[qi] ? h('div', { class: 'model tutor-only', hidden: true }, h('b', null, 'Key: '), src.key[qi]) : null;
      rows.push({ ta, mk, model });
      return h('li', null, h('div', { class: 'mq-q' }, h('span', { html: md(q || '') }), mk.el), ta, model);
    }));
    return {
      el, reset: () => rows.forEach(r => { r.ta.value = ''; r.mk.set(null); }),
      setState: s => { if (Array.isArray(s)) rows.forEach((r, i) => { r.ta.value = s[i] || ''; }); },
      key: src.key ? () => { rows.forEach(r => { if (r.model) r.model.hidden = !r.model.hidden; }); } : null,
      tutorSave: src.free ? null : () => { const m = rows.map(r => r.mk.get()); if (m.some(x => x === null)) { toast('Отметьте ✓ или ✗ у каждого ответа'); return null; } return { score: m.filter(Boolean).length, max: m.length, note: 'Оценено учителем.' }; },
      done: src.free ? () => Store.markDone(it.id) : null, doneLabel: 'Готово ✓'
    };
  }

  /* =============== TAP-FIND (underline phrases in a text) =============== */
  function tnorm(t) { return t.toLowerCase().replace(/[’‘]/g, "'").replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '').replace(/^'+|'+$/g, ''); }
  function TapFind(it) {
    const toks = []; const on = new Set();
    const save = autosave(it, () => [...on]);
    let pIdx = -1;
    const paraEls = it.paras.map(p => { pIdx++; const myP = pIdx;
      const obj = typeof p === 'string' ? { t: p } : p; const start = toks.length;
      if (obj.static) return h('p', { class: 'tf-p static' }, obj.t);
      const words = obj.t.split(/\s+/).filter(Boolean);
      const btns = words.map(w => { const i = toks.length; const b = h('button', { class: 'tok', 'aria-pressed': 'false', onclick: () => { on.has(i) ? on.delete(i) : on.add(i); paint(); save(); } }, w); toks.push({ w, n: tnorm(w), b, p: start, pi: myP }); return b; });
      const spaced = []; btns.forEach((b, i) => { if (i) spaced.push(' '); spaced.push(b); });
      return h('p', { class: 'tf-p' + (obj.who ? ' who' : '') }, obj.who ? h('b', { class: 'spk' }, obj.who) : null, h('span', null, spaced));
    });
    const used = new Set();
    function locate(target) {
      const phrase = typeof target === 'string' ? target : target.t; const para = typeof target === 'string' ? null : target.p;
      const raw = w => w.toLowerCase().replace(/[’‘]/g, "'");
      const pn = phrase.split(/\s+/).filter(Boolean).map(raw);
      for (let i = 0; i <= toks.length - pn.length; i++) {
        if (para != null && toks[i].pi !== para) continue;
        if (pn.every((w, k) => raw(toks[i + k].w) === w) && !pn.some((_, k) => used.has(i + k))) { const idx = pn.map((_, k) => i + k); idx.forEach(x => used.add(x)); return idx; }
      }
      console.warn('TapFind: phrase not found', phrase); return [];
    }
    const ignore = (it.ignore || []).map(locate).flat();
    const targets = it.targets.map(locate);
    function paint() { toks.forEach((t, i) => { t.b.classList.toggle('on', on.has(i)); t.b.setAttribute('aria-pressed', String(on.has(i))); t.b.classList.remove('ok', 'bad', 'miss'); }); }
    const el = h('div', { class: 'frame ' + (it.frame || 'plain') + ' tapfind' }, it.frameTitle ? h('div', { class: 'frame-bar' }, it.frameTitle) : null, it.heading ? h('h4', { class: 'frame-h' }, it.heading) : null, paraEls);
    return {
      el,
      check: () => {
        paint(); let hits = 0; const tset = new Set(targets.flat());
        targets.forEach(idx => { const hit = idx.length && idx.every(i => on.has(i)); if (hit) hits++; idx.forEach(i => toks[i].b.classList.add(hit ? 'ok' : (on.has(i) ? 'ok' : 'miss'))); });
        let extra = 0; on.forEach(i => { if (!tset.has(i) && !ignore.includes(i)) { extra++; toks[i].b.classList.add('bad'); } });
        return { score: Math.max(0, hits - extra), max: targets.length, note: extra ? 'Red words are not part of the answer (−1 each).' : '' };
      },
      retry: () => { const tset = new Set(targets.flat()); [...on].forEach(i => { if (!tset.has(i)) on.delete(i); }); paint(); },
      reset: () => { on.clear(); paint(); },
      key: () => { on.clear(); targets.flat().forEach(i => on.add(i)); paint(); },
      setState: st => { if (Array.isArray(st)) { on.clear(); st.forEach(i => on.add(i)); paint(); } }
    };
  }

  /* =============== MULTI (tick all that apply) =============== */
  function Multi(it) {
    let on = new Set(); const btns = [];
    const save = () => Store.saveState(it.id, [...on]);
    const el = h('div', { class: 'multi' }, it.options.map((o, i) => { const b = h('button', { class: 'mchk', 'aria-pressed': 'false', onclick: () => { on.has(i) ? on.delete(i) : on.add(i); paint(); save(); } }, h('span', { class: 'box', 'aria-hidden': 'true' }), o); btns.push(b); return b; }));
    function paint() { btns.forEach((b, i) => { b.classList.toggle('on', on.has(i)); b.setAttribute('aria-pressed', String(on.has(i))); b.classList.remove('ok', 'bad', 'miss'); }); }
    return {
      el,
      check: () => { paint(); let s = 0; const want = new Set(it.answers); const opt = new Set(it.optional || []); btns.forEach((b, i) => { if (opt.has(i)) return; if (on.has(i) && want.has(i)) { s++; b.classList.add('ok'); } else if (on.has(i)) { s--; b.classList.add('bad'); } else if (want.has(i)) b.classList.add('miss'); }); return { score: Math.max(0, s), max: it.answers.length, note: 'Лишний вариант = −1.' }; },
      retry: () => { const want = new Set(it.answers); on = new Set([...on].filter(i => want.has(i))); paint(); },
      reset: () => { on.clear(); paint(); }, key: () => { on = new Set(it.answers); paint(); },
      setState: st => { if (Array.isArray(st)) { on = new Set(st); paint(); } }
    };
  }

  /* =============== CHECKLIST / SCORES / REFERENCE =============== */
  function Checklist(it) {
    let st = {}; const boxes = it.items.map((x, i) => h('input', { type: 'checkbox', onchange: e => { st[i] = e.target.checked; Store.saveState(it.id, st); } }));
    return { el: h('div', { class: 'chk' }, it.items.map((x, i) => h('label', { class: 'cb' }, boxes[i], h('span', null, x)))),
      done: () => Store.markDone(it.id), doneLabel: 'Done ✓', reset: () => { st = {}; boxes.forEach(b => b.checked = false); },
      setState: s => { if (s) { st = s; boxes.forEach((b, i) => b.checked = !!s[i]); } } };
  }
  function Scores(it) {
    let st = {}; const ins = it.items.map((x, i) => h('input', { type: 'number', min: 0, max: it.max || 10, class: 'inp num', 'aria-label': x, oninput: e => { st[i] = e.target.value; Store.saveState(it.id, st); } }));
    return { el: h('div', { class: 'scores' }, it.box ? h('div', { class: 'gbox-h green' }, it.box) : null, it.items.map((x, i) => h('label', { class: 'sc-row' }, h('span', null, x), ins[i]))),
      done: () => { const vals = Object.values(st).map(Number).filter(n => !isNaN(n)); Store.record(it.id, vals.reduce((a, b) => a + b, 0), it.items.length * (it.max || 10), { self: true }); toast('Сохранено'); }, doneLabel: 'Save scores',
      reset: () => { st = {}; ins.forEach(b => b.value = ''); }, setState: s => { if (s) { st = s; ins.forEach((b, i) => b.value = s[i] || ''); } } };
  }
  function Reference(it) {
    return { el: h('div', { class: 'ref', html: it.html }), done: () => Store.markDone(it.id), doneLabel: it.doneLabel || 'I’ve read it ✓' };
  }

  function Transcript(a) { return h('details', { class: 'transcript tx' }, h('summary', null, 'Transcript · track ' + a.track), h('div', { class: 'tx-body', html: a.transcript })); }
  /* =============== LISTEN shell =============== */
  function Listen(it) {
    const innerApi = ({ mcq: MCQ, gaps: Gaps, open: Open, multi: (x, y) => Multi(Object.assign({}, x, y)), tapfind: (x, y) => TapFind(Object.assign({}, x, y)) })[it.inner.type](it, it.inner);
    const parts = [];
    if (it.think) parts.push(h('p', { class: 'think' }, h('b', null, 'THINK '), it.think));
    if (it.skill) parts.push(h('aside', { class: 'skillbox' }, h('div', { class: 'sk-t' }, it.skill.title), h('p', null, it.skill.text)));
    parts.push(AudioPlayer(it.audio));
    parts.push(innerApi.el);
    if (it.audio && it.audio.transcript) parts.push(Transcript(it.audio));
    innerApi.el = h('div', null, parts);
    return innerApi;
  }

  /* =============== INLINE CHOICE (Ex.11) =============== */
  /* Выбор вариантов прямо в тексте: it.text (сплошной текст) или it.lines (нумерованные предложения).
     Сегмент: { o:[...], a: индекс | [индексы, если верны оба] } */
  function Inline(it) {
    const items = []; const save = autosave(it, () => items.map(x => x.sel));
    const okIdx = seg => [].concat(seg.a);
    const mk = (seg, num) => {
      if (typeof seg === 'string') return h('span', { html: md(seg) });
      const n = items.length + 1; const rec = { seg, sel: null, btns: [] };
      const grp = h('span', { class: 'ich', role: 'radiogroup', 'aria-label': 'Choice ' + n }, num ? h('sup', { class: 'gn' }, n) : null,
        seg.o.map((o, oi) => { const b = h('button', { class: 'ich-o', role: 'radio', 'aria-checked': 'false', onclick: () => { rec.sel = oi; paint(rec); save(); } }, o); rec.btns.push(b); return b; }).reduce((a, b, i) => { if (i) a.push(h('span', { class: 'sl', 'aria-hidden': 'true' }, '/')); a.push(b); return a; }, []));
      items.push(rec); return grp;
    };
    function paint(r) { r.btns.forEach((b, i) => { b.classList.toggle('sel', i === r.sel); b.setAttribute('aria-checked', String(i === r.sel)); b.classList.remove('ok', 'bad'); }); }
    let el;
    if (it.lines) el = h('div', { class: 'glines ilines' }, it.lines.map((ln, li) => h('p', { class: 'gline numbered' }, h('b', { class: 'ln' }, (li + 1) + ' '), h('span', { class: 'gl-body' }, ln.map(s => mk(s, false))))));
    else el = h('div', { class: 'frame ' + (it.frame || 'journal') }, it.frameTitle ? h('div', { class: 'frame-bar' }, it.frameTitle) : null, it.heading ? h('h4', { class: 'frame-h' }, it.heading) : null, it.meta ? h('div', { class: 'frame-meta' }, it.meta) : null, h('p', { class: 'itext' }, it.text.map(s => mk(s, true))));
    return {
      el,
      check: () => { let s = 0; items.forEach(r => { r.btns.forEach(b => b.classList.remove('ok', 'bad')); r.ok = r.sel != null && okIdx(r.seg).includes(r.sel); if (r.ok) { s++; r.btns[r.sel].classList.add('ok'); } else if (r.sel != null) r.btns[r.sel].classList.add('bad'); }); return { score: s, max: items.length }; },
      retry: () => items.forEach(r => { if (!r.ok) { r.sel = null; paint(r); } }),
      reset: () => items.forEach(r => { r.sel = null; paint(r); }),
      key: () => items.forEach(r => { r.sel = okIdx(r.seg)[0]; paint(r); okIdx(r.seg).forEach(i => r.btns[i].classList.add('ok')); }),
      setState: s => { if (Array.isArray(s)) items.forEach((r, i) => { r.sel = s[i] == null ? null : s[i]; paint(r); }); }
    };
  }

  /* =============== UNDERLINE + TENSE (Ex.7) =============== */
  function Underline(it) {
    const rows = []; const save = autosave(it, () => rows.map(r => ({ on: [...r.on], t: r.sel.value })));
    const el = h('div', { class: 'ul' }, it.sentences.map(s => {
      const r = { s, on: new Set(), btns: [] };
      const toks = s.tokens.map((t, i) => { const b = h('button', { class: 'tok', 'aria-pressed': 'false', onclick: () => { r.on.has(i) ? r.on.delete(i) : r.on.add(i); paint(r); save(); } }, t); r.btns.push(b); return b; });
      r.sel = h('select', { class: 'inp sel', 'aria-label': 'Tense for sentence ' + s.label, onchange: () => { r.sel.classList.remove('ok', 'bad'); save(); } }, h('option', { value: '' }, 'Tense…'), it.tenses.map((t, i) => h('option', { value: i }, t)));
      rows.push(r);
      return h('div', { class: 'ul-row' }, h('b', { class: 'ul-l' }, s.label), h('div', { class: 'ul-toks' }, toks), r.sel);
    }));
    function paint(r) { r.btns.forEach((b, i) => { b.classList.toggle('on', r.on.has(i)); b.setAttribute('aria-pressed', String(r.on.has(i))); b.classList.remove('ok', 'bad', 'miss'); }); }
    return {
      el,
      check: () => { let s = 0; rows.forEach(r => {
        const want = new Set(r.s.verbs); const vOk = want.size === r.on.size && [...want].every(i => r.on.has(i));
        r.btns.forEach((b, i) => { b.classList.remove('ok', 'bad', 'miss'); if (r.on.has(i)) b.classList.add(want.has(i) ? 'ok' : 'bad'); else if (want.has(i) && !vOk) b.classList.add('miss'); });
        const tOk = r.sel.value !== '' && +r.sel.value === r.s.tense; r.sel.classList.toggle('ok', tOk); r.sel.classList.toggle('bad', !tOk);
        r.vOk = vOk; r.tOk = tOk; s += (vOk ? 1 : 0) + (tOk ? 1 : 0); }); return { score: s, max: rows.length * 2, note: 'По 1 баллу за глагол и за время в каждом предложении.' }; },
      retry: () => rows.forEach(r => { if (!r.vOk) { r.on.clear(); paint(r); } if (!r.tOk) { r.sel.value = ''; r.sel.classList.remove('bad'); } }),
      reset: () => rows.forEach(r => { r.on.clear(); paint(r); r.sel.value = ''; r.sel.classList.remove('ok', 'bad'); }),
      key: () => rows.forEach(r => { r.on = new Set(r.s.verbs); paint(r); r.sel.value = r.s.tense; }),
      setState: st => { if (Array.isArray(st)) rows.forEach((r, i) => { if (!st[i]) return; r.on = new Set(st[i].on); r.sel.value = st[i].t; paint(r); }); }
    };
  }

  /* =============== RULE BOX (Ex.8) =============== */
  function RuleBox(it) {
    const sels = []; const save = autosave(it, () => sels.map(s => s.value));
    const el = h('div', { class: 'gbox' }, h('div', { class: 'gbox-h' }, it.box),
      it.rules.map(r => { const s = h('select', { class: 'inp sel', 'aria-label': 'Rule ' + r.n, onchange: () => { s.classList.remove('ok', 'bad'); save(); } }, h('option', { value: '' }, '…'), it.options.map(o => h('option', { value: o }, o))); s._a = r.a; sels.push(s);
        return h('div', { class: 'gbox-r' }, h('div', null, h('b', null, r.n + ' '), 'We use the ', s, ':'), h('ul', null, r.uses.map(u => h('li', null, u)))); }),
      h('div', { class: 'gbox-f' }, it.practice));
    return {
      el,
      check: () => { let sc = 0; sels.forEach(s => { const ok = s.value === s._a; s.classList.toggle('ok', ok); s.classList.toggle('bad', !ok); s._ok = ok; if (ok) sc++; }); return { score: sc, max: sels.length }; },
      retry: () => sels.forEach(s => { if (!s._ok) { s.value = ''; s.classList.remove('bad'); } }),
      reset: () => sels.forEach(s => { s.value = ''; s.classList.remove('ok', 'bad'); }),
      key: () => sels.forEach(s => { s.value = s._a; }),
      setState: st => { if (Array.isArray(st)) sels.forEach((s, i) => { s.value = st[i] || ''; }); }
    };
  }

  /* =============== MATCH (select-based, touch friendly) =============== */
  function Match(it) {
    const sels = []; const save = autosave(it, () => sels.map(s => s.value));
    const el = h('div', { class: 'match' },
      h('ul', { class: 'match-r' }, it.right.map(r => h('li', null, r))),
      h('div', { class: 'match-l' }, it.left.map((l, i) => { const s = h('select', { class: 'inp sel', 'aria-label': l, onchange: () => { s.classList.remove('ok', 'bad'); save(); } }, h('option', { value: '' }, '—'), it.rightShort.map((r, ri) => h('option', { value: ri }, r))); s._a = it.answers[i]; sels.push(s); return h('label', { class: 'match-row' }, h('span', null, l), s); })));
    return {
      el,
      check: () => { let sc = 0; sels.forEach(s => { const ok = s.value !== '' && +s.value === s._a; s._ok = ok; s.classList.toggle('ok', ok); s.classList.toggle('bad', !ok); if (ok) sc++; }); return { score: sc, max: sels.length }; },
      retry: () => sels.forEach(s => { if (!s._ok) { s.value = ''; s.classList.remove('bad'); } }),
      reset: () => sels.forEach(s => { s.value = ''; s.classList.remove('ok', 'bad'); }),
      key: () => sels.forEach(s => { s.value = s._a; }),
      setState: st => { if (Array.isArray(st)) sels.forEach((s, i) => { s.value = st[i] == null ? '' : st[i]; }); }
    };
  }

  /* =============== ORDER / WRITE QUESTIONS (Ex.12) =============== */
  function Order(it) {
    const rows = []; const save = autosave(it, () => rows.map(r => [r.inp.value, r.ans.value]));
    const el = h('ol', { class: 'order' + (it.items.some(x => x.img) ? ' with-img' : '') }, it.items.map((x, i) => {
      const inp = h('input', { class: 'inp', type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': (it.ph || 'Sentence') + ' ' + (i + 1), placeholder: it.ph || 'Write the question…' });
      const ans = it.noAns ? h('input', { type: 'hidden' }) : h('input', { class: 'inp ans', type: 'text', placeholder: 'Your answer (ask & answer)', 'aria-label': 'Answer ' + (i + 1) });
      inp.addEventListener('input', () => { inp.classList.remove('ok', 'bad', 'close'); save(); }); ans.addEventListener('input', save);
      const r = { x, inp, ans }; rows.push(r);
      return h('li', null, x.img ? h('button', { class: 'ord-img fzoom', 'aria-label': 'Увеличить картинку ' + (i + 1), onclick: () => Lightbox(x.img, x.cue) }, h('img', { src: x.img, alt: x.cue, loading: 'lazy', width: 400, height: 300 })) : null, h('div', { class: 'ord-main' }, h('div', { class: 'cue' }, x.cue), inp, it.noAns ? null : ans));
    }));
    return {
      el,
      check: () => { let s = 0; rows.forEach(r => { const ok = matches(r.inp.value, r.x.a, it.strict ? { strict: true } : null); r.ok = ok; r.inp.classList.toggle('ok', ok); r.inp.classList.toggle('bad', !ok); r.inp.classList.toggle('close', !ok && closeTo(r.inp.value, r.x.a)); if (ok) s++; }); return { score: s, max: rows.length, note: it.noAns ? 'Проверяются время, порядок слов и орфография.' : 'Проверяются порядок слов, время и орфография. Ответы на вопросы — устно.' }; },
      retry: () => rows.forEach(r => { if (!r.ok) { r.inp.value = ''; r.inp.classList.remove('bad', 'close'); } }),
      reset: () => rows.forEach(r => { r.inp.value = ''; r.ans.value = ''; r.inp.classList.remove('ok', 'bad', 'close'); }),
      key: () => rows.forEach(r => { r.inp.value = r.x.a[0]; }),
      setState: st => { if (Array.isArray(st)) rows.forEach((r, i) => { if (st[i]) { r.inp.value = st[i][0] || ''; r.ans.value = st[i][1] || ''; } }); }
    };
  }

  /* =============== RANK (opener Ex.3) =============== */
  function Rank(it) {
    let rank = {}; const btnRows = [];
    const save = () => Store.saveState(it.id, { rank });
    const el = h('div', { class: 'rank' }, it.options.map(o => {
      const btns = [1, 2, 3].map(n => h('button', { class: 'rk', 'aria-pressed': 'false', 'aria-label': o + ' — ' + n, onclick: () => { Object.keys(rank).forEach(k => { if (rank[k] === n) delete rank[k]; }); if (rank[o] === n) delete rank[o]; else rank[o] = n; paint(); save(); } }, n));
      btnRows.push({ o, btns });
      return h('div', { class: 'rk-row' }, h('span', { class: 'rk-w' }, '___ ' + o), h('span', { class: 'rk-bs' }, btns));
    }), h('p', { class: 'muted small' }, 'Нажми 1, 2 или 3 рядом со способом общения. Каждый номер — только один раз.'));
    function paint() { btnRows.forEach(r => r.btns.forEach((b, i) => { const on = rank[r.o] === i + 1; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); })); }
    return {
      el, done: () => { if (Object.keys(rank).length < 3) { toast('Выбери три способа: 1, 2 и 3'); return; } Store.markDone(it.id); }, doneLabel: 'Done — compare with tutor',
      reset: () => { rank = {}; paint(); },
      setState: s => { if (s && s.rank) { rank = s.rank; paint(); } }
    };
  }

  /* =============== DISCUSS / SPEAKING =============== */
  function Discuss(it) {
    const parts = []; const fields = []; let chosen = new Set();
    const save = () => Store.saveState(it.id, { f: fields.map(f => f.value), c: [...chosen] });
    if (it.model) parts.push(h('div', { class: 'bubble' }, '“' + it.model + '”'));
    if (it.choose) {
      const chips = it.choose.from.map(p => h('button', { class: 'pchip', 'aria-pressed': 'false', onclick: e => { if (chosen.has(p)) chosen.delete(p); else if (chosen.size < it.choose.pick) chosen.add(p); else { toast('Можно выбрать только ' + it.choose.pick); return; } paintC(); save(); } }, p));
      var paintC = () => chips.forEach((c, i) => { const on = chosen.has(it.choose.from[i]); c.classList.toggle('on', on); c.setAttribute('aria-pressed', String(on)); });
      parts.push(h('div', { class: 'pchips' }, h('div', { class: 'muted small' }, 'Choose ' + it.choose.pick + ':'), chips));
    }
    if (it.prompts) parts.push(h('ul', { class: 'prompts' }, it.prompts.map((p, i) => {
      const f = it.answerFields || it.prompts.length > 0 ? h('textarea', { class: 'inp', rows: 2, placeholder: 'Notes / key words (optional)…', 'aria-label': p }) : null;
      if (f) { fields.push(f); f.addEventListener('input', () => { clearTimeout(f._t); f._t = setTimeout(save, 300); }); }
      return h('li', null, h('span', { class: 'pq' }, p), f);
    })));
    return {
      el: h('div', { class: 'discuss' }, parts),
      done: () => Store.markDone(it.id), doneLabel: 'Mark as done ✓',
      reset: () => { fields.forEach(f => f.value = ''); chosen = new Set(); paintC && paintC(); },
      setState: s => { if (!s) return; (s.f || []).forEach((v, i) => { if (fields[i]) fields[i].value = v; }); if (s.c) { chosen = new Set(s.c); paintC && paintC(); } }
    };
  }

  /* =============== OGE INTERVIEW with 40s timer =============== */
  function Interview(it) {
    let i = 0, left = it.seconds, timer = null; let ticks = it.questions.map(() => it.checklist.map(() => false));
    const qEl = h('div', { class: 'iv-q', 'aria-live': 'polite' });
    const tEl = h('div', { class: 'iv-t' }); const ring = h('div', { class: 'iv-ring' }, tEl);
    const nEl = h('div', { class: 'iv-n' });
    const chk = h('div', { class: 'iv-chk tutor-only' });
    const lbl = 'Start ' + it.seconds + ' s'; const start = h('button', { class: 'btn primary', onclick: () => run() }, lbl);
    const prepB = it.prep ? h('button', { class: 'btn ghost', onclick: () => { stop(); left = it.prep; paintT(); start.textContent = 'Stop'; ring.classList.remove('over'); timer = setInterval(() => { left--; tEl.textContent = left + 's'; ring.style.setProperty('--p', (1 - left / it.prep) * 360 + 'deg'); if (left <= 0) { stop(); toast('Подготовка окончена — читайте!'); } }, 1000); } }, 'Prep ' + it.prep + ' s') : null;
    const prev = h('button', { class: 'btn ghost', onclick: () => go(i - 1) }, '← Prev');
    const next = h('button', { class: 'btn ghost', onclick: () => go(i + 1) }, 'Next →');
    function stop() { clearInterval(timer); timer = null; start.textContent = lbl; }
    function run() { if (timer) { stop(); return; } left = it.seconds; paintT(); start.textContent = 'Stop'; timer = setInterval(() => { left--; paintT(); if (left <= 0) { stop(); ring.classList.add('over'); toast('Time is up!'); } }, 1000); }
    function paintT() { tEl.textContent = left + 's'; ring.style.setProperty('--p', (1 - left / it.seconds) * 360 + 'deg'); ring.classList.toggle('warn', left <= 10 && left > 0); }
    function go(n) { if (n < 0 || n >= it.questions.length) return; stop(); i = n; left = it.seconds; ring.classList.remove('over'); paint(); }
    if (it.read) qEl.classList.add('read');
    function paint() {
      qEl.textContent = it.questions[i]; nEl.textContent = it.read ? (it.prep ? 'Подготовка ' + it.prep + ' с, затем чтение ' + it.seconds + ' с' : '') : 'Question ' + (i + 1) + ' / ' + it.questions.length; paintT();
      chk.innerHTML = ''; chk.append(h('div', { class: 'muted small' }, 'Tutor checklist:'), it.checklist.map((c, ci) => h('label', { class: 'cb' }, h('input', { type: 'checkbox', checked: ticks[i][ci] || null, onchange: e => { ticks[i][ci] = e.target.checked; Store.saveState(it.id, { ticks }); } }), c)));
    }
    paint();
    return {
      el: h('div', { class: 'iv' }, h('div', { class: 'iv-top' }, nEl, ring), qEl, h('div', { class: 'row' }, it.read ? null : prev, prepB, start, it.read ? null : next), chk),
      done: () => { const tot = ticks.length * it.checklist.length; const sc = ticks.flat().filter(Boolean).length; Store.record(it.id, sc, tot, { tutorScored: true }); toast('Сохранено: ' + sc + ' / ' + tot + ' пунктов чек-листа'); }, doneLabel: 'Save tutor checklist',
      reset: () => { ticks = it.questions.map(() => it.checklist.map(() => false)); go(0); },
      setState: s => { if (s && s.ticks) { ticks = s.ticks; paint(); } }
    };
  }

  /* =============== WRITING (OGE email) =============== */
  function Writing(it) {
    const ta = h('textarea', { class: 'inp write', rows: 12, 'aria-label': it.aria || 'Your text', placeholder: it.ph || '' });
    const wc = h('div', { class: 'wc' });
    const allChecks = [
      ['Объём ' + it.min + '–' + it.max + ' слов', t => { const n = words(t); return n >= (it.min || 1) && n <= (it.max || 9999); }],
      ['Обращение (Dear / Hi / Hello …,)', t => /^\s*(dear|hi|hello)\b/i.test(t)],
      ['Благодарность за письмо', t => /\bthank(s| you)\b/i.test(t)],
      ['Надежда на дальнейший контакт', t => /(write (back|soon)|hope to hear|look(ing)? forward|keep in touch|hear from you)/i.test(t)],
      ['Завершающая фраза (Best wishes / Love / Take care…)', t => /(best wishes|love,|take care|all the best|best regards|yours|bye for now|see you)/i.test(t)],
      ['Подпись (имя последней строкой)', t => { const ls = t.trim().split(/\n+/); const last = (ls[ls.length - 1] || '').trim(); return ls.length > 1 && /^[A-ZА-ЯЁ][\p{L}-]{1,20}$/u.test(last); }],
      ['Есть абзацы (минимум 4 блока)', t => t.trim().split(/\n\s*\n/).length >= 4]
    ];
    if (it.min) allChecks[0][0] = 'Объём ' + it.min + '–' + it.max + ' слов';
    const checks = it.checks === false ? (it.min ? [allChecks[0]] : []) : allChecks;
    const list = h('ul', { class: 'fchecks' });
    function words(t) { return (t.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length; }
    function paint() { const t = ta.value; const n = words(t); wc.textContent = n + ' words'; const lo = it.min || (it.target && it.target[0]), hi = it.max || (it.target && it.target[1]); wc.textContent = n + ' words' + (lo ? ' · цель ≈ ' + (it.target ? it.target[2] || lo + '–' + hi : lo + '–' + hi) : ''); wc.className = 'wc ' + (n === 0 || !lo ? '' : n < lo ? 'low' : n > hi ? 'high' : 'ok'); list.innerHTML = ''; checks.forEach(([l, f]) => list.appendChild(h('li', { class: f(t) ? 'ok' : '' }, (f(t) ? '✓ ' : '○ ') + l))); }
    ta.addEventListener('input', () => { paint(); clearTimeout(ta._t); ta._t = setTimeout(() => Store.saveState(it.id, ta.value), 300); });
    const crit = !it.criteria ? null : h('div', { class: 'crit tutor-only' }, h('div', { class: 'muted small' }, it.critTitle || 'Оценка учителя по критериям ФИПИ:'), it.criteria.map((c, ci) => h('label', { class: 'crit-r' }, h('span', null, c), h('select', { class: 'inp sel', onchange: e => { const ex = Store.ex(it.id); ex.crit = ex.crit || []; ex.crit[ci] = e.target.value; Store.save(); } }, ['—', 'не выполнено', 'частично', 'полностью'].map(o => h('option', null, o))))));
    paint();
    return {
      el: h('div', { class: 'writing' }, it.letter ? h('blockquote', { class: 'letter', html: Array.isArray(it.letter) ? it.letter.map(l => '<p>' + md(l) + '</p>').join('') : md(it.letter) }) : null, it.task ? h('p', { class: 'task' }, it.task) : null, it.bullets ? h('ul', { class: 'wbul' }, it.bullets.map(b => h('li', null, b))) : null, ta, h('div', { class: 'wbar' }, wc, h('span', { class: 'muted small' }, 'Сайт считает только слова. Содержание и язык оценивает учитель — ответ не «проверен системой».')), list, it.criteria ? crit : null, it.model ? h('details', { class: 'tutor-only model-ans' }, h('summary', null, 'Model answer'), h('div', { html: it.model })) : null),
      check: checks.length ? () => { const t = ta.value; const sc = checks.filter(([, f]) => f(t)).length; return { score: sc, max: checks.length, note: 'Формальные признаки письма.' }; } : null,
      done: checks.length ? null : () => Store.markDone(it.id), doneLabel: 'Готово — показать учителю',
      reset: () => { ta.value = ''; paint(); },
      setState: s => { if (typeof s === 'string') { ta.value = s; paint(); } }
    };
  }

  /* =============== LESSON REVIEW =============== */
  function Review(it) {
    let marks = {};
    const levels = [['😕', 'not yet'], ['🙂', 'almost'], ['😃', 'yes!']];
    const rows = it.cando.map((c, ci) => { const btns = levels.map(([e, l], li) => h('button', { class: 'lv', 'aria-pressed': 'false', 'aria-label': c + ' — ' + l, title: l, onclick: () => { marks[ci] = li; paint(); Store.saveState(it.id, marks); } }, e)); return { btns, el: h('li', null, h('span', null, c), h('span', { class: 'lvs' }, btns)) }; });
    function paint() { rows.forEach((r, ci) => r.btns.forEach((b, li) => { b.classList.toggle('on', marks[ci] === li); b.setAttribute('aria-pressed', String(marks[ci] === li)); })); }
    return {
      el: h('div', { class: 'review' }, h('ul', { class: 'cando' }, rows.map(r => r.el))),
      done: () => { const sc = Object.values(marks).reduce((a, b) => a + b, 0); Store.record(it.id, sc, it.cando.length * 2, { self: true }); }, doneLabel: 'Save self-assessment',
      reset: () => { marks = {}; paint(); }, setState: s => { if (s) { marks = s; paint(); } }
    };
  }

  /* =============== SORT: разложить слова по группам =============== */
  function Sort(it) {
    const rows = []; const save = autosave(it, () => rows.map(r => r.sel));
    const el = h('div', { class: 'sort' },
      h('div', { class: 'sort-cats', 'aria-hidden': 'true' }, it.cats.map((c, i) => h('span', { class: 'sc c' + i }, c))),
      h('ul', { class: 'sort-list' }, it.words.map(w => {
        const r = { w, sel: null, btns: [] };
        const btns = it.cats.map((c, ci) => { const b = h('button', { class: 'sc-b c' + ci, 'aria-pressed': 'false', 'aria-label': w.w + ' — ' + c, onclick: () => { r.sel = r.sel === ci ? null : ci; paint(r); save(); } }, c); r.btns.push(b); return b; });
        rows.push(r);
        return h('li', null, h('b', { class: 'sw' }, w.w), h('span', { class: 'sc-bs', role: 'group', 'aria-label': w.w }, btns));
      })));
    function paint(r) { r.btns.forEach((b, i) => { b.classList.toggle('on', i === r.sel); b.setAttribute('aria-pressed', String(i === r.sel)); b.classList.remove('ok', 'bad'); }); }
    return {
      el,
      check: () => { let s = 0; rows.forEach(r => { r.btns.forEach(b => b.classList.remove('ok', 'bad')); r.ok = r.sel != null && [].concat(r.w.c).includes(r.sel); if (r.ok) s++; if (r.sel != null) r.btns[r.sel].classList.add(r.ok ? 'ok' : 'bad'); }); return { score: s, max: rows.length }; },
      retry: () => rows.forEach(r => { if (!r.ok) { r.sel = null; paint(r); } }),
      reset: () => rows.forEach(r => { r.sel = null; paint(r); }),
      key: () => rows.forEach(r => { r.sel = [].concat(r.w.c)[0]; paint(r); r.btns[r.sel].classList.add('ok'); }),
      setState: s => { if (Array.isArray(s)) rows.forEach((r, i) => { r.sel = s[i] == null ? null : s[i]; paint(r); }); }
    };
  }

  /* =============== GRID: отметить все подходящие клетки (тема ↔ вопрос) =============== */
  function Grid(it) {
    const cells = []; let on = new Set();
    const save = () => Store.saveState(it.id, [...on]);
    const want = new Set(); it.rows.forEach((r, ri) => r.a.forEach(c => want.add(ri + ':' + c)));
    const el = h('div', { class: 'gridx-wrap' }, h('table', { class: 'gridx' },
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, it.corner || ''), it.cols.map(c => h('th', { scope: 'col' }, c)))),
      h('tbody', null, it.rows.map((r, ri) => h('tr', null, h('th', { scope: 'row' }, r.t), it.cols.map((c, ci) => {
        const k = ri + ':' + ci; const b = h('button', { class: 'gx', 'aria-pressed': 'false', 'aria-label': r.t + ' — ' + c, onclick: () => { on.has(k) ? on.delete(k) : on.add(k); paint(); save(); } }); cells.push([k, b]);
        return h('td', null, b);
      }))))));
    function paint() { cells.forEach(([k, b]) => { b.classList.toggle('on', on.has(k)); b.setAttribute('aria-pressed', String(on.has(k))); b.classList.remove('ok', 'bad', 'miss'); b.textContent = on.has(k) ? '✓' : ''; }); }
    return {
      el,
      check: () => { paint(); let s = 0; cells.forEach(([k, b]) => { if (on.has(k) && want.has(k)) { s++; b.classList.add('ok'); } else if (on.has(k)) { s--; b.classList.add('bad'); } else if (want.has(k)) b.classList.add('miss'); }); return { score: Math.max(0, s), max: want.size, note: 'Лишняя отметка = −1. Пунктир — пропущенная отметка.' }; },
      retry: () => { on = new Set([...on].filter(k => want.has(k))); paint(); },
      reset: () => { on.clear(); paint(); }, key: () => { on = new Set(want); paint(); },
      setState: st => { if (Array.isArray(st)) { on = new Set(st); paint(); } }
    };
  }

  /* =============== TICK OR FIX: верно ✓ или исправь =============== */
  function TickFix(it) {
    const rows = []; const save = autosave(it, () => rows.map(r => [r.tick, r.inp.value]));
    const el = h('ol', { class: 'tickfix' }, it.items.map((x, i) => {
      const r = { x, tick: false };
      r.btn = h('button', { class: 'tf-tick', 'aria-pressed': 'false', 'aria-label': 'Предложение ' + (i + 1) + ' верно', onclick: () => { r.tick = !r.tick; if (r.tick) r.inp.value = ''; paint(r); save(); } }, '✓');
      r.inp = h('input', { class: 'inp', type: 'text', autocomplete: 'off', spellcheck: 'false', placeholder: 'correction', 'aria-label': 'Исправление ' + (i + 1) });
      r.inp.addEventListener('input', () => { if (r.inp.value) r.tick = false; paint(r); save(); });
      rows.push(r);
      return h('li', null, h('span', { class: 'tf-s', html: md(x.s) }), h('span', { class: 'tf-ctl' }, r.btn, h('span', { class: 'muted small' }, 'или'), r.inp));
    }));
    function paint(r) { r.btn.classList.toggle('on', r.tick); r.btn.setAttribute('aria-pressed', String(r.tick)); r.btn.classList.remove('ok', 'bad'); r.inp.classList.remove('ok', 'bad', 'close'); }
    return {
      el,
      check: () => { let s = 0; rows.forEach(r => { paint(r); r.ok = r.x.ok ? r.tick : matches(r.inp.value, r.x.a); if (r.ok) s++; if (r.x.ok) { r.btn.classList.add(r.ok ? 'ok' : 'bad'); if (!r.ok && r.inp.value) r.inp.classList.add('bad'); } else { r.inp.classList.add(r.ok ? 'ok' : 'bad'); if (r.tick) r.btn.classList.add('bad'); if (!r.ok && closeTo(r.inp.value, r.x.a)) r.inp.classList.add('close'); } }); return { score: s, max: rows.length }; },
      retry: () => rows.forEach(r => { if (!r.ok) { r.tick = false; r.inp.value = ''; paint(r); } }),
      reset: () => rows.forEach(r => { r.tick = false; r.inp.value = ''; paint(r); }),
      key: () => rows.forEach(r => { r.tick = !!r.x.ok; r.inp.value = r.x.ok ? '' : r.x.a[0]; paint(r); (r.x.ok ? r.btn : r.inp).classList.add('ok'); }),
      setState: st => { if (Array.isArray(st)) rows.forEach((r, i) => { if (st[i]) { r.tick = !!st[i][0]; r.inp.value = st[i][1] || ''; paint(r); } }); }
    };
  }

  /* =============== DRAW: рисунок во время прослушивания =============== */
  function Draw(it) {
    const cv = h('canvas', { class: 'pad', width: 900, height: 560, 'aria-label': 'Поле для рисунка. Рисуйте мышью, пальцем или стилусом.' });
    const ctx = cv.getContext('2d'); let drawing = false, color = '#16161D', size = 4;
    const fill = () => { ctx.fillStyle = '#FFFDF8'; ctx.fillRect(0, 0, cv.width, cv.height); };
    fill();
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; };
    cv.addEventListener('pointerdown', e => { drawing = true; cv.setPointerCapture(e.pointerId); const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + .1, y + .1); ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); });
    cv.addEventListener('pointermove', e => { if (!drawing) return; const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); });
    const end = () => { if (!drawing) return; drawing = false; try { Store.saveState(it.id, cv.toDataURL('image/webp', .6)); } catch (e) { /* storage full */ } };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    const colors = ['#16161D', '#E0262F', '#3DAA82', '#3D3BFF', '#FF7A00', '#FFFDF8'];
    const sw = colors.map((c, i) => h('button', { class: 'pad-c' + (i === 0 ? ' on' : ''), style: { background: c }, 'aria-label': i === 5 ? 'Ластик' : 'Цвет ' + (i + 1), title: i === 5 ? 'Ластик' : null, onclick: e => { color = c; size = i === 5 ? 22 : 4; sw.forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); } }, i === 5 ? '⌫' : ''));
    const photo = it.reveal ? h('figure', { class: 'bfig pad-photo', hidden: true }, h('img', { src: it.reveal.src, alt: it.reveal.alt, loading: 'lazy' }), h('figcaption', null, it.reveal.cap)) : null;
    const showBtn = it.reveal ? h('button', { class: 'btn ghost', onclick: () => { photo.hidden = !photo.hidden; showBtn.textContent = photo.hidden ? '👀 Сравнить с фото' : 'Скрыть фото'; } }, '👀 Сравнить с фото') : null;
    if (showBtn) showBtn.hidden = !Store.ex(it.id).done;
    return {
      el: h('div', { class: 'draw' }, h('div', { class: 'pad-tools' }, sw), cv, h('div', { class: 'row' }, showBtn), photo),
      done: () => { Store.markDone(it.id); if (showBtn) showBtn.hidden = false; }, doneLabel: 'Рисунок готов ✓',
      reset: () => { fill(); },
      setState: s => { if (typeof s === 'string' && s.startsWith('data:image')) { const im = new Image(); im.onload = () => ctx.drawImage(im, 0, 0, cv.width, cv.height); im.src = s; } }
    };
  }

  /* =============== PLAN: таблица-план (Writing) =============== */
  function Plan(it) {
    const tas = []; const save = autosave(it, () => tas.map(t => t.value));
    const el = h('div', { class: 'wtable-wrap' }, h('table', { class: 'wtable plan' },
      h('thead', null, h('tr', null, ['Part', 'Purpose', 'Useful phrases', 'My notes'].map(t => h('th', null, t)))),
      h('tbody', null, it.rows.map((r, i) => { const ta = h('textarea', { class: 'inp', rows: 3, 'aria-label': r.part + ' — my notes' }); ta.addEventListener('input', save); tas.push(ta);
        return h('tr', null, h('th', { scope: 'row' }, r.part), h('td', null, r.purpose), h('td', { html: r.phrases.map(md).join('<br>') }), h('td', null, ta)); }))));
    return { el, done: () => Store.markDone(it.id), doneLabel: 'План готов ✓', reset: () => tas.forEach(t => t.value = ''), setState: s => { if (Array.isArray(s)) tas.forEach((t, i) => { t.value = s[i] || ''; }); } };
  }

  /* =============== Factory =============== */
  const MAP = { sort: Sort, grid: Grid, tickfix: TickFix, draw: Draw, plan: Plan, gaps: Gaps, mcq: MCQ, open: Open, listen: Listen, inline: Inline, underline: Underline, rulebox: RuleBox, match: Match, order: Order, rank: Rank, discuss: Discuss, interview: Interview, writing: Writing, review: Review, tapfind: TapFind, multi: Multi, checklist: Checklist, scores: Scores, reference: Reference };
  function render(it) {
    const api = MAP[it.type](it);
    // keyless tutor-scored items get a dedicated button
    const card = Card(it, api.el, api);
    if (api.tutorSave) {
      const b = h('button', { class: 'btn primary', onclick: () => { const r = api.tutorSave(); if (r) card._show(r); } }, 'Save tutor marks');
      card.querySelector('.ex-tools').prepend(b);
      card.querySelector('.ex-tools').prepend(h('span', { class: 'keyless' }, 'Ключ не опубликован на странице — учитель отмечает ✓/✗.'));
    }
    const st = Store.ex(it.id).state; if (st != null && api.setState) { try { api.setState(st); } catch (e) { /* stale state */ } }
    return card;
  }

  window.Exercises = { render, AudioPlayer };
})();
