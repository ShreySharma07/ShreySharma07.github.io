// Draws each project's carousel card as an SVG, so the artwork always matches
// the copy in projects.js.
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const cardArt = p => {
  const [a, b] = p.tint;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="h" cx="0.25" cy="0.15" r="0.8">
      <stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="28"/></filter>
  </defs>
  <rect width="400" height="500" fill="url(#g)"/>
  <circle cx="330" cy="400" r="120" fill="${a}" filter="url(#soft)" opacity=".9"/>
  <circle cx="60" cy="430" r="90" fill="${b}" filter="url(#soft)" opacity=".8"/>
  <rect width="400" height="500" fill="url(#h)"/>
  <g font-family="-apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif" fill="#1d1d1f">
    <text x="32" y="64" font-size="20" font-weight="500" fill="#3a3a3f" opacity=".75">${esc(p.subtitle)}</text>
    <text x="30" y="250" font-size="92" font-weight="700" letter-spacing="-3">${esc(p.metric)}</text>
    <text x="34" y="290" font-size="20" font-weight="500" fill="#3a3a3f">${esc(p.metricLabel)}</text>
    <text x="32" y="452" font-size="40" font-weight="650" letter-spacing="-1">${esc(p.title)}</text>
  </g>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
