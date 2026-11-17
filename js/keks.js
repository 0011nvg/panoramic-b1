/* ========== KEKS: кот-компаньон ==========
   Сидит в правом нижнем углу и реагирует на учёбу: объясняет новый тип задания (один раз),
   радуется 100 %, поддерживает после ошибок и предлагает подсказку, сообщает о миссиях и значках,
   иногда предлагает бонус-раунд по сложным словам, поздравляет с завершением урока.
   Не перекрывает задания: короткие реплики, закрываются сами; «Тихий режим» — только важные события;
   в режиме доски (Board) скрыт полностью. */
(function () {
  'use strict';
  const { h, LS, Store, shuffle } = Core;
  const { SRS, Runner } = Vocab;

  const quiet = () => !!LS.get('keksQuiet', false);
  const board = () => document.documentElement.classList.contains('board');
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const LINES = {
    perfect: ['Purr-fect!', 'Spot on!', 'Nailed it!', '100% — clever human!', 'Brilliant!', 'Paws up — all correct!'],
    good: ['Almost there — check the red ones and try again.', 'So close! Fix one or two and press Check again.', 'Good work! A little polish and it’s three stars.'],
    low: ['Mistakes are how we learn. Let’s look again.', 'Take your time — read each sentence once more.', 'No worries. Look at the red answers, then Check again.'],
    fixed: ['You fixed it! That’s real learning.', 'From mistakes to 100%. Respect! 🐾', 'See? Second try, full marks.'],
    streak: ['Three perfect in a row! 🔥', 'You’re on fire! 🔥', 'Hat-trick! Three times 100%.'],
    hello: ['Hi! Ready for something new today?', 'Meow! What shall we learn today?', 'Welcome back! I saved you a seat.'],
    mastered: ['New word in your long-term memory: ', 'This one is yours now: ']
  };
  /* Как работает задание — объясняется один раз для каждого типа */
  const TIPS = {
    gaps: 'Впиши ответ в пропуск. Регистр, лишние пробелы и сокращения (don’t = do not) не считаются ошибкой. Оранжевая рамка = почти верно, проверь орфографию.',
    mcq: 'Выбери один вариант в каждом вопросе и нажми Check Answers. Ошибся — Try Again: лучшая попытка сохраняется.',
    inline: 'Нажимай на правильный вариант прямо в предложении.',
    match: 'Подбери пару из списка для каждой строки.',
    underline: 'Нажимай на слова в тексте, чтобы выделить их. Лишнее выделение = −1, будь внимателен.',
    tapfind: 'Нажимай на слова в тексте, чтобы выделить их. Лишнее выделение = −1, будь внимателен.',
    multi: 'Отметь все подходящие варианты. Каждый лишний = −1.',
    order: 'Напиши предложение целиком. Проверяются порядок слов, время и орфография.',
    rulebox: 'Дополни правило: выбери вариант в каждом окошке. Потом правило пригодится в следующих заданиях.',
    open: 'Ответь своими словами. Автопроверки нет — учитель отметит ✓/✗ по ключу.',
    discuss: 'Задание на говорение. Запиши ключевые слова, расскажи учителю и нажми Mark as done.',
    rank: 'Расставь 1, 2, 3 и объясни свой выбор учителю.',
    writing: 'Пиши прямо в поле — счётчик слов и чек-лист обновляются сразу.',
    interview: 'Запусти таймер и отвечай вслух. Чек-лист отмечает учитель.',
    review: 'Оцени себя честно: так мы поймём, что повторить.',
    scores: 'Поставь баллы от 0 до 10 и сохрани.',
    checklist: 'Отметь пункты, которые уже сделал.',
    reference: 'Прочитай правило или рамку и нажми кнопку внизу. Сюда можно вернуться в любой момент.'
  };
  const LISTEN_TIP = 'Перед прослушиванием прочитай вопросы. Транскрипт откроется после проверки — используй его, чтобы найти ответы, которые не расслышал.';

  /* ---------- DOM ---------- */
  let root, bubble, ava, emo, hideT, lastSay = 0, moodT;
  function build() {
    if (root) return;
    emo = h('span', { class: 'kk-emo', 'aria-hidden': 'true' });
    ava = h('button', { class: 'kk-ava', 'aria-label': 'Кекс — помощник: что дальше?', 'aria-haspopup': 'dialog', onclick: openPanel }, h('img', { src: 'assets/keks-face.webp', alt: '', width: 96, height: 96 }), emo);
    bubble = h('div', { class: 'kk-bubble', role: 'status', 'aria-live': 'polite', hidden: true });
    root = h('aside', { id: 'keks', class: 'keks', 'aria-label': 'Кекс' }, bubble, ava);
    document.body.appendChild(root);
    // на телефоне не мешаем вводу: пока открыта клавиатура, кот прячется
    document.addEventListener('focusin', e => { if (e.target.matches && e.target.matches('input[type=text],textarea')) root.classList.add('typing'); });
    document.addEventListener('focusout', () => root.classList.remove('typing'));
    // любое действие ученика вне реплики закрывает её, если в ней нет кнопок — Кекс не мешает работать
    document.addEventListener('pointerdown', e => { if (!bubble.hidden && !root.contains(e.target) && !bubble.querySelector('.kk-act')) close(); }, true);
  }
  function mood(m, ms) {
    build(); clearTimeout(moodT);
    root.className = 'keks mood-' + m + (root.classList.contains('typing') ? ' typing' : '');
    emo.textContent = ({ happy: '😺', proud: '🏆', think: '🤔', cheer: '🎉', wink: '😉', sleep: '💤' })[m] || '';
    moodT = setTimeout(() => { root.classList.remove('mood-' + m); emo.textContent = ''; }, ms || 1800);
  }
  /* say(text, {mood, actions:[[label, fn, primary]], ttl, important}) */
  function say(text, o) {
    o = o || {}; build();
    if (board()) return;
    if (quiet() && !o.important) { if (o.mood) mood(o.mood); return; }
    const now = Date.now(); if (!o.important && now - lastSay < 3500 && !bubble.hidden) return; lastSay = now;
    clearTimeout(hideT);
    bubble.innerHTML = '';
    bubble.append(...[h('button', { class: 'kk-x', 'aria-label': 'Закрыть', onclick: close }, '×'),
      o.title ? h('b', { class: 'kk-t' }, o.title) : null, h('p', null, text),
      o.actions && o.actions.length ? h('div', { class: 'kk-act' }, o.actions.map(([l, fn, pr]) => h('button', { class: 'btn sm ' + (pr ? 'primary' : 'ghost'), onclick: () => { close(); fn && fn(); } }, l))) : null].filter(Boolean));
    bubble.hidden = false; bubble.classList.remove('in'); void bubble.offsetWidth; bubble.classList.add('in');
    if (o.mood) mood(o.mood, 2400);
    const ttl = o.ttl === 0 ? 0 : (o.ttl || (o.actions ? 12000 : 5200));
    if (ttl) hideT = setTimeout(close, ttl);
  }
  function close() { if (bubble) bubble.hidden = true; clearTimeout(hideT); }

  /* ---------- confetti ---------- */
  function confetti(n) {
    if (reduced() || board()) return;
    const c = ['#3D3BFF', '#FF4FA3', '#FFD400', '#FF7A00', '#16161D'];
    const box = h('div', { class: 'confetti', 'aria-hidden': 'true' });
    for (let i = 0; i < (n || 40); i++) box.appendChild(h('i', { style: { left: Math.random() * 100 + 'vw', background: c[i % c.length], animationDelay: Math.random() * .4 + 's', transform: 'rotate(' + Math.random() * 360 + 'deg)' } }));
    document.body.appendChild(box); setTimeout(() => box.remove(), 2600);
  }

  /* ---------- what to do next (for the panel and the home page) ---------- */
  function suggestions() {
    const out = []; const words = VOCAB; const hard = SRS.difficult(words); const due = SRS.due(words);
    if (due.length) out.push({ icon: '⏰', text: due.length + ' слов пора повторить', href: '#/vocab/due/guided', cta: 'Повторить' });
    if (hard.length) out.push({ icon: '🧩', text: hard.length + ' сложных слов', href: '#/vocab/hard/guided', cta: 'Потренировать' });
    const errs = mistakes(); if (errs.length) out.push({ icon: '🛠', text: errs.length + ' заданий с ошибками можно исправить до ★★★', href: '#/revision', cta: 'Исправить' });
    return out;
  }
  function mistakes() {
    const d = Store.data(); const out = [];
    BOOK.units.forEach(u => u.lessons.forEach(id => Core.allItems(id).forEach(it => { const e = d.ex[it.id]; if (e && e.max && !e.self && e.best != null && e.best < 1 && Core.gradable(it)) out.push([id, it, e]); })));
    return out;
  }

  function openPanel() {
    build(); if (board()) return;
    const g = Game.G(); const L = Game.level(); const s = suggestions();
    clearTimeout(hideT); bubble.innerHTML = '';
    bubble.append(...[h('button', { class: 'kk-x', 'aria-label': 'Закрыть', onclick: close }, '×'),
      h('b', { class: 'kk-t' }, 'Level ' + L.i + ' · ' + L.name),
      h('div', { class: 'kk-xp' }, h('i', { style: { width: L.pct + '%' } })),
      h('p', { class: 'small muted' }, L.next ? (L.to - L.xp) + ' XP до уровня ' + L.next : 'Максимальный уровень!', Game.streak() ? ' · 🔥 ' + Game.streak() + ' дн. подряд' : ''),
      s.length ? h('ul', { class: 'kk-sug' }, s.map(x => h('li', null, h('span', null, x.icon + ' ' + x.text), h('a', { class: 'btn sm primary', href: x.href, onclick: close }, x.cta)))) : h('p', null, 'Всё повторено! Можно идти дальше по урокам.'),
      h('div', { class: 'kk-act' },
        bonusWords().length >= 3 ? h('button', { class: 'btn sm ghost', onclick: () => { close(); bonus(); } }, '🎁 Bonus round') : null,
        h('button', { class: 'btn sm ghost', 'aria-pressed': String(quiet()), onclick: () => { LS.set('keksQuiet', !quiet()); close(); Core.toast(quiet() ? 'Кекс в тихом режиме: только важные события' : 'Кекс снова комментирует'); mood(quiet() ? 'sleep' : 'wink'); } }, quiet() ? '🔔 Разговорчивый' : '🔕 Тихий режим'))].filter(Boolean));
    bubble.hidden = false; bubble.classList.remove('in'); void bubble.offsetWidth; bubble.classList.add('in');
    void g;
  }

  /* ---------- Bonus round: 5 слов (сложные → пора повторить → слова урока) ---------- */
  function bonusWords() {
    const lesson = (location.hash.match(/^#\/lesson\/([^/]+)/) || [])[1];
    const seen = VOCAB.filter(v => SRS.st(v.w).seen);
    const pool = [].concat(SRS.difficult(VOCAB), SRS.due(VOCAB), lesson ? VOCAB.filter(v => v.lesson === lesson && SRS.st(v.w).seen) : [], seen);
    const out = []; pool.forEach(v => { if (!out.includes(v)) out.push(v); });
    return out.slice(0, 5);
  }
  function bonus() {
    const words = bonusWords(); if (words.length < 3) return;
    const host = h('div', { class: 'run' });
    const done = () => { ov.remove(); document.removeEventListener('keydown', esc); };
    const esc = e => { if (e.key === 'Escape') done(); };
    const ov = h('div', { class: 'modal-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Bonus round' },
      h('div', { class: 'modal wide bonus' }, h('div', { class: 'bonus-h' }, h('img', { src: 'assets/keks-face.webp', alt: '', width: 56, height: 56 }), h('div', null, h('b', null, 'Keks bonus round'), h('div', { class: 'small muted' }, words.length + ' слов по памяти · +3 XP за каждый верный ответ')), h('button', { class: 'kk-x', 'aria-label': 'Закрыть', onclick: done }, '×')), host));
    document.body.appendChild(ov); document.addEventListener('keydown', esc);
    Runner(host, shuffle(words), [].concat(words.map((v, i) => ({ v, k: ['type', 'ctxChoice', 'ctx'][i % 3] }))), { bonus: true, onExit: done, exitLabel: 'Back to the lesson' });
    LS.set('keksBonusAt', Date.now());
  }

  /* ---------- Lesson complete: экран результата ---------- */
  function celebrate(lessonId) {
    const L = LESSONS[lessonId]; const st = Game.lessonStars(lessonId); const ms = Game.missions(lessonId);
    const errs = mistakes().filter(x => x[0] === lessonId);
    const ls = BOOK.units.flatMap(u => u.lessons); const next = ls[ls.indexOf(lessonId) + 1];
    const close = () => { ov.remove(); document.removeEventListener('keydown', esc); };
    const esc = e => { if (e.key === 'Escape') close(); };
    const ov = h('div', { class: 'modal-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Lesson complete' },
      h('div', { class: 'modal wide finish' },
        h('img', { class: 'fin-cat', src: 'assets/keks.webp', alt: 'Кекс', width: 240, height: 210 }),
        h('div', { class: 'eyebrow' }, 'Lesson complete'),
        h('h2', null, L.code + ' · ' + L.title),
        st.max ? h('div', { class: 'fin-stars' }, h('b', null, st.got), ' / ' + st.max + ' ★') : null,
        h('ul', { class: 'fin-ms' }, ms.map(m => h('li', { class: m.done ? 'ok' : null }, h('span', null, m.icon), ' ', m.title, ' ', h('span', { class: 'muted small' }, m.cur + '/' + m.goal)))),
        errs.length ? h('p', null, '🛠 ' + errs.length + ' заданий ещё можно довести до ★★★ — это самый быстрый способ закрепить урок.') : h('p', null, 'Ни одного задания с ошибками. Отличная работа!'),
        h('div', { class: 'row center' },
          VOCAB.some(v => v.lesson === lessonId) ? h('a', { class: 'btn ghost', href: '#/vocab/' + lessonId + '/guided', onclick: close }, 'Train lesson words') : null,
          errs.length ? h('a', { class: 'btn ghost', href: '#/lesson/' + lessonId + '/' + errs[0][1].id, onclick: close }, 'Fix mistakes') : null,
          next ? h('a', { class: 'btn primary', href: '#/lesson/' + next, onclick: close }, 'Next lesson →') : h('button', { class: 'btn primary', onclick: close }, 'Close'))));
    document.body.appendChild(ov); document.addEventListener('keydown', esc);
    confetti(70);
  }

  /* ---------- reactions ---------- */
  let perfectRun = 0, checks = 0;
  document.addEventListener('exercise-scored', e => {
    const d = e.detail; checks++;
    if (d.pct === 1) {
      perfectRun++;
      if (d.fixed) say(pick(LINES.fixed) + (d.xp ? ' +' + d.xp + ' XP' : ''), { mood: 'proud' });
      else if (perfectRun % 3 === 0) { say(pick(LINES.streak), { mood: 'cheer' }); confetti(24); }
      else if (Math.random() < .45) say(pick(LINES.perfect), { mood: 'happy', ttl: 2600 }); else mood('happy');
    } else {
      perfectRun = 0;
      const card = document.getElementById('ex-' + d.id);
      const hintBtn = card && [...card.querySelectorAll('.ex-tools button')].find(b => /Hint/.test(b.textContent));
      say(pick(d.pct >= .7 ? LINES.good : LINES.low), { mood: 'think', actions: hintBtn ? [['💡 Show hint', () => { const hb = card.querySelector('.ex-hint'); if (hb.hidden) hintBtn.click(); hb.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, true]] : null });
    }
    // иногда — бонус-раунд по словам (не чаще раза в 15 минут и только после нескольких заданий)
    if (checks % 4 === 0 && Date.now() - (LS.get('keksBonusAt', 0) || 0) > 15 * 60e3 && bonusWords().length >= 3 && Math.random() < .6) {
      setTimeout(() => say('Хочешь бонус-раунд? 5 слов по памяти, +3 XP за каждое.', { title: '🎁 Bonus round', mood: 'wink', actions: [['Let’s go!', bonus, true], ['Not now', () => LS.set('keksBonusAt', Date.now())]] , important: false }), 2600);
    }
  });
  document.addEventListener('exercise-focus', e => {
    const d = e.detail; const g = Game.G(); const key = d.listen ? 'listen' : d.type;
    if (g.tips[key] || !(TIPS[d.type] || d.listen)) return;
    g.tips[key] = Date.now(); Store.save();
    say(d.listen ? LISTEN_TIP : TIPS[d.type], { title: 'Как это работает', mood: 'wink', ttl: 9000 });
  });
  document.addEventListener('xp', e => { if (e.detail.levelUp) { say('Level ' + e.detail.level.i + ': ' + e.detail.level.name + '!', { title: 'Level up! ⬆', mood: 'cheer', important: true }); confetti(50); } });
  document.addEventListener('mission-complete', e => { const m = e.detail.mission; say(m.icon + ' ' + m.title + ' — done! +' + m.xp + ' XP', { title: 'Mission complete', mood: 'proud' }); });
  document.addEventListener('badge', e => { const b = e.detail; say(b.desc, { title: b.icon + ' New badge: ' + b.name, mood: 'cheer', important: true, ttl: 6500 }); confetti(30); });
  document.addEventListener('lesson-complete', e => setTimeout(() => celebrate(e.detail.lesson), 700));
  document.addEventListener('word-mastered', e => { if (Math.random() < .5) say(pick(LINES.mastered) + '“' + e.detail.w + '”', { mood: 'happy', ttl: 3500 }); });

  // приветствие на главной — один раз за сессию
  function onRoute() {
    build(); close();
    const home = !location.hash || location.hash === '#/';
    let seen = true; if (home) { try { seen = !!sessionStorage.getItem('keksHi'); sessionStorage.setItem('keksHi', '1'); } catch (e) { /* private mode */ } }
    if (home && !seen) {
      const s = suggestions();
      setTimeout(() => say(s.length ? s[0].icon + ' ' + s[0].text + '. Начнём с этого?' : pick(LINES.hello), { mood: 'happy', actions: s.length ? [[s[0].cta, () => { location.hash = s[0].href; }, true]] : null }), 900);
    }
  }
  window.addEventListener('hashchange', onRoute);
  document.addEventListener('DOMContentLoaded', onRoute);

  window.Keks = { say, mood, confetti, bonus, bonusWords, celebrate, suggestions, mistakes, quiet, TIPS };
})();
