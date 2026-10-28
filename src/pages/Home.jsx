import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import Writing from '../components/Writing.jsx';
import CommitCanvas from '../components/CommitCanvas.jsx';
import { scrollToId } from '../motion.js';

export default function Home() {
  const { state, hash } = useLocation();

  // Arriving from a case study via "Projects"/"Writing", or a #hash link.
  useEffect(() => {
    const id = state?.scrollTo || hash.replace('#', '');
    if (id) setTimeout(() => scrollToId(id), 60);
  }, [state, hash]);

  return (
    <main className="column">
      <Hero />
      <ProjectGrid />
      <Writing />
      <CommitCanvas />
    </main>
  );
}
