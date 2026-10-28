import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { reducedMotion } from '../motion.js';

const current = () => document.documentElement.dataset.theme || 'light';

// Swaps light/dark with a circular reveal that grows from the button.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(current);

  const toggle = event => {
    const next = current() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
      try { localStorage.setItem('theme', next); } catch {}
    };
    if (!document.startViewTransition || reducedMotion()) return apply();
    const r = event.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.documentElement.classList.add('theme-swap');
    const t = document.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 560, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
    t.finished.finally(() => document.documentElement.classList.remove('theme-swap'));
  };

  return (
    <button type="button" className="nav__icon" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
