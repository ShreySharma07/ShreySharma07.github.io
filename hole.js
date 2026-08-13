/* ═══════════════════════════════════════════════
   THE SINGULARITY — a live black hole on a white sky.

   An accretion disk of orbiting particles, coloured
   across the full spectrum: violet at the hot inner
   edge, red at the cold outer rim. The far side of
   the disk is lensed up over the event horizon, the
   way the real thing looks.

   Click it and four stars fall out — one for each
   thing worth knowing. Click a star to read it.
   ═══════════════════════════════════════════════ */

(() => {
  const cvs    = document.getElementById('hole');
  if (!cvs) return;
  const ctx    = cvs.getContext('2d');
  const cosmos = document.getElementById('cosmos');
  const hit    = document.getElementById('singularity');
  const prompt = document.getElementById('prompt');
  const starEls = [...document.querySelectorAll('.star')];

  const veil   = document.getElementById('veil');
  const title  = document.getElementById('panel-title');
  const body   = document.getElementById('panel-body');
  const closeB = document.getElementById('panel-close');
  const panel  = veil.querySelector('.panel');

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2;

  /* ── geometry ─────────────────────────────── */
  let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, R = 90;
  const TILT = 0.30;                 /* how flat the disk sits */

  /* ── the disk ─────────────────────────────── */
  const NP = 1500;
  const P = [];
  function seed() {
    P.length = 0;
    for (let i = 0; i < NP; i++) {
      const u = Math.random();
      const r = 1.42 + Math.pow(u, 0.62) * 2.75;      /* in horizon radii */
      P.push({
        r,
        a: Math.random() * TAU,
        w: 0.34 / Math.pow(r, 1.5),                   /* keplerian falloff */
        hue: 272 - ((r - 1.42) / 2.75) * 272,         /* violet in, red out */
        arc: 0.05 + Math.random() * 0.11,
        al: 0.24 + Math.random() * 0.72,
        lw: 0.7 + Math.random() * 1.5
      });
    }
  }

  function measure() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = cvs.clientWidth; H = cvs.clientHeight;
    cvs.width = W * DPR; cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = W / 2; cy = H / 2;
    R = Math.max(48, Math.min(W, H) * 0.112);

    const d = R * 2.7;
    hit.style.width = d + 'px';
    hit.style.height = d + 'px';

    /* each star flies out from the singularity, so tell it how far it fell */
    starEls.forEach(el => {
      const b = el.getBoundingClientRect();
      const sx = b.left + b.width / 2, sy = b.top + b.height / 2;
      el.querySelector('.inner').style.setProperty('--fx', (cx - sx).toFixed(1) + 'px');
      el.querySelector('.inner').style.setProperty('--fy', (cy - sy).toFixed(1) + 'px');
    });
  }

  /* ── paint ────────────────────────────────── */
  let t0 = performance.now(), burst = -1;

  function ring(rad, lw, alpha) {
    const g = ctx.createLinearGradient(cx - rad, cy, cx + rad, cy);
    g.addColorStop(0.00, `hsla(280,95%,60%,${alpha})`);
    g.addColorStop(0.20, `hsla(215,95%,58%,${alpha})`);
    g.addColorStop(0.40, `hsla(170,90%,50%,${alpha})`);
    g.addColorStop(0.60, `hsla(105,85%,48%,${alpha})`);
    g.addColorStop(0.80, `hsla(40,100%,55%,${alpha})`);
    g.addColorStop(1.00, `hsla(2,95%,58%,${alpha})`);
    ctx.strokeStyle = g;
    ctx.lineWidth = lw;
  }

  function particles(front, t) {
    ctx.lineCap = 'round';
    for (let i = 0; i < P.length; i++) {
      const p = P[i];
      const s = Math.sin(p.a);
      if ((s > 0) !== front) continue;

      /* the near side races toward us — beam it brighter */
      const beam = 0.42 + 0.58 * (0.5 + 0.5 * Math.cos(p.a - Math.PI * 0.5));
      const a0 = p.a - p.arc, a1 = p.a;
      const rr = p.r * R;

      ctx.beginPath();
      ctx.ellipse(cx, cy, rr, rr * TILT, 0, a0, a1);
      ctx.strokeStyle = `hsla(${p.hue.toFixed(0)},92%,${(46 + beam * 14).toFixed(0)}%,${(p.al * beam * 0.9).toFixed(3)})`;
      ctx.lineWidth = p.lw;
      ctx.stroke();
    }
  }

  function draw() {
    const t = (performance.now() - t0) * 0.001;
    ctx.clearRect(0, 0, W, H);

    /* the disk builds colour on white like ink */
    ctx.globalCompositeOperation = 'multiply';
    particles(false, t);
    ctx.globalCompositeOperation = 'source-over';

    /* the horizon's shadow bruises the white sky */
    const sh = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 2.2);
    sh.addColorStop(0, 'rgba(18,18,26,.42)');
    sh.addColorStop(0.35, 'rgba(18,18,26,.11)');
    sh.addColorStop(1, 'rgba(18,18,26,0)');
    ctx.fillStyle = sh;
    ctx.beginPath(); ctx.arc(cx, cy, R * 2.2, 0, TAU); ctx.fill();

    /* event horizon */
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();

    /* the far side of the disk, lensed up and over the hole — the apex has to
       clear the horizon or it reads as a stripe across the face */
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 2.05, R * 1.34, 0, Math.PI, TAU);
    ring(R * 2.05, R * 0.13, 0.5);
    ctx.stroke();
    ctx.restore();

    /* photon ring */
    ring(R * 1.16, 2.4, 0.95);
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, TAU); ctx.stroke();
    ring(R * 1.16, 7, 0.18);
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, TAU); ctx.stroke();

    ctx.globalCompositeOperation = 'multiply';
    particles(true, t);
    ctx.globalCompositeOperation = 'source-over';

    /* the shockwave when it opens */
    if (burst > 0) {
      const e = (performance.now() - burst) * 0.001;
      if (e > 1.5) burst = -1;
      else {
        const k = e / 1.5;
        const rad = R * (1.1 + k * 7);
        ring(rad, 3 * (1 - k), 0.55 * (1 - k));
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, TAU); ctx.stroke();
      }
    }

    if (!REDUCED) for (let i = 0; i < P.length; i++) P[i].a += P[i].w * 0.045;
  }

  let running = true;
  function tick() { if (!running) return; draw(); requestAnimationFrame(tick); }
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) tick();
  });

  /* ── the stars fall out ───────────────────── */
  let open = false;
  function setOpen(v) {
    open = v;
    cosmos.classList.toggle('open', v);
    if (v) burst = performance.now();
    prompt.innerHTML = v ? 'Pick a <b>star</b>' : 'Click the <b>singularity</b>';
    hit.setAttribute('aria-label', v
      ? 'Collapse the stars back into the singularity'
      : 'Open the singularity to reveal four stars');
    starEls.forEach(el => {
      el.tabIndex = v ? 0 : -1;
      if (v) el.removeAttribute('aria-hidden');
      else el.setAttribute('aria-hidden', 'true');
    });
  }
  hit.addEventListener('click', () => setOpen(!open));

  /* ── what each star holds ─────────────────── */
  const MAIL = 'shrey7shrey@gmail.com';
  const CONTENT = {
    who: {
      h: 8,
      title: 'Who <em>I am</em>',
      html: `
        <p>Final-year <b>B.Tech in Computer Science, AI specialization</b>, at the
        University of Lucknow — Nov 2022 to July 2026. Based in Bengaluru, India.</p>
        <p>I build end-to-end ML pipelines, fine-tune LLMs, and ship production-grade
        AI systems. Most of my work lives where deep learning stops being a notebook
        and has to survive contact with real hardware.</p>
        <dl>
          <dt>Languages</dt><dd>Python · C++ · Java · SQL</dd>
          <dt>ML / DL</dt><dd>PyTorch · TensorFlow · Hugging Face Transformers · Scikit-learn</dd>
          <dt>Cloud &amp; MLOps</dt><dd>AWS (SageMaker, Lambda, EC2, S3) · Docker · CI/CD · MLflow · DVC</dd>
          <dt>Systems</dt><dd>FastAPI · Flask · Git · Linux · Quantization · ARM NEON · Accelerate BLAS</dd>
        </dl>
        <p><b>Top-5 Finalist</b>, IIT Madras Malware Analysis Hackathon — led a
        four-person team to a deep-learning malware classifier, placing top 5 of
        120+ teams.</p>
        <p>Certified in <b>Google Agentic AI</b> (Kaggle / Google), the
        <b>UC Berkeley Agentic AI MOOC</b>, and <b>Machine &amp; Deep Learning</b>
        (IBM / Coursera).</p>`
    },
    social: {
      h: 145,
      title: 'Where to <em>find me</em>',
      html: `
        <div class="chan">
          <a href="https://github.com/ShreySharma07" target="_blank" rel="noopener">
            <span class="n">GitHub</span><span class="v">github.com/ShreySharma07</span></a>
          <a href="https://huggingface.co/ShreySharma07" target="_blank" rel="noopener">
            <span class="n">Hugging Face</span><span class="v">huggingface.co/ShreySharma07</span></a>
          <a href="mailto:${MAIL}">
            <span class="n">Email</span><span class="v">${MAIL}</span></a>
          <!-- TODO: swap in the real LinkedIn URL -->
          <a href="#" data-todo="linkedin">
            <span class="n">LinkedIn</span><span class="v">add your URL</span></a>
        </div>`
    },
    writing: {
      h: 212,
      title: 'Things I have <em>written</em>',
      html: `
        <p>Notes on the things I build — agent architectures, kernel tuning, and the
        parts of training that nobody writes down.</p>
        <!-- TODO: replace with real posts, one <a> per entry -->
        <div class="soon">No posts wired up yet — send me the links</div>`
    },
    next: {
      h: 288,
      title: 'Where I want to <em>head next</em>',
      html: `
        <!-- TODO: this is a draft in your voice — edit freely -->
        <p>I want to keep working at the seam between <b>models and the metal they
        run on</b>: inference optimization, kernel-level performance, and agent
        systems that hold up outside a demo.</p>
        <p>Next, an <b>AI / ML engineering role</b> where I own pipelines end to end —
        training, evaluation, and the unglamorous part where it has to be fast,
        correct, and reproducible.</p>
        <p>Longer term I want to go deeper into <b>GPU compiler and runtime work</b>,
        and to keep publishing what I learn along the way.</p>`
    }
  };

  /* ── reveal ───────────────────────────────── */
  let lastFocus = null;

  function openPanel(key) {
    const c = CONTENT[key];
    if (!c) return;
    lastFocus = document.activeElement;
    title.innerHTML = c.title;
    body.innerHTML = c.html;
    panel.style.setProperty('--h', c.h);
    cosmos.style.setProperty('--ah', c.h);
    cosmos.classList.add('lit');
    veil.hidden = false;
    requestAnimationFrame(() => veil.classList.add('on'));
    closeB.focus();
  }

  function closePanel() {
    veil.classList.remove('on');
    cosmos.classList.remove('lit');
    setTimeout(() => { veil.hidden = true; }, 450);
    if (lastFocus) lastFocus.focus();
  }

  starEls.forEach(el => el.addEventListener('click', () => {
    if (!open) return;
    openPanel(el.dataset.key);
  }));

  closeB.addEventListener('click', closePanel);
  veil.addEventListener('click', e => { if (e.target === veil) closePanel(); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !veil.hidden) closePanel();
  });

  /* placeholder links should not navigate away */
  body.addEventListener('click', e => {
    const a = e.target.closest('a[data-todo]');
    if (a) e.preventDefault();
  });

  /* ── go ───────────────────────────────────── */
  function boot() {
    seed();
    measure();
    addEventListener('resize', measure);
    if (REDUCED) { draw(); return; }
    tick();
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot);
  else addEventListener('load', boot);
})();
