import { useEffect } from 'react';
import SplashCursor from './components/reactbits/SplashCursor.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import { reducedMotion } from './lib.js';

const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

// Sections fade up into place the first time they scroll into view.
const useReveal = () => {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px' }
    );
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
};

export default function App() {
  useReveal();
  const still = reducedMotion();

  return (
    <>
      {/* Vibrant ink (HSL S 95%, L 65%: coral, cyan, electric blue, gold, mint) absorbed
          into pure white by the light-theme display shader, like watercolour. */}
      {!still && (
        <SplashCursor
          theme="light"
          colors={['#fb6d51', '#51e4fb', '#5184fb', '#fbca51', '#51fbbc']}
          rainbow={false}
          colorSpeed={0.25}
          intensity={2.2}
          size={0.9}
          swirl={2}
          trail={1}
          shading={0}
          glow={0}
          intro={false}
          quality={isPhone ? 'medium' : 'high'}
          zIndex={0}
        />
      )}
      <main className="page">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="foot">
        <span>Shrey Sharma — India</span>
        <span>React · WebGL fluid · Geist</span>
      </footer>
    </>
  );
}
