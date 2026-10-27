import { useState } from 'react';

const EMAIL = 'shrey7shrey@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('email'));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <section className="section section--wash" id="contact" aria-labelledby="contact-title" data-reveal>
      <p className="eyebrow">Contact</p>
      <h2 id="contact-title" className="section__title">Building something that has to actually work? Say hi.</h2>
      <div className="glass panel contact">
        <div className="contact__email">
          <span id="email">{EMAIL}</span>
          <button type="button" className="btn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
        <div className="contact__links">
          <a className="btn" href="https://github.com/ShreySharma07" target="_blank" rel="noopener">GitHub ↗</a>
          <a className="btn" href="https://www.linkedin.com/in/shrey-sharma-8a9425269/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a className="btn btn--dark" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener">Resume (PDF)</a>
        </div>
      </div>
    </section>
  );
}
