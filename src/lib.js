export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollToId = id =>
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });

// Drops ink into the fluid at a screen point (SplashCursor listens for this).
export const inkBurst = (x, y) => window.dispatchEvent(new CustomEvent('ink:burst', { detail: { x, y } }));

export const inkBurstAt = element => {
  const r = element?.getBoundingClientRect();
  if (r) inkBurst(r.left + r.width / 2, r.top + r.height / 2);
};
