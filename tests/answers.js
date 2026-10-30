// node tests/answers.js — модульные тесты проверки ответов (без браузера)
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const load = coreFile => { const ctx = { console, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} }, document: { createElement() { return {}; } } }; ctx.window = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(coreFile, 'utf8'), ctx);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  [...html.matchAll(/<script src="(js\/data-[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(root, m[1]), 'utf8'), ctx));
  return ctx; };
const C = load(path.join(root, 'js/core.js')); const { matches, closeTo } = C.Core;
let pass = 0, fail = 0; const t = (name, cond) => { if (cond) pass++; else { fail++; console.log('FAIL', name); } };
// принимаются
[['Tom\'s playing', 'Tom is playing'], ['he\'d finished', 'he had finished'], ['I\'d like', 'I would like'], ['she has got', 'she’s got'], ['He\'s got', 'he has got'],
 ['organized', 'organised'], ['They have realized that', 'They have realised that'], ['face to face', 'face-to-face'], ['half brother', 'half-brother'],
 ['five', '5'], ['twenty-four', '24'], ['every twenty four hours', 'every 24 hours'], ['Since', 'Since…'], ['It is raining.', 'It’s raining.'], ['  Don\'t  go ', 'Don’t go'],
 ['Mr Smith', 'Mr. Smith'], ['are not going', 'aren’t going'], ['1200', '1,200'], ['DON’T', "don't"], ['cannot', 'can’t'], ['can not', "can't"]]
  .forEach(([i, a]) => t('accept ' + i + ' = ' + a, matches(i, [a])));
// не принимаются
[['boy is', 'boy’s'], ['likes', 'like'], ['hangs', 'hang'], ['are siting', 'are sitting'], ['didnt', 'didn’t'], ['its', 'it’s'], ['it\'s', 'its'], ['size', 'sizes'],
 ['he would finished', 'he finished'], ['is playing', 'was playing'], ['', ''], ['-', '']]
  .forEach(([i, a]) => t('reject ' + i + ' ≠ ' + a, !matches(i, [a])));
t('apostrophe missing → almost', closeTo('didnt', ['didn’t']) && closeTo('dont go', ['don’t go']));
t('strict punctuation stays strict', !matches('oliver says he can’t come.', ['Oliver says he can’t come.'], { strict: true }));
// все ключи данных принимают сами себя; новые правила не начали принимать ответ соседнего пропуска
const O = load(path.join(__dirname, 'core-baseline.js'));
let keys = 0, cross = [];
Object.values(C.LESSONS).forEach(L => L.sections.forEach(s => s.items.forEach(it => {
  const src = it.inner || it; if (!src.paras || src.answers === null) return;
  const segs = src.paras.flat().filter(g => g && g.a && !g.sel);
  segs.forEach(g => [].concat(g.a).forEach(a => { keys++; t('key self ' + it.id + ' ' + a, matches(a, [].concat(g.a), g.strict ? { strict: true } : null)); }));
  segs.forEach((g, i) => segs.forEach((h, j) => { if (i === j) return; [].concat(h.a).forEach(a => { const nw = matches(a, [].concat(g.a)), od = O.Core.matches(a, [].concat(g.a)); if (nw && !od) cross.push(it.id + ': "' + a + '" now fits gap with key ' + JSON.stringify(g.a)); }); }));
})));
t('no new cross-gap acceptances', cross.length === 0); cross.forEach(c => console.log('  ', c));
console.log(pass + '/' + (pass + fail) + ' passed (' + keys + ' keys)'); process.exit(fail ? 1 : 0);
