import { useMemo, useState } from 'react';
import CircularCarousel from './reactbits/CircularCarousel.jsx';
import { PROJECTS } from '../data/projects.js';
import { cardArt } from '../data/cardArt.js';

const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

export default function Projects() {
  const [active, setActive] = useState(0);
  const items = useMemo(
    () => PROJECTS.map(p => ({ src: cardArt(p), alt: `${p.title}: ${p.metric} ${p.metricLabel}`, title: p.title, subtitle: p.subtitle })),
    []
  );
  const p = PROJECTS[active] ?? PROJECTS[0];

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <p className="eyebrow">Projects</p>
      <h2 id="projects-title" className="section__title">Drag the ring. Every number is measured.</h2>
      <div className="ring">
        <CircularCarousel
          items={items}
          preset="orbit"
          cardWidth={isPhone ? 190 : 240}
          aspectRatio={4 / 5}
          gap={28}
          autoplay="drift"
          speed={10}
          captions
          fadeColor="#fbfbfd"
          depthFade={0.5}
          innerShade={0.6}
          cornerRadius={22}
          onChange={setActive}
          onItemClick={(_, i) => setActive(i)}
        />
      </div>
      <article className="glass panel detail" aria-live="polite">
        <header className="detail__head">
          <div>
            <h3>{p.title}</h3>
            <p className="detail__sub">{p.subtitle}</p>
          </div>
          <p className="detail__metric"><b>{p.metric}</b><span>{p.metricLabel}</span></p>
        </header>
        <ul className="detail__points">
          {p.points.map(pt => <li key={pt}>{pt}</li>)}
        </ul>
        <footer className="detail__foot">
          <ul className="chips" aria-label="Stack">
            {p.stack.map(s => <li key={s}>{s}</li>)}
          </ul>
          <a className="link" href={p.href} target="_blank" rel="noopener">View on {p.href.includes('huggingface') ? 'Hugging Face' : 'GitHub'} ↗</a>
        </footer>
      </article>
    </section>
  );
}
