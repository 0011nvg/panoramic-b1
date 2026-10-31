// node tools/build-3d.js <путь к распакованному @lobehub/fluent-emoji-3d/assets>
// Ищет эмодзи во всех js/*.js, копирует нужные 3D-картинки в assets/3d/ и пишет карту js/pics-map.js.
// Источник: npm pack @lobehub/fluent-emoji-3d (Microsoft Fluent Emoji 3D, лицензия MIT).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('Укажите папку assets пакета @lobehub/fluent-emoji-3d'); process.exit(1); }
const have = new Set(fs.readdirSync(src).filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)));
const re = /(?:\p{Regional_Indicator}{2})|(?:[#*0-9]️?⃣)|(?:\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?)*)/gu;
const code = e => [...e].map(c => c.codePointAt(0).toString(16)).join('-');
const resolve = e => { const c = code(e); const variants = [c, c.replace(/-fe0f/g, ''), [...e].map(ch => ch.codePointAt(0).toString(16)).filter(x => x !== 'fe0f').join('-fe0f-') ];
  if (!e.includes('️')) variants.push(c + '-fe0f');
  return variants.find(v => have.has(v)) || null; };
const files = fs.readdirSync(path.join(root, 'js')).filter(f => f.endsWith('.js') && f !== 'pics-map.js' && !/^data-unit/.test(f));
const found = new Map(); const missing = new Set();
files.forEach(f => { const t = fs.readFileSync(path.join(root, 'js', f), 'utf8'); for (const m of t.matchAll(re)) { const e = m[0]; if (found.has(e) || missing.has(e)) continue; const r = resolve(e); if (r) found.set(e, r); else missing.add(e); } });
const out = path.join(root, 'assets', '3d'); fs.mkdirSync(out, { recursive: true });
const keep = new Set(found.values());
fs.readdirSync(out).filter(f => f.endsWith('.webp') && !keep.has(f.slice(0, -5))).forEach(f => fs.unlinkSync(path.join(out, f)));
let bytes = 0; keep.forEach(k => { fs.copyFileSync(path.join(src, k + '.webp'), path.join(out, k + '.webp')); bytes += fs.statSync(path.join(out, k + '.webp')).size; });
const map = {}; [...found.entries()].sort((a, b) => a[1].localeCompare(b[1])).forEach(([e, k]) => { map[e] = k; });
fs.writeFileSync(path.join(root, 'js', 'pics-map.js'), '/* Автоматически: node tools/build-3d.js — эмодзи → файл assets/3d/<код>.webp (Fluent Emoji 3D, MIT) */\nwindow.PICS_MAP = ' + JSON.stringify(map) + ';\n');
console.log('3D files:', keep.size, '·', Math.round(bytes / 1024) + ' KB', '· emoji without 3D:', [...missing].join(' '));
