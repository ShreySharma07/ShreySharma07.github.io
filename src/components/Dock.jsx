import { Layers, Mail, Sparkles, User } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';

const ARGUS = PROJECTS.findIndex(p => p.id === 'argus');

const ITEMS = [
  { label: 'Me', note: 'B.Tech CS ’26', Icon: User, target: 'about' },
  { label: 'Projects', note: 'KARMA, Kario, Repliq', Icon: Layers, target: 'projects' },
  { label: 'RAG & Agents', note: 'GraphRAG, ReAct, MCP', Icon: Sparkles, target: 'projects', focus: ARGUS },
  { label: 'Contact', note: 'Say hi', Icon: Mail, target: 'contact' }
];

export default function Dock({ onGo }) {
  const open = item => () => {
    onGo(item.target);
    // Turn the project ring to the agents project; a click on a card focuses it.
    if (item.focus >= 0) {
      setTimeout(() => document.querySelector(`.project-ring [data-cc-index="${item.focus}"]`)?.click(), 450);
    }
  };

  return (
    <nav aria-label="Sections" className="mt-5 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
      {ITEMS.map(item => (
        <button
          key={item.label}
          type="button"
          onClick={open(item)}
          className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-zinc-200/80 bg-white/75 p-3.5 shadow-2xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <item.Icon className="h-5 w-5 text-zinc-700" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm font-semibold text-zinc-900">{item.label}</span>
          <span className="text-xs text-zinc-500">{item.note}</span>
        </button>
      ))}
    </nav>
  );
}
