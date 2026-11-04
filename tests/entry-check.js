// node tests/entry-check.js http://localhost:8765/ [lessonIds...] — key→100%, tapfind, console, 375px overflow
const { chromium } = require('playwright');
const BASE = process.argv[2] || 'http://localhost:8765/';
(async () => {
  const b = await chromium.launch(); const res = []; const ok = (n, c, i) => res.push([c ? 'PASS' : 'FAIL', n, i || '']);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error' || /TapFind/.test(m.text())) errs.push(m.text()); });
  await page.goto(BASE); await page.waitForSelector('.hero');
  let ids = process.argv.slice(3); if (!ids.length) ids = await page.evaluate(() => BOOK.units.find(u => u.id === 'u0').lessons);
  await page.evaluate(() => sessionStorage.setItem('tutorUnlock', '1')); // тест: вход без кода (код в репозитории не хранится)
  await page.click('.tmode');
  for (const L of ids) {
    await page.evaluate(h => { location.hash = h; }, '#/lesson/' + L); await page.waitForTimeout(250);
    const cards = await page.$$eval('.ex', els => els.map(e => e.dataset.id));
    for (const id of cards) {
      const card = await page.$('#ex-' + id);
      const k = await card.$('button:has-text("Показать ключ")'); const c = await card.$('button:has-text("Check Answers")');
      if (k && c && !(await card.$('.keyless'))) { await k.click(); await c.click(); await page.waitForTimeout(40); const fb = await card.$eval('.ex-fb', e => e.textContent); ok('key→100% ' + id, /100%/.test(fb), fb); }
    }
  }
  const m = await b.newContext({ viewport: { width: 375, height: 760 }, isMobile: true, hasTouch: true }); const mp = await m.newPage();
  mp.on('pageerror', e => errs.push(String(e)));
  await mp.goto(BASE); await mp.waitForSelector('.hero');
  for (const L of ids) { await mp.evaluate(h => { location.hash = h; }, '#/lesson/' + L); await mp.waitForTimeout(250); const ov = await mp.evaluate(() => document.documentElement.scrollWidth - Math.min(innerWidth, screen.width)); ok('375px no h-scroll ' + L, ov <= 0, ov + 'px'); }
  ok('no console errors', errs.length === 0, errs.join(' | '));
  await b.close(); res.filter(r => r[0] === 'FAIL').forEach(r => console.log(r.join('  '))); console.log(res.filter(r => r[0] === 'PASS').length + '/' + res.length + ' passed');
})();
