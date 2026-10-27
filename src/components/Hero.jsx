import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Dock from './Dock.jsx';

const scrollTo = id => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

export default function Hero() {
  // /avatar.png is optional. Until it exists the iridescent orb stands in.
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <header id="top" className="relative flex min-h-svh flex-col items-center justify-center px-5 pb-16 pt-24 text-center">
      {/* top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
        <span className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-zinc-800 shadow-2xs backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
          Open to AI &amp; Backend Roles
        </span>
        <a
          href="#top"
          aria-label="Shrey Sharma, home"
          className="select-none text-lg font-bold tracking-[-0.06em] text-zinc-950 sm:absolute sm:left-1/2 sm:-translate-x-1/2"
        >
          S<span className="text-blue-500">/</span>
        </a>
        <a
          href="https://github.com/ShreySharma07"
          target="_blank"
          rel="noopener"
          className="hidden items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-zinc-800 shadow-2xs backdrop-blur-md transition-colors hover:border-zinc-300 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg> ShreySharma07 ↗
        </a>
      </div>

      {/* type */}
      <p className="mb-1 text-lg font-medium text-zinc-700">Hey, I’m Shrey 👋</p>
      <h1 className="text-5xl font-bold tracking-[-0.04em] text-zinc-950 sm:text-6xl">AI and ML Engineer</h1>
      <p className="mt-2 text-balance font-mono text-xs text-zinc-500">LLM Agents · RAG · Distributed Backends · FastAPI</p>

      {/* avatar */}
      <div className="mt-9 h-28 w-28 rounded-full border border-zinc-200/80 bg-white p-1 sm:h-32 sm:w-32">
        {hasPhoto ? (
          <img
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="Shrey Sharma"
            className="h-full w-full rounded-full object-cover"
            onError={() => setHasPhoto(false)}
          />
        ) : (
          <div className="orb h-full w-full" role="img" aria-label="Avatar placeholder" />
        )}
      </div>

      {/* agent prompt (visual for now: sends you to the projects) */}
      <form
        className="mt-8 flex w-full max-w-md items-center justify-between rounded-full border border-zinc-200/90 bg-white/85 py-2 pl-5 pr-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all focus-within:border-zinc-400"
        onSubmit={event => {
          event.preventDefault();
          scrollTo('projects');
        }}
      >
        <label htmlFor="ask" className="sr-only">Ask my AI agent</label>
        <input
          id="ask"
          type="text"
          autoComplete="off"
          placeholder="Ask my AI agent about KARMA, Kario, or Repliq…"
          className="min-w-0 flex-1 bg-transparent text-left text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition-transform hover:bg-blue-600 active:scale-95"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <Dock onGo={scrollTo} />
    </header>
  );
}
