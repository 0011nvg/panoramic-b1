/* ========== APP: router + pages ========== */
(function () {
  'use strict';
  const { h, Store, Profiles, Tutor, toast, confirmBox, promptBox, download, allItems, gradable, shuffle } = Core;
  const { SRS, MODES, Runner } = Vocab;
  const main = () => document.getElementById('main');
  const ALL = () => BOOK.units.flatMap(u => u.lessons);
  const UNIT = { get lessons() { return ALL(); } };
  const unitOf = id => BOOK.units.find(u => u.lessons.includes(id));
  const lname = id => { const L = LESSONS[id]; const u = unitOf(id); return (['GR', 'WB'].includes(L.code) || L.kicker === 'Unit opener' ? 'U' + u.num + ' ' : '') + (L.kicker === 'Unit opener' ? 'Opener' : L.code); };
  const unitWordsOf = uid => VOCAB.filter(v => LESSONS[v.lesson] && LESSONS[v.lesson].unit === uid);
  const lessonWords = id => VOCAB.filter(v => v.lesson === id);
  const unitWords = () => VOCAB.slice();

  /* ---------- progress maths ---------- */
  function lessonProgress(id) {
    const items = allItems(id); let done = 0, sc = 0, mx = 0;
    items.forEach(it => { const e = Store.data().ex[it.id]; if (e && e.done) done++; if (e && e.max && gradable(it)) { sc += e.score; mx += e.max; } });
    return { done, total: items.length, pct: Math.round(done / items.length * 100), acc: mx ? Math.round(sc / mx * 100) : null };
  }

  /* ---------- header ---------- */
  function header() {
    const p = Profiles.ensure();
    const nav = [['#/', 'Lessons'], ['#/vocab', 'Vocabulary Lab'], ['#/revision', 'Revision'], ['#/progress', 'My Progress'], ['#/tutor', 'Tutor Mode']];
    const cur = location.hash || '#/';
    const tbtn = h('button', { class: 'tmode', 'aria-pressed': String(Tutor.on()), onclick: () => { Tutor.set(!Tutor.on()); tbtn.setAttribute('aria-pressed', String(Tutor.on())); toast(Tutor.on() ? 'Tutor mode ON — видны заметки, ключи и оценки' : 'Tutor mode OFF'); } }, h('span', { class: 'dot', 'aria-hidden': 'true' }), 'Tutor');
    const menuBtn = h('button', { class: 'menu-btn', 'aria-label': 'Меню', 'aria-expanded': 'false', onclick: () => { const o = navEl.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); } }, '☰');
    const navEl = h('nav', { class: 'nav', 'aria-label': 'Главное меню' }, nav.map(([href, l]) => h('a', { href, class: (cur === href || (href !== '#/' && cur.startsWith(href))) ? 'on' : null, onclick: () => navEl.classList.remove('open') }, l)));
    const hd = document.getElementById('hdr'); hd.innerHTML = '';
    hd.append(h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, 'E'), h('span', null, h('b', null, BOOK.title), h('small', null, BOOK.subtitle))),
      navEl, h('div', { class: 'hd-r' }, h('a', { class: 'who', href: '#/tutor', title: 'Сменить ученика' }, h('span', { class: 'av', 'aria-hidden': 'true' }, (p.name[0] || 'S').toUpperCase()), h('span', { class: 'who-n' }, p.name)), tbtn, menuBtn));
  }

  /* ---------- pages ---------- */
  function Home() {
    const d = Store.data();
    const last = d.last && d.last !== '#/' ? d.last : null;
    const words = unitWords(); const st = SRS.stats(words); const due = SRS.due(words).length;
    return h('div', { class: 'page home' },
      h('section', { class: 'hero' },
        h('div', { class: 'hero-txt' },
          h('div', { class: 'eyebrow' }, 'One student · One tutor · ' + BOOK.level),
          h('h1', null, 'Learn it. ', h('span', { class: 'hl-pink' }, 'Say it.'), ' ', h('span', { class: 'hl-blue' }, 'Keep it.')),
          h('p', { class: 'lead' }, 'Все упражнения учебника — интерактивно, с проверкой. Словарный тренажёр с интервальным повторением и подготовка к ОГЭ по теме урока.'),
          h('div', { class: 'row' }, last ? h('a', { class: 'btn primary lg', href: last }, 'Continue lesson →') : h('a', { class: 'btn primary lg', href: '#/lesson/u1-opener' }, 'Start Unit 1 →'),
            h('a', { class: 'btn ghost lg', href: '#/vocab' }, 'Vocabulary Lab'))),
        h('figure', { class: 'hero-art' }, h('div', { class: 'blob b1' }), h('div', { class: 'blob b2' }), h('img', { src: 'assets/keks.webp', alt: 'Кекс — кот-талисман платформы', width: 720, height: 630 }),
          h('figcaption', { class: 'keks-say' }, due ? 'Мяу! ' + due + ' слов ждут повторения.' : 'Мяу! Начнём?'))),
      h('section', { class: 'stats-strip' },
        stat(st.mastered, 'words mastered', 'blue'), stat(st.learning + st.difficult, 'words in progress', 'pink'), stat(due, 'due for review', 'yellow'),
        stat(Object.values(d.ex).filter(e => e.done).length, 'exercises done', 'orange')),
      h('section', { class: 'units' },
        h('div', { class: 'sec-h' }, h('h2', null, 'Modules'), h('span', { class: 'muted' }, 'В порядке учебника')),
        BOOK.units.map(u => UnitCard(u))));
  }
  const stat = (n, l, c) => h('div', { class: 'stat ' + c }, h('b', null, n), h('span', null, l));

  function UnitCard(u) {
    return h('article', { class: 'unit-card' },
      h('div', { class: 'unit-no' }, u.num),
      h('div', { class: 'unit-body' },
        h('h3', null, u.title), h('div', { class: 'muted small' }, 'Pages ' + u.pages),
        h('ul', { class: 'skills' }, u.skills.map(([k, v]) => h('li', null, h('b', null, k), ' ', v))),
        h('div', { class: 'lessons' }, u.lessons.map(id => LessonTile(id))),
        u.pending.length ? h('ul', { class: 'pending' }, u.pending.map(p => h('li', null, '⏳ ', p))) : null));
  }
  function LessonTile(id) {
    const L = LESSONS[id]; const p = lessonProgress(id);
    return h('a', { class: 'ltile ' + L.accent, href: '#/lesson/' + id },
      h('div', { class: 'lt-code' }, L.code), h('div', { class: 'lt-t' }, h('small', null, L.kicker + ' · p.' + L.pages), h('b', null, L.title)),
      h('div', { class: 'lt-p' }, h('div', { class: 'ring', style: { '--p': p.pct * 3.6 + 'deg' } }, h('span', null, p.pct + '%'))));
  }

  function Lesson(id, exId) {
    const L = LESSONS[id]; if (!L) return NotFound();
    Store.setLast('#/lesson/' + id);
    const p = lessonProgress(id);
    let coreOnly = false;
    const words = lessonWords(id);
    const secs = L.sections.slice();
    const navItems = [];
    const body = h('div', { class: 'lesson-body' });
    secs.forEach(s => {
      const sec = h('section', { class: 'lsec', id: 'sec-' + s.id }, h('h2', { class: 'lsec-h' }, s.title));
      navItems.push([s.id, s.title]);
      s.items.forEach(it => sec.appendChild(Exercises.render(it)));
      body.appendChild(sec);
      if (s.id === 'warm' && words.length) {
        const vs = VocabSection(id, words); body.appendChild(vs); navItems.push(['vocab', 'Vocabulary']);
      }
      if (s.id === 'book' && words.length) { body.appendChild(TrainSection(id)); navItems.push(['train', 'Vocabulary Training']); }
    });
    if (words.length && !body.querySelector('#sec-vocab')) { body.prepend(VocabSection(id, words)); navItems.unshift(['vocab', 'Vocabulary']); }
    // reorder nav to page order
    const order = [...body.children].map(c => c.id.replace('sec-', ''));
    navItems.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
    const coreBtn = h('button', { class: 'chipbtn', 'aria-pressed': 'false', onclick: () => { coreOnly = !coreOnly; coreBtn.setAttribute('aria-pressed', String(coreOnly)); body.classList.toggle('core-only', coreOnly); toast(coreOnly ? 'Core Route: показаны только основные задания. Extra скрыты, но не удалены.' : 'Показаны все задания'); } }, 'Core Route only');
    const pb = h('div', { class: 'lprog' }, h('i', { style: { width: p.pct + '%' } }));
    const onProg = () => { const q = lessonProgress(id); pb.firstChild.style.width = q.pct + '%'; pl.textContent = q.done + '/' + q.total + ' done' + (q.acc != null ? ' · ' + q.acc + '% correct' : ''); };
    const pl = h('span', { class: 'small' });
    document.addEventListener('progress-changed', onProg); currentCleanup = () => document.removeEventListener('progress-changed', onProg);
    const page = h('div', { class: 'page lesson acc-' + L.accent },
      h('a', { class: 'back', href: '#/' }, '← All lessons'),
      h('header', { class: 'lhero' },
        h('div', { class: 'lh-code' }, L.code),
        h('div', null, h('div', { class: 'eyebrow' }, 'Unit ' + unitOf(id).num + ' · ' + L.kicker + ' · p.' + L.pages + (L.sdg ? ' · SDG ' + L.sdg : '')), h('h1', null, L.title), h('p', { class: 'lead' }, L.goal),
          h('div', { class: 'lh-meta' }, h('span', { class: 'chip' }, '⏱ ' + L.time), L.split ? h('span', { class: 'chip tutor-only' }, L.split) : null))),
      h('div', { class: 'lnav' }, h('div', { class: 'lnav-in' }, navItems.map(([sid, t]) => h('a', { href: '#/lesson/' + id + '/@' + sid }, t)), coreBtn), h('div', { class: 'lnav-p' }, pb, pl)),
      body,
      h('nav', { class: 'lfoot' }, prevNext(id)));
    onProg();
    if (exId) setTimeout(() => { const t = exId.startsWith('@') ? document.getElementById('sec-' + exId.slice(1)) : document.getElementById('ex-' + exId); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 1500); } }, 60);
    return page;
  }
  function prevNext(id) { const ls = ALL(); const i = ls.indexOf(id); const lab = j => lname(ls[j]) + ' ' + LESSONS[ls[j]].title; return [i > 0 ? h('a', { class: 'btn ghost', href: '#/lesson/' + ls[i - 1] }, '← ' + lab(i - 1)) : h('span'), i < ls.length - 1 ? h('a', { class: 'btn primary', href: '#/lesson/' + ls[i + 1] }, lab(i + 1) + ' →') : h('a', { class: 'btn primary', href: '#/revision' }, 'Revision →')]; }

  function VocabSection(id, words) {
    return h('section', { class: 'lsec', id: 'sec-vocab' }, h('h2', { class: 'lsec-h' }, 'Vocabulary'),
      h('p', { class: 'muted' }, 'Слова со страниц урока. Нажми на карточку, чтобы увидеть перевод. Цвет точки — статус: серый = новое, розовый = учу, жёлтый = сложное, синий = выучено.'),
      h('div', { class: 'wgrid' }, words.map(v => WordCard(v))),
      h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/vocab/' + id }, 'Train these words →'), h('a', { class: 'btn ghost', href: '#/vocab/' + id + '/flash' }, 'Flashcards')));
  }
  function WordCard(v) {
    const s = SRS.status(v.w);
    const c = h('button', { class: 'wcard', 'aria-label': v.w + ' — show translation', onclick: () => { c.classList.toggle('open'); SRS.seen(v.w); } },
      h('span', { class: 'st ' + s, title: s, 'aria-hidden': 'true' }), h('span', { class: 'wc-e', 'aria-hidden': 'true' }, v.emoji),
      h('b', null, v.w), h('span', { class: 'ipa' }, v.ipa), h('span', { class: 'ru' }, v.ru), h('span', { class: 'exs' }, v.ex));
    return c;
  }
  function TrainSection(id) {
    const pick = ['flash', 'match', 'type', 'ctx', 'boss'];
    return h('section', { class: 'lsec', id: 'sec-train' }, h('h2', { class: 'lsec-h' }, 'Vocabulary Training'),
      h('p', { class: 'muted' }, 'Learn → Recognise → Recall → Use → Personalise → Review. Слово считается выученным только после нескольких правильных ответов по памяти с интервалами (10 минут → 1 день → 3 дня).'),
      h('div', { class: 'mgrid' }, MODES.filter(m => pick.includes(m.id)).map(m => h('a', { class: 'mtile', href: '#/vocab/' + id + '/' + m.id }, h('small', null, m.stage), h('b', null, m.name), h('span', null, m.desc)))));
  }

  /* ---------- Vocabulary Lab ---------- */
  const SETS = () => [['all', 'All words', unitWords(), 'tab']]
    .concat(BOOK.units.map(u => [u.id, 'Unit ' + u.num, unitWordsOf(u.id), 'tab']))
    .concat(ALL().filter(id => lessonWords(id).length).map(id => [id, lname(id) + ' ' + LESSONS[id].title, lessonWords(id), 'lesson']))
    .concat([['due', 'Due for review', SRS.due(unitWords()), 'tab'], ['hard', 'Difficult Words', SRS.difficult(unitWords()), 'tab']]);
  function VocabLab(setId, modeId) {
    setId = setId || 'all';
    const sets = SETS(); const cur = sets.find(s => s[0] === setId) || sets[0]; const words = cur[2];
    const host = h('div', { class: 'run' });
    const exit = () => { location.hash = '#/vocab/' + setId; };
    const st = SRS.stats(cur[0] === 'due' || cur[0] === 'hard' ? unitWords() : words);
    const head = h('div', { class: 'vl-head' },
      h('div', null, h('div', { class: 'eyebrow' }, 'Vocabulary Lab'), h('h1', null, 'Words that ', h('span', { class: 'hl-pink' }, 'stay'), '.')),
      h('div', { class: 'vl-stats' }, stat(st.new, 'new', 'grey'), stat(st.learning, 'learning', 'pink'), stat(st.difficult, 'difficult', 'yellow'), stat(st.mastered, 'mastered', 'blue')));
    const lsel = h('select', { class: 'inp sel lsel', 'aria-label': 'Lesson word set', onchange: e => { if (e.target.value) location.hash = '#/vocab/' + e.target.value; } }, h('option', { value: '' }, 'Lesson…'), sets.filter(s => s[3] === 'lesson').map(s => h('option', { value: s[0], selected: s[0] === cur[0] || null }, s[1] + ' (' + s[2].length + ')')));
    const tabs = h('div', { class: 'tabs', role: 'tablist' }, sets.filter(s => s[3] === 'tab').map(s => h('a', { role: 'tab', 'aria-selected': String(s[0] === cur[0]), class: s[0] === cur[0] ? 'on' : null, href: '#/vocab/' + s[0] }, s[1], ' ', h('span', { class: 'cnt' }, s[2].length))));
    const page = h('div', { class: 'page vocab' }, head, tabs, h('div', { class: 'lsel-row' }, h('span', { class: 'muted small' }, 'Слова урока:'), lsel));
    if (!words.length) { page.append(h('div', { class: 'empty' }, cur[0] === 'due' ? 'Сейчас нет слов для повторения. Новые повторы появятся по расписанию — загляни позже или учи новые слова.' : 'Пока нет сложных слов — отлично! Слова с ошибками появятся здесь автоматически.')); return page; }
    if (modeId) {
      const m = MODES.find(x => x.id === modeId);
      if (m) { page.append(h('div', { class: 'run-h' }, h('a', { class: 'back', href: '#/vocab/' + setId }, '← All modes'), h('h2', null, m.name), h('span', { class: 'chip' }, 'Stage: ' + m.stage)), host); setTimeout(() => m.run(host, words, exit, m.boss ? 'Boss · ' + cur[1] : null), 0); return page; }
    }
    page.append(
      h('div', { class: 'mgrid big' }, MODES.map((m, i) => h('a', { class: 'mtile c' + (i % 5), href: '#/vocab/' + setId + '/' + m.id }, h('small', null, m.stage), h('b', null, m.name), h('span', null, m.desc)))),
      h('div', { class: 'sec-h' }, h('h2', null, 'Word list'), h('span', { class: 'muted' }, cur[1])),
      h('div', { class: 'wtable-wrap' }, h('table', { class: 'wtable' }, h('thead', null, h('tr', null, ['Word', 'Translation', 'Status', 'Right / wrong', 'Next review'].map(t => h('th', null, t)))),
        h('tbody', null, words.map(v => { const s = SRS.st(v.w); const status = SRS.status(v.w); return h('tr', null, h('td', null, h('b', null, v.w), ' ', h('span', { class: 'ipa' }, v.ipa), ' ', Vocab.sayBtn(v.w)), h('td', null, v.ru), h('td', null, h('span', { class: 'pill ' + status }, ({ new: 'new', learning: 'learning', difficult: 'difficult', mastered: 'mastered' })[status]), ' ', h('span', { class: 'boxes', title: 'Box ' + s.box + '/5' }, [1, 2, 3, 4, 5].map(b => h('i', { class: b <= s.box ? 'on' : null })))), h('td', null, s.c + ' / ' + s.x), h('td', null, !s.seen ? '—' : s.due <= Date.now() ? 'now' : new Date(s.due).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))); })))),
      h('p', { class: 'muted small' }, 'Голос 🔊 — синтез речи браузера для отдельных слов (только произношение слова, не аудио учебника). Если в браузере нет голоса, кнопка не показывается.'));
    return page;
  }

  /* ---------- Revision ---------- */
  function Revision() {
    const words = unitWords(); const due = SRS.due(words); const hard = SRS.difficult(words);
    const errs = []; UNIT.lessons.forEach(id => allItems(id).forEach(it => { const e = Store.data().ex[it.id]; if (e && e.max && e.score < e.max && gradable(it)) errs.push([id, it, e]); }));
    const host = h('div', { class: 'run' });
    return h('div', { class: 'page' }, h('div', { class: 'eyebrow' }, 'Revision'), h('h1', null, 'Review & ', h('span', { class: 'hl-blue' }, 'repeat')),
      h('div', { class: 'rev-grid' },
        h('div', { class: 'rcard' }, h('b', { class: 'rn' }, due.length), h('h3', null, 'Words due today'), h('p', { class: 'muted' }, 'Интервальное повторение: слово возвращается через 10 мин, 1, 3, 7 и 16 дней.'), h('button', { class: 'btn primary', disabled: !due.length || null, onclick: () => Runner(host, shuffle(due), () => ['type', 'ctx', 'spell'][Math.floor(Math.random() * 3)], { onExit: () => route() }) }, 'Start review')),
        h('div', { class: 'rcard' }, h('b', { class: 'rn' }, hard.length), h('h3', null, 'Difficult Words'), h('p', { class: 'muted' }, 'Только слова, в которых были ошибки.'), h('button', { class: 'btn primary', disabled: !hard.length || null, onclick: () => Runner(host, shuffle(hard), () => ['type', 'ctx', 'build'][Math.floor(Math.random() * 3)], { onExit: () => route() }) }, 'Train mistakes')),
        h('div', { class: 'rcard' }, h('b', { class: 'rn' }, words.length), h('h3', null, 'Unit vocabulary tests'), h('p', { class: 'muted' }, 'Итоговый тест модуля: 12 случайных слов, смешанные форматы. Результат сохраняется.'), h('div', { class: 'row' }, BOOK.units.map(u => h('button', { class: 'btn primary sm', onclick: () => Runner(host, shuffle(unitWordsOf(u.id)).slice(0, 12), () => ['type', 'ctx', 'def', 'spell', 'toEn'][Math.floor(Math.random() * 5)], { test: 'Unit ' + u.num + ' vocabulary test', onExit: () => route() }) }, 'Unit ' + u.num))))),
      host,
      h('div', { class: 'sec-h' }, h('h2', null, 'Exercises with mistakes')),
      errs.length ? h('ul', { class: 'errlist' }, errs.map(([id, it, e]) => h('li', null, h('a', { href: '#/lesson/' + id + '/' + it.id }, lname(id) + ' · ' + (it.source === 'added' ? it.title : 'Ex. ' + it.num + ' p.' + it.page)), h('span', { class: 'pill difficult' }, e.score + ' / ' + e.max)))) : h('p', { class: 'muted' }, 'Нет упражнений с ошибками. Выполни упражнения урока — сюда попадут те, где есть ошибки.'));
  }

  /* ---------- Progress ---------- */
  function Progress() {
    const d = Store.data(); const p = Profiles.ensure(); const words = unitWords(); const st = SRS.stats(words);
    const rows = []; UNIT.lessons.forEach(id => allItems(id).forEach(it => rows.push([id, it, d.ex[it.id]])));
    const lp = UNIT.lessons.map(id => [id, lessonProgress(id)]);
    const tot = lp.reduce((a, [, x]) => ({ d: a.d + x.done, t: a.t + x.total }), { d: 0, t: 0 });
    return h('div', { class: 'page' }, h('div', { class: 'eyebrow' }, 'My Progress · ' + p.name), h('h1', null, 'Your ', h('span', { class: 'hl-pink' }, 'progress')),
      h('section', { class: 'stats-strip' }, stat(Math.round(tot.d / tot.t * 100) + '%', 'course done', 'blue'), stat(st.mastered + '/' + words.length, 'words mastered', 'pink'), stat(SRS.difficult(words).length, 'difficult words', 'yellow'), stat(d.log.length, 'checked attempts', 'orange')),
      h('div', { class: 'sec-h' }, h('h2', null, 'Lessons')),
      h('div', { class: 'lprog-list' }, lp.map(([id, x]) => h('a', { class: 'lp-row', href: '#/lesson/' + id }, h('b', null, lname(id) + ' ' + LESSONS[id].title), h('div', { class: 'lprog' }, h('i', { style: { width: x.pct + '%' } })), h('span', null, x.done + '/' + x.total + (x.acc != null ? ' · ' + x.acc + '% correct' : ''))))),
      h('div', { class: 'sec-h' }, h('h2', null, 'Every exercise')),
      h('div', { class: 'wtable-wrap' }, h('table', { class: 'wtable' }, h('thead', null, h('tr', null, ['Lesson', 'Exercise', 'Status', 'Last result', 'Attempts'].map(t => h('th', null, t)))),
        h('tbody', null, rows.map(([id, it, e]) => h('tr', null, h('td', null, lname(id)), h('td', null, h('a', { href: '#/lesson/' + id + '/' + it.id }, it.source === 'added' ? (it.title || 'Warm-up / review') : 'Ex. ' + it.num + ' · p.' + it.page)), h('td', null, e && e.done ? h('span', { class: 'pill mastered' }, 'done') : h('span', { class: 'pill new' }, '—')), h('td', null, e && e.max ? e.score + ' / ' + e.max : '—'), h('td', null, e ? String(e.attempts.length) : '0') ))))),
      d.tests.length ? h('div', null, h('div', { class: 'sec-h' }, h('h2', null, 'Vocabulary tests')), h('ul', { class: 'errlist' }, d.tests.slice().reverse().map(t => h('li', null, h('span', null, new Date(t.t).toLocaleString('ru-RU') + ' · ' + t.name), h('span', { class: 'pill ' + (t.score / t.max >= .8 ? 'mastered' : 'difficult') }, t.score + ' / ' + t.max))))) : null,
      h('div', { class: 'sec-h' }, h('h2', null, 'Difficult words')),
      SRS.difficult(words).length ? h('div', { class: 'wlist' }, SRS.difficult(words).map(v => h('span', { class: 'wtag bad' }, v.w + ' — ' + v.ru)), h('a', { class: 'btn primary', href: '#/vocab/hard' }, 'Train them')) : h('p', { class: 'muted' }, 'Пока нет.'),
      h('div', { class: 'sec-h' }, h('h2', null, 'Data')),
      h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: exportJSON }, 'Export JSON'), h('button', { class: 'btn ghost', onclick: exportCSV }, 'Export CSV'), h('button', { class: 'btn danger', onclick: resetAll }, 'New Student / Reset All')),
      h('p', { class: 'muted small' }, 'Прогресс хранится только в этом браузере (localStorage) и не синхронизируется между устройствами. Для переноса используйте Export JSON.'));
  }
  function exportJSON() { const p = Profiles.ensure(); download('progress-' + p.name + '-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify({ student: p, exported: new Date().toISOString(), data: Store.data() }, null, 2)); }
  function exportCSV() {
    const p = Profiles.ensure(); const d = Store.data(); const q = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';
    const lines = [['student', 'lesson', 'exercise', 'page', 'done', 'score', 'max', 'attempts', 'tutor_comment'].join(',')];
    UNIT.lessons.forEach(id => allItems(id).forEach(it => { const e = d.ex[it.id] || {}; lines.push([p.name, lname(id), it.source === 'added' ? it.title || it.id : 'Ex ' + it.num, it.page || '', e.done ? 1 : 0, e.score == null ? '' : e.score, e.max == null ? '' : e.max, (e.attempts || []).length, e.tcomment || ''].map(q).join(',')); }));
    lines.push(''); lines.push(['word', 'translation', 'status', 'box', 'right', 'wrong'].join(','));
    VOCAB.forEach(v => { const s = SRS.st(v.w); lines.push([v.w, v.ru, SRS.status(v.w), s.box, s.c, s.x].map(q).join(',')); });
    download('progress-' + p.name + '.csv', '﻿' + lines.join('\n'), 'text/csv');
  }
  async function resetAll() { const p = Profiles.ensure(); if (await confirmBox('New Student / Reset All', 'Все результаты ученика «' + p.name + '» (упражнения, ответы, словарь, тесты) будут удалены без возможности восстановления. Сначала можно сделать Export JSON.', 'Удалить всё')) { Store.reset(); toast('Результаты очищены'); route(); } }

  /* ---------- Tutor ---------- */
  function TutorPage() {
    const list = Profiles.list(); const cur = Profiles.currentId(); const d = Store.data();
    const asks = []; UNIT.lessons.forEach(id => allItems(id).forEach(it => { const e = d.ex[it.id]; if (e && e.ask) asks.push([id, it, e.ask]); }));
    const audio = []; UNIT.lessons.forEach(id => allItems(id).forEach(it => { if (it.audio) audio.push([id, it]); }));
    return h('div', { class: 'page' }, h('div', { class: 'eyebrow' }, 'Tutor Mode'), h('h1', null, 'Tutor ', h('span', { class: 'hl-blue' }, 'desk')),
      h('div', { class: 'tcard' }, h('label', { class: 'switch' }, h('input', { type: 'checkbox', checked: Tutor.on() || null, onchange: e => { Tutor.set(e.target.checked); header(); } }), h('span', null, 'Режим преподавателя: заметки, ключи («Показать ключ»), чек-листы, комментарии')),
        h('p', { class: 'muted small' }, 'Это режим отображения, а не защита: на общем устройстве ученик тоже может его включить.')),
      h('div', { class: 'sec-h' }, h('h2', null, 'Students on this device')),
      h('ul', { class: 'students' }, list.map(s => h('li', { class: s.id === cur ? 'on' : null }, h('span', { class: 'av' }, s.name[0].toUpperCase()), h('b', null, s.name), s.id === cur ? h('span', { class: 'pill mastered' }, 'active') : h('button', { class: 'btn ghost sm', onclick: () => { Profiles.switchTo(s.id); Store._id = null; toast('Ученик: ' + s.name); route(); } }, 'Switch'),
        h('button', { class: 'btn ghost sm', onclick: async () => { const n = await promptBox('Имя ученика', s.name); if (n) { Profiles.rename(s.id, n); route(); } } }, 'Rename'),
        list.length > 1 ? h('button', { class: 'btn ghost sm', onclick: async () => { if (await confirmBox('Удалить профиль?', 'Профиль «' + s.name + '» и все его результаты будут удалены.', 'Удалить')) { Profiles.remove(s.id); Store._id = null; route(); } } }, 'Delete') : null))),
      h('button', { class: 'btn primary', onclick: async () => { const n = await promptBox('Новый ученик'); if (n) { Profiles.add(n); Store._id = null; toast('Создан профиль: ' + n); route(); } } }, '+ Add student'),
      h('div', { class: 'sec-h' }, h('h2', null, 'Quick jump')),
      h('div', { class: 'jump' }, UNIT.lessons.map(id => h('div', { class: 'jcol' }, h('h3', null, lname(id) + ' ' + LESSONS[id].title), h('div', { class: 'jlinks' }, allItems(id).map(it => h('a', { href: '#/lesson/' + id + '/' + it.id, class: 'jl' + (it.source === 'added' ? ' add' : '') }, it.source === 'added' ? (it.oge ? 'OGE' : it.type === 'review' ? 'Review' : 'Warm') : it.num))), lessonWords(id).length ? h('a', { class: 'small', href: '#/vocab/' + id }, 'Vocabulary of ' + lname(id) + ' →') : null))),
      h('div', { class: 'sec-h' }, h('h2', null, 'Questions from the student')),
      asks.length ? h('ul', { class: 'errlist' }, asks.map(([id, it, q]) => h('li', null, h('a', { href: '#/lesson/' + id + '/' + it.id }, lname(id) + ' · ' + (it.num ? 'Ex. ' + it.num : it.title)), h('span', null, q)))) : h('p', { class: 'muted' }, 'Вопросов пока нет (кнопка «Ask your tutor» под каждым заданием).'),
      h('div', { class: 'sec-h' }, h('h2', null, 'Audio status')),
      h('div', { class: 'wtable-wrap' }, h('table', { class: 'wtable' }, h('thead', null, h('tr', null, ['Track', 'Exercise', 'File', 'Status'].map(t => h('th', null, t)))), h('tbody', null, audio.map(([id, it]) => h('tr', null, h('td', null, it.audio.track), h('td', null, lname(id) + ' Ex. ' + it.num + ' p.' + it.page), h('td', null, h('code', null, it.audio.file || 'audio/' + it.audio.track + '.mp3')), h('td', null, it.audio.file ? h('span', { class: 'pill mastered' }, 'connected') : h('span', { class: 'pill new' }, 'waiting'))))))),
      h('p', { class: 'muted small' }, 'Как подключить: положите файл в папку audio/ и впишите путь в js/data-unit1.js → audio.file (например \'audio/03.mp3\'). Подробно — в README.md.'),
      h('div', { class: 'sec-h' }, h('h2', null, 'Coverage')), h('a', { class: 'btn ghost', href: '#/coverage' }, 'Таблица соответствия учебнику →'));
  }

  function Coverage() {
    const rows = []; UNIT.lessons.forEach(id => allItems(id).forEach(it => { if (it.source === 'added') return; rows.push([id, it]); }));
    const how = it => { const t = it.type === 'listen' ? it.inner.type : it.type; return t === 'open' ? 'Преподаватель ✓/✗ по ключу' : ['discuss', 'rank', 'checklist'].includes(t) ? 'Устно / отметка' : t === 'writing' ? (it.min ? 'Формальные признаки + преподаватель' : 'Преподаватель') : t === 'scores' ? 'Самооценка' : t === 'reference' ? 'Отметка «прочитано»' : 'Автопроверка'; };
    const typeName = { gaps: 'Gaps / select', listen: 'Audio/video + task', mcq: 'Choice', inline: 'Choose the alternative', underline: 'Tap to underline + tense', rulebox: 'Grammar box', match: 'Matching', order: 'Write the sentence', rank: 'Ranking 1–3', discuss: 'Speaking prompts', open: 'Open answers + key', tapfind: 'Tap to underline', multi: 'Tick all', checklist: 'Checklist', scores: 'Scores 0–10', reference: 'Read / listen box', writing: 'Writing', interview: 'Timed speaking' };
    return h('div', { class: 'page' }, h('div', { class: 'eyebrow' }, 'Coverage'), h('h1', null, 'Учебник → сайт'),
      h('p', { class: 'muted' }, 'Все задания модулей ' + BOOK.units.map(u => u.num).join(', ') + ' (Student Book, Grammar Reference & Practice, Workbook) в исходной нумерации: ' + rows.length + ' заданий. Добавленные материалы (warm-up, OGE, review) в таблицу не входят и на сайте помечены «Добавлено».'),
      h('div', { class: 'wtable-wrap' }, h('table', { class: 'wtable' }, h('thead', null, h('tr', null, ['Page', 'Ex.', 'Site section', 'Format', 'Status', 'Check'].map(t => h('th', null, t)))),
        h('tbody', null, rows.map(([id, it]) => h('tr', null, h('td', null, it.page), h('td', null, h('a', { href: '#/lesson/' + id + '/' + it.id }, it.num)), h('td', null, lname(id) + ' ' + LESSONS[id].title), h('td', null, typeName[it.type] || it.type), h('td', null, it.audio && !it.audio.file ? h('span', { class: 'pill difficult' }, 'ждёт аудио ' + it.audio.track) : h('span', { class: 'pill mastered' }, 'готово')), h('td', null, how(it))))))),
      h('div', { class: 'sec-h' }, h('h2', null, 'Не извлечено / не предоставлено')),
      h('ul', { class: 'pending' }, ['Аудио и видео (Student Book и Workbook) — плееры готовы, транскрипты из Teacher’s Guide уже подключены', 'Видео Grammar Animation, Culture video — не предоставлены', 'Фото учебника не переносятся (заменены описанием/значками)', 'Следующие модули — по мере работы'].map(t => h('li', null, '⏳ ' + t))));
  }
  function NotFound() { return h('div', { class: 'page' }, h('h1', null, 'Page not found'), h('a', { class: 'btn primary', href: '#/' }, 'Home')); }

  /* ---------- router ---------- */
  let currentCleanup = null;
  function route() {
    if (currentCleanup) { currentCleanup(); currentCleanup = null; }
    const parts = (location.hash || '#/').slice(2).split('/').filter(Boolean).map(decodeURIComponent);
    let view;
    switch (parts[0]) {
      case undefined: view = Home(); break;
      case 'lesson': view = Lesson(parts[1], parts[2]); break;
      case 'vocab': view = VocabLab(parts[1], parts[2]); break;
      case 'revision': view = Revision(); break;
      case 'progress': view = Progress(); break;
      case 'tutor': view = TutorPage(); break;
      case 'coverage': view = Coverage(); break;
      default: view = NotFound();
    }
    header();
    const m = main(); m.innerHTML = ''; m.appendChild(view);
    if (!(parts[0] === 'lesson' && parts[2])) window.scrollTo(0, 0);
    m.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', () => {
    Tutor.set(Tutor.on());
    if (!Core.LS.ok()) document.getElementById('lsWarn').hidden = false;
    route();
  });
  window.App = { route };
})();
