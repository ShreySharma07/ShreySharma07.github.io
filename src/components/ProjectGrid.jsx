import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { GitHubMark } from './icons.jsx';
import { PROJECT_ICONS } from './icons.jsx';
import { PROJECTS } from '../data/projects.js';

// A small card that trails the cursor over the grid, showing the project's
// headline number in serif. Only on devices with a fine pointer.
const HoverPreview = ({ project }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = e => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x + 22}px, ${y + 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className={`hover-card ${project ? 'is-on' : ''}`} aria-hidden="true">
      {project && (
        <>
          <span className="hover-card__metric">{project.metric}</span>
          <span className="hover-card__label">{project.metricLabel}</span>
        </>
      )}
    </div>
  );
};

export default function ProjectGrid() {
  const [hovered, setHovered] = useState(null);
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  return (
    <section className="block" aria-labelledby="projects">
      <SectionHead id="projects" title="Selected projects" aside="each number is measured." />
      <div className="project-grid" onPointerLeave={() => setHovered(null)}>
        {PROJECTS.map((p, i) => {
          const Icon = PROJECT_ICONS[p.icon];
          return (
            <Reveal key={p.id} delay={(i % 2) * 70} className="project">
              <Link
                to={`/projects/${p.id}`}
                viewTransition
                className="project__link"
                onPointerEnter={() => fine && setHovered(p)}
                onFocus={() => setHovered(null)}
              >
                <span className="project__tile" style={{ viewTransitionName: `tile-${p.id}` }}>
                  <Icon aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span className="project__head">
                  <span className="project__name" style={{ viewTransitionName: `title-${p.id}` }}>{p.title}</span>
                  <span className="project__metric">{p.metric} · {p.metricShort ?? p.metricLabel}</span>
                </span>
              </Link>
              <p className="project__text">{p.oneLiner}</p>
              <a className="project__source" href={p.href} target="_blank" rel="noopener">
                {p.href.includes('huggingface') ? 'Model' : <><GitHubMark className="project__gh" /> Source</>}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
          );
        })}
      </div>
      {fine && <HoverPreview project={hovered} />}
    </section>
  );
}
