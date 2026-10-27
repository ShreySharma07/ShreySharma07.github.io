import { useState } from 'react';
import GlassNav from './GlassNav.jsx';

export default function Hero() {
  // memoji.png is optional; until it exists the macOS-style silhouette shows.
  const [src, setSrc] = useState(`${import.meta.env.BASE_URL}memoji.png`);

  return (
    <header className="hero" id="top">
      <h1 className="hero__name">Shrey Sharma</h1>
      <p className="hero__role">AI Engineer</p>
      <div className="avatar">
        <img src={src} alt="Shrey's Memoji" onError={() => setSrc(`${import.meta.env.BASE_URL}silhouette.svg`)} />
      </div>
      <GlassNav />
    </header>
  );
}
