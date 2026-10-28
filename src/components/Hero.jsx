import { useEffect, useState } from 'react';
import { FileText, Mail, PenLine } from 'lucide-react';
import photo from '../assets/photo.jpg';
import Reveal from './Reveal.jsx';
import { GitHubMark, LinkedInMark } from './icons.jsx';
import { SITE } from '../data/site.js';
import { reducedMotion, scrollToId } from '../motion.js';

// Inline link with an icon and an underline that draws in on hover.
const Inline = ({ href, icon: Icon, children, ...rest }) => (
  <a className="inline-link" href={href} {...rest}>
    {Icon && <Icon className="inline-link__icon" aria-hidden="true" />}
    <b>{children}</b>
  </a>
);

const Roles = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const id = setInterval(() => setI(n => (n + 1) % SITE.roles.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="roles" aria-label={SITE.roles.join(', ')}>
      <span key={i} className="roles__word" aria-hidden="true">{SITE.roles[i]}</span>
    </p>
  );
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Reveal className="hero__id">
        <img className="hero__photo" src={photo} alt="Shrey Sharma" width="56" height="56" />
        <div>
          <h1 className="hero__name">Shrey Sharma</h1>
          <Roles />
        </div>
      </Reveal>

      <div className="prose">
        <Reveal as="p" delay={80}>
          I build <b>AI systems</b> and the <i>backend</i> that proves they <b>actually work</b>: agent pipelines,
          <i> retrieval</i>, fine-tuning, and the <b>distributed services</b> underneath them, mostly in <i>Python</i>.
        </Reveal>
        <Reveal as="p" delay={160}>
          For me, the interesting question is never <i>“is it fast?”</i> but <b>“is it true?”</b>. When my code-optimisation
          pipeline reported a <i>40×</i> speedup, I didn’t ship it. I found out why it was wrong and built a{' '}
          <b>four-stage harness</b> that took false positives to <b>zero</b>. Its best <i>verified</i> result is{' '}
          <b>8.99×</b>.
        </Reveal>
        <Reveal as="p" delay={240}>
          I’m a <i>2026</i> Computer Science graduate (AI specialisation) from 🇮🇳 <b>India</b>, open to <i>AI and backend</i>{' '}
          roles. Reach me by <Inline href={`mailto:${SITE.email}`} icon={Mail}>email</Inline>, on{' '}
          <Inline href={SITE.github} icon={GitHubMark} target="_blank" rel="noopener">GitHub</Inline> and{' '}
          <Inline href={SITE.linkedin} icon={LinkedInMark} target="_blank" rel="noopener">LinkedIn</Inline>, read my{' '}
          <Inline href="#writing" icon={PenLine} onClick={e => { e.preventDefault(); scrollToId('writing'); }}>writing</Inline>, or grab the{' '}
          <Inline href={`${import.meta.env.BASE_URL}resume.pdf`} icon={FileText} target="_blank" rel="noopener">resume</Inline>.
        </Reveal>
      </div>
    </section>
  );
}
