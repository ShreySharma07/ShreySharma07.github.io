import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import { scrollToId, scrollToTop } from '../motion.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section links scroll on the home page, or go home first from a case study.
  const go = id => event => {
    event.preventDefault();
    if (pathname === '/') scrollToId(id);
    else navigate('/', { state: { scrollTo: id } });
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <nav className="nav__pill" aria-label="Primary">
        <Link to="/" className="nav__mark" aria-label="Shrey Sharma, home" onClick={() => pathname === '/' && scrollToTop()}>
          S<span>/</span>
        </Link>
        <a href="/#projects" className="nav__link" onClick={go('projects')}>Projects</a>
        <a href="/#writing" className="nav__link" onClick={go('writing')}>Writing</a>
        <a href={`${import.meta.env.BASE_URL}resume.pdf`} className="nav__link" target="_blank" rel="noopener">
          Resume <ArrowUpRight aria-hidden="true" className="nav__arrow" />
        </a>
        <span className="nav__sep" aria-hidden="true" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
