/* ========== PICS: визуальный слой (3D-объекты, панорамы, доски картинок) ==========
   Работает поверх существующих страниц и не меняет учебное содержание.
   3D: Microsoft Fluent Emoji 3D (MIT) — assets/3d/<код>.webp, карта в js/pics-map.js.   */
(function () {
  'use strict';
  const { h, esc } = Core;
  const MAP = window.PICS_MAP || {};
  const V = () => window.VISUALS || {};
  const strip = e => String(e || '').replace(/️/g, '');
  const IDX = {}; Object.keys(MAP).forEach(e => { IDX[e] = MAP[e]; IDX[strip(e)] = MAP[e]; });

  function key(e) { if (!e) return null; e = String(e).trim(); return IDX[e] || IDX[strip(e)] || null; }
  function src(e) { const k = key(e); return k ? 'assets/3d/' + k + '.webp' : null; }
  function has(e) { return !!key(e); }
  /* <img> c 3D-объектом; если картинки нет — обычный эмодзи-текст */
  function img(e, o) {
    o = o || {}; const s = src(e);
    if (!s) return h('span', { class: 'pic-txt ' + (o.cls || ''), 'aria-hidden': o.alt ? null : 'true', role: o.alt ? 'img' : null, 'aria-label': o.alt || null }, e);
    const el = h('img', { class: 'pic ' + (o.cls || ''), src: s, alt: o.alt || '', width: o.size || 64, height: o.size || 64, loading: o.eager ? 'eager' : 'lazy', decoding: 'async', draggable: 'false', style: o.style || null });
    el.dataset.emo = e; el.onerror = () => broken(el);
    return el;
  }
  /* Файл не загрузился: ошибка видна в консоли (её ловят автотесты), а ученик вместо пустой рамки видит тот же смысл эмодзи-текстом */
  function broken(el) {
    if (el.dataset.broken) return; el.dataset.broken = '1';
    console.error('[Pics] Не загрузилась картинка: ' + el.getAttribute('src') + ' — проверьте файл и регистр букв в имени');
    const e = el.dataset.emo; if (!e) { el.classList.add('pic-broken'); return; }
    const sp = h('span', { class: el.className.replace(/\bpic\b/, 'pic-txt pic-broken'), 'aria-hidden': el.alt ? null : 'true', role: el.alt ? 'img' : null, 'aria-label': el.alt || null }, e);
    sp.style.cssText = el.style.cssText; el.replaceWith(sp);
  }
  const imgHTML = (e, cls, extra) => { const s = src(e); return s ? '<img class="pic ' + (cls || '') + '" src="' + s + '" alt="" width="64" height="64" loading="lazy" decoding="async" draggable="false" data-emo="' + esc(e) + '" onerror="Pics.broken(this)"' + (extra || '') + '>' : '<span class="pic-txt ' + (cls || '') + '" aria-hidden="true">' + esc(e) + '</span>'; };

  /* ---------- Панорама: окно с фоном фирменного цвета и «парящими» 3D-объектами ----------
     Позиции: [x %, y %, размер в % ширины, поворот°]                                      */
  const LAY = {
    1: [[62, 52, 44, -6], [22, 32, 28, 8], [26, 78, 24, -10], [88, 20, 18, 12], [86, 84, 16, -4]],
    2: [[52, 50, 42, 4], [17, 66, 26, -10], [84, 34, 27, 9], [24, 20, 19, -6], [82, 84, 18, 6]],
    3: [[38, 56, 42, -4], [78, 62, 30, 8], [72, 20, 22, -12], [14, 24, 19, 10], [14, 84, 16, -6]],
    macro: [[44, 56, 52, 0], [74, 28, 15, 18], [24, 30, 13, -14], [84, 70, 16, 10], [10, 86, 20, -20]],
    duo: [[34, 56, 30, 0], [66, 56, 30, 0], [14, 22, 14, -10], [86, 24, 15, 8]],
    row: [[12, 58, 16, -6], [31, 46, 17, 5], [50, 58, 18, -3], [69, 46, 17, 6], [88, 58, 16, -5], [50, 16, 10, 0], [92, 18, 10, 0]],
    room: [[30, 62, 30, 0], [76, 36, 20, 0], [86, 74, 15, 0], [56, 22, 11, 0], [12, 30, 13, 0]]
  };
  function backdrop(c) {
    return '<svg class="pano-bg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<circle class="pb-sun" cx="300" cy="96" r="78"/><circle class="pb-ring" cx="300" cy="96" r="112"/>' +
      '<path class="pb-hill2" d="M-20 236 C 60 196 140 196 220 226 S 360 248 420 210 V 320 H -20 Z"/>' +
      '<path class="pb-hill1" d="M-20 262 C 80 236 170 250 250 268 S 380 270 420 252 V 320 H -20 Z"/>' +
      '<g class="pb-dots"><circle cx="46" cy="52" r="5"/><circle cx="74" cy="40" r="3"/><circle cx="120" cy="64" r="4"/><circle cx="196" cy="34" r="3"/></g></svg>';
  }
  function pano(spec, o) {
    o = o || {};
    const lay = LAY[spec.lay] || LAY[1];
    const fig = h('figure', { class: 'pano c-' + (spec.c || 'blue') + ' lay-' + (spec.lay || 1) + (o.cls ? ' ' + o.cls : ''), role: spec.alt ? 'img' : null, 'aria-label': spec.alt || null, 'aria-hidden': spec.alt ? null : 'true' });
    fig.innerHTML = backdrop(spec.c);
    (spec.items || []).forEach((e, i) => {
      const p = lay[i % lay.length]; if (!p) return;
      const el = img(e, { cls: 'po', eager: !!o.eager, size: 128 });
      const sz = o.scene && typeof spec.lay !== 'string' ? p[2] * .62 : p[2];
      el.style.left = p[0] + '%'; el.style.top = p[1] + '%'; el.style.width = sz + '%'; if (el.tagName === 'SPAN') el.style.fontSize = 'calc(' + p[2] + 'cqw * .8)';
      el.style.setProperty('--r', p[3] + 'deg'); el.style.setProperty('--d', (i * .6) + 's'); el.style.setProperty('--z', String(10 - i));
      fig.appendChild(el);
    });
    return fig;
  }

  /* ---------- Доска картинок A–O / 1–12 (как картинки в учебнике) ---------- */
  const TONES = ['t1', 't2', 't3', 't4', 't5'];
  function tileAlt(it, i) {
    if (it.right && it.right[i]) return it.right[i].replace(/^[A-O]\s+/, '');
    const p = it.paras && it.paras[i]; if (!p) return '';
    const first = (Array.isArray(p) ? p : [p]).find(s => typeof s === 'string') || '';
    const m = first.match(/\(([^)]+)\)/); return (m ? m[1] : first).replace(/\*\*/g, '').trim();
  }
  function board(spec, it) {
    const marks = spec.mark === 'abc' ? 'ABCDEFGHIJKLMNO' : null;
    const wrap = h('figure', { class: 'pboard cols-' + (spec.cols || 4), role: 'group', 'aria-label': 'Картинки к заданию' });
    spec.tiles.forEach((t, i) => {
      const label = marks ? marks[i] : String(i + 1);
      const alt = (spec.alts && spec.alts[i]) || (label + ' — ' + tileAlt(it, i));
      const tile = h('div', { class: 'pb-t ' + TONES[i % TONES.length], role: 'img', 'aria-label': alt, title: alt.replace(/^\S+ — /, '') }, h('span', { class: 'pb-k', 'aria-hidden': 'true' }, label));
      if (t && t.svg) { const s = window.SVGART && SVGART.tile[t.svg]; tile.appendChild(h('div', { class: 'pb-svg', 'aria-hidden': 'true', html: s ? s() : '' })); }
      else { const arr = Array.isArray(t) ? t : [t]; tile.appendChild(img(arr[0], { cls: 'pb-main', size: 96 })); if (arr[1]) tile.appendChild(img(arr[1], { cls: 'pb-sub', size: 64 })); }
      wrap.appendChild(tile);
    });
    return wrap;
  }

  /* ---------- Две сцены рядом ---------- */
  function duo(spec) {
    return h('figure', { class: 'pduo', role: 'img', 'aria-label': spec.alt || '' }, spec.panels.map(p => h('div', { class: 'pduo-p' },
      pano({ c: p.c, lay: 'duo3', items: [] }, { cls: 'mini' }), h('div', { class: 'pduo-items', 'aria-hidden': 'true' }, p.items.map((e, i) => img(e, { cls: 'pd-o pd-' + i, size: 96 }))), h('span', { class: 'pduo-l' }, p.label))));
  }

  /* ---------- Список, который ученик открывает сам (чтобы картинка не подсказывала заранее) ---------- */
  function reveal(spec) {
    const list = h('ul', { class: 'rv-list' }, spec.rows.map(([e, t, yes]) => h('li', null, img(e, { size: 48, cls: 'rv-ic' }), h('span', null, t), h('b', { class: 'rv-m ' + (yes ? 'yes' : 'no'), 'aria-label': yes ? 'yes' : 'no' }, yes ? '✔' : '✘'))));
    const box = h('figure', { class: 'reveal', role: 'group', 'aria-label': spec.alt || spec.title }, h('div', { class: 'rv-h' }, h('b', null, spec.title)), list);
    const btn = h('button', { class: 'btn ghost sm rv-btn', 'aria-expanded': 'false', onclick: () => { const o = box.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); btn.textContent = o ? 'Скрыть отметки ✔ / ✘' : 'Открыть отметки ✔ / ✘ в списке Матильды'; } }, 'Открыть отметки ✔ / ✘ в списке Матильды');
    box.appendChild(btn);
    return box;
  }

  /* ---------- Сердце из мусора на пляже ---------- */
  function heart(spec) {
    const fig = h('figure', { class: 'pfig heart', role: 'img', 'aria-label': spec.alt });
    const trash = ['🥤', '🧴', '🥫', '🧃', '🧢', '🩴', '🪣', '🧦', '🥡', '🍾'];
    let html = window.SVGART ? SVGART.beach() : '';
    const N = 34; const pts = [];
    for (let i = 0; i < N; i++) { const t = i / N * Math.PI * 2; const x = 16 * Math.pow(Math.sin(t), 3); const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); pts.push([50 + x * 1.5, 30 + (y + 12) * 2.15]); }
    html += pts.map((p, i) => imgHTML(trash[(i * 7) % trash.length], 'ht', ' style="left:' + p[0].toFixed(1) + '%;top:' + p[1].toFixed(1) + '%;--r:' + ((i * 47) % 70 - 35) + 'deg"')).join('');
    fig.innerHTML = html;
    return fig;
  }

  function svgFig(spec) {
    const f = window.SVGART && SVGART.scene[spec.draw];
    if (!f) return null;
    return h('figure', { class: 'pfig svg-' + spec.draw }, h('div', { class: 'pfig-in', role: 'img', 'aria-label': spec.alt || '', html: f() }));
  }

  /* ---------- Иллюстрация к заданию ---------- */
  function forItem(it) {
    const vs = V(); const spec = vs.items && vs.items[it.id];
    const gr = vs.grammar && vs.grammar[it.id];
    let el = null;
    if (spec && spec.photo) {
      el = h('figure', { class: 'pfig photo' }, h('img', { src: 'assets/photos/' + spec.photo + '.webp', alt: spec.palt || spec.alt || '', loading: 'lazy', decoding: 'async', width: 1200, height: 800, onerror: ev => broken(ev.target) }),
        h('figcaption', null, 'Фото: ' + spec.credit + ' · Unsplash'));
    } else if (spec) {
      if (spec.k === 'board') el = board(spec, it);
      else if (spec.k === 'pano') el = h('div', { class: 'pfig scene' }, pano(spec, { scene: true }));
      else if (spec.k === 'duo') el = duo(spec);
      else if (spec.k === 'reveal') el = reveal(spec);
      else if (spec.k === 'heart') el = heart(spec);
      else if (spec.k === 'svg') el = svgFig(spec);
    } else if (gr && window.SVGART && SVGART.grammar[gr]) {
      el = h('figure', { class: 'pfig gram' }, h('div', { class: 'pfig-in', role: 'img', 'aria-label': SVGART.grammarAlt[gr] || 'Схема времени', html: SVGART.grammar[gr]() }), h('figcaption', null, 'Схема: как это выглядит на линии времени'));
    }
    return el ? h('div', { class: 'ex-visual' + (spec && spec.k === 'board' ? ' is-board' : '') }, el) : null;
  }

  /* ---------- Мелкие элементы ---------- */
  function sectionIcon(sid) { const e = (V().sections || {})[sid] || (/^gr/.test(sid) ? '⚙️' : /^voc/.test(sid) ? '🔤' : null); return e ? img(e, { cls: 'sec-ic', size: 48 }) : null; }
  function lessonPano(id) { const s = (V().lessons || {})[id]; return s ? pano(s, { cls: 'hero-pano', eager: true }) : null; }
  function lessonIcon(id) { const s = (V().lessons || {})[id]; return s ? img(s.items[0], { cls: 'lt-pic', size: 48 }) : null; }
  function unitCover(u) {
    const s = (V().units || {})[u.id]; if (!s) return null;
    const f = h('div', { class: 'ucover c-' + s.c, 'aria-hidden': 'true' });
    f.innerHTML = '<svg class="uc-bg" viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true"><path class="uc-w2" d="M0 120 C 140 80 260 150 400 112 S 660 70 800 104 V160 H0Z"/><path class="uc-w1" d="M0 140 C 160 118 300 160 460 138 S 700 118 800 132 V160 H0Z"/><circle class="uc-sun" cx="690" cy="50" r="58"/></svg>';
    s.items.forEach((e, i) => { const el = img(e, { cls: 'uc-o', size: 128 }); el.style.setProperty('--i', i); el.style.setProperty('--d', (i * .5) + 's'); f.appendChild(el); });
    if (s.tag) f.appendChild(h('span', { class: 'uc-tag' }, s.tag));
    return f;
  }
  function wordPic(v) { const w = (V().words || {})[v.w]; return w || null; }

  /* ---------- Автозамена эмодзи-значков на 3D (карточки слов, миссии, значки, итог урока) ---------- */
  const SEL = '.wc-e,.fc-emo,.ms-ic,.bg-ic,.fin-ms li>span:first-child,.pic-auto';
  function upgrade(root) {
    (root || document).querySelectorAll(SEL).forEach(el => {
      if (el.dataset.pic) return; el.dataset.pic = '1';
      const t = el.textContent.trim(); if (!t || el.children.length || !has(t)) return;
      el.textContent = ''; el.classList.add('has-pic'); el.appendChild(img(t, { size: 96 }));
    });
  }
  let queued = false;
  const mo = new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; upgrade(document); }); });
  document.addEventListener('DOMContentLoaded', () => { upgrade(document); mo.observe(document.body, { childList: true, subtree: true }); });

  window.Pics = { key, src, has, img, imgHTML, broken, pano, board, forItem, sectionIcon, lessonPano, lessonIcon, unitCover, wordPic, upgrade, LAY };
})();
