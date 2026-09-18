/* ═══════════════════════════════════════════════
   THE TENSOR — 1,728 cells, one object, the whole way down.

   Every section owns a layout. Scrolling blends the
   cells from one layout to the next, so the shape on
   screen is always the idea being read:

     lattice   raw material
     cube      structure, rigor
     gpu       a kernel executing across a grid
     ring      the reason → act → observe loop
     lora      a frozen matrix plus two thin trainable slabs
     horizon   the work ahead, one cell lit
   ═══════════════════════════════════════════════ */

import * as THREE from 'three';

const cvs = document.getElementById('scene');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const N = 1728;                       // 12 × 12 × 12
const TAU = Math.PI * 2;

/* ── deterministic noise so reloads look the same ── */
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const R = new Float32Array(N * 4);    // four random numbers per cell
for (let i = 0; i < N * 4; i++) R[i] = rnd();

const ease   = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
const smooth = t => t*t*(3 - 2*t);
const clamp  = (v, a, b) => v < a ? a : v > b ? b : v;
const mix    = (a, b, t) => a + (b - a) * t;

/* ── layouts ──────────────────────────────────
   Each returns { pos: Float32Array(N*3), scale: Float32Array(N),
                  glow: Float32Array(N), rot: [x,y,z], spin: bool } */
function blank() {
  return { pos: new Float32Array(N * 3), scale: new Float32Array(N).fill(1),
           glow: new Float32Array(N), rot: [0, 0, 0], spin: false };
}

function lattice(spacing, jitter) {
  const L = blank();
  for (let i = 0; i < N; i++) {
    const ix = (i / 144) | 0, iy = ((i / 12) | 0) % 12, iz = i % 12;
    L.pos[i*3]   = (ix - 5.5) * spacing + (R[i*4]   - .5) * jitter;
    L.pos[i*3+1] = (iy - 5.5) * spacing + (R[i*4+1] - .5) * jitter;
    L.pos[i*3+2] = (iz - 5.5) * spacing + (R[i*4+2] - .5) * jitter;
    L.glow[i] = R[i*4+3] > .93 ? .55 : .03;
  }
  L.rot = [.32, .55, 0]; L.spin = true;
  return L;
}

function cube() {
  const L = lattice(.36, 0);
  for (let i = 0; i < N; i++) L.glow[i] = .09;
  L.rot = [.42, .78, 0]; L.spin = true;
  return L;
}

function gpu() {
  const L = blank();
  const cols = 48, rows = 36, s = .25;
  for (let i = 0; i < N; i++) {
    const r = (i / cols) | 0, c = i % cols;
    L.pos[i*3]   = (c - (cols - 1) / 2) * s;
    L.pos[i*3+1] = 0;
    L.pos[i*3+2] = (r - (rows - 1) / 2) * s;
    L.scale[i] = .82;
    L.glow[i] = .04;
  }
  L.rot = [.72, -.35, 0];
  return L;
}

function ring() {
  const L = blank();
  const around = 144, tube = 12, RR = 2.75, rr = .5;
  for (let i = 0; i < N; i++) {
    const k = (i / tube) | 0, j = i % tube;
    const th = k / around * TAU, ph = j / tube * TAU;
    const w = RR + rr * Math.cos(ph);
    L.pos[i*3]   = w * Math.cos(th);
    L.pos[i*3+1] = rr * Math.sin(ph);
    L.pos[i*3+2] = w * Math.sin(th);
    L.scale[i] = .85;
    L.glow[i] = .04;
  }
  L.rot = [.98, 0, .22];
  return L;
}

function lora() {
  const L = blank();
  const n = 30, s = .13;
  /* the frozen W : 30 × 30 = 900 cells, dim */
  for (let i = 0; i < 900; i++) {
    const r = (i / n) | 0, c = i % n;
    L.pos[i*3]   = (c - (n - 1) / 2) * s;
    L.pos[i*3+1] = ((n - 1) / 2 - r) * s;
    L.pos[i*3+2] = 0;
    L.scale[i] = .78; L.glow[i] = .05;
  }
  /* B : a tall thin slab, 30 × 6, bright, floating just in front */
  for (let k = 0; k < 180; k++) {
    const i = 900 + k, r = (k / 6) | 0, c = k % 6;
    L.pos[i*3]   = (c - 2.5) * s + 1.18;
    L.pos[i*3+1] = ((n - 1) / 2 - r) * s;
    L.pos[i*3+2] = .55;
    L.scale[i] = .82; L.glow[i] = .7;
  }
  /* A : a short wide slab, 6 × 30, bright, same plane */
  for (let k = 0; k < 180; k++) {
    const i = 1080 + k, r = (k / n) | 0, c = k % n;
    L.pos[i*3]   = (c - (n - 1) / 2) * s;
    L.pos[i*3+1] = (2.5 - r) * s - 1.18;
    L.pos[i*3+2] = .55;
    L.scale[i] = .82; L.glow[i] = .7;
  }
  /* the rest are not part of this picture */
  for (let i = 1260; i < N; i++) { L.scale[i] = 0; L.glow[i] = 0; }
  L.rot = [.1, -.3, 0];
  return L;
}

function horizon() {
  const L = blank();
  const cols = 96, rows = 18, s = .105;
  for (let i = 0; i < N; i++) {
    const r = (i / cols) | 0, c = i % cols;
    L.pos[i*3]   = (c - (cols - 1) / 2) * s;
    L.pos[i*3+1] = -1.2;
    L.pos[i*3+2] = (r - (rows - 1) / 2) * s;
    L.scale[i] = .6; L.glow[i] = .03;
  }
  L.rot = [.55, 0, 0];
  return L;
}

const LAYOUTS = {
  lattice: lattice(.76, .2),
  cube:    cube(),
  gpu:     gpu(),
  ring:    ring(),
  lora:    lora(),
  horizon: horizon(),
};

/* ── the per-section, per-frame life of each layout ── */
const LIVE = {
  lattice(i, t, g) { return g[i] + (R[i*4+3] > .93 ? .3 * Math.sin(t * 1.6 + R[i*4] * TAU) + .3 : 0); },
  cube(i, t, g)    { return g[i]; },
  gpu(i, t, g) {
    /* a kernel sweeping the grid, and a few blocks lighting as they verify */
    const r = (i / 48) | 0, c = i % 48;
    const d = (c * .7 + r * .45) / 50;
    const ph = (t * .22) % 1;
    let v = Math.exp(-Math.pow((d - ph) * 9, 2)) * 1.6;
    const br = (r / 6) | 0, bc = (c / 8) | 0;
    const blk = Math.sin(t * .9 + br * 1.7 + bc * 2.3);
    if (blk > .92) v += .5;
    return g[i] + v;
  },
  ring(i, t, g) {
    /* three pulses circling: reason, act, observe */
    const th = ((i / 12) | 0) / 144;
    let v = 0;
    for (let m = 0; m < 3; m++) {
      let d = th - ((t * .16 + m / 3) % 1);
      d = d - Math.round(d);
      v += Math.exp(-Math.pow(d * 26, 2)) * 1.5;
    }
    return g[i] + v;
  },
  lora(i, t, g) {
    /* the trainable slabs breathe; the frozen matrix does not */
    return i >= 900 && i < 1260 ? g[i] + .25 * Math.sin(t * 1.4 + (i % 30) * .2) : g[i];
  },
  horizon(i, t, g) {
    const c = i % 96;
    const x = ((t * .06) % 1) * 96;
    let d = Math.abs(c - x); d = Math.min(d, 96 - d);
    return g[i] + Math.exp(-d * d * .35) * 2.3;
  },
};

/* horizon gets a little landscape in y — handled in the frame loop */

/* ── three ────────────────────────────────── */
const renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.setClearColor(0x0a0a0b, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0a0a0b, 14, 30);

const camera = new THREE.PerspectiveCamera(32, 1, .1, 80);
camera.position.set(0, 0, 17.5);

scene.add(new THREE.AmbientLight(0xffffff, .38));
const key = new THREE.DirectionalLight(0xffffff, 1.25); key.position.set(4, 6, 6); scene.add(key);
const fill = new THREE.DirectionalLight(0x8fa4ff, .35); fill.position.set(-6, -3, 3); scene.add(fill);

const group = new THREE.Group();
scene.add(group);

const geo = new THREE.BoxGeometry(.2, .2, .2);
const glowAttr = new THREE.InstancedBufferAttribute(new Float32Array(N), 1);
glowAttr.setUsage(THREE.DynamicDrawUsage);
geo.setAttribute('aGlow', glowAttr);

const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .55, metalness: .12 });
mat.onBeforeCompile = sh => {
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nattribute float aGlow; varying float vGlow;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;');
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', '#include <common>\nvarying float vGlow;')
    .replace('#include <emissivemap_fragment>',
             '#include <emissivemap_fragment>\ntotalEmissiveRadiance += vColor.rgb * vGlow;');
};

const mesh = new THREE.InstancedMesh(geo, mat, N);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
group.add(mesh);

const BASE   = new THREE.Color(0x2a2a2e);
const ACCENT = new THREE.Color(0xf5b13d);
const tmpC = new THREE.Color();
const dummy = new THREE.Object3D();

/* ── sections → layouts ─────────────────────── */
const sections = [...document.querySelectorAll('section.s')];
const order = sections.map(s => s.dataset.layout);
let centers = [];

function measure() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  /* the object lives right of the text on wide screens, behind it on narrow */
  group.position.x = w > 860 ? Math.min(3.6, w / 460) : 0;
  group.position.y = w > 860 ? 0 : .4;
  centers = sections.map(s => s.offsetTop + s.offsetHeight / 2);
}

/* current state of every cell */
const cur = { pos: new Float32Array(N * 3), scale: new Float32Array(N), glow: new Float32Array(N) };
cur.pos.set(LAYOUTS[order[0]].pos); cur.scale.set(LAYOUTS[order[0]].scale);
const rotCur = [...LAYOUTS[order[0]].rot];

let scrollF = 0, mouseX = 0, mouseY = 0, mx = 0, my = 0;

function scrollIndex() {
  const y = scrollY + innerHeight * .5;
  if (y <= centers[0]) return 0;
  const last = centers.length - 1;
  if (y >= centers[last]) return last;
  for (let i = 0; i < last; i++) {
    if (y >= centers[i] && y < centers[i + 1]) {
      const u = (y - centers[i]) / (centers[i + 1] - centers[i]);
      /* dwell on each layout: only the middle 60 % of the gap is transition */
      return i + smooth(clamp((u - .2) / .6, 0, 1));
    }
  }
  return last;
}

const T0 = performance.now();
let running = true;

function frame() {
  if (!running) return;
  const t = (performance.now() - T0) * .001;

  scrollF += (scrollIndex() - scrollF) * (REDUCED ? 1 : .09);
  const a = Math.floor(scrollF), b = Math.min(a + 1, order.length - 1);
  const u = scrollF - a;
  const LA = LAYOUTS[order[a]], LB = LAYOUTS[order[b]];
  const nameA = order[a], nameB = order[b];

  /* rotation blends between layouts; lattices keep turning */
  const spinA = LA.spin ? t * .07 : 0, spinB = LB.spin ? t * .07 : 0;
  mx += (mouseX - mx) * .05; my += (mouseY - my) * .05;
  const rx = mix(LA.rot[0], LB.rot[0], u) + my * .12;
  const ry = mix(LA.rot[1] + spinA, LB.rot[1] + spinB, u) + mx * .18;
  const rz = mix(LA.rot[2], LB.rot[2], u);
  group.rotation.set(rx, ry, rz);

  const horizonW = (nameA === 'horizon' ? 1 - u : 0) + (nameB === 'horizon' ? u : 0);

  for (let i = 0; i < N; i++) {
    /* each cell leaves a little after its neighbours, so the morph ripples */
    const lag = R[i*4+2] * .35;
    const ui = smooth(clamp((u - lag) / (1 - lag), 0, 1));

    let px = mix(LA.pos[i*3],   LB.pos[i*3],   ui);
    let py = mix(LA.pos[i*3+1], LB.pos[i*3+1], ui);
    let pz = mix(LA.pos[i*3+2], LB.pos[i*3+2], ui);
    const sc = mix(LA.scale[i], LB.scale[i], ui);

    if (horizonW > 0) py += horizonW * .16 * Math.sin((i % 96) * .19 + t * .8 + ((i / 96) | 0) * .3);

    const k = REDUCED ? 1 : .16;
    cur.pos[i*3]   += (px - cur.pos[i*3])   * k;
    cur.pos[i*3+1] += (py - cur.pos[i*3+1]) * k;
    cur.pos[i*3+2] += (pz - cur.pos[i*3+2]) * k;
    cur.scale[i]   += (sc - cur.scale[i])   * k;

    dummy.position.set(cur.pos[i*3], cur.pos[i*3+1], cur.pos[i*3+2]);
    dummy.scale.setScalar(Math.max(cur.scale[i], .0001));
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    /* glow: the living value of each layout, blended */
    const gA = LIVE[nameA](i, t, LA.glow), gB = LIVE[nameB](i, t, LB.glow);
    const g = mix(gA, gB, ui);
    cur.glow[i] += (g - cur.glow[i]) * .25;
    const gl = cur.glow[i];
    glowAttr.array[i] = gl * .9;
    tmpC.copy(BASE).lerp(ACCENT, clamp(gl * 1.1, 0, 1));
    mesh.setColorAt(i, tmpC);
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
  glowAttr.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

/* ── the page: reveals, counters, rail ─────── */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .18 });
document.querySelectorAll('.r').forEach(el => io.observe(el));

const counters = [...document.querySelectorAll('[data-count]')];
const cio = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
    if (REDUCED) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1300;
    (function step() {
      const p = clamp((performance.now() - t0) / dur, 0, 1);
      el.textContent = (end * ease(p)).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })();
  });
}, { threshold: .6 });
counters.forEach(el => { el.textContent = (0).toFixed(+el.dataset.dec || 0); cio.observe(el); });

const dots = [...document.querySelectorAll('.rail a')];
const sio = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    dots.forEach(d => d.classList.toggle('on', d.dataset.dot === e.target.id));
  });
}, { threshold: .5 });
sections.forEach(s => sio.observe(s));

/* ── go ───────────────────────────────────── */
addEventListener('resize', measure);
addEventListener('mousemove', e => {
  mouseX = (e.clientX / innerWidth - .5) * 2;
  mouseY = (e.clientY / innerHeight - .5) * 2;
}, { passive: true });
document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  if (running) frame();
});

measure();
/* fonts change section heights; re-measure once they land */
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
addEventListener('load', measure);
frame();
