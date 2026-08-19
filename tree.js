/* ═══════════════════════════════════════════════
   THE TREE — an ASCII character mass

   The sprout is ALIVE at rest. It exists at p = 0,
   breathing on its own timer, before any scroll.
   Scroll only decides how far it has grown.

     p 0.00        two cotyledons, camera close
     p 0.10–0.50   the trunk climbs, camera retreats
     p 0.44–0.82   branches extend
     p 0.62–1.00   canopy fills, binary labels settle
                   onto the leaf tips
   ═══════════════════════════════════════════════ */

(() => {
  const cvs    = document.getElementById('canopy');
  const ctx    = cvs.getContext('2d', { alpha: true });
  const stage  = document.getElementById('stage');
  const intro  = document.getElementById('intro');
  const hint   = document.getElementById('hint');
  const boughs = [...document.querySelectorAll('.bough')];

  /* ── character grid ───────────────────────── */
  let CW = 9, CH = 14;
  let W = 0, H = 0, COLS = 0, ROWS = 0, DPR = 1;

  const EDGE  = ['.', ':', '·', '\''];
  const MID   = ['+', '=', '~', '*', '-'];
  const HEAVY = ['#', '%', '&', '@'];
  const DIGIT = '0123456789'.split('');
  const pick  = a => a[(Math.random() * a.length) | 0];

  function glyph(d){
    if (d < 0.26) return pick(EDGE);
    if (d < 0.46) return Math.random() < 0.45 ? pick(DIGIT) : pick(MID);
    return Math.random() < 0.58 ? pick(DIGIT) : pick(HEAVY);
  }

  /* ── world geometry (1000 × 720) ───────────
     `at` = [p it starts, p it finishes].
     at:[-1,0] means "already there at rest".   */
  const LIMBS = [
    { x1:500, y1:700, x2:500, y2:330, w1:26, w2:8,   at:[0.10,0.50] },  // trunk
    { x1:500, y1:486, x2:300, y2:378, w1:13, w2:4,   at:[0.44,0.68] },
    { x1:500, y1:442, x2:700, y2:346, w1:13, w2:4,   at:[0.50,0.74] },
    { x1:500, y1:330, x2:500, y2:286, w1:8,  w2:4,   at:[0.56,0.78] },
    { x1:466, y1:466, x2:410, y2:420, w1:6,  w2:2.5, at:[0.62,0.80] },
    { x1:556, y1:424, x2:606, y2:388, w1:6,  w2:2.5, at:[0.66,0.84] },
    { x1:500, y1:428, x2:486, y2:452, w1:6,  w2:2.5, at:[0.80,0.96] },  // feeds the resume leaf
    { x1:500, y1:604, x2:500, y2:648, w1:7,  w2:4,   at:[-1,0], dies:[0.20,0.40] }, // sprout stem
  ];

  const LEAVES = [
    /* the two cotyledons — alive from the first frame */
    { x:498, y:650, dx:-0.94, dy:-0.34, len:118, wid:60, at:[-1,0], dies:[0.20,0.40] },
    { x:502, y:648, dx: 0.94, dy:-0.36, len:118, wid:60, at:[-1,0], dies:[0.20,0.40] },

    /* canopy — diagonal two-lobe arrangement: a large lobe drifting
       up-right, a smaller one drooping down-left. The four labelled
       leaves carry the nav tips. */
    { x:430, y:410, dx:-0.78, dy: 0.63, len:150, wid: 72, at:[0.66,0.86], tip:0 },
    { x:640, y:380, dx: 0.75, dy:-0.66, len:215, wid:118, at:[0.72,0.90], tip:1 },
    { x:560, y:340, dx: 0.55, dy:-0.835,len:195, wid:106, at:[0.78,0.96], tip:2 },
    { x:484, y:452, dx:-0.42, dy: 0.91, len:172, wid: 82, at:[0.84,1.00], tip:3 },

    /* filler */
    { x:450, y:400, dx:-0.62, dy: 0.785,len:105, wid: 48, at:[0.74,0.92] },
    { x:600, y:410, dx: 0.68, dy:-0.73, len:150, wid: 74, at:[0.78,0.95] },
    { x:470, y:390, dx:-0.40, dy: 0.92, len: 80, wid: 36, at:[0.82,0.98] },
  ];

  LEAVES.forEach((F, i) => { F.phase = i * 1.37; });

  /* ── maths ────────────────────────────────── */
  const clamp = v => v < 0 ? 0 : v > 1 ? 1 : v;
  const span  = (p,a,b) => clamp((p - a) / (b - a));
  const ease  = t => 1 - Math.pow(1 - t, 3);
  const lerp  = (a,b,t) => a + (b - a) * t;

  function noise(x, y){
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  function limbDensity(L, wx, wy){
    const ex = lerp(L.x1, L.x2, L.g), ey = lerp(L.y1, L.y2, L.g);
    const vx = ex - L.x1, vy = ey - L.y1;
    const L2 = vx*vx + vy*vy;
    if (L2 < 0.01) return 0;
    let t = ((wx - L.x1)*vx + (wy - L.y1)*vy) / L2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = L.x1 + vx*t, py = L.y1 + vy*t;
    const dist = Math.hypot(wx - px, wy - py);
    const w = lerp(L.w1, lerp(L.w1, L.w2, L.g), t) * 0.5;
    if (dist > w) return 0;
    return (1 - dist / w) * L.f;
  }

  function leafDensity(F, wx, wy){
    const rx = wx - F.x, ry = wy - F.y;
    const u  = rx*F.dx + ry*F.dy;
    const v  = rx*(-F.dy) + ry*F.dx;
    if (u < 0 || u > F.L) return 0;
    const uu = u / F.L;
    const hw = (F.wid * 0.5) * Math.sin(Math.PI * Math.pow(uu, 0.72));
    if (hw < 0.5) return 0;
    const a = Math.abs(v);
    if (a > hw) return 0;
    return (1 - a / hw) * F.f;
  }

  /* ── camera ───────────────────────────────── */
  function camera(p){
    const fit  = Math.min(W * 0.94 / 940, H * 0.90 / 660);
    const near = Math.min(W * 0.80 / 280, H * 0.58 / 210);
    const s0 = Math.max(near, fit * 1.5);
    const z  = ease(span(p, 0, 0.58));
    return { s: lerp(s0, fit, z), fx: 500, fy: lerp(606, 398, z) };
  }

  /* ── the field ────────────────────────────── */
  let cells = [];
  const T0 = performance.now();

  function build(p){
    const t = (performance.now() - T0) * 0.001;

    const limbs = [];
    for (const L of LIMBS){
      const g = ease(span(p, L.at[0], L.at[1]));
      const f = L.dies ? 1 - span(p, L.dies[0], L.dies[1]) : 1;
      if (g <= 0 || f <= 0) continue;
      limbs.push(Object.assign(Object.create(L), { g, f }));
    }

    const fol = [];
    for (const F of LEAVES){
      const g = ease(span(p, F.at[0], F.at[1]));
      const f = F.dies ? 1 - span(p, F.dies[0], F.dies[1]) : 1;
      if (g <= 0 || f <= 0) continue;

      /* the sprout breathes even when nothing is happening */
      const sway = Math.sin(t * 0.55 + F.phase) * 0.038;
      const cs = Math.cos(sway), sn = Math.sin(sway);
      fol.push({
        x:F.x, y:F.y, wid:F.wid, f,
        dx: F.dx*cs - F.dy*sn,
        dy: F.dx*sn + F.dy*cs,
        L: F.len * g * (1 + 0.022 * Math.sin(t * 0.8 + F.phase)),
        tip: F.tip
      });
    }

    const { s, fx, fy } = camera(p);

    cells.length = 0;
    for (let r = 0; r < ROWS; r++){
      const wy = ((r * CH + CH * 0.5) - H/2) / s + fy;
      for (let c = 0; c < COLS; c++){
        const wx = ((c * CW + CW * 0.5) - W/2) / s + fx;

        let d = 0;
        for (let i = 0; i < limbs.length; i++){
          const v = limbDensity(limbs[i], wx, wy);
          if (v > d) d = v;
        }
        for (let i = 0; i < fol.length; i++){
          const v = leafDensity(fol[i], wx, wy);
          if (v > d) d = v;
        }
        if (d <= 0.02) continue;

        d *= 0.72 + 0.46 * noise(c * 0.37, r * 0.61);
        if (d <= 0.06) continue;
        if (d < 0.16 && noise(c * 1.7, r * 2.3) < 0.42) continue;

        cells.push({ x: c * CW, y: r * CH + CH - 4, d: d > 1 ? 1 : d, ch: glyph(d) });
      }
    }

    /* labels sit on the leaf TIPS and ride the camera */
    const lo = span(p, 0.88, 1);
    fol.forEach(F => {
      if (F.tip === undefined) return;
      const el = boughs[F.tip];
      if (!el) return;
      const tx = F.x + F.dx * (F.L + 26);
      const ty = F.y + F.dy * (F.L + 26);
      const px = (tx - fx) * s + W/2;
      const py = (ty - fy) * s + H/2;
      el.style.left = Math.min(Math.max(px, 84), W - 84) + 'px';
      el.style.top  = Math.min(Math.max(py, 54), H - 54) + 'px';
    });
    boughs.forEach(el => {
      el.style.opacity = lo.toFixed(3);
      el.style.pointerEvents = lo > 0.5 ? 'auto' : 'none';
    });

    const io = 1 - span(p, 0.04, 0.20);
    intro.style.opacity = io.toFixed(3);
    intro.style.transform = `translate(-50%, ${(-(1-io) * 24).toFixed(1)}px)`;
    hint.style.opacity = lo.toFixed(3);
  }

  /* ── paint ────────────────────────────────── */
  function paint(){
    ctx.clearRect(0, 0, W, H);
    ctx.font = `${CH - 3}px 'Azeret Mono', ui-monospace, monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < cells.length; i++){
      const c = cells[i];
      ctx.globalAlpha = 0.20 + c.d * 0.80;
      ctx.fillText(c.ch, c.x, c.y);
    }
    ctx.globalAlpha = 1;
  }

  /* ── binary labels ────────────────────────── */
  function toBinary(el){
    const word = el.dataset.code || '';
    const holder = el.querySelector('.bits');
    holder.innerHTML = '';
    const bytes = [];
    for (const ch of word){
      const b = document.createElement('b');
      b.className = 'byte';
      b.dataset.letter = ch;
      b.dataset.bits = ch.charCodeAt(0).toString(2).padStart(8, '0');
      b.textContent = b.dataset.bits;
      holder.appendChild(b);
      bytes.push(b);
    }
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };

    el.addEventListener('mouseenter', () => {
      clear();
      bytes.forEach((b, i) => timers.push(setTimeout(() => {
        b.textContent = b.dataset.letter;
        b.classList.add('on');
      }, i * 55)));
    });
    el.addEventListener('mouseleave', () => {
      clear();
      bytes.forEach((b, i) => timers.push(setTimeout(() => {
        b.textContent = b.dataset.bits;
        b.classList.remove('on');
      }, (bytes.length - i) * 35)));
    });
  }
  boughs.forEach(toBinary);

  /* ── loop ─────────────────────────────────── */
  let p = 0, churn = true, queued = false;

  /* the sprout is never still, scrolled or not */
  setInterval(() => {
    if (!churn) return;
    build(p);
    paint();
  }, 110);
  document.addEventListener('visibilitychange', () => { churn = !document.hidden; });

  function measure(){
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = cvs.clientWidth; H = cvs.clientHeight;
    if (W < 700){ CW = 7; CH = 11; } else { CW = 9; CH = 14; }
    cvs.width = W * DPR; cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    COLS = Math.ceil(W / CW); ROWS = Math.ceil(H / CH);
    build(p); paint();
  }

  function onScroll(){
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      const box = stage.getBoundingClientRect();
      const travel = stage.offsetHeight - innerHeight;
      p = clamp(-box.top / travel);
      build(p); paint();
      queued = false;
    });
  }

  function boot(){
    measure();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches){
      p = 1; stage.style.height = '100vh';
    } else {
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    addEventListener('resize', measure);
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot);
  else addEventListener('load', boot);
})();