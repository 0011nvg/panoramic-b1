// node tests/inventory.js [out.json] — снимок всего учебного содержания (уроки, задания, ключи, словарь).
// Используется для сравнения до/после изменений: node tests/inventory.js a.json && ... && diff
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/data-[^"]+)"/g)].map(m => m[1]);
const ctx = { window: {}, console, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} }, document: { createElement() { return {}; } } }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/core.js'), 'utf8'), ctx, { filename: 'js/core.js' });
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
const { BOOK, LESSONS, VOCAB } = ctx;
const stable = o => JSON.stringify(o, (k, v) => typeof v === 'function' ? String(v) : v);
const hash = o => crypto.createHash('sha1').update(stable(o)).digest('hex').slice(0, 12);
const out = { units: [], vocab: VOCAB.map(v => ({ w: v.w, lesson: v.lesson, h: hash(v) })), totals: {} };
let items = 0, book = 0, added = 0;
BOOK.units.forEach(u => out.units.push({ id: u.id, title: u.title, lessons: u.lessons.map(id => { const L = LESSONS[id];
  return { id, code: L.code, title: L.title, sections: L.sections.map(s => ({ id: s.id, title: s.title, items: s.items.map(it => { items++; it.source === 'added' ? added++ : book++; return { id: it.id, type: it.type, num: it.num, page: it.page, source: it.source || 'book', h: hash(it) }; }) })) }; }) }));
out.totals = { units: BOOK.units.length, lessons: Object.keys(LESSONS).length, items, book, added, vocab: VOCAB.length };
const dest = process.argv[2];
if (dest) fs.writeFileSync(dest, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.totals));
