import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitHubMark, LinkedInMark, MediumMark } from './icons.jsx';
import { SITE } from '../data/site.js';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <footer className="footer">
      <div className="footer__brand">
        <p className="footer__name">Shrey Sharma</p>
        <p className="footer__line">I build AI systems and check that they work. This site is where I keep the receipts.</p>
        <div className="footer__social">
          <a href={SITE.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubMark /></a>
          <a href={SITE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInMark /></a>
          <a href={SITE.medium} target="_blank" rel="noopener" aria-label="Medium"><MediumMark /></a>
        </div>
      </div>
      <nav className="footer__cols" aria-label="Footer">
        <div>
          <p className="footer__h">General</p>
          <Link to="/">Home</Link>
          <a href="/#projects">Projects</a>
          <a href="/#writing">Writing</a>
        </div>
        <div>
          <p className="footer__h">Elsewhere</p>
          <a href={SITE.github} target="_blank" rel="noopener">GitHub</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a href={SITE.huggingface} target="_blank" rel="noopener">Hugging Face</a>
        </div>
        <div>
          <p className="footer__h">Contact</p>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener">Resume (PDF)</a>
          <button type="button" className="footer__copy" onClick={copy}>{copied ? 'Email copied' : 'Copy email'}</button>
        </div>
      </nav>
      <p className="footer__base">© {new Date().getFullYear()} Shrey Sharma · Made in India</p>
    </footer>
  );
}
