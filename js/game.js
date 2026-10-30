/* ========== GAME LAYER: XP, levels, stars, streak, lesson missions, badges ==========
   Принцип: каждая награда привязана к учебному действию (правильный ответ, исправленная ошибка,
   слово, вспомненное по памяти с интервалом). Повтор уже решённого задания XP не даёт. */
(function () {
  'use strict';
  const { Store, allItems, gradable } = Core;
  const { SRS } = Vocab;

  const LEVELS = [[0, 'Newcomer'], [120, 'Explorer'], [300, 'Traveller'], [600, 'Navigator'], [1000, 'Pathfinder'], [1600, 'Voyager'], [2400, 'Globetrotter'], [3500, 'Trailblazer'], [5000, 'B1 Legend']];
  const emit = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));

  function G() {
    const d = Store.data();
    const g = d.game || (d.game = {});
    ['badges', 'missions', 'blitz', 'tips', 'wordsXP'].forEach(k => { if (!g[k] || typeof g[k] !== 'object') g[k] = {}; });
    if (!Array.isArray(g.days)) g.days = [];
    if (!Array.isArray(g.xpLog)) g.xpLog = [];
    g.xp = g.xp || 0; g.fixed = g.fixed || 0; g.bosses = g.bosses || 0;
    return g;
  }
  const dayKey = t => { const d = new Date(t || Date.now()); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  function markDay() { const g = G(); const k = dayKey(); if (g.days[g.days.length - 1] !== k) { g.days.push(k); if (g.days.length > 400) g.days.shift(); } }
  function streak() {
    const g = G(); if (!g.days.length) return 0;
    const set = new Set(g.days); let n = 0; const d = new Date();
    if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);           // серия жива, если вчера занимались
    while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function level(xp) {
    if (xp == null) xp = G().xp;
    let i = 0; while (i < LEVELS.length - 1 && xp >= LEVELS[i + 1][0]) i++;
    const from = LEVELS[i][0], to = LEVELS[i + 1] ? LEVELS[i + 1][0] : null;
    return { i: i + 1, name: LEVELS[i][1], xp, from, to, pct: to ? Math.round((xp - from) / (to - from) * 100) : 100, next: LEVELS[i + 1] ? LEVELS[i + 1][1] : null };
  }
  function addXP(n, why) {
    n = Math.round(n); if (!(n > 0)) return 0;
    const g = G(); const before = level(g.xp);
    g.xp += n; g.xpLog.push({ t: Date.now(), n, why }); if (g.xpLog.length > 300) g.xpLog.splice(0, g.xpLog.length - 300);
    markDay(); Store.save();
    const after = level(g.xp);
    emit('xp', { n, why, level: after, levelUp: after.i > before.i });
    return n;
  }

  /* ---------- stars: 1★ ≥ 50 %, 2★ ≥ 80 %, 3★ = 100 % (лучшая попытка) ---------- */
  const starsFor = best => best == null ? 0 : best >= 1 ? 3 : best >= .8 ? 2 : best >= .5 ? 1 : 0;
  function starable(it) { return gradable(it) && !['review', 'scores'].includes(it.type); }
  function stars(itemId) { const e = Store.data().ex[itemId]; return e && e.max && !e.self ? starsFor(e.best) : 0; }
  function lessonStars(lessonId) {
    let got = 0, max = 0;
    allItems(lessonId).forEach(it => { if (!starable(it)) return; max += 3; got += stars(it.id); });
    return { got, max };
  }

  /* ---------- exercise events (called by the exercise card) ---------- */
  function exerciseChecked(it, r, prevBest) {
    const g = G(); markDay();
    const best = Store.ex(it.id).best; const pct = r.max ? r.score / r.max : 0;
    let xp = 0; let fixed = false;
    if (prevBest == null) xp = 4 + 8 * pct + (pct === 1 ? 3 : 0);
    else if (best > prevBest) { xp = 8 * (best - prevBest); if (best === 1) { xp += 5; fixed = true; g.fixed++; } }
    const got = addXP(xp, fixed ? 'Fixed: ' + label(it) : label(it)); Store.save();
    if (!got) Store.save();
    const res = { xp: got, stars: starsFor(best), prevStars: starsFor(prevBest), fixed, pct, first: prevBest == null };
    emit('exercise-scored', Object.assign({ id: it.id, type: it.type, hint: !!it.hint }, res));
    evaluate();
    return res;
  }
  function exerciseDone(it, firstTime) {
    markDay(); const xp = firstTime ? addXP(4, label(it)) : 0; Store.save();
    emit('exercise-marked', { id: it.id, type: it.type, xp }); evaluate(); return xp;
  }
  const label = it => it.source === 'added' ? (it.title || 'Practice') : 'Ex. ' + it.num + ' p.' + it.page;

  /* ---------- vocabulary events ---------- */
  document.addEventListener('vocab-graded', e => {
    const { w, ok, kind, before, after } = e.detail; if (!ok) { markDay(); Store.save(); return; }
    let xp = 0;
    if (kind === 'recall' && after > before) xp += 2 + after;           // вспомнил по памяти и слово «повзрослело»
    else if (kind === 'recall') xp += 1;
    else if (before === 0 && after === 1) xp += 1;                      // первое узнавание
    if (after >= SRS_MASTER && before < SRS_MASTER) { xp += 5; emit('word-mastered', { w }); }
    if (xp) addXP(xp, 'Word: ' + w); else { markDay(); Store.save(); }
  });
  const SRS_MASTER = Vocab.MASTER_BOX;
  document.addEventListener('vocab-run-end', e => {
    const d = e.detail; const g = G();
    if (d.bonus) addXP(d.right * 3, 'Keks bonus round');
    if (d.guided && d.total) addXP(10, 'Learn with Keks session');
    if (d.test && d.pct >= 80) { g.bosses++; if (!g.wordsXP['boss:' + d.test]) { g.wordsXP['boss:' + d.test] = 1; addXP(20, 'Boss defeated: ' + d.test); } }
    Store.save(); evaluate();
  });
  // Blitz: XP только за первые 3 раунда в день — игра поддерживает повторение, но не заменяет учёбу
  document.addEventListener('blitz-end', e => {
    const g = G(); const k = dayKey(); if (!g.blitzDay || g.blitzDay.d !== k) g.blitzDay = { d: k, n: 0 };
    g.blitzDay.n++; if (g.blitzDay.n <= 3) addXP(Math.floor(e.detail.score / 3) + (e.detail.record ? 5 : 0), 'Keks Blitz'); else Store.save();
    evaluate();
  });

  /* ---------- lesson missions (3 per lesson, built from the lesson’s own content) ---------- */
  function missions(lessonId) {
    const items = allItems(lessonId); const ex = Store.data().ex;
    const core = items.filter(it => it.core !== false);
    const graded = items.filter(starable);
    const words = VOCAB.filter(v => v.lesson === lessonId);
    const out = [];
    out.push({ id: 'core', icon: '🧭', title: 'Core route', desc: 'Выполни все основные (Core) задания урока', cur: core.filter(it => ex[it.id] && ex[it.id].done).length, goal: core.length, xp: 25 });
    if (graded.length) { const goal = Math.min(3, graded.length); out.push({ id: 'stars', icon: '⭐', title: 'Sharp eye', desc: 'Получи ★★★ (100 %) в ' + goal + ' заданиях с проверкой — можно после Try Again', cur: Math.min(goal, graded.filter(it => stars(it.id) === 3).length), goal, xp: 20 }); }
    else { const talk = items.filter(it => ['discuss', 'interview', 'writing'].includes(it.type)); if (talk.length) out.push({ id: 'talk', icon: '🗣', title: 'Speak up', desc: 'Выполни все задания на говорение и письмо', cur: talk.filter(it => ex[it.id] && ex[it.id].done).length, goal: talk.length, xp: 20 }); }
    if (words.length) { const goal = Math.min(6, words.length); out.push({ id: 'words', icon: '🧠', title: 'Word keeper', desc: 'Вспомни по памяти ' + goal + ' слов урока (Learn with Keks, Type, Context)', cur: Math.min(goal, words.filter(v => SRS.st(v.w).box >= 2).length), goal, xp: 20 }); }
    else if (graded.length) { out.push({ id: 'polish', icon: '🛠', title: 'Polish', desc: 'Доведи все задания с проверкой минимум до ★★ (80 %)', cur: graded.filter(it => stars(it.id) >= 2).length, goal: graded.length, xp: 20 }); }
    const g = G();
    out.forEach(m => { m.key = lessonId + ':' + m.id; m.done = m.cur >= m.goal && m.goal > 0; m.claimed = !!g.missions[m.key]; });
    return out;
  }
  function lessonComplete(lessonId) { const core = allItems(lessonId).filter(it => it.core !== false); const ex = Store.data().ex; return core.length > 0 && core.every(it => ex[it.id] && ex[it.id].done); }

  /* ---------- badges ---------- */
  const BADGES = [
    { id: 'first', icon: '👣', name: 'First step', desc: 'Проверь первое задание', test: s => s.checked >= 1 },
    { id: 'lesson', icon: '🏁', name: 'Lesson complete', desc: 'Выполни все Core-задания одного урока', test: s => s.lessons >= 1 },
    { id: 'sharp', icon: '🎯', name: 'Sharp shooter', desc: '10 заданий на 100 %', test: s => s.perfect >= 10 },
    { id: 'fixer', icon: '🛠', name: 'Bug hunter', desc: 'Исправь 5 заданий до 100 % после ошибок', test: s => s.fixed >= 5 },
    { id: 'words25', icon: '📚', name: 'Word collector', desc: '25 выученных слов', test: s => s.mastered >= 25 },
    { id: 'words100', icon: '🧠', name: 'Living dictionary', desc: '100 выученных слов', test: s => s.mastered >= 100 },
    { id: 'boss', icon: '🏆', name: 'Boss slayer', desc: 'Победи в Boss Challenge или итоговом тесте (≥ 80 %)', test: s => s.bosses >= 1 },
    { id: 'blitz', icon: '⚡', name: 'Lightning paws', desc: 'Набери 20 очков в Keks Blitz', test: s => s.blitz >= 20 },
    { id: 'streak3', icon: '🔥', name: 'On a roll', desc: 'Занимайся 3 дня подряд', test: s => s.streak >= 3 },
    { id: 'streak7', icon: '🌟', name: 'Week warrior', desc: 'Занимайся 7 дней подряд', test: s => s.streak >= 7 },
    { id: 'missions', icon: '🗺', name: 'Mission expert', desc: 'Выполни 10 миссий уроков', test: s => s.missions >= 10 },
    { id: 'unit', icon: '👑', name: 'Unit champion', desc: 'Пройди все Core-задания целого модуля', test: s => s.units >= 1 }
  ];
  function summary() {
    const g = G(); const ex = Store.data().ex; const all = BOOK.units.flatMap(u => u.lessons);
    const vals = Object.values(ex);
    const done = all.filter(lessonComplete);
    return {
      checked: vals.filter(e => e.attempts && e.attempts.length).length,
      perfect: vals.filter(e => e.max && !e.self && e.best >= 1).length,
      fixed: g.fixed, bosses: g.bosses, mastered: SRS.stats(VOCAB).mastered,
      blitz: Math.max(0, ...Object.values(g.blitz)), streak: streak(),
      missions: Object.keys(g.missions).length, lessons: done.length,
      units: BOOK.units.filter(u => u.lessons.every(id => done.includes(id))).length
    };
  }
  function badges() { const g = G(); return BADGES.map(b => Object.assign({ got: !!g.badges[b.id], at: g.badges[b.id] || null }, b)); }

  /* ---------- evaluate: claim missions, award badges, detect lesson completion ---------- */
  let busy = false;
  function evaluate() {
    if (busy) return; busy = true;
    try {
      const g = G();
      const lessonId = (location.hash.match(/^#\/lesson\/([^/]+)/) || [])[1];
      const lessons = lessonId ? [lessonId] : [];
      lessons.forEach(id => {
        if (!LESSONS[id]) return;
        missions(id).forEach(m => { if (m.done && !m.claimed) { g.missions[m.key] = Date.now(); addXP(m.xp, 'Mission: ' + m.title); emit('mission-complete', { lesson: id, mission: m }); } });
        const k = 'done:' + id; if (lessonComplete(id) && !g.wordsXP[k]) { g.wordsXP[k] = Date.now(); addXP(30, 'Lesson complete: ' + LESSONS[id].title); emit('lesson-complete', { lesson: id, stars: lessonStars(id) }); }
      });
      const s = summary();
      BADGES.forEach(b => { if (!g.badges[b.id] && b.test(s)) { g.badges[b.id] = Date.now(); emit('badge', b); } });
      Store.save();
    } finally { busy = false; }
  }
  document.addEventListener('progress-changed', () => setTimeout(evaluate, 0));

  window.Game = { G, LEVELS, level, addXP, streak, stars, starsFor, starable, lessonStars, missions, lessonComplete, badges, summary, exerciseChecked, exerciseDone, evaluate, markDay };
})();
