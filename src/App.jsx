import SplashCursor from './components/reactbits/SplashCursor.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

const isPhone = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  return (
    <>
      {/* Pastel ink that spreads under the cursor. Light theme makes it absorb
          into the white page like watercolour instead of glowing. */}
      {!reducedMotion && (
        <SplashCursor
          theme="light"
          colors={['#6f9dff', '#ff8cb4', '#5fd6a4', '#a98bff', '#ffb35c']}
          rainbow={false}
          colorSpeed={0.25}
          intensity={0.6}
          size={0.9}
          swirl={2}
          trail={0.85}
          shading={0}
          glow={0}
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
        <span>Shrey Sharma</span>
        <span>Built with React, a fluid simulation and a lot of white space.</span>
      </footer>
    </>
  );
}
