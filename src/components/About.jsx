const SKILLS = ['Python', 'Java', 'SQL', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS Lambda', 'SageMaker', 'CDK', 'Cloudflare Workers', 'pytest', 'GitHub Actions', 'PyTorch', 'LLM agents'];

export default function About() {
  return (
    <section className="section section--wash" id="about" aria-labelledby="about-title" data-reveal>
      <p className="eyebrow">About me</p>
      <h2 id="about-title" className="section__title">I build AI systems, and the backend that proves they work.</h2>
      <div className="glass panel about">
        <div className="about__text">
          <p>
            I’m a 2026 Computer Science graduate (AI specialisation) from the University of Lucknow. I like
            backend and distributed systems in Python: ingestion pipelines, edge APIs, serverless ML services.
          </p>
          <p>
            The thing I care about most is whether a result is real. When my code-optimisation pipeline
            reported a 40× speedup, I didn’t ship it. I found out why it was wrong and built a four-stage
            harness that took false positives to zero. Its best verified result is 8.99×.
          </p>
        </div>
        <dl className="facts">
          <div><dt>Education</dt><dd>B.Tech, CS (AI) · University of Lucknow · 2022–26</dd></div>
          <div><dt>Hackathon</dt><dd>Top 5 of 120+ teams · IIT Madras Malware Analysis</dd></div>
          <div><dt>Practice</dt><dd>500+ data structures &amp; algorithms problems in Python</dd></div>
          <div><dt>Courses</dt><dd>Agentic AI (UC Berkeley) · ML Specialization (IBM)</dd></div>
        </dl>
        <ul className="chips" aria-label="Skills">
          {SKILLS.map(s => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}
