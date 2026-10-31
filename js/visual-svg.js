/* ========== SVGART: оригинальные иллюстрации платформы (SVG) ==========
   Плоский «плакатный» стиль в фирменной палитре + 3D-объекты (assets/3d) внутри сцен.
   Номера на рисунках идут в том же порядке, что и строки задания.                    */
(function () {
  'use strict';
  const C = { ink: '#16161D', paper: '#F7F4ED', card: '#FFFDF8', blue: '#3D3BFF', blueL: '#CFCEFF', pink: '#FF4FA3', pinkL: '#FFD3E8', yellow: '#FFD400', yellowL: '#FFF0A6', orange: '#FF7A00', orangeL: '#FFD5AE', green: '#3DAA82', greenL: '#CDEBDD', greenD: '#24795A', navy: '#1F2A6B', sky: '#D6E9FF', sand: '#F1DCAE', wood: '#B9773E', grey: '#B8B2A6', greyL: '#E4DED2', skin1: '#F6D3B5', skin2: '#8A5A3C' };
  let n = 0; const uid = p => p + (++n);
  const S = 'stroke="' + C.ink + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  const svg = (vb, body, cls) => '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" class="' + (cls || '') + '" focusable="false" aria-hidden="true" font-family="Manrope,system-ui,sans-serif">' + body + '</svg>';
  const im = (e, x, y, s, rot) => { const src = window.Pics && Pics.src(e); if (!src) return '<text x="' + (x + s / 2) + '" y="' + (y + s * .8) + '" font-size="' + s * .8 + '" text-anchor="middle">' + e + '</text>'; return '<image href="' + src + '" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '"' + (rot ? ' transform="rotate(' + rot + ' ' + (x + s / 2) + ' ' + (y + s / 2) + ')"' : '') + '/>'; };
  const mk = (x, y, num) => '<g class="mk"><circle cx="' + x + '" cy="' + y + '" r="15" fill="' + C.ink + '" stroke="#fff" stroke-width="3"/><text x="' + x + '" y="' + (y + 5.5) + '" font-size="15" font-weight="800" fill="#fff" text-anchor="middle">' + num + '</text></g>';
  const txt = (x, y, t, o) => { o = o || {}; return '<text x="' + x + '" y="' + y + '" font-size="' + (o.s || 14) + '" font-weight="' + (o.w || 800) + '" fill="' + (o.f || C.ink) + '" text-anchor="' + (o.a || 'middle') + '"' + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') + (o.fam ? ' font-family="' + o.fam + '"' : '') + '>' + t + '</text>'; };

  /* ===================== СЦЕНЫ ===================== */
  const scene = {};

  /* Дом в разрезе: 1 basement … 12 bathroom (порядок строк задания e3-9-2) */
  scene.house = () => {
    const room = (x, y, w, hh, fill) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="' + fill + '" ' + S + '/>';
    let b = '<rect width="720" height="470" fill="' + C.sky + '"/><circle cx="640" cy="70" r="40" fill="' + C.yellow + '"/>';
    b += '<rect y="372" width="720" height="98" fill="#8C6A4A"/><rect y="364" width="720" height="12" fill="' + C.green + '"/>';
    // roof + attic
    b += '<path d="M90 160 L360 40 L630 160 Z" fill="' + C.orange + '" ' + S + '/><path d="M170 152 L360 70 L550 152 Z" fill="' + C.yellowL + '" ' + S + '/>';
    b += im('📦', 300, 98, 44) + im('🧸', 352, 104, 38);
    // first floor: bedroom, bathroom, study
    b += room(110, 160, 190, 102, C.pinkL) + room(300, 160, 150, 102, C.blueL) + room(450, 160, 160, 102, C.greenL);
    b += im('🛏️', 150, 196, 64) + im('🛁', 340, 196, 62) + im('💻', 500, 200, 54);
    // ground floor: hall (stairs+door), living room, kitchen, dining room, toilet
    b += room(110, 262, 110, 102, C.yellowL) + room(220, 262, 140, 102, C.orangeL) + room(360, 262, 100, 102, C.greenL) + room(460, 262, 100, 102, C.pinkL) + room(560, 262, 50, 102, C.blueL);
    b += '<path d="M120 362 L120 340 L142 340 L142 318 L164 318 L164 296 L186 296 L186 274 L208 274" fill="none" ' + S + '/><rect x="64" y="292" width="46" height="72" rx="4" fill="' + C.blue + '" ' + S + '/><circle cx="100" cy="330" r="3.5" fill="' + C.yellow + '"/>';
    b += im('🛋️', 236, 300, 60) + im('📺', 300, 284, 46) + im('🍳', 372, 300, 52) + im('🍽️', 478, 302, 58) + im('🚽', 562, 318, 44);
    // basement
    b += room(110, 372, 500, 80, '#E8D7C2') + im('🧺', 260, 384, 56) + im('🧰', 380, 388, 52) + im('🚲', 470, 384, 60);
    // floor brackets (downstairs / upstairs)
    b += '<path d="M640 266 v94" stroke="' + C.ink + '" stroke-width="3"/><path d="M632 266 h16 M632 360 h16" stroke="' + C.ink + '" stroke-width="3"/>';
    b += '<path d="M640 164 v94" stroke="' + C.ink + '" stroke-width="3"/><path d="M632 164 h16 M632 258 h16" stroke="' + C.ink + '" stroke-width="3"/>';
    b += mk(80, 412, 1) + mk(668, 313, 2) + mk(668, 211, 3) + mk(250, 120, 4) + mk(165, 280, 5) + mk(240, 280, 6) + mk(574, 180, 7) + mk(378, 280, 8) + mk(476, 280, 9) + mk(585, 290, 10) + mk(128, 180, 11) + mk(318, 180, 12);
    return svg('0 0 720 470', b);
  };

  /* Гостиная и кухня: 1 lamp … 9 fridge (порядок строк задания e3-11-4) */
  scene.livingKitchen = () => {
    const id = uid('cp');
    let b = '<defs><pattern id="' + id + '" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" fill="' + C.orange + '"/><path d="M0 6 L6 0 L12 6 L18 0 L24 6" fill="none" stroke="' + C.yellow + '" stroke-width="3"/></pattern></defs>';
    b += '<rect width="760" height="380" fill="' + C.yellowL + '"/><rect x="430" width="330" height="380" fill="' + C.greenL + '"/><rect y="300" width="760" height="80" fill="#E6D3B8"/>';
    b += '<rect x="420" y="40" width="14" height="262" fill="' + C.card + '" ' + S + '/>';
    b += '<rect x="250" y="60" width="120" height="80" rx="6" fill="' + C.sky + '" ' + S + '/><path d="M310 60 v80 M250 100 h120" stroke="' + C.ink + '" stroke-width="3"/>';
    // bookcase (3)
    b += '<rect x="24" y="96" width="92" height="206" fill="' + C.wood + '" ' + S + '/>';
    [134, 182, 230].forEach(y => { b += '<path d="M24 ' + y + ' h92" stroke="' + C.ink + '" stroke-width="3"/>'; });
    const books = [[C.blue, C.pink, C.yellow, C.green, C.orange], [C.pink, C.navy, C.yellow, C.blue], [C.green, C.orange, C.pink, C.blue, C.yellow], [C.yellow, C.blue, C.pink]];
    books.forEach((row, r) => { let x = 32; row.forEach((c, i) => { const w = 12 + (i % 2) * 4; const hh = 26 + ((i + r) % 3) * 5; b += '<rect x="' + x + '" y="' + (132 + r * 48 - hh) + '" width="' + w + '" height="' + hh + '" fill="' + c + '" stroke="' + C.ink + '" stroke-width="2"/>'; x += w + 3; }); });
    // lamp (1)
    b += '<path d="M148 300 v-170" stroke="' + C.ink + '" stroke-width="5"/><ellipse cx="148" cy="302" rx="22" ry="6" fill="' + C.ink + '"/><path d="M122 132 L174 132 L162 92 L134 92 Z" fill="' + C.yellow + '" ' + S + '/>';
    // carpet (5)
    b += '<ellipse cx="270" cy="338" rx="150" ry="26" fill="url(#' + id + ')" ' + S + '/>';
    // sofa (2)
    b += '<rect x="176" y="208" width="196" height="64" rx="16" fill="' + C.blue + '" ' + S + '/><rect x="168" y="244" width="212" height="54" rx="14" fill="' + C.blue + '" ' + S + '/><rect x="160" y="228" width="34" height="76" rx="12" fill="#2E2CD0" ' + S + '/><rect x="356" y="228" width="34" height="76" rx="12" fill="#2E2CD0" ' + S + '/><path d="M200 300 v12 M346 300 v12" ' + S + '/><rect x="212" y="226" width="44" height="26" rx="8" fill="' + C.yellow + '" ' + S + '/>';
    // kitchen: fridge (9), cooker (7), sink (8), washing machine (6)
    b += '<rect x="448" y="96" width="74" height="206" rx="8" fill="#fff" ' + S + '/><path d="M448 170 h74" stroke="' + C.ink + '" stroke-width="3"/><path d="M510 120 v28 M510 186 v40" stroke="' + C.ink + '" stroke-width="5"/>';
    b += '<rect x="534" y="214" width="208" height="16" fill="' + C.card + '" ' + S + '/>';
    b += '<rect x="534" y="230" width="70" height="72" fill="' + C.grey + '" ' + S + '/><rect x="546" y="246" width="46" height="34" rx="4" fill="' + C.ink + '"/><ellipse cx="552" cy="212" rx="12" ry="4" fill="' + C.ink + '"/><ellipse cx="586" cy="212" rx="12" ry="4" fill="' + C.ink + '"/>';
    b += '<rect x="604" y="230" width="66" height="72" fill="' + C.card + '" ' + S + '/><path d="M616 214 c0 -14 -2 -30 18 -30 c16 0 16 12 16 18" fill="none" stroke="' + C.ink + '" stroke-width="5"/><rect x="616" y="208" width="44" height="10" rx="5" fill="' + C.sky + '" ' + S + '/>';
    b += '<rect x="670" y="230" width="72" height="72" fill="#fff" ' + S + '/><circle cx="706" cy="270" r="22" fill="' + C.sky + '" ' + S + '/><circle cx="706" cy="270" r="12" fill="#9CC8F5"/><circle cx="684" cy="242" r="3" fill="' + C.ink + '"/><circle cx="694" cy="242" r="3" fill="' + C.ink + '"/>';
    b += '<rect x="560" y="70" width="150" height="70" rx="6" fill="' + C.card + '" ' + S + '/><path d="M635 70 v70" stroke="' + C.ink + '" stroke-width="3"/>' + im('🫖', 578, 86, 40) + im('🍯', 652, 88, 38);
    // armchair drawn at left front, overlapping carpet
    const ax = 30, ay = 238;
    b += '<rect x="' + (ax + 8) + '" y="' + ay + '" width="76" height="70" rx="16" fill="' + C.pink + '" ' + S + '/><rect x="' + ax + '" y="' + (ay + 34) + '" width="92" height="44" rx="12" fill="' + C.pink + '" ' + S + '/><rect x="' + (ax - 6) + '" y="' + (ay + 24) + '" width="24" height="62" rx="10" fill="#E2368A" ' + S + '/><rect x="' + (ax + 74) + '" y="' + (ay + 24) + '" width="24" height="62" rx="10" fill="#E2368A" ' + S + '/>';
    b += mk(148, 70, 1) + mk(274, 198, 2) + mk(70, 82, 3) + mk(74, 296, 4) + mk(400, 346, 5) + mk(706, 318, 6) + mk(569, 318, 7) + mk(637, 318, 8) + mk(485, 82, 9);
    return svg('0 0 760 380', b);
  };

  /* Одежда 1–12 (порядок строк задания e5-19-1) */
  scene.clothes = () => {
    const P = {}; const defs = [];
    const pat = (name, w, hh, body) => { const id = uid('p' + name); P[name] = 'url(#' + id + ')'; defs.push('<pattern id="' + id + '" width="' + w + '" height="' + hh + '" patternUnits="userSpaceOnUse">' + body + '</pattern>'); };
    pat('dots', 18, 18, '<rect width="18" height="18" fill="#E5323E"/><circle cx="9" cy="9" r="4" fill="' + C.ink + '"/>');
    pat('flowers', 34, 34, '<rect width="34" height="34" fill="' + C.blue + '"/><g><circle cx="9" cy="9" r="5" fill="' + C.pink + '"/><circle cx="9" cy="9" r="2" fill="' + C.yellow + '"/><circle cx="26" cy="24" r="6" fill="' + C.yellow + '"/><circle cx="26" cy="24" r="2.4" fill="' + C.orange + '"/><circle cx="25" cy="7" r="3" fill="#7CE0B5"/><circle cx="8" cy="27" r="3.5" fill="' + C.orange + '"/></g>');
    pat('stripes', 20, 20, '<rect width="20" height="20" fill="#fff"/><rect width="20" height="10" fill="' + C.blue + '"/>');
    pat('checks', 24, 24, '<rect width="24" height="24" fill="#2F8F5B"/><rect width="12" height="24" fill="#57B37F" opacity=".7"/><rect width="24" height="12" fill="#1F6B43" opacity=".55"/>');
    pat('nordic', 28, 28, '<rect width="28" height="28" fill="' + C.navy + '"/><path d="M0 7 L7 0 L14 7 L21 0 L28 7" fill="none" stroke="#E5323E" stroke-width="3"/><path d="M14 14 l4 4 -4 4 -4 -4z" fill="#fff"/><path d="M0 26 h28" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>');
    pat('wool', 12, 12, '<rect width="12" height="12" fill="#F5C531"/><path d="M0 0 L6 6 L12 0 M0 6 L6 12 L12 6" fill="none" stroke="#D9A50E" stroke-width="2"/>');
    pat('cord', 10, 10, '<rect width="10" height="10" fill="#9A5B2E"/><rect width="4" height="10" fill="#7A4220"/>');
    pat('denim', 10, 10, '<rect width="10" height="10" fill="#3F67B1"/><path d="M0 10 L10 0" stroke="#5D86D0" stroke-width="2"/>');
    const tee = 'M-46 -44 L-18 -54 Q0 -42 18 -54 L46 -44 L60 -14 L38 -6 L38 52 L-38 52 L-38 -6 L-60 -14 Z';
    const jumper = 'M-44 -46 L-16 -54 Q0 -44 16 -54 L44 -46 L62 40 L44 44 L36 -8 L36 54 L-36 54 L-36 -8 L-44 44 L-62 40 Z';
    const shirt = 'M-44 -46 L-14 -54 L0 -38 L14 -54 L44 -46 L62 36 L44 40 L36 -6 L36 54 L-36 54 L-36 -6 L-44 40 L-62 36 Z';
    const dress = 'M-20 -54 Q0 -44 20 -54 L28 -34 L18 -10 L50 54 L-50 54 L-18 -10 L-28 -34 Z';
    const skirt = 'M-28 -30 L28 -30 L50 46 L-50 46 Z';
    const jacket = 'M-44 -46 L-12 -54 L0 -30 L12 -54 L44 -46 L60 38 L42 42 L36 -4 L38 50 L-38 50 L-36 -4 L-42 42 L-60 38 Z';
    const scarf = 'M-56 -22 C -20 -44 20 -4 56 -26 L 60 -8 C 24 14 -16 -26 -52 -4 Z M20 -12 L34 46 L18 50 L8 -6 Z';
    const items = [
      [tee, '#FFD84A'], [dress, P.dots], [tee, P.flowers], [tee, P.stripes], [shirt, P.checks], [jumper, P.nordic],
      [jumper, P.wool], [skirt, P.cord], [jacket, '#26262E'], [shirt, '#F4F1E8'], [skirt, P.denim], [scarf, 'silk']
    ];
    const silk = uid('silk'); defs.push('<linearGradient id="' + silk + '" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#FF8EC6"/><stop offset=".45" stop-color="#FFE3F1"/><stop offset=".55" stop-color="#FF6FB5"/><stop offset="1" stop-color="#C21F78"/></linearGradient>');
    let b = '<defs>' + defs.join('') + '</defs><rect width="720" height="520" fill="' + C.paper + '"/>';
    items.forEach(([d, fill], i) => {
      const cx = 90 + (i % 4) * 180, cy = 92 + Math.floor(i / 4) * 170;
      b += '<rect x="' + (cx - 82) + '" y="' + (cy - 80) + '" width="164" height="156" rx="18" fill="' + [C.blueL, C.pinkL, C.yellowL, C.greenL][(i + Math.floor(i / 4)) % 4] + '" opacity=".55"/>';
      b += '<path d="' + d + '" transform="translate(' + cx + ' ' + cy + ')" fill="' + (fill === 'silk' ? 'url(#' + silk + ')' : fill) + '" ' + S + '/>';
      if (i === 8) b += '<path d="M' + cx + ' ' + (cy - 30) + ' v80" stroke="#C9C9D4" stroke-width="3" stroke-dasharray="4 3"/><path d="M' + (cx - 12) + ' ' + (cy - 54) + ' L' + (cx - 26) + ' ' + (cy - 12) + ' M' + (cx + 12) + ' ' + (cy - 54) + ' L' + (cx + 26) + ' ' + (cy - 12) + '" stroke="#55556A" stroke-width="3"/><path d="M' + (cx - 30) + ' ' + (cy - 40) + ' q8 10 22 8" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>';
      if (i === 4 || i === 9) b += '<g fill="' + C.ink + '">' + [0, 1, 2, 3].map(k => '<circle cx="' + cx + '" cy="' + (cy - 20 + k * 18) + '" r="2.6"/>').join('') + '</g>';
      if (i === 10) b += '<path d="M' + (cx - 26) + ' ' + (cy - 20) + ' h52" stroke="#F2B544" stroke-width="2.4" stroke-dasharray="5 4"/>';
      b += mk(cx - 64, cy - 62, i + 1);
    });
    return svg('0 0 720 520', b);
  };

  /* Четыре мальчика (e1-4-8): причёска, цвет, длина волос, цвет кожи */
  scene.boys = () => {
    const blond = '#F2C94C', brown = '#5B3A22';
    const face = (cx, skin) => '<path d="M' + (cx - 34) + ' 300 Q' + (cx - 40) + ' 228 ' + cx + ' 226 Q' + (cx + 40) + ' 228 ' + (cx + 34) + ' 300 Z" fill="' + [C.blue, C.pink, C.orange, C.green][Math.round((cx - 100) / 170)] + '" ' + S + '/>' +
      '<rect x="' + (cx - 11) + '" y="198" width="22" height="32" fill="' + skin + '" ' + S + '/><ellipse cx="' + cx + '" cy="150" rx="46" ry="56" fill="' + skin + '" ' + S + '/>' +
      '<circle cx="' + (cx - 16) + '" cy="152" r="4.5" fill="' + C.ink + '"/><circle cx="' + (cx + 16) + '" cy="152" r="4.5" fill="' + C.ink + '"/><path d="M' + (cx - 14) + ' 178 q14 10 28 0" fill="none" stroke="' + C.ink + '" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="' + (cx - 46) + '" cy="156" rx="7" ry="11" fill="' + skin + '" ' + S + '/><ellipse cx="' + (cx + 46) + '" cy="156" rx="7" ry="11" fill="' + skin + '" ' + S + '/>';
    const hair = {
      shortStraight: (cx, c) => '<path d="M' + (cx - 48) + ' 134 C ' + (cx - 52) + ' 78 ' + (cx + 52) + ' 78 ' + (cx + 48) + ' 134 Z" fill="' + c + '" ' + S + '/><path d="M' + (cx - 30) + ' 134 v-10 M' + (cx - 10) + ' 134 v-12 M' + (cx + 10) + ' 134 v-12 M' + (cx + 30) + ' 134 v-10" stroke="#D9AE2E" stroke-width="2.5"/>',
      shortCurly: (cx, c) => { let s = ''; for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * .11); s += '<circle cx="' + (cx + Math.cos(a) * 44).toFixed(1) + '" cy="' + (140 + Math.sin(a) * 50).toFixed(1) + '" r="15" fill="' + c + '" ' + S + '/>'; } return s + '<circle cx="' + cx + '" cy="100" r="18" fill="' + c + '" ' + S + '/>'; },
      longStraight: (cx, c) => '<path d="M' + (cx - 50) + ' 236 L ' + (cx - 54) + ' 140 C ' + (cx - 54) + ' 84 ' + (cx + 54) + ' 84 ' + (cx + 54) + ' 140 L ' + (cx + 50) + ' 236 L ' + (cx + 30) + ' 236 L ' + (cx + 32) + ' 130 L ' + (cx - 32) + ' 130 L ' + (cx - 30) + ' 236 Z" fill="' + c + '" ' + S + '/>',
      wavyMedium: (cx, c) => '<path d="M' + (cx - 50) + ' 192 q -12 -14 0 -26 q -12 -14 0 -26 q -10 -60 50 -62 q 60 2 50 62 q 12 12 0 26 q 12 12 0 26 q -10 6 -16 0 q 8 -14 -2 -26 q 8 -14 -2 -36 L ' + (cx - 30) + ' 130 q -10 22 -2 36 q -10 12 -2 26 q -6 6 -16 0 Z" fill="' + c + '" ' + S + '/>'
    };
    const boys = [[100, 'shortStraight', blond, C.skin1], [270, 'shortCurly', brown, C.skin2], [440, 'longStraight', blond, C.skin1], [610, 'wavyMedium', brown, C.skin1]];
    let b = '<rect width="710" height="300" fill="' + C.paper + '"/>';
    boys.forEach(([cx, hs, hc, sk], i) => {
      b += '<rect x="' + (cx - 78) + '" y="14" width="156" height="286" rx="20" fill="' + [C.yellowL, C.blueL, C.pinkL, C.greenL][i] + '"/>';
      if (hs === 'longStraight') b += hair[hs](cx, hc);
      b += face(cx, sk);
      if (hs !== 'longStraight') b += hair[hs](cx, hc); else b += '<path d="M' + (cx - 44) + ' 134 C ' + (cx - 30) + ' 100 ' + (cx + 30) + ' 100 ' + (cx + 44) + ' 134 L ' + (cx + 44) + ' 118 C ' + (cx + 30) + ' 82 ' + (cx - 30) + ' 82 ' + (cx - 44) + ' 118 Z" fill="' + hc + '" ' + S + '/>';
      b += mk(cx - 56, 40, i + 1);
    });
    return svg('0 0 710 300', b);
  };

  /* Рисунок Теда: 1 campsite … 7 river (порядок строк задания e6-23-4) */
  scene.campsite = () => {
    let b = '<rect width="720" height="420" fill="#BFE0FF"/><circle cx="600" cy="70" r="36" fill="' + C.yellow + '" ' + S + '/>';
    b += '<path d="M60 70 q20 -22 44 -6 q18 -18 40 0 q20 2 14 20 h-104 q-14 -8 6 -14z" fill="#fff" ' + S + '/>';
    b += '<path d="M-10 230 L130 96 L250 210 L360 120 L520 230 Z" fill="#9AA8C9" ' + S + '/><path d="M110 116 l20 -20 20 20 -10 6 -10 -8 -10 8z M340 140 l20 -20 18 18 -10 6 -8 -6 -10 8z" fill="#fff"/>';
    b += '<path d="M-10 270 C 120 180 260 190 380 250 S 620 200 730 240 V420 H-10Z" fill="#7CC27A" ' + S + '/>';
    b += '<path d="M-10 300 C 160 270 300 300 450 290 S 650 280 730 300 V420 H-10Z" fill="#A6DB86"/>';
    // woods
    for (let i = 0; i < 9; i++) { const x = 40 + i * 34, y = 222 + (i % 3) * 8; b += '<path d="M' + x + ' ' + (y + 52) + ' v14" stroke="' + C.ink + '" stroke-width="3"/><path d="M' + (x - 18) + ' ' + (y + 54) + ' L' + x + ' ' + (y - 6) + ' L' + (x + 18) + ' ' + (y + 54) + ' Z" fill="' + (i % 2 ? '#2F8F5B' : '#3DAA82') + '" ' + S + '/>'; }
    // river
    b += '<path d="M520 420 C 520 360 640 350 620 300 S 690 250 730 250 L730 272 C 700 272 650 300 660 320 S 580 380 600 420 Z" fill="#5AA9F0" ' + S + '/>';
    // campsite: tent + people + fire
    b += im('⛺', 150, 288, 96) + im('🧑‍🤝‍🧑', 258, 318, 62) + im('🔥', 326, 334, 46) + im('🐎', 430, 282, 82);
    b += mk(150, 300, 1) + mk(70, 214, 2) + mk(370, 330, 3) + mk(470, 268, 4) + mk(250, 120, 5) + mk(420, 56, 6) + mk(690, 300, 7);
    return svg('0 0 720 420', b);
  };

  /* Карта Великобритании: Land’s End — John O’Groats */
  scene.ukMap = () => {
    const pts = [[205, 40], [175, 34], [150, 36], [124, 46], [108, 66], [100, 92], [112, 112], [94, 132], [104, 158], [88, 180], [96, 210], [112, 234], [132, 240], [142, 260], [136, 284], [116, 298], [96, 302], [102, 320], [86, 338], [96, 354], [120, 364], [142, 360], [150, 370], [128, 384], [100, 400], [72, 418], [56, 430], [82, 434], [120, 426], [160, 420], [205, 414], [250, 410], [282, 396], [270, 378], [290, 352], [286, 326], [262, 306], [256, 284], [246, 260], [234, 238], [216, 212], [206, 190], [192, 176], [206, 160], [216, 132], [226, 110], [192, 96], [200, 70]];
    const d = 'M' + pts.map(p => p.join(' ')).join(' L ') + ' Z';
    let b = '<rect width="360" height="480" fill="#BEE0FF"/><path d="' + d + '" transform="translate(10 6)" fill="#A6DB86" ' + S + '/>';
    b += '<path d="M66 436 L130 416 L175 366 L200 306 L185 256 L160 226 L170 176 L185 116 L215 46" fill="none" stroke="' + C.pink + '" stroke-width="5" stroke-dasharray="10 8" stroke-linecap="round" stroke-linejoin="round"/>';
    b += '<circle cx="66" cy="436" r="8" fill="' + C.pink + '" ' + S + '/><circle cx="215" cy="46" r="8" fill="' + C.pink + '" ' + S + '/>';
    b += '<rect x="226" y="22" width="122" height="44" rx="10" fill="#fff" ' + S + '/>' + txt(287, 41, 'John O’Groats', { s: 13 }) + txt(287, 58, '874 miles', { s: 12, w: 700, f: C.pink });
    b += '<rect x="80" y="444" width="98" height="28" rx="8" fill="#fff" ' + S + '/>' + txt(129, 463, 'Land’s End', { s: 13 });
    b += txt(148, 150, 'SCOTLAND', { s: 11, f: C.greenD, ls: 1.5 }) + txt(240, 350, 'ENGLAND', { s: 11, f: C.greenD, ls: 1.5 }) + txt(112, 336, 'WALES', { s: 9, f: C.greenD, ls: 1 });
    b += im('🚲', 196, 262, 40);
    return svg('0 0 360 480', b);
  };

  /* Часы с кузнечиком (Unit 2 opener) */
  scene.grasshopperClock = () => {
    let b = '<defs><radialGradient id="gold" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FFF1A6"/><stop offset=".5" stop-color="#F2B92B"/><stop offset="1" stop-color="#A86B0A"/></radialGradient></defs>';
    b += '<rect width="640" height="380" fill="' + C.navy + '"/><rect y="320" width="640" height="60" fill="#151D4F"/>';
    b += '<circle cx="320" cy="220" r="150" fill="url(#gold)" ' + S + '/>';
    for (let r = 30; r < 150; r += 14) b += '<circle cx="320" cy="220" r="' + r + '" fill="none" stroke="#B9800E" stroke-width="2" opacity=".55"/>';
    for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2; b += '<rect x="' + (320 + Math.cos(a) * 128 - 3) + '" y="' + (220 + Math.sin(a) * 128 - 9) + '" width="6" height="18" rx="3" fill="' + (i % 5 ? '#6FB7FF' : '#fff') + '" transform="rotate(' + (a * 180 / Math.PI + 90) + ' ' + (320 + Math.cos(a) * 128) + ' ' + (220 + Math.sin(a) * 128) + ')" opacity=".85"/>'; }
    b += '<circle cx="320" cy="220" r="10" fill="#7A4D08"/>' + im('🦗', 250, 18, 140, -8);
    return svg('0 0 640 380', b);
  };

  /* Плакат «MAKE THE EARTH COOL AGAIN» */
  scene.poster = () => {
    let b = '<rect width="560" height="380" fill="#CBE6FF"/>';
    for (let i = 0; i < 9; i++) b += '<circle cx="' + (20 + i * 66) + '" cy="' + (372 - (i % 3) * 10) + '" r="' + (38 + (i % 2) * 8) + '" fill="' + [C.pink, C.blue, C.orange, C.green][i % 4] + '" opacity=".35"/>';
    b += '<g transform="rotate(-4 280 170)"><rect x="268" y="230" width="22" height="150" fill="' + C.wood + '" ' + S + '/><rect x="96" y="40" width="370" height="210" rx="6" fill="#E9C99A" ' + S + '/>';
    b += txt(280, 98, 'MAKE THE', { s: 38, fam: 'Unbounded,Arial Black,sans-serif', f: C.ink }) + txt(244, 150, 'EARTH', { s: 44, fam: 'Unbounded,Arial Black,sans-serif', f: C.blue }) + txt(280, 214, 'COOL AGAIN', { s: 36, fam: 'Unbounded,Arial Black,sans-serif', f: C.pink });
    b += im('🌍', 360, 104, 64) + im('🧊', 410, 128, 40) + '</g>';
    return svg('0 0 560 380', b);
  };

  const skyline = (b) => b;
  /* Гонконг: башни и плавучие дома */
  scene.hongKong = () => {
    let b = '<rect width="720" height="380" fill="#FFE3C4"/><circle cx="560" cy="90" r="46" fill="' + C.orange + '" opacity=".8"/>';
    b += '<path d="M-10 230 L90 120 L180 200 L300 90 L420 210 L560 130 L730 230 Z" fill="#6FB98F" ' + S + '/>';
    const cols = [C.blueL, C.pinkL, '#fff', C.yellowL, C.greenL, '#E7E2FF'];
    for (let i = 0; i < 16; i++) { const w = 30 + (i % 3) * 6, x = 10 + i * 44, hh = 120 + ((i * 53) % 110); const y = 280 - hh; b += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="' + cols[i % cols.length] + '" ' + S + '/>'; for (let r = y + 10; r < 270; r += 14) b += '<path d="M' + (x + 6) + ' ' + r + ' h' + (w - 12) + '" stroke="' + C.ink + '" stroke-width="2" stroke-dasharray="4 4" opacity=".55"/>'; }
    b += '<rect y="280" width="720" height="100" fill="#4F9BE8"/><path d="M0 300 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>';
    [[80, 316], [250, 332], [430, 318], [590, 336]].forEach(([x, y], i) => { b += '<path d="M' + x + ' ' + y + ' h110 l-14 22 h-82 z" fill="' + [C.orange, C.pink, C.yellow, C.green][i] + '" ' + S + '/><rect x="' + (x + 22) + '" y="' + (y - 26) + '" width="62" height="26" fill="#fff" ' + S + '/><path d="M' + (x + 16) + ' ' + (y - 26) + ' h74 l-8 -12 h-58 z" fill="' + C.ink + '"/><rect x="' + (x + 32) + '" y="' + (y - 18) + '" width="12" height="10" fill="' + C.sky + '"/><rect x="' + (x + 58) + '" y="' + (y - 18) + '" width="12" height="10" fill="' + C.sky + '"/>'; });
    return svg('0 0 720 380', skyline(b));
  };

  /* Ньюкасл: река и мосты */
  scene.newcastle = () => {
    let b = '<rect width="720" height="380" fill="#D9ECFF"/>';
    // берега с домами
    for (let i = 0; i < 7; i++) { const x = i * 34 - 6, hh = 120 - i * 10 + (i % 2) * 18, w = 32; b += '<rect x="' + x + '" y="' + (250 - hh - i * 6) + '" width="' + w + '" height="' + (hh + 140) + '" fill="' + ['#E9DCC8', '#D8C2A6', '#F1E7D6'][i % 3] + '" ' + S + '/>'; }
    for (let i = 0; i < 7; i++) { const x = 692 - i * 34, hh = 120 - i * 10 + (i % 2) * 14, w = 32; b += '<rect x="' + x + '" y="' + (250 - hh - i * 6) + '" width="' + w + '" height="' + (hh + 140) + '" fill="' + ['#F1E7D6', '#E9DCC8', '#D8C2A6'][i % 3] + '" ' + S + '/>'; }
    b += '<path d="M240 160 L480 160 L720 380 L0 380 Z" fill="#3E86D6"/><path d="M240 160 L0 380 M480 160 L720 380" stroke="' + C.ink + '" stroke-width="3"/>';
    // дальний мост с арками (High Level)
    b += '<rect x="258" y="176" width="204" height="10" fill="#8C6A4A" ' + S + '/>' + [0, 1, 2, 3].map(k => '<path d="M' + (266 + k * 48) + ' 200 q20 -18 40 0" fill="#3E86D6" stroke="#8C6A4A" stroke-width="6"/>').join('') + [0, 1, 2, 3, 4].map(k => '<rect x="' + (262 + k * 48) + '" y="186" width="8" height="20" fill="#8C6A4A"/>').join('');
    // средний поворотный мост (Swing Bridge)
    b += '<rect x="200" y="214" width="320" height="14" fill="#E5323E" ' + S + '/><path d="M330 214 v-22 h60 v22" fill="#fff" ' + S + '/>';
    // ближний мост с аркой (Tyne Bridge)
    b += '<path d="M110 290 C 160 120 560 120 610 290" fill="none" stroke="#2C8C5A" stroke-width="14"/><rect x="60" y="270" width="600" height="16" fill="#2C8C5A" ' + S + '/>';
    for (let x = 150; x <= 570; x += 30) { const t = (x - 360) / 250; const y = 290 - (1 - t * t) * 128; b += '<path d="M' + x + ' ' + Math.min(270, y.toFixed(1)) + ' V270" stroke="#2C8C5A" stroke-width="3.5"/>'; }
    b += '<rect x="66" y="230" width="40" height="56" fill="#CFC3AE" ' + S + '/><rect x="614" y="230" width="40" height="56" fill="#CFC3AE" ' + S + '/>';
    b += '<path d="M150 340 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="3" opacity=".55"/>' + im('🚤', 400, 300, 60);
    return svg('0 0 720 380', b);
  };

  /* Флоренция: купол собора, колокольня, флажки */
  scene.florence = () => {
    let b = '<rect width="720" height="380" fill="#FFE8C7"/>';
    for (let i = 0; i < 12; i++) { const x = i * 64 - 20, hh = 60 + ((i * 29) % 50); b += '<rect x="' + x + '" y="' + (300 - hh) + '" width="60" height="' + hh + '" fill="' + ['#F3D3A6', '#EBC08A', '#F7E1C0'][i % 3] + '" ' + S + '/><path d="M' + (x - 4) + ' ' + (300 - hh) + ' h68 l-8 -10 h-52 z" fill="#C8552E" ' + S + '/>'; }
    b += '<rect x="260" y="168" width="220" height="132" fill="#F6EEDD" ' + S + '/><path d="M268 168 C 270 50 470 50 472 168 Z" fill="#D2602E" ' + S + '/>';
    [300, 335, 370, 405, 440].forEach(x => { b += '<path d="M' + x + ' 168 C ' + (x + (370 - x) * .35) + ' 110 ' + (x + (370 - x) * .6) + ' 80 370 74" fill="none" stroke="#fff" stroke-width="4"/>'; });
    b += '<rect x="352" y="48" width="36" height="26" fill="#F6EEDD" ' + S + '/><path d="M356 48 Q370 20 384 48" fill="#D2602E" ' + S + '/>';
    b += '<rect x="520" y="70" width="56" height="230" fill="#F6EEDD" ' + S + '/>' + [100, 150, 200, 250].map(y => '<rect x="532" y="' + y + '" width="32" height="26" fill="#8BC6A8" ' + S + '/>').join('') + '<path d="M514 70 h68 v-10 h-68z" fill="#D2602E" ' + S + '/>';
    b += '<path d="M0 30 Q360 90 720 30" fill="none" stroke="' + C.ink + '" stroke-width="2"/>';
    for (let i = 0; i < 18; i++) { const x = 20 + i * 40, y = 30 + Math.sin(i / 17 * Math.PI) * 30; b += '<path d="M' + x + ' ' + y + ' l12 0 l-6 20 z" fill="' + ['#2E9B58', '#fff', '#D7333D'][i % 3] + '" stroke="' + C.ink + '" stroke-width="1.5"/>'; }
    b += '<rect y="300" width="720" height="80" fill="#C9B391"/>';
    return svg('0 0 720 380', b);
  };

  /* Анды: горы, тропа, лама */
  scene.andes = () => {
    let b = '<rect width="720" height="380" fill="#CDE7FF"/><circle cx="120" cy="80" r="38" fill="' + C.yellow + '"/>';
    b += '<path d="M-10 280 L140 110 L230 200 L360 60 L480 190 L590 100 L730 260 V380 H-10Z" fill="#8D93B8" ' + S + '/><path d="M330 92 L360 60 L392 96 L372 92 L360 104 L346 90Z M118 136 L140 110 L164 138 L148 132 L140 142Z M572 120 L590 100 L612 124 L596 120 L588 130Z" fill="#fff"/>';
    b += '<path d="M-10 300 C 150 240 300 290 440 250 S 640 230 730 270 V380 H-10Z" fill="#7CC27A" ' + S + '/>';
    b += '<path d="M200 380 C 260 330 380 330 420 300 S 520 262 560 250" fill="none" stroke="#E7CFA0" stroke-width="22" stroke-linecap="round"/>';
    b += im('🦙', 470, 230, 88) + im('🚶', 300, 262, 84);
    return svg('0 0 720 380', b);
  };

  /* Горная тропа к школе */
  scene.mountainPath = () => {
    let b = '<rect width="720" height="400" fill="#D6EAFF"/>';
    b += '<path d="M0 0 H260 L230 400 H0Z" fill="#B57B52" ' + S + '/><path d="M460 0 H720 V400 H500 L520 230Z" fill="#A16B45" ' + S + '/>';
    b += '<path d="M230 400 L260 0 H460 L520 230 L500 400Z" fill="#86B7E8"/><path d="M300 400 C 330 300 360 220 380 120" stroke="#5B9BD8" stroke-width="18" fill="none" opacity=".6"/>';
    b += '<path d="M0 210 L250 190 L250 214 L0 236Z" fill="#E6C89E" ' + S + '/><path d="M10 190 L250 172" stroke="' + C.ink + '" stroke-width="3"/>';
    for (let x = 20; x < 250; x += 30) b += '<path d="M' + x + ' ' + (210 - x * .08) + ' v-' + (20) + '" stroke="' + C.ink + '" stroke-width="3"/>';
    b += im('🚶‍♀️', 30, 118, 74) + im('🚶', 104, 112, 74) + im('🚶‍♂️', 176, 106, 72) + im('🎒', 52, 140, 28);
    b += '<path d="M268 96 l18 16 M268 112 l18 -16" stroke="' + C.ink + '" stroke-width="0"/>' + txt(380, 60, '1,500 m', { s: 22, f: '#fff' }) + '<path d="M380 74 V330" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/><path d="M372 84 l8 -12 8 12 M372 320 l8 12 8 -12" stroke="#fff" stroke-width="3" fill="none"/>';
    return svg('0 0 720 400', b);
  };

  /* Очень высокий лес */
  scene.tallForest = () => {
    let b = '<defs><linearGradient id="fg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#BFE6C9"/><stop offset="1" stop-color="#2E7D57"/></linearGradient></defs><rect width="720" height="400" fill="url(#fg)"/>';
    b += '<path d="M300 0 L200 400 M420 0 L470 400" stroke="#FFF7C2" stroke-width="40" opacity=".25"/>';
    [[40, 26], [130, 34], [250, 22], [360, 40], [480, 30], [590, 36], [670, 24]].forEach(([x, w]) => { b += '<rect x="' + x + '" y="-10" width="' + w + '" height="380" fill="#8C4F2B" ' + S + '/><path d="M' + (x + w / 2) + ' 40 v300" stroke="#6E3A1C" stroke-width="3"/>'; });
    b += '<path d="M-10 0 C 100 60 200 20 300 50 S 500 30 730 60 V0Z" fill="#2E8F5E" ' + S + '/><rect y="360" width="720" height="40" fill="#5F8F3E"/>' + im('🧍', 312, 330, 34) + im('🍄', 420, 344, 26);
    return svg('0 0 720 400', b);
  };

  /* Космический корабль */
  scene.spaceship = () => {
    let b = '<rect width="720" height="360" fill="#141A46"/>';
    for (let i = 0; i < 70; i++) b += '<circle cx="' + ((i * 97) % 720) + '" cy="' + ((i * 53) % 360) + '" r="' + (i % 5 ? 1.4 : 2.6) + '" fill="#fff" opacity="' + (.4 + (i % 3) * .2) + '"/>';
    b += '<path d="M80 330 C 200 260 300 230 400 190" stroke="' + C.orange + '" stroke-width="16" stroke-linecap="round" opacity=".5" fill="none"/><path d="M80 330 C 200 260 300 230 400 190" stroke="' + C.yellow + '" stroke-width="6" stroke-linecap="round" fill="none"/>';
    b += im('🌕', 520, 30, 150) + im('🚀', 360, 110, 130) + im('🛰️', 90, 50, 70);
    return svg('0 0 720 360', b);
  };

  /* Пляж с пластиком */
  scene.beachBottles = () => {
    let b = scene_beach_bg();
    [['🧴', 120, 230, 60, -30], ['🥤', 250, 260, 56, 60], ['🧴', 400, 240, 52, 80], ['🥤', 520, 280, 58, -20], ['🧃', 610, 236, 48, 30], ['🐚', 330, 310, 40, 0], ['🦀', 60, 300, 50, 0]].forEach(([e, x, y, s, r]) => { b += im(e, x, y, s, r); });
    return svg('0 0 720 360', b);
  };
  function scene_beach_bg() {
    return '<rect width="720" height="360" fill="' + C.sand + '"/><path d="M0 0 H720 V120 C 600 150 480 100 360 132 S 120 110 0 140Z" fill="#4FA3EA"/><path d="M0 140 C 120 110 240 132 360 132 S 600 150 720 120" fill="none" stroke="#fff" stroke-width="8" opacity=".85"/><path d="M0 160 C 140 140 240 160 360 152 S 600 168 720 146" fill="none" stroke="#E9CB8E" stroke-width="4"/>' + '<g fill="#E2C384">' + [[80, 220], [200, 320], [460, 210], [640, 330], [560, 250], [300, 230]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="3"/>').join('') + '</g>';
  }
  const beach = () => svg('0 0 720 400', '<rect width="720" height="400" fill="' + C.sand + '"/><path d="M0 0 H720 V70 C 600 96 480 60 360 84 S 120 66 0 92Z" fill="#4FA3EA"/><path d="M0 92 C 120 66 240 84 360 84 S 600 96 720 70" fill="none" stroke="#fff" stroke-width="7" opacity=".85"/>' + '<g fill="#E2C384">' + [[60, 200], [160, 340], [620, 180], [660, 330], [90, 120], [680, 120]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="3.5"/>').join('') + '</g>', 'beach-bg');

  /* ===================== ПЛИТКИ ДЛЯ ДОСОК ===================== */
  const T = (body) => svg('0 0 120 120', body);
  const tile = {
    fork: () => T('<path d="M60 112 V58" stroke="#9EA3B5" stroke-width="10" stroke-linecap="round"/><path d="M42 18 V44 Q42 60 60 60 Q78 60 78 44 V18" fill="none" stroke="#9EA3B5" stroke-width="7" stroke-linecap="round"/><path d="M54 18 V44 M66 18 V44" stroke="#9EA3B5" stroke-width="6" stroke-linecap="round"/><path d="M60 112 V58" stroke="' + C.ink + '" stroke-width="2" opacity=".2"/>'),
    knife: () => T('<path d="M52 112 V70" stroke="' + C.wood + '" stroke-width="14" stroke-linecap="round"/><path d="M48 70 V14 C 78 24 76 56 70 70 Z" fill="#C9CEDB" ' + S + '/>'),
    spoon: () => T('<path d="M60 112 V62" stroke="#9EA3B5" stroke-width="9" stroke-linecap="round"/><ellipse cx="60" cy="38" rx="20" ry="28" fill="#C9CEDB" ' + S + '/>'),
    plate: () => T('<ellipse cx="60" cy="64" rx="52" ry="30" fill="#fff" ' + S + '/><ellipse cx="60" cy="62" rx="30" ry="16" fill="' + C.paper + '" stroke="#D8D2C4" stroke-width="3"/>'),
    bowl: () => T('<path d="M14 54 H106 C 104 94 80 106 60 106 C 40 106 16 94 14 54 Z" fill="' + C.blue + '" ' + S + '/><ellipse cx="60" cy="54" rx="46" ry="10" fill="#7E7CFF" ' + S + '/>'),
    cup: () => T('<path d="M34 34 H86 L78 106 H42 Z" fill="#F4E6CF" ' + S + '/><rect x="30" y="22" width="60" height="14" rx="5" fill="' + C.ink + '"/><rect x="38" y="58" width="44" height="22" fill="' + C.orange + '" opacity=".85"/>'),
    glass: () => T('<path d="M36 18 H84 L78 106 H42 Z" fill="#DDF0FF" ' + S + '/><path d="M40 52 H80 L77 102 H43 Z" fill="#8CC8FA" opacity=".8"/><path d="M48 28 L46 90" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'),
    straw: () => T('<path d="M44 108 L62 30 L88 12" fill="none" stroke="' + C.ink + '" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 108 L62 30 L88 12" fill="none" stroke="' + C.pink + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M48 92 l6 -24 M56 58 l4 -18" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>'),
    sugar: () => T('<path d="M20 70 l20 -10 20 10 v24 l-20 10 -20 -10z M60 70 l20 -10 20 10 v24 l-20 10 -20 -10z M40 40 l20 -10 20 10 v24 l-20 10 -20 -10z" fill="#fff" ' + S + '/><path d="M20 70 l20 10 20 -10 M40 80 v24 M60 70 l20 10 20 -10 M80 80 v24 M40 40 l20 10 20 -10 M60 50 v24" fill="none" stroke="' + C.ink + '" stroke-width="2"/>'),
    oil: () => T('<path d="M50 12 h20 v14 l8 10 v70 q0 6 -6 6 h-24 q-6 0 -6 -6 v-70 l8 -10z" fill="#F7D24A" ' + S + '/><rect x="48" y="8" width="24" height="10" rx="3" fill="' + C.green + '" ' + S + '/><path d="M42 60 h36" stroke="' + C.ink + '" stroke-width="2"/><ellipse cx="60" cy="76" rx="10" ry="8" fill="#9BC34A" ' + S + '/>'),
    grapes: () => T('<path d="M60 14 q4 -6 12 -6" stroke="' + C.wood + '" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M62 16 q16 -6 24 4 q-12 6 -24 -4" fill="#3DAA82" ' + S + '/>' + [[44, 32], [60, 30], [76, 32], [36, 50], [52, 48], [68, 48], [84, 50], [44, 66], [60, 66], [76, 66], [52, 84], [68, 84], [60, 100]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#A9D86E" ' + S + '/>').join('')),
    crisps: () => T('<path d="M12 64 H108 C 104 98 84 110 60 110 C 36 110 16 98 12 64 Z" fill="' + C.blue + '" ' + S + '/>' + [[30, 52, -20], [52, 44, 10], [74, 50, -8], [92, 56, 18], [62, 58, 30]].map(([x, y, r]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="16" ry="11" fill="#F7CF55" transform="rotate(' + r + ' ' + x + ' ' + y + ')" ' + S + '/>').join('')),
    seatbelt: () => T('<path d="M14 18 L96 104" stroke="#3B3F55" stroke-width="20" stroke-linecap="round"/><rect x="44" y="54" width="34" height="22" rx="5" fill="#C9CEDB" ' + S + ' transform="rotate(45 61 65)"/><path d="M18 108 h40" stroke="#3B3F55" stroke-width="20" stroke-linecap="round"/>'),
    board: () => T('<rect x="8" y="18" width="104" height="84" rx="8" fill="#1A1E33" ' + S + '/>' + [34, 54, 74, 94].map((y, i) => '<rect x="18" y="' + (y - 10) + '" width="44" height="8" rx="2" fill="#FFD84A"/><rect x="70" y="' + (y - 10) + '" width="30" height="8" rx="2" fill="' + (i === 1 ? '#FF6B6B' : '#7CE0B5') + '"/>').join('')),
    pillars: () => T('<ellipse cx="60" cy="86" rx="50" ry="18" fill="#E0C28C"/>' + [[22, 58], [44, 48], [70, 48], [92, 58], [58, 70]].map(([x, y]) => '<rect x="' + (x - 7) + '" y="' + y + '" width="14" height="38" fill="#C7B59B" ' + S + '/><rect x="' + (x - 12) + '" y="' + (y - 8) + '" width="24" height="10" fill="#C7B59B" ' + S + '/>').join('')),
    army: () => T([0, 1, 2].map(r => [0, 1, 2, 3].map(c => { const x = 18 + c * 28 + r * 4, y = 30 + r * 30; return '<rect x="' + (x - 7) + '" y="' + y + '" width="14" height="22" rx="4" fill="#B5683F" ' + S + '/><circle cx="' + x + '" cy="' + (y - 5) + '" r="6" fill="#B5683F" ' + S + '/>'; }).join('')).join('')),
    stone: () => T('<path d="M26 108 L22 30 Q60 10 98 30 L94 108 Z" fill="#3A3D45" ' + S + '/>' + [40, 52, 64, 76, 88].map(y => '<path d="M34 ' + y + ' h52" stroke="#9AA0AE" stroke-width="2.5" stroke-dasharray="3 3"/>').join('')),
    mountainCity: () => T('<path d="M0 120 L20 50 L40 70 L70 18 L100 60 L120 50 V120Z" fill="#6DB37E" ' + S + '/>' + [[30, 86], [48, 80], [66, 84], [84, 90], [40, 98], [74, 100]].map(([x, y]) => '<rect x="' + (x - 7) + '" y="' + (y - 7) + '" width="14" height="12" fill="#D8CFC0" stroke="' + C.ink + '" stroke-width="2"/>').join(''))
  };

  /* ===================== СХЕМЫ ВРЕМЁН ===================== */
  const tl = (y, label) => '<path d="M40 ' + y + ' H660" stroke="' + C.ink + '" stroke-width="3"/><path d="M660 ' + y + ' l-12 -8 v16z" fill="' + C.ink + '"/>' + txt(40, y + 28, 'past', { s: 12, w: 700, a: 'start', f: C.mute || '#62606B' }) + txt(660, y + 28, 'future', { s: 12, w: 700, a: 'end', f: '#62606B' }) + (label ? txt(40, y - 52, label, { s: 15, a: 'start' }) : '');
  const now = (x, y1, y2) => '<path d="M' + x + ' ' + y1 + ' V' + y2 + '" stroke="' + C.pink + '" stroke-width="4" stroke-dasharray="6 5"/><rect x="' + (x - 26) + '" y="' + (y1 - 26) + '" width="52" height="22" rx="11" fill="' + C.pink + '"/>' + txt(x, y1 - 10, 'NOW', { s: 12, f: '#fff' });
  const wave = (x1, x2, y, col) => { let d = 'M' + x1 + ' ' + y; for (let x = x1; x < x2; x += 16) d += ' q4 -10 8 0 t8 0'; return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="5" stroke-linecap="round"/>'; };
  const ex = (x, y, t, col) => '<text x="' + x + '" y="' + y + '" font-size="14" font-weight="600" fill="' + (col || C.ink) + '" text-anchor="start" font-style="italic">' + t + '</text>';
  const grammar = {
    psPc: () => svg('0 0 700 300', '<rect width="700" height="300" rx="16" fill="' + C.card + '"/>' + now(470, 40, 270) +
      tl(110, 'Present simple · routines, facts') + [90, 170, 250, 330, 410, 530, 610].map(x => '<circle cx="' + x + '" cy="110" r="8" fill="' + C.blue + '"/>').join('') + ex(90, 82, 'I walk to school every day.', C.blue) +
      tl(230, 'Present continuous · now, temporary') + wave(420, 520, 230, C.pink) + ex(380, 202, 'I’m walking to school now.', C.pink)),
    pastPc: () => svg('0 0 700 220', '<rect width="700" height="220" rx="16" fill="' + C.card + '"/>' + now(600, 40, 190) + tl(140, '') +
      wave(140, 420, 140, C.blue) + '<path d="M300 92 l-14 30 h16 l-12 30" fill="none" stroke="' + C.orange + '" stroke-width="5" stroke-linejoin="round"/><circle cx="296" cy="140" r="9" fill="' + C.orange + '"/>' +
      ex(140, 72, 'I was walking home (Past continuous)', C.blue) + ex(250, 196, '…when it started to rain. (Past simple)', '#B85400')),
    usedTo: () => svg('0 0 700 220', '<rect width="700" height="220" rx="16" fill="' + C.card + '"/>' + now(560, 40, 190) + tl(130, '') +
      [90, 150, 210, 270, 330].map(x => '<circle cx="' + x + '" cy="130" r="8" fill="' + C.blue + '"/>').join('') + '<path d="M536 106 l48 48 M584 106 l-48 48" stroke="' + C.pink + '" stroke-width="6" stroke-linecap="round" opacity=".9"/>' +
      ex(80, 92, 'I used to play the piano…', C.blue) + ex(400, 196, '…but I don’t play it now.', C.pink)),
    ppForSince: () => svg('0 0 700 220', '<rect width="700" height="220" rx="16" fill="' + C.card + '"/>' + now(520, 40, 190) + tl(130, '') +
      '<rect x="200" y="118" width="320" height="24" rx="12" fill="' + C.blue + '" opacity=".85"/><circle cx="200" cy="130" r="11" fill="' + C.orange + '" stroke="' + C.ink + '" stroke-width="3"/>' +
      txt(200, 182, 'since Monday', { s: 14, f: '#B85400' }) + '<path d="M210 96 H510" stroke="' + C.blue + '" stroke-width="3"/><path d="M210 88 v16 M510 88 v16" stroke="' + C.blue + '" stroke-width="3"/>' + txt(360, 86, 'for five days', { s: 14, f: C.blue }) +
      ex(40, 30 + 176, 'I’ve been at this camp since Monday / for five days.')),
    ppPast: () => svg('0 0 700 300', '<rect width="700" height="300" rx="16" fill="' + C.card + '"/>' + now(560, 40, 270) +
      tl(110, 'Past simple · finished time') + '<rect x="200" y="94" width="120" height="32" rx="8" fill="none" stroke="' + C.orange + '" stroke-width="3" stroke-dasharray="6 4"/><circle cx="260" cy="110" r="9" fill="' + C.orange + '"/>' + txt(260, 146, 'yesterday', { s: 13, f: '#B85400' }) + ex(340, 84, 'I saw that film yesterday.', '#B85400') +
      tl(230, 'Present perfect · experience up to now') + '<path d="M60 230 H560" stroke="' + C.blue + '" stroke-width="10" opacity=".25"/><circle cx="330" cy="230" r="9" fill="' + C.blue + '"/>' + txt(330, 266, 'when? not important', { s: 13, f: C.blue }) + ex(340, 204, 'I’ve seen that film.', C.blue))
  };
  const grammarAlt = {
    psPc: 'Линия времени: Present simple — повторяющиеся действия (точки по всей линии), Present continuous — действие, которое идёт сейчас (волна вокруг NOW).',
    pastPc: 'Линия времени: длительное действие в прошлом (Past continuous) прерывается коротким событием (Past simple).',
    usedTo: 'Линия времени: повторявшиеся действия в прошлом заканчиваются до NOW — used to.',
    ppForSince: 'Линия времени: Present perfect — от точки since до NOW, длительность for.',
    ppPast: 'Две линии: Past simple — законченное время в прошлом; Present perfect — опыт до настоящего момента, время не важно.'
  };

  window.SVGART = { scene, tile, grammar, grammarAlt, beach, C };
})();
