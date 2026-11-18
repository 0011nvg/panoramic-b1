/* Metadata for the supplied Unit 2 and Review tasks. Existing course IDs stay unchanged. */
(function () {
  for (const L of Object.values(LESSONS).filter(l => ['u2', 'r12'].includes(l.unit))) {
    for (const s of L.sections) for (const it of s.items) {
      if (it.mediaRequired) { it.core = false; it.keySrc = 'none'; continue; }
      const keyed = ['gaps', 'mcq', 'multi', 'match', 'sort', 'inline'].includes(it.type) || !!it.key;
      it.keySrc = keyed ? 'tb' : 'free';
      if (it.type === 'open' && !it.key) it.free = true;
      if (it.tutorNote && /Suggested|suggested/.test(it.tutorNote) && it.key) it.keySrc = 'tb-sug';
      if (it.type === 'gaps') for (const g of it.paras.flat()) {
        if (g && typeof g === 'object' && g.sel && Array.isArray(g.a)) g.a = g.a[0];
      }
    }
  }
})();
