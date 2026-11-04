// node tests/layout-check.js http://localhost:8765/ — геометрия картинок
// Ловит то, что не видно по «картинка загрузилась»: 3D-объекты и рисунки, которые вылезли из своей рамки
// и легли поверх текста задания (так было в Entry E1, упр. 1 — Figure A / Figure B).
// Проверяется каждый урок (все задания с иллюстрациями, панорама урока, обложки модулей) на 375 / 820 / 1366 px.
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:8765/';
const TOL = 6; // px — тени и «парящая» анимация
const res = []; const ok = (n, c, i) => res.push([c ? 'PASS' : 'FAIL', n, i || '']);

/* в браузере: все картинки внутри рамок + рамка иллюстрации не наезжает на следующий блок */
function measure(TOL) {
  const out = [];
  const boxes = '.ex-visual figure, .pduo-p, .pano, .ucover, .pb-t, .pfig';
  document.querySelectorAll('.ex-visual img, .ex-visual .pic-txt, .pano .po, .ucover .uc-o, .pduo-items > *').forEach(el => {
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const box = el.parentElement.closest(boxes); if (!box) return;
    const a = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    if (!a.width || !a.height) return;
    // объект считается «вылезшим», если его центр вне рамки или он выходит за рамку больше чем на треть своего размера
    const cx = (a.left + a.right) / 2, cy = (a.top + a.bottom) / 2;
    const outC = cx < b.left - TOL || cx > b.right + TOL || cy < b.top - TOL || cy > b.bottom + TOL;
    const spillY = Math.max(0, b.top - a.top, a.bottom - b.bottom), spillX = Math.max(0, b.left - a.left, a.right - b.right);
    if (outC || spillY > a.height / 3 + TOL || spillX > a.width / 3 + TOL)
      out.push((el.closest('[id^="ex-"]') || {}).id + ' ' + (el.getAttribute('src') || el.textContent).split('/').pop() + ' out of ' + box.className.split(' ')[0] + ' by ' + Math.round(Math.max(spillX, spillY)) + 'px');
  });
  // иллюстрация задания не перекрывает следующий за ней элемент
  document.querySelectorAll('.ex-visual').forEach(v => {
    const n = v.nextElementSibling; if (!n) return;
    const kids = [...v.querySelectorAll('img,svg,figure')].map(x => x.getBoundingClientRect().bottom);
    const bottom = Math.max(v.getBoundingClientRect().bottom, ...kids);
    if (bottom > n.getBoundingClientRect().top + TOL) out.push((v.closest('[id^="ex-"]') || {}).id + ' visual overlaps next block by ' + Math.round(bottom - n.getBoundingClientRect().top) + 'px');
  });
  return out;
}

(async () => {
  const b = await chromium.launch();
  for (const vp of [{ n: 'mobile', w: 375, h: 760, m: true }, { n: 'tablet', w: 820, h: 1180, m: true }, { n: 'desktop', w: 1366, h: 900 }]) {
    const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, isMobile: !!vp.m, hasTouch: !!vp.m, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(BASE); await p.waitForSelector('.hero');
    const lessons = await p.evaluate(() => BOOK.units.flatMap(u => u.lessons));
    const routes = ['#/'].concat(lessons.map(L => '#/lesson/' + L));
    for (const r of routes) {
      await p.evaluate(h => { location.hash = h; }, r); await p.waitForTimeout(120);
      // прокрутить к каждой картинке, чтобы lazy-загрузка отработала, и дождаться загрузки
      await p.evaluate(async () => {
        for (const el of document.querySelectorAll('.ex-visual,.hero-pano,.ucover')) el.scrollIntoView();
        await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 3000); })));
      });
      await p.waitForTimeout(150);
      const bad = await p.evaluate(measure, TOL);
      ok(vp.n + ' ' + r + ' pictures stay in their frames', bad.length === 0, bad.slice(0, 6).join(' | '));
    }
    await ctx.close();
  }
  await b.close();
  res.forEach(r => { if (r[0] === 'FAIL') console.log(r.join('  ')); });
  const f = res.filter(r => r[0] === 'FAIL').length;
  console.log('\n' + (res.length - f) + '/' + res.length + ' passed'); process.exit(f ? 1 : 0);
})();
