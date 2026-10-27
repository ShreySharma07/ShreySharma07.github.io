import { PROJECTS } from '../data/projects.js';

const ITEMS = [
  { id: 'about', label: 'About me', note: 'who I am' },
  { id: 'projects', label: 'Projects', note: `${PROJECTS.length} builds` },
  { id: 'contact', label: 'Contact', note: 'say hi' }
];

export default function GlassNav() {
  const go = id => event => {
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className="glass-nav" aria-label="Sections">
      {ITEMS.map(item => (
        <a key={item.id} className="glass glass-nav__item" href={`#${item.id}`} onClick={go(item.id)}>
          <span className="glass-nav__label">{item.label}</span>
          <span className="glass-nav__note">{item.note}</span>
        </a>
      ))}
    </nav>
  );
}
