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
      {/* Vibrant ink (HSL S 95%, L 65%: coral, cyan, electric blue, gold, mint) absorbed
          into pure white by the light-theme display shader, like watercolour. */}
      {!reducedMotion && (
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
        <span>Built with React and a fluid simulation.</span>
      </footer>
    </>
  );
}
