/* ========== CORE: storage, profiles, answer checking, helpers ========== */
(function () {
  'use strict';
  const NS = 'iestudio.v1';
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
      e.attempts.push({ t: Date.now(), score, max });
      if (e.best == null || score / (max || 1) > e.best) e.best = max ? score / max : 1;
      Object.assign(e, extra || {});
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
    t = t.replace(/\s*([?.!,])\s*$/g, '').replace(/\s+([?.!,;:])/g, '$1');
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
  function matches(input, accepted, opts) {
    const n = norm(input, opts);
    if (!n) return false;
    return (accepted || []).some(a => norm(a, opts) === n);
  }
  // Levenshtein — used only to produce "almost" feedback, never to accept
  function lev(a, b) { a = a || ''; b = b || ''; const m = []; for (let i = 0; i <= b.length; i++) m[i] = [i]; for (let j = 0; j <= a.length; j++) m[0][j] = j; for (let i = 1; i <= b.length; i++) for (let j = 1; j <= a.length; j++) m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1); return m[b.length][a.length]; }
  function closeTo(input, accepted) { const n = norm(input); return (accepted || []).some(a => { const x = norm(a); return n && n !== x && lev(n, x) <= Math.max(1, Math.floor(x.length / 8)); }); }

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
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<i>$1</i>'); }
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

  /* ---------- Tutor mode (display only) ---------- */
  const Tutor = { on() { return !!LS.get('tutor', false); }, set(v) { LS.set('tutor', !!v); document.documentElement.classList.toggle('tutor', !!v); } };

  /* ---------- Content index ---------- */
  function allItems(lessonId) { const L = LESSONS[lessonId]; const out = []; L.sections.forEach(s => s.items.forEach(it => out.push(Object.assign({ _section: s.id }, it)))); return out; }
  function gradable(it) { return !['discuss', 'review', 'rank', 'interview', 'writing', 'reference', 'checklist', 'scores'].includes(it.type); }

  window.Core = { LS, Profiles, Store, norm, matches, closeTo, h, esc, md, shuffle, toast, confirmBox, promptBox, download, Tutor, allItems, gradable };
})();
