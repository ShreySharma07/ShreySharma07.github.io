/* ═══════════════════════════════════════════════
   THE NET — four layers, firing.

   A signal enters at the input layer, propagates
   forward, hits the output, and comes back as a
   gradient. Nodes flash as they are visited.

   Scroll dissolves it: the nodes tear loose, drift
   apart, and break into the same glyph mass the
   tree on the landing page is made of. The work
   springs up out of the collapse.
   ═══════════════════════════════════════════════ */

(() => {
  const cvs   = document.getElementById('net');
  if (!cvs) return;
  const ctx   = cvs.getContext('2d', { alpha: true });
  const stage = document.getElementById('net-stage');
  const copy  = document.getElementById('net-copy');

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── world (1000 × 600) ───────────────────── */
  const SIZES = [4, 6, 5, 3];
  const WH = 600, X0 = 155, X1 = 845, GAP = 74;

  const nodes = [];
  SIZES.forEach((n, li) => {
    const x = X0 + li * ((X1 - X0) / (SIZES.length - 1));
    const total = (n - 1) * GAP;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      nodes.push({
        x, y: WH / 2 - total / 2 + i * GAP,
        layer: li, flash: 0,
        phase: Math.random() * Math.PI * 2,
        ux: Math.cos(a), uy: Math.sin(a),
        far: 170 + Math.random() * 240,
        out: [], inn: []
      });
    }
  });

  const LAST = SIZES.length - 1;
  const layerOf = li => nodes.filter(n => n.layer === li);

  const edges = [];
  for (let li = 0; li < LAST; li++) {
    layerOf(li).forEach(a => layerOf(li + 1).forEach(b => {
      const e = { a, b, heat: 0 };
      edges.push(e); a.out.push(e); b.inn.push(e);
    }));
  }

  /* glyph shrapnel — the same character set as the tree */
  const GLYPHS = ['#','%','&','@','+','=','~','*','-','.',':','0','1','8'];
  const motes = [];
  nodes.forEach(n => {
    for (let i = 0; i < 5; i++) {
      const a = Math.random() * Math.PI * 2;
      motes.push({
        n, ux: Math.cos(a), uy: Math.sin(a),
        far: 110 + Math.random() * 340,
        ch: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        lag: Math.random() * 0.3
      });
    }
  });

  /* ── firing ───────────────────────────────── */
  const pulses = [];
  const CAP = 110;
  const timers = [];
  const after = (ms, fn) => timers.push(setTimeout(fn, ms));

  function emit(node, dir, strength) {
    const list = dir === 1 ? node.out : node.inn;
    if (!list.length) return;
    const pool = list.slice();
    const k = Math.max(1, Math.round((1.6 + Math.random() * 2.2) * strength));
    for (let i = 0; i < k && pool.length && pulses.length < CAP; i++) {
      const e = pool.splice((Math.random() * pool.length) | 0, 1)[0];
      pulses.push({ e, dir, t: 0, sp: 0.011 + Math.random() * 0.009, s: strength });
    }
  }

  function arrive(p) {
    const node = p.dir === 1 ? p.e.b : p.e.a;
    node.flash = 1;
    p.e.heat = 1;

    const edge = p.dir === 1 ? LAST : 0;
    if (node.layer === edge) {
      /* bounce: forward pass becomes a backward pass */
      if (Math.random() < 0.55) after(180 + Math.random() * 260, () => emit(node, -p.dir, 0.85));
      return;
    }
    if (p.s > 0.3) emit(node, p.dir, p.s * 0.72);
  }

  /* a fresh signal enters the input layer on a slow heartbeat */
  function beat() {
    if (dissolve < 0.55) {
      const L = layerOf(0);
      const n = L[(Math.random() * L.length) | 0];
      n.flash = 1;
      emit(n, 1, 1);
      if (Math.random() < 0.35) {
        const O = layerOf(LAST);
        const m = O[(Math.random() * O.length) | 0];
        after(220, () => { m.flash = 1; emit(m, -1, 0.8); });
      }
    }
    after(620 + Math.random() * 520, beat);
  }

  /* ── camera ───────────────────────────────── */
  let W = 0, H = 0, DPR = 1, S = 1, OX = 0, OY = 0;

  function measure() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = cvs.clientWidth; H = cvs.clientHeight;
    cvs.width = W * DPR; cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    S = Math.min(W * 0.88 / 1000, H * 0.70 / WH);
    OX = W / 2 - 500 * S;
    OY = H / 2 - WH / 2 * S;
    buildField();
  }

  /* ── the vocabulary ──────────────────────────
     Once the net is gone the scroll fills the screen
     with the language it was thinking in. Terms fade
     up and out at their own scroll offsets and their
     own places, so the screen is never the same twice. */
  const TERMS = [
    'GRADIENT DESCENT','BACKPROPAGATION','ATTENTION','TRANSFORMER','CONVOLUTION',
    'EMBEDDING','SOFTMAX','DROPOUT','BATCH NORM','OVERFITTING','TENSOR','EPOCH',
    'LEARNING RATE','ACTIVATION','ReLU','GELU','LSTM','QLoRA','LoRA','PEFT',
    'QUANTIZATION','FINE-TUNING','CUDA KERNEL','INFERENCE','TOKENIZER',
    'PERPLEXITY','REGULARIZATION','ADAM','CROSS-ENTROPY','LOGITS','LATENT SPACE',
    'DIFFUSION','RAG','TRANSFER LEARNING','HYPERPARAMETER','WEIGHTS','BIAS',
    'LOSS','FORWARD PASS','BACKWARD PASS','CONVERGENCE','ENCODER','DECODER',
    'SELF-ATTENTION','MULTI-HEAD','LAYER NORM','RESIDUAL','POOLING','FEATURE MAP',
    'PRECISION','RECALL','F1 SCORE','VALIDATION','CHECKPOINT','DISTILLATION',
    'PRUNING','FLOPS','THROUGHPUT','LATENCY','BEAM SEARCH','TEMPERATURE',
    'SAMPLING','MATMUL','KERNEL FUSION','MEMORY BANDWIDTH','AUTOGRAD','OPTIMIZER',
    'SCHEDULER','WARMUP','GRADIENT CLIPPING','MIXED PRECISION','ZERO-SHOT',
    'FEW-SHOT','ABLATION','BENCHMARK','THROUGHPUT/WATT','WARP DIVERGENCE'
  ];
  const F_FROM = 0.32, F_TO = 1.0;
  const onscreen = () => W < 700 ? 14 : 24;   /* how many are legible at once */
  let field = [];

  function buildField() {
    if (!W || !H) return;

    const list = TERMS.slice();
    for (let i = list.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [list[i], list[j]] = [list[j], list[i]];
    }

    /* jittered grid so the terms spread over the whole screen
       instead of clumping in the middle */
    const COLS = W < 700 ? 3 : 6, ROWS = W < 700 ? 8 : 7;
    const slots = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) slots.push([c, r]);
    for (let i = slots.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    const step = (F_TO - F_FROM) / list.length;
    const win  = step * onscreen();
    const spaced = 'letterSpacing' in ctx;
    if (spaced) ctx.letterSpacing = '0.18em';

    field = list.map((text, i) => {
      const [c, r] = slots[i % slots.length];
      const fx = (c + 0.5 + (Math.random() - 0.5) * 0.86) / COLS;
      const fy = (r + 0.5 + (Math.random() - 0.5) * 0.86) / ROWS;

      const roll = Math.random();
      let size = roll > 0.9  ? 27 + Math.random() * 13
               : roll > 0.62 ? 17 + Math.random() * 8
               :               10 + Math.random() * 5;
      if (W < 700) size *= 0.66;

      /* a centred term must not hang off either edge */
      ctx.font = `${size.toFixed(1)}px 'Azeret Mono', ui-monospace, monospace`;
      let half = ctx.measureText(text).width / 2;
      if (half > W / 2 - 16) {                 /* too wide even centred — shrink it */
        size *= (W / 2 - 16) / half;
        ctx.font = `${size.toFixed(1)}px 'Azeret Mono', ui-monospace, monospace`;
        half = ctx.measureText(text).width / 2;
      }

      return {
        text, fx, fy, size, half,
        a0: F_FROM + i * step,
        win: win * (0.72 + Math.random() * 0.56),
        max: 0.26 + (size / 40) * 0.68,
        drift: (Math.random() * 2 - 1) * 26
      };
    });

    if (spaced) ctx.letterSpacing = '0px';
  }

  function drawField(p) {
    if (p <= F_FROM) return;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const spaced = 'letterSpacing' in ctx;
    if (spaced) ctx.letterSpacing = '0.18em';

    for (let i = 0; i < field.length; i++) {
      const w = field[i];
      const t = (p - w.a0) / w.win;
      if (t <= 0 || t >= 1) continue;
      let a = t < 0.26 ? t / 0.26 : t > 0.72 ? (1 - t) / 0.28 : 1;
      a *= w.max;
      if (a <= 0.012) continue;
      ctx.font = `${w.size.toFixed(1)}px 'Azeret Mono', ui-monospace, monospace`;
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;

      /* keep every term fully on screen, clear of the fixed header */
      const x = Math.min(Math.max(w.fx * W, w.half + 16), W - w.half - 16);
      const y = Math.min(Math.max(w.fy * H + (t - 0.5) * w.drift, 104), H - 34);
      ctx.fillText(w.text, x, y);
    }

    if (spaced) ctx.letterSpacing = '0px';
  }

  /* ── scroll ───────────────────────────────── */
  const clamp = v => v < 0 ? 0 : v > 1 ? 1 : v;
  const span  = (p, a, b) => clamp((p - a) / (b - a));
  let dissolve = 0, prog = 0;

  function onScroll() {
    const box = stage.getBoundingClientRect();
    const travel = stage.offsetHeight - innerHeight;
    prog = travel > 0 ? clamp(-box.top / travel) : 0;
    dissolve = span(prog, 0.08, 0.36);
    const fade = 1 - span(prog, 0.02, 0.18);
    copy.style.opacity = fade.toFixed(3);
    copy.style.transform = `translate(-50%, ${(-(1 - fade) * 26).toFixed(1)}px)`;
  }

  /* ── paint ────────────────────────────────── */
  const T0 = performance.now();

  function pos(n, d, t) {
    const drift = d * d * n.far;
    const wob = Math.sin(t * 0.9 + n.phase) * 3.4 * (1 - d);
    return [OX + (n.x + n.ux * drift) * S,
            OY + (n.y + n.uy * drift + wob) * S];
  }

  function frame() {
    const t = (performance.now() - T0) * 0.001;
    const d = dissolve;
    const live = 1 - d;

    ctx.clearRect(0, 0, W, H);

    /* edges */
    ctx.lineWidth = 1;
    for (const e of edges) {
      e.heat *= 0.94;
      const a = (0.055 + e.heat * 0.5) * live * live;
      if (a <= 0.004) continue;
      const [ax, ay] = pos(e.a, d, t);
      const [bx, by] = pos(e.b, d, t);
      ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    }

    /* pulses */
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.sp;
      if (p.t >= 1) { arrive(p); pulses.splice(i, 1); continue; }
      if (live <= 0.02) continue;
      const from = p.dir === 1 ? p.e.a : p.e.b;
      const to   = p.dir === 1 ? p.e.b : p.e.a;
      const [fx, fy] = pos(from, d, t);
      const [tx, ty] = pos(to, d, t);
      const x = fx + (tx - fx) * p.t, y = fy + (ty - fy) * p.t;
      const r = 2.6 * (0.6 + p.s * 0.4);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
      g.addColorStop(0, `rgba(255,255,255,${(0.95 * live).toFixed(3)})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r * 5, 0, 6.2832); ctx.fill();
    }

    /* nodes */
    for (const n of nodes) {
      n.flash *= 0.93;
      if (live <= 0.02) break;
      const [x, y] = pos(n, d, t);
      const base = 0.26 + n.flash * 0.74;
      const r = (5.2 + n.flash * 2.6) * Math.max(S, 0.5);

      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.2);
      g.addColorStop(0, `rgba(255,255,255,${(base * 0.55 * live).toFixed(3)})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r * 4.2, 0, 6.2832); ctx.fill();

      ctx.fillStyle = `rgba(255,255,255,${(base * live).toFixed(3)})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }

    /* shrapnel — only while it is coming apart */
    if (d > 0.02 && d < 0.999) {
      ctx.font = `${Math.max(9, 12 * S)}px 'Azeret Mono', ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const m of motes) {
        const k = clamp((d - m.lag) / (1 - m.lag));
        if (k <= 0) continue;
        const a = Math.sin(Math.PI * Math.min(k * 1.35, 1)) * 0.75;
        if (a <= 0.01) continue;
        const [bx, by] = pos(m.n, d, t);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.fillText(m.ch,
          bx + m.ux * k * m.far * S,
          by + m.uy * k * m.far * S);
      }
    }

    /* the vocabulary takes over once the net has gone */
    drawField(prog);
  }

  /* ── the work springs up ──────────────────── */
  const springs = [...document.querySelectorAll('.spring')];
  if ('IntersectionObserver' in window && !REDUCED) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    springs.forEach(el => io.observe(el));
  } else {
    springs.forEach(el => el.classList.add('seen'));
  }

  /* ── loop ─────────────────────────────────── */
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) tick();
  });

  function tick() {
    if (!running) return;
    frame();
    requestAnimationFrame(tick);
  }

  function boot() {
    measure();
    if (REDUCED) {
      stage.style.height = '100vh';
      layerOf(0).forEach(n => n.flash = 0.5);
      frame();
      return;
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { measure(); onScroll(); });
    onScroll();
    beat();
    tick();
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot);
  else addEventListener('load', boot);
})();
