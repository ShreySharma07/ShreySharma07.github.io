import { useEffect, useState } from 'react';
import CircularCarousel from './reactbits/CircularCarousel.jsx';
import { PROJECTS } from '../data/projects.js';
import { renderCards } from '../data/cardArt.js';

const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
const pad = n => String(n).padStart(2, '0');

export default function Projects() {
  const [active, setActive] = useState(0);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let live = true;
    renderCards(PROJECTS).then(srcs => {
      if (live) setItems(PROJECTS.map((p, i) => ({ src: srcs[i], alt: `${p.title}: ${p.metric} ${p.metricLabel}`, title: p.title })));
    });
    return () => { live = false; };
  }, []);

  const p = PROJECTS[active] ?? PROJECTS[0];

  return (
    <div className="band">
      <section className="section section--dark" id="projects" aria-labelledby="projects-title" data-reveal>
        <p className="eyebrow eyebrow--dark">Projects</p>
        <h2 id="projects-title" className="section__title chrome-text">Drag the ring. Every number is measured.</h2>
        <div className="project-ring">
          {items && (
            <CircularCarousel
              items={items}
              preset="cylinder"
              intro="rise"
              cardWidth={isPhone ? 230 : 320}
              aspectRatio={5 / 6}
              gap={isPhone ? 28 : 72}
              autoplay="drift"
              speed={9}
              fadeColor="#07070a"
              depthFade={0.62}
              innerShade={0.3}
              cornerRadius={22}
              onChange={setActive}
              onItemClick={(_, i) => setActive(i)}
            />
          )}
        </div>
        <article className="panel panel--dark detail" aria-live="polite">
          <header className="detail__head">
            <div>
              <p className="detail__index">{pad(active + 1)} / {pad(PROJECTS.length)}</p>
              <h3>{p.title}</h3>
              <p className="detail__sub">{p.subtitle}</p>
            </div>
            <p className="detail__metric"><b className="chrome-text">{p.metric}</b><span>{p.metricLabel}</span></p>
          </header>
          <ul className="detail__points">
            {p.points.map(pt => <li key={pt}>{pt}</li>)}
          </ul>
          <footer className="detail__foot">
            <ul className="chips chips--dark" aria-label="Stack">
              {p.stack.map(s => <li key={s}>{s}</li>)}
            </ul>
            <a className="link link--violet" href={p.href} target="_blank" rel="noopener">
              View on {p.href.includes('huggingface') ? 'Hugging Face' : 'GitHub'}
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </footer>
        </article>
      </section>
    </div>
  );
}
