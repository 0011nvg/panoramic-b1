// node tests/assets-check.js [URL опубликованного сайта] — проверка ресурсов без браузера (быстро, запускается в GitHub Actions перед публикацией)
// Проверяет, что КАЖДЫЙ файл, на который ссылается сайт, существует с точным регистром букв в имени
// (GitHub Pages различает Photo.webp и photo.webp, а Windows/macOS — нет, поэтому локально ошибка не видна):
//  · <script>/<link> в index.html, url(...) в CSS, пути assets/… и audio/… в коде;
//  · аудио всех заданий (audio.file);
//  · фото и 3D-объекты визуального слоя (VISUALS), карта эмодзи → assets/3d (PICS_MAP);
//  · каждый эмодзи в VISUALS имеет 3D-файл (иначе вместо картинки молча показывается текстовый эмодзи);
//  · SVG-рисунки (svg / draw / grammar), на которые ссылаются иллюстрации, существуют;
//  · каждая иллюстрация привязана к существующему заданию.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const res = []; const ok = (n, c, i) => res.push([c ? 'PASS' : 'FAIL', n, i || '']);

/* существует ли файл с ТОЧНО таким регистром в каждом сегменте пути */
const dirCache = {};
const used = new Set();
function existsExact(rel) {
  rel = rel.split(/[?#]/)[0].replace(/^\.\//, '');
  used.add(path.normalize(rel).split(path.sep).join('/'));
  let dir = root;
  for (const seg of path.normalize(rel).split(path.sep)) {
    if (seg === '..') { dir = path.dirname(dir); continue; }
    const list = dirCache[dir] || (dirCache[dir] = fs.existsSync(dir) && fs.statSync(dir).isDirectory() ? fs.readdirSync(dir) : []);
    if (!list.includes(seg)) return false;
    dir = path.join(dir, seg);
  }
  return fs.statSync(dir).isFile();
}
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

/* 1. index.html */
const html = read('index.html');
const htmlRefs = [...html.matchAll(/(?:src|href)="([^"#:]+)"/g)].map(m => m[1]).filter(u => !/^(https?:|mailto:|data:)/.test(u));
htmlRefs.forEach(u => ok('index.html → ' + u, existsExact(u)));

/* 2. CSS url(...) — относительно папки css/ */
for (const f of fs.readdirSync(path.join(root, 'css')).filter(f => f.endsWith('.css'))) {
  for (const m of read('css/' + f).matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const u = m[1]; if (/^(data:|https?:|#)/.test(u)) continue;
    ok('css/' + f + ' → ' + u, existsExact(path.join('css', u)));
  }
}

/* 3. явные пути в JS */
for (const f of fs.readdirSync(path.join(root, 'js')).filter(f => f.endsWith('.js'))) {
  for (const m of read('js/' + f).matchAll(/['"`]((?:assets|audio)\/[A-Za-z0-9_\-./]+\.(?:webp|png|jpe?g|svg|gif|mp3|woff2?))['"`]/g))
    ok('js/' + f + ' → ' + m[1], existsExact(m[1]));
}

/* 4. данные: задания, аудио, визуальный слой */
const ctx = { console, localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} }, document: { createElement() { return {}; } } }; ctx.window = ctx; vm.createContext(ctx);
const scripts = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1]);
const dataFiles = ['js/core.js'].concat(scripts.filter(s => /\/(data-|pics-map)/.test(s)));
dataFiles.forEach(f => vm.runInContext(read(f), ctx, { filename: f }));
try { vm.runInContext(read('js/visual-svg.js'), ctx, { filename: 'js/visual-svg.js' }); } catch (e) { ok('js/visual-svg.js loads', false, String(e)); }
const { BOOK, LESSONS, VISUALS, PICS_MAP, SVGART } = ctx;

const items = {}; let audioN = 0;
BOOK.units.forEach(u => u.lessons.forEach(id => {
  ok('lesson exists ' + id, !!LESSONS[id]);
  (LESSONS[id] ? LESSONS[id].sections : []).forEach(s => s.items.forEach(it => {
    items[it.id] = it;
    if (it.audio && it.audio.file) { audioN++; ok('audio ' + it.id + ' → ' + it.audio.file, existsExact(it.audio.file)); }
  }));
}));

const strip = e => String(e).replace(/️/g, '');
const mapIdx = {}; Object.keys(PICS_MAP).forEach(e => { mapIdx[e] = PICS_MAP[e]; mapIdx[strip(e)] = PICS_MAP[e]; });
Object.entries(PICS_MAP).forEach(([e, k]) => ok('3D ' + e + ' → assets/3d/' + k + '.webp', existsExact('assets/3d/' + k + '.webp')));
const emo = (e, where) => ok('3D picture for ' + e + ' (' + where + ')', !!(mapIdx[e] || mapIdx[strip(e)]));

Object.entries(VISUALS.lessons || {}).forEach(([id, s]) => { ok('panorama → lesson ' + id, !!LESSONS[id]); s.items.forEach(e => emo(e, 'lesson ' + id)); });
Object.entries(VISUALS.units || {}).forEach(([id, s]) => { ok('cover → unit ' + id, BOOK.units.some(u => u.id === id)); s.items.forEach(e => emo(e, 'unit ' + id)); });
Object.entries(VISUALS.sections || {}).forEach(([id, e]) => emo(e, 'section ' + id));
Object.entries(VISUALS.grammar || {}).forEach(([id, g]) => { ok('grammar visual → exercise ' + id, !!items[id]); ok('grammar scheme ' + g, !!(SVGART && SVGART.grammar[g])); });
Object.entries(VISUALS.items || {}).forEach(([id, s]) => {
  ok('visual → exercise ' + id, !!items[id]);
  if (s.photo) ok('photo ' + id + ' → assets/photos/' + s.photo + '.webp', existsExact('assets/photos/' + s.photo + '.webp'));
  if (s.k === 'svg') ok('svg scene ' + s.draw + ' (' + id + ')', !!(SVGART && SVGART.scene[s.draw]));
  (s.items || []).forEach(e => emo(e, id));
  (s.panels || []).forEach(p => p.items.forEach(e => emo(e, id)));
  (s.rows || []).forEach(r => emo(r[0], id));
  (s.tiles || []).forEach(t => { if (t && t.svg) ok('svg tile ' + t.svg + ' (' + id + ')', !!(SVGART && SVGART.tile[t.svg])); else (Array.isArray(t) ? t : [t]).forEach(e => emo(e, id)); });
});

/* 5. опубликованный сайт: node tests/assets-check.js https://0011nvg.github.io/panoramic-b1/ — каждый файл отдаётся с кодом 200 */
(async () => {
  const live = process.argv[2];
  if (live) {
    const base = live.endsWith('/') ? live : live + '/';
    const list = [''].concat([...used]); let i = 0;
    const worker = async () => { while (i < list.length) { const u = list[i++];
      let st = 0; for (let t = 0; t < 3 && st !== 200; t++) { try { st = (await fetch(base + u, { method: 'HEAD' })).status; } catch (e) { st = String(e.cause || e); } }
      ok('live ' + (u || '/') , st === 200, st); } };
    await Promise.all(Array.from({ length: 8 }, worker));
  }
  const f = res.filter(r => r[0] === 'FAIL');
  f.forEach(r => console.log(r.join('  ')));
  console.log('\n' + (res.length - f.length) + '/' + res.length + ' passed · ' + Object.keys(items).length + ' exercises, ' + audioN + ' audio files, ' + Object.keys(PICS_MAP).length + ' 3D objects' + (live ? ' · live: ' + live : ''));
  process.exit(f.length ? 1 : 0);
})();
