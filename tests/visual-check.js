// node tests/visual-check.js http://localhost:8765/ — проверка визуального слоя
// Каждая иллюстрация к заданию отрисована, все картинки (в т.ч. внутри SVG) загружаются,
// у каждой иллюстрации есть описание для экранного диктора, нет горизонтальной прокрутки на 375 / 820 / 1366 px.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const BASE = process.argv[2] || 'http://localhost:8765/';
const res = []; const ok = (n, c, i) => res.push([c ? 'PASS' : 'FAIL', n, i || '']);
(async () => {
  const b = await chromium.launch();
  // 1. файлы 3D из карты существуют
  const map = fs.readFileSync(path.join(__dirname, '../js/pics-map.js'), 'utf8').match(/\{.*\}/)[0];
  const missing = Object.values(JSON.parse(map)).filter(k => !fs.existsSync(path.join(__dirname, '../assets/3d', k + '.webp')));
  ok('all 3D files present', missing.length === 0, missing.join(','));
  for (const vp of [{ n: 'mobile', w: 375, h: 760, m: true }, { n: 'tablet', w: 820, h: 1180, m: true }, { n: 'desktop', w: 1366, h: 900 }]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: !!vp.m, hasTouch: !!vp.m });
    const p = await ctx.newPage(); const errs = []; const bad = [];
    p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('response', r => { if (r.status() >= 400) bad.push(r.url()); });
    await p.goto(BASE); await p.waitForSelector('.hero');
    const items = await p.evaluate(() => { const o = []; for (const k in LESSONS) for (const s of LESSONS[k].sections) for (const it of s.items) if (VISUALS.items[it.id] || VISUALS.grammar[it.id]) o.push([k, it.id]); return o; });
    if (vp.n === 'desktop') ok('every visual spec matches an exercise', items.length === Object.keys((await p.evaluate(() => VISUALS.items))).length + Object.keys(await p.evaluate(() => VISUALS.grammar)).length, items.length);
    const lessons = [...new Set(items.map(x => x[0]))].concat(['u1-1', 'u3-2']);
    for (const L of await p.evaluate(() => BOOK.units.flatMap(u => u.lessons))) {
      await p.evaluate(h => { location.hash = h; }, '#/lesson/' + L); await p.waitForTimeout(150);
      if (!lessons.includes(L) && vp.n !== 'mobile') continue;
      await p.evaluate(async () => { for (const el of document.querySelectorAll('.ex-visual,.hero-pano,.lsec-h')) { el.scrollIntoView(); await new Promise(r => setTimeout(r, 30)); } });
      await p.waitForTimeout(500);
      const r = await p.evaluate(() => ({
        ov: document.documentElement.scrollWidth - Math.min(innerWidth, screen.width),
        broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
        hero: !!document.querySelector('.hero-pano')
      }));
      ok(vp.n + ' ' + L + ' no overflow', r.ov <= 0, r.ov + 'px'); ok(vp.n + ' ' + L + ' images load', r.broken.length === 0, r.broken.join(','));
      ok(vp.n + ' ' + L + ' lesson panorama', r.hero);
    }
    for (const [L, id] of items) {
      await p.evaluate(h => { location.hash = h; }, '#/lesson/' + L + '/' + id); await p.waitForTimeout(120);
      const r = await p.evaluate(id => { const v = document.querySelector('#ex-' + id + ' .ex-visual'); if (!v) return null; const lab = v.querySelector('[aria-label]'); const im = v.querySelector('img[alt]'); return { label: lab ? lab.getAttribute('aria-label') : im ? im.getAttribute('alt') : '', svgImgs: [...v.querySelectorAll('image')].map(i => i.getAttribute('href')) }; }, id);
      ok(vp.n + ' visual rendered ' + id, !!r); if (!r) continue;
      if (vp.n === 'desktop') { ok('alt text ' + id, r.label && r.label.length > 3, r.label);
        for (const s of r.svgImgs) { const st = await p.evaluate(u => fetch(u).then(x => x.status), s); ok('svg image ' + id + ' ' + s, st === 200, st); } }
    }
    for (const r of ['#/', '#/vocab/u1-2/pic', '#/vocab/u1-2/scene', '#/vocab/u0-4/flash', '#/progress']) {
      await p.evaluate(h => { location.hash = h; }, r); await p.waitForTimeout(500);
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - Math.min(innerWidth, screen.width));
      ok(vp.n + ' no overflow ' + r, ov <= 0, ov + 'px');
    }
    ok(vp.n + ' console errors', errs.length === 0, errs.join(' | ')); ok(vp.n + ' failed requests', bad.length === 0, bad.join(' | '));
    await ctx.close();
  }
  await b.close();
  res.filter(r => r[0] === 'FAIL').forEach(r => console.log(r.join(' · ')));
  console.log(res.filter(r => r[0] === 'PASS').length + '/' + res.length + ' passed');
  process.exit(res.some(r => r[0] === 'FAIL') ? 1 : 0);
})();
