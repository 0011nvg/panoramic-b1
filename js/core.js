/* ========== CORE: storage, profiles, answer checking, helpers ========== */
(function () {
  'use strict';
  const NS = 'osb1.v1';   // Optimise Stars B1 (прогресс Panoramic хранился под 'iestudio.v1' и сюда не смешивается)
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(NS + '.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(NS + '.' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(NS + '.' + k); } catch (e) {} },
    ok() { try { localStorage.setItem(NS + '.t', '1'); localStorage.removeItem(NS + '.t'); return true; } catch (e) { return false; } }
  };

  /* ---------- Profiles ---------- */
  const Profiles = {
    list() { return LS.get('profiles', []); },
    currentId() { return LS.get('current', null); },
    current() { const id = this.currentId(); return this.list().find(p => p.id === id) || null; },
    ensure() {
      let list = this.list();
      if (!list.length) { const p = { id: 's' + Date.now().toString(36), name: 'Student', created: Date.now() }; list = [p]; LS.set('profiles', list); LS.set('current', p.id); }
      if (!this.current()) LS.set('current', list[0].id);
      return this.current();
    },
    add(name) { const p = { id: 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: name.trim() || 'Student', created: Date.now() }; const l = this.list(); l.push(p); LS.set('profiles', l); LS.set('current', p.id); return p; },
    rename(id, name) { const l = this.list(); const p = l.find(x => x.id === id); if (p) { p.name = name.trim() || p.name; LS.set('profiles', l); } },
    switchTo(id) { LS.set('current', id); },
    remove(id) { const l = this.list().filter(p => p.id !== id); LS.set('profiles', l); LS.del('data.' + id); if (this.currentId() === id) LS.set('current', l[0] ? l[0].id : null); this.ensure(); }
  };

  /* ---------- Per-student data ---------- */
  function blank() { return { ex: {}, vocab: {}, log: [], notes: {}, last: null, tests: [], reviews: {} }; }
  const Store = {
    _c: null, _id: null,
    data() { const id = Profiles.ensure().id; if (this._id !== id) { this._c = Object.assign(blank(), LS.get('data.' + id, {})); this._id = id; } return this._c; },
    save() { if (this._id) LS.set('data.' + this._id, this._c); },
    reset() { const id = Profiles.ensure().id; LS.set('data.' + id, blank()); this._c = null; this._id = null; },
    ex(id) { const d = this.data(); return d.ex[id] || (d.ex[id] = { attempts: [], state: null, score: null, max: null, done: false }); },
    record(id, score, max, extra) {
      const e = this.ex(id); e.score = score; e.max = max; e.done = true; e.updated = Date.now();
      e.attempts.push({ t: Date.now(), score, max, peek: extra && extra.peek ? 1 : undefined });
      if (!(extra && extra.peek) && (e.best == null || score / (max || 1) > e.best)) e.best = max ? score / max : 1;
      if (e.best == null) e.best = 0;
      Object.assign(e, extra || {}); delete e.peek;
      this.data().log.push({ t: Date.now(), id, score, max }); this.save();
    },
    markDone(id, v) { const e = this.ex(id); e.done = v !== false; e.updated = Date.now(); this.save(); },
    saveState(id, state) { const e = this.ex(id); e.state = state; this.save(); },
    setLast(route) { this.data().last = route; this.save(); }
  };

  /* ---------- Answer checking ---------- */
  const CONTR = [
    [/\bwon['’]t\b/g, 'will not'], [/\bcan['’]t\b/g, 'cannot'], [/\bshan['’]t\b/g, 'shall not'],
    [/n['’]t\b/g, ' not'], [/['’]re\b/g, ' are'], [/['’]m\b/g, ' am'], [/['’]ve\b/g, ' have'], [/['’]ll\b/g, ' will'], [/['’]d\b/g, ' would'],
    [/\b(he|she|it|that|there|what|where|who|how|mum|dad|friend)['’]s\b/g, '$1 is']
  ];
  function norm(s, opts) {
    opts = opts || {};
    let t = String(s == null ? '' : s).normalize('NFKC');
    t = t.replace(/[‘’ʼ`´]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-');
    if (opts.strict) { return t.replace(/\s*-\s*/g, ' - ').replace(/\s+/g, ' ').replace(/\s+([?.!,;:])/g, '$1').trim(); }
    if (!opts.keepCase) t = t.toLowerCase();
    t = t.replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
    t = t.replace(/\s*[?.!,]+\s*$/g, '').replace(/\s+([?.!,;:])/g, '$1');
    t = t.replace(/^"|"$/g, '');
    if (!opts.noContr) {
      t = ' ' + t;
      // subject-less short forms at the very start of a gap: "'re sitting" / "'m not"
      t = t.replace(/^ '(re)\b/, ' are').replace(/^ '(m)\b/, ' am').replace(/^ '(s)\b/, ' is');
      CONTR.forEach(([re, rep]) => { t = t.replace(re, rep); });
      t = t.replace(/\bcannot\b/g, 'can not').replace(/\s+/g, ' ').trim();
    }
    t = t.replace(/\s*-\s*/g, '-');
    return t;
  }
  /* Допустимые варианты одной и той же записи (симметрично для ответа ученика и ключа):
     's = is / has, 'd = would / had; британское -ise = американское -ize;
     дефис = пробел (face-to-face / face to face); числа словами = цифрами (five / 5);
     Mr. = Mr. Сама форма слова, время и порядок слов по-прежнему проверяются строго. */
  const NUMS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
  const NUM_RE = new RegExp('\\b(' + Object.keys(NUMS).join('|') + ')\\b', 'g');
  function soft(t) {
    return t.replace(/\b(mrs|mr|ms|dr)\./g, '$1')
      .replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[- ](one|two|three|four|five|six|seven|eight|nine)\b/g, (m, a, b) => String(NUMS[a] + NUMS[b]))
      .replace(NUM_RE, m => String(NUMS[m]))
      .replace(/(\d)[ ,](\d{3})\b/g, '$1$2')
      .replace(/\b([a-z]{3,})iz(e|es|ed|ing|ation|ations|er|ers)\b/g, '$1is$2')
      .replace(/\b([a-z]{2,})yz(e|es|ed|ing)\b/g, '$1ys$2')
      .replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function variants(s, opts) {
    opts = opts || {};
    const n = norm(s, opts);
    if (!n || opts.strict || opts.noContr) return n ? [n] : [];
    const raw = norm(s, Object.assign({}, opts, { noContr: true }));
    const out = new Set([n]);
    const possessiveOnly = /^[a-z]+(['’]s|s['’])$/.test(raw); // «boy’s» в упражнении на притяжательный падеж ≠ «boy is»
    const sOpts = possessiveOnly || !/'s\b/.test(raw) ? [null] : [null, ' is', ' has'];
    const dOpts = /'d\b/.test(raw) ? [' would', ' had'] : [null];
    sOpts.forEach(sv => dOpts.forEach(dv => {
      let t = raw;
      if (sv) t = t.replace(/'s\b/g, sv);
      if (dv) t = t.replace(/'d\b/g, dv);
      const v = norm(t, opts); if (v) out.add(v);
    }));
    [...out].forEach(v => { const x = soft(v); if (x) out.add(x); });
    return [...out];
  }
  function matches(input, accepted, opts) {
    const vi = new Set(variants(input, opts));
    if (!vi.size) return false;
    return (accepted || []).some(a => variants(a, opts).some(x => vi.has(x)));
  }
  // Levenshtein — used only to produce "almost" feedback, never to accept
  function lev(a, b) { a = a || ''; b = b || ''; const m = []; for (let i = 0; i <= b.length; i++) m[i] = [i]; for (let j = 0; j <= a.length; j++) m[0][j] = j; for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1); return m[b.length][a.length]; }
  const noApos = s => norm(s, { noContr: true }).replace(/'/g, '');
  function closeTo(input, accepted) {
    const n = norm(input); if (!n) return false;
    return (accepted || []).some(a => { const x = norm(a); if (n === x) return false; if (noApos(input) === noApos(a)) return true; return lev(n, x) <= Math.max(1, Math.floor(x.length / 8)); });
  }

  /* ---------- DOM helpers ---------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
    kids.flat(Infinity).forEach(c => { if (c == null || c === false) return; el.appendChild(c.nodeType ? c : document.createTextNode(String(c))); });
    return el;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/==(.+?)==/g, '<mark>$1</mark>'); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function toast(msg, kind) {
    let t = document.getElementById('toast'); if (!t) { t = h('div', { id: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(t); }
    t.textContent = msg; t.className = 'show ' + (kind || ''); clearTimeout(t._t); t._t = setTimeout(() => { t.className = ''; }, 2600);
  }
  function confirmBox(title, text, okLabel) {
    return new Promise(res => {
      const close = v => { ov.remove(); document.removeEventListener('keydown', onKey); res(v); };
      const onKey = e => { if (e.key === 'Escape') close(false); };
      const ok = h('button', { class: 'btn danger', onclick: () => close(true) }, okLabel || 'OK');
      const ov = h('div', { class: 'modal-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
        h('div', { class: 'modal' }, h('h3', null, title), h('p', null, text),
          h('div', { class: 'row end' }, h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Отмена'), ok)));
      document.body.appendChild(ov); document.addEventListener('keydown', onKey); ok.focus();
    });
  }
  function promptBox(title, value) {
    return new Promise(res => {
      const inp = h('input', { class: 'inp', value: value || '', 'aria-label': title, maxlength: 40 });
      const close = v => { ov.remove(); res(v); };
      const ov = h('div', { class: 'modal-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
        h('div', { class: 'modal' }, h('h3', null, title), inp,
          h('div', { class: 'row end' }, h('button', { class: 'btn ghost', onclick: () => close(null) }, 'Отмена'), h('button', { class: 'btn primary', onclick: () => close(inp.value) }, 'Сохранить'))));
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') close(inp.value); if (e.key === 'Escape') close(null); });
      document.body.appendChild(ov); inp.focus();
    });
  }
  function download(name, text, type) { const b = new Blob([text], { type: type || 'application/json' }); const a = h('a', { href: URL.createObjectURL(b), download: name }); document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }

  /* ---------- Teacher mode (display only) ---------- */
  /* Код учителя: в файлах хранится только хэш (соль 'panoramic-b1:' оставлена прежней, поэтому прежний код
     с сайта Panoramic продолжает работать). Сменить код — откройте tools/teacher-code.html, введите новый код
     и вставьте две строки результата вместо TUTOR_HASH / TUTOR_FNV ниже. Подробно — tools/teacher-code.md.
     Это защита интерфейса «от учеников», а не защита данных: сайт статический, ключи лежат в js/data-*.js. */
  const TUTOR_HASH = '7fef38690bece016743cd10c985b60710700d05581729394b46dc72644922934', TUTOR_FNV = 'e897088c';
  const SS = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  const fnv = s => { let x = 2166136261; for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; } return x.toString(16); };
  async function checkCode(code) {
    const s = 'panoramic-b1:' + String(code || '').trim();
    if (window.crypto && crypto.subtle) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('') === TUTOR_HASH; }
    return fnv(s) === TUTOR_FNV;
  }
  const TutorLock = {
    unlocked() { return SS.get('tutorUnlock') === '1'; },
    lock() { SS.set('tutorUnlock', null); Tutor.set(false); },
    ask() {
      return new Promise(res => {
        let tries = 0;
        const inp = h('input', { class: 'inp big', type: 'password', autocomplete: 'off', 'aria-label': 'Код учителя', maxlength: 40 });
        const msg = h('p', { class: 'muted small', role: 'status' }, 'Режим учителя показывает ключи, образцы ответов и заметки. Введите код.');
        const close = v => { ov.remove(); document.removeEventListener('keydown', esc); res(v); };
        const esc = e => { if (e.key === 'Escape') close(false); };
        const go = async () => {
          if (await checkCode(inp.value)) { SS.set('tutorUnlock', '1'); close(true); return; }
          tries++; inp.value = ''; msg.textContent = 'Неверный код.' + (tries >= 3 ? ' Подождите 10 секунд.' : ''); msg.className = 'small bad-t';
          if (tries >= 3) { inp.disabled = true; setTimeout(() => { inp.disabled = false; inp.focus(); }, 10000); } else inp.focus();
        };
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
        const ov = h('div', { class: 'modal-ov lock-ov', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Код учителя' },
          h('div', { class: 'modal' }, h('h3', null, '🔒 Режим учителя'), msg, inp,
            h('div', { class: 'row end' }, h('button', { class: 'btn ghost', onclick: () => close(false) }, 'Отмена'), h('button', { class: 'btn primary', onclick: go }, 'Войти'))));
        document.body.appendChild(ov); document.addEventListener('keydown', esc); inp.focus();
      });
    },
    async request() { if (!this.unlocked() && !(await this.ask())) return false; return true; }
  };
  /* Режим включается только после ввода кода в этой вкладке; при закрытии вкладки — выключается */
  const Tutor = { on() { return !!LS.get('tutor', false) && TutorLock.unlocked(); }, set(v) { v = !!v && TutorLock.unlocked(); LS.set('tutor', v); document.documentElement.classList.toggle('tutor', v); } };

  /* ---------- Content index ---------- */
  function allItems(lessonId) { const L = LESSONS[lessonId]; const out = []; L.sections.forEach(s => s.items.forEach(it => out.push(Object.assign({ _section: s.id }, it)))); return out; }
  function gradable(it) { return !['discuss', 'review', 'rank', 'interview', 'writing', 'reference', 'checklist', 'scores', 'draw', 'plan'].includes(it.type) && !it.free && !(it.inner && it.inner.free); }

  window.Core = { LS, Profiles, Store, norm, variants, matches, closeTo, h, esc, md, shuffle, toast, confirmBox, promptBox, download, Tutor, TutorLock, allItems, gradable };
})();
