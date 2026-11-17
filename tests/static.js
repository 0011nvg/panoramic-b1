/* Быстрая проверка без браузера: node tests/static.js
   · все файлы, на которые ссылаются index.html и данные (картинки, аудио, скрипты), существуют с точным регистром имени;
   · id заданий уникальны, у каждого задания из учебника есть страница и номер;
   · у заданий с автопроверкой есть ключ, и каждый ключ принимается собственной проверкой (Core.matches);
   · Unit 2–10 отмечены «скоро» и не содержат уроков. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL ' + m); } };
const exists = p => { const parts = p.split('/'); let dir = ROOT; for (const part of parts) { if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(part)) return false; dir = path.join(dir, part); } return true; };

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const css = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
[...scripts, ...css].forEach(s => ok(exists(s), 'file exists: ' + s));

/* minimal DOM-less sandbox: core.js needs document only for helpers we don't call */
const sandbox = { window: {}, console, document: { addEventListener() {}, documentElement: { classList: { toggle() {} } } }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} }, crypto: {}, TextEncoder };
sandbox.window = sandbox; vm.createContext(sandbox);
['js/core.js', 'js/course.js', 'js/data-starter.js', 'js/data-unit1.js', 'js/data-review.js', 'js/data-vocab.js', 'js/data-visuals.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f }));
const { BOOK, LESSONS, VOCAB, VISUALS, Core } = sandbox;

ok(BOOK.units.filter(u => !u.review).length === 11, 'Starter + 10 units in the course map');
BOOK.units.filter(u => u.soon).forEach(u => ok(u.lessons.length === 0, u.id + ' (soon) has no lessons'));
BOOK.units.filter(u => u.ready).forEach(u => u.lessons.forEach(id => ok(!!LESSONS[id], 'lesson exists: ' + id)));

const ids = new Set(); const files = new Set();
const grab = o => { if (!o || typeof o !== 'object') return; for (const k in o) { const v = o[k]; if (typeof v === 'string' && /^(assets|audio)\//.test(v)) files.add(v.split('#')[0]); else if (typeof v === 'object') grab(v); } };
Object.values(LESSONS).forEach(L => L.sections.forEach(s => s.items.forEach(it => {
  ok(!ids.has(it.id), 'unique id ' + it.id); ids.add(it.id);
  if (it.source !== 'added') { ok(it.page && it.num, it.id + ': page and number from the book'); }
  grab(it);
  const src = it.type === 'listen' ? it.inner : it;
  const t = src.type || it.type;
  if (t === 'gaps') src.paras.flat().filter(x => x && typeof x === 'object' && !x.open && !x.given && !x.br).forEach((g, i) => {
    if (g.sel) ok(g.sel.includes(g.a), `${it.id} select ${i + 1}: key is one of the options`);
    else ok(g.a && g.a.length && g.a.every(a => Core.matches(a, g.a)), `${it.id} gap ${i + 1}: key accepted`);
  });
  if (t === 'mcq') src.questions.forEach((q, i) => ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.options.length, `${it.id} q${i + 1}: key index`));
  if (t === 'inline') (it.lines ? it.lines.flat() : it.text).filter(x => typeof x === 'object').forEach((g, i) => ok([].concat(g.a).every(a => a >= 0 && a < g.o.length), `${it.id} choice ${i + 1}: key index`));
  if (t === 'order') it.items.forEach((x, i) => ok(x.a && Core.matches(x.a[0], x.a), `${it.id} item ${i + 1}: key accepted`));
  if (t === 'tickfix') it.items.forEach((x, i) => ok(x.ok || (x.a && Core.matches(x.a[0], x.a)), `${it.id} item ${i + 1}: key`));
  if (t === 'match') ok(it.answers.length === it.left.length, it.id + ': match key length');
  if (t === 'multi') ok(it.answers.every(a => a < it.options.length), it.id + ': multi key');
  if (t === 'sort') ok(it.words.every(w => w.c >= 0 && w.c < it.cats.length), it.id + ': sort key');
  if (['gaps', 'mcq', 'inline', 'order', 'tickfix', 'match', 'multi', 'sort', 'grid', 'tapfind', 'listen'].includes(it.type) && it.source !== 'added') ok(!!it.keySrc, it.id + ': key source (Teacher’s Book / prepared) is marked');
})));
Object.values(VISUALS.lessons).forEach(v => v.photo && files.add(v.photo)); Object.values(VISUALS.units).forEach(v => v.photo && files.add(v.photo));
files.forEach(f => ok(exists(f), 'file exists: ' + f));
const vw = VOCAB.map(v => v.w); ok(new Set(vw).size === vw.length, 'vocabulary words are unique');
VOCAB.forEach(v => { ok(!!LESSONS[v.lesson], v.w + ': lesson exists'); ok(v.ctx && v.ctx[0].split('___').length === 2, v.w + ': one gap in context sentence'); });
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
