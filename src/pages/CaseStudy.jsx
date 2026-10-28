import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { PROJECT_ICONS } from '../components/icons.jsx';
import { PROJECTS, projectById } from '../data/projects.js';
import { POSTS } from '../data/posts.js';

export default function CaseStudy() {
  const { id } = useParams();
  const p = projectById(id);
  if (!p) return <Navigate to="/" replace />;

  const Icon = PROJECT_ICONS[p.icon];
  const index = PROJECTS.indexOf(p);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const post = p.post && POSTS.find(x => x.id === p.post);

  return (
    <main className="column case">
      <Reveal>
        <Link to="/" viewTransition className="back"><ArrowLeft aria-hidden="true" /> All projects</Link>
      </Reveal>

      <header className="case__head">
        <span className="project__tile project__tile--lg" style={{ viewTransitionName: `tile-${p.id}` }}>
          <Icon aria-hidden="true" strokeWidth={1.5} />
        </span>
        <h1 className="case__title" style={{ viewTransitionName: `title-${p.id}` }}>{p.title}</h1>
        <Reveal as="p" className="case__lede" delay={60}>{p.oneLiner}</Reveal>
      </header>

      <Reveal className="case__metric" delay={120}>
        <span className="case__number">{p.metric}</span>
        <span className="case__label">{p.metricLabel}</span>
      </Reveal>

      <Reveal as="dl" className="case__meta" delay={160}>
        {p.context && <div><dt>Context</dt><dd>{p.context}</dd></div>}
        <div><dt>Stack</dt><dd>{p.stack.join(' · ')}</dd></div>
        <div>
          <dt>Links</dt>
          <dd className="case__links">
            <a href={p.href} target="_blank" rel="noopener">{p.href.includes('huggingface') ? 'Model on Hugging Face' : 'Source on GitHub'} <ArrowUpRight aria-hidden="true" /></a>
            {post && <a href={post.href} target="_blank" rel="noopener"><BookOpen aria-hidden="true" /> Write-up ({post.minutes} min)</a>}
          </dd>
        </div>
      </Reveal>

      <div className="case__body prose">
        <Reveal as="section">
          <h2>The problem</h2>
          <p>{p.problem}</p>
        </Reveal>
        <Reveal as="section">
          <h2>What I built</h2>
          <ul>{p.built.map(b => <li key={b}>{b}</li>)}</ul>
        </Reveal>
        {p.caught && (
          <Reveal as="section" className="case__caught">
            <h2>What went wrong, and how I caught it</h2>
            <p>{p.caught}</p>
          </Reveal>
        )}
        <Reveal as="section">
          <h2>Result</h2>
          <p>{p.result}</p>
        </Reveal>
      </div>

      <nav className="case__pager" aria-label="More projects">
        <Link to={`/projects/${prev.id}`} viewTransition><ArrowLeft aria-hidden="true" /><span><small>Previous</small>{prev.title}</span></Link>
        <Link to={`/projects/${next.id}`} viewTransition className="case__next"><span><small>Next</small>{next.title}</span><ArrowRight aria-hidden="true" /></Link>
      </nav>
    </main>
  );
}
