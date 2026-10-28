// Draws each project's carousel card on a canvas. A canvas (unlike an SVG in
// an <img>) can use the page's web fonts, so the cards set in Geist.
const W = 600;
const H = 720;
const CHROME = ['#c9ccd6', '#e8e6f2', '#b9a7ff', '#8f7cff', '#a6e3ff'];

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const chrome = (ctx, x0, y0, x1, y1) => {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  CHROME.forEach((c, i) => g.addColorStop(i / (CHROME.length - 1), c));
  return g;
};

const drawCard = (p, index, total) => {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // base
  const base = ctx.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, '#111118');
  base.addColorStop(1, '#08080b');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // violet bloom, low right, plus a faint silver catch-light top left
  const bloom = ctx.createRadialGradient(W * 0.78, H * 0.86, 0, W * 0.78, H * 0.86, W * 0.85);
  bloom.addColorStop(0, `${p.glow}66`);
  bloom.addColorStop(0.45, `${p.glow}1f`);
  bloom.addColorStop(1, 'transparent');
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, W, H);
  const catch_ = ctx.createRadialGradient(W * 0.1, H * 0.05, 0, W * 0.1, H * 0.05, W * 0.7);
  catch_.addColorStop(0, 'rgba(232,230,242,0.10)');
  catch_.addColorStop(1, 'transparent');
  ctx.fillStyle = catch_;
  ctx.fillRect(0, 0, W, H);

  // chrome hairline
  roundRect(ctx, 1.5, 1.5, W - 3, H - 3, 42);
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = chrome(ctx, 0, 0, W, H);
  ctx.stroke();
  ctx.globalAlpha = 1;

  const pad = 52;
  ctx.textBaseline = 'alphabetic';

  // top row: subtitle and index, mono
  ctx.font = '500 22px "Geist Mono", ui-monospace, monospace';
  ctx.fillStyle = '#9a9cab';
  ctx.fillText(p.subtitle.toUpperCase(), pad, pad + 22, W - pad * 2 - 90);
  const idx = `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
  ctx.textAlign = 'right';
  ctx.fillText(idx, W - pad, pad + 22);
  ctx.textAlign = 'left';

  // metric in chrome, sized to fit
  let size = 168;
  const fit = () => {
    ctx.font = `600 ${size}px Geist, system-ui, sans-serif`;
    return ctx.measureText(p.metric).width;
  };
  while (fit() > W - pad * 2 && size > 60) size -= 4;
  ctx.fillStyle = chrome(ctx, pad, 300 - size, W - pad, 330);
  ctx.save();
  ctx.shadowColor = 'rgba(143,124,255,0.35)';
  ctx.shadowBlur = 40;
  ctx.fillText(p.metric, pad - 4, 360);
  ctx.restore();

  ctx.font = '500 24px "Geist Mono", ui-monospace, monospace';
  ctx.fillStyle = '#b8bac6';
  ctx.fillText(p.metricLabel.toUpperCase(), pad, 412, W - pad * 2);

  // title
  ctx.font = '600 58px Geist, system-ui, sans-serif';
  ctx.fillStyle = '#ecebf5';
  ctx.fillText(p.title, pad, H - pad - 6, W - pad * 2);

  return canvas.toDataURL('image/png');
};

// Waits (briefly) for the web fonts so the canvas draws in Geist, not a fallback.
export const renderCards = async projects => {
  if (document.fonts?.load) {
    const fonts = Promise.all([
      document.fonts.load('600 160px Geist'),
      document.fonts.load('500 24px "Geist Mono"')
    ]);
    await Promise.race([fonts, new Promise(r => setTimeout(r, 2000))]).catch(() => {});
  }
  return projects.map((p, i) => drawCard(p, i, projects.length));
};
