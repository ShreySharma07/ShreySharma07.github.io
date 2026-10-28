import { useEffect, useRef, useState } from 'react';
import Capsule from './Capsule.jsx';
import { inkBurst, inkBurstAt, reducedMotion } from '../lib.js';

const WORDS = ['AI', 'and', 'ML', 'Engineer'];

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(true);
  const avatarRef = useRef(null);

  // Load sequence: ink blooms out of the avatar, then drops now and then while
  // the visitor is idle on the first screen, so touch and still visitors see it.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const first = setTimeout(() => inkBurstAt(avatarRef.current), 350);
    let lastMove = performance.now();
    const moved = () => { lastMove = performance.now(); };
    window.addEventListener('pointermove', moved, { passive: true });
    const idle = setInterval(() => {
      if (performance.now() - lastMove < 5000 || window.scrollY > window.innerHeight * 0.6) return;
      inkBurst(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.2 + Math.random() * 0.55));
    }, 6000);
    return () => { clearTimeout(first); clearInterval(idle); window.removeEventListener('pointermove', moved); };
  }, []);

  return (
    <header id="top" className="hero">
      <div className="topbar">
        <span className="topbar__status">
          <span className="status-dot" aria-hidden="true" />
          Available <span className="topbar__dash">—</span> AI / Backend roles
        </span>
        <a href="#top" className="monogram" aria-label="Shrey Sharma, home">S<span>/</span></a>
        <a href="https://github.com/ShreySharma07" target="_blank" rel="noopener" className="topbar__link">
          GitHub
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>

      <div className="hero__body">
        <div className="hero__intro">
          <div ref={avatarRef} className="avatar">
            {hasPhoto ? (
              <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="Shrey's Memoji" onError={() => setHasPhoto(false)} />
            ) : (
              <div className="orb" role="img" aria-label="Avatar placeholder" />
            )}
          </div>
          <div>
            <p className="hero__kicker">Hey, I’m Shrey</p>
            <p className="hero__strip">LLM Agents · RAG · Distributed Backends · FastAPI</p>
          </div>
        </div>
        <h1 className="hero__title" aria-label="AI and ML Engineer">
          {WORDS.map((w, i) => (
            <span key={w} className="hero__word" aria-hidden="true">
              <span style={{ animationDelay: `${450 + i * 80}ms` }}>{w}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className="hero__dock">
        <Capsule />
      </div>
    </header>
  );
}
