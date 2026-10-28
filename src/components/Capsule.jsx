import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Layers, Mail, Sparkles, User } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';
import { inkBurstAt, reducedMotion, scrollToId } from '../lib.js';

const ARGUS = PROJECTS.findIndex(p => p.id === 'argus');
const TOPICS = ['KARMA', 'Kario', 'Repliq', 'Argus'];

const NAV = [
  { label: 'Me', note: 'B.Tech CS ’26', Icon: User, target: 'about' },
  { label: 'Projects', note: 'KARMA, Kario, Repliq', Icon: Layers, target: 'projects' },
  { label: 'RAG & Agents', note: 'GraphRAG, ReAct, MCP', Icon: Sparkles, target: 'projects', focus: ARGUS },
  { label: 'Contact', note: 'Say hi', Icon: Mail, target: 'contact' }
];

// One glass capsule: the agent prompt on the left, section icons on the right.
export default function Capsule() {
  const [value, setValue] = useState('');
  const [topic, setTopic] = useState(0);
  const sendRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const id = setInterval(() => setTopic(t => (t + 1) % TOPICS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const go = item => () => {
    scrollToId(item.target);
    // Turn the project ring to the agents project; clicking a card focuses it.
    if (item.focus >= 0) setTimeout(() => document.querySelector(`.project-ring [data-cc-index="${item.focus}"]`)?.click(), 600);
  };

  return (
    <div className="capsule">
      <form
        className="capsule__ask"
        onSubmit={event => {
          event.preventDefault();
          inkBurstAt(sendRef.current);
          setTimeout(() => scrollToId('projects'), 250);
        }}
      >
        <label htmlFor="ask" className="sr-only">Ask my AI agent</label>
        <div className="capsule__field">
          <input id="ask" type="text" autoComplete="off" value={value} onChange={e => setValue(e.target.value)} />
          {!value && (
            <span className="capsule__hint" aria-hidden="true">
              Ask <span className="hidden sm:inline">my AI agent </span>about{' '}
              <span className="capsule__slot">
                <span key={topic} className="capsule__word">{TOPICS[topic]}…</span>
              </span>
            </span>
          )}
        </div>
        <button ref={sendRef} type="submit" aria-label="Ask" className="capsule__send">
          <ArrowRight aria-hidden="true" />
        </button>
      </form>
      <nav className="capsule__nav" aria-label="Sections">
        {NAV.map(item => (
          <button key={item.label} type="button" className="capsule__btn" onClick={go(item)} aria-label={`${item.label}: ${item.note}`}>
            <item.Icon aria-hidden="true" strokeWidth={1.6} />
            <span className="capsule__tip" aria-hidden="true">{item.label}<em>{item.note}</em></span>
          </button>
        ))}
      </nav>
    </div>
  );
}
