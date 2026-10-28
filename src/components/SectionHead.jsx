import Reveal from './Reveal.jsx';

export default function SectionHead({ id, title, aside, action }) {
  return (
    <Reveal className="section-head">
      <h2 id={id}>
        {title} {aside && <i>{aside}</i>}
      </h2>
      {action}
    </Reveal>
  );
}
