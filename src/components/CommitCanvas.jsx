import { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { SITE } from '../data/site.js';

const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Built at deploy time from GitHub's API; falls back to a public mirror.
const load = async () => {
  try {
    const r = await fetch(`${import.meta.env.BASE_URL}contributions.json`, { cache: 'no-cache' });
    if (r.ok) return await r.json();
  } catch {}
  const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}?y=last`);
  if (!r.ok) throw new Error('no contribution data');
  const j = await r.json();
  return { total: j.total?.lastYear ?? j.contributions.reduce((s, d) => s + d.count, 0), days: j.contributions.map(d => ({ date: d.date, count: d.count })) };
};

const levelOf = (count, max) => (count === 0 ? 0 : Math.min(4, Math.ceil((count / Math.max(max, 1)) * 4)));

export default function CommitCanvas() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    let live = true;
    load().then(d => live && setData(d)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, []);

  const grid = useMemo(() => {
    if (!data?.days?.length) return null;
    const days = [...data.days].sort((a, b) => a.date.localeCompare(b.date)).slice(-371);
    const first = new Date(`${days[0].date}T00:00:00`);
    const lead = first.getDay(); // weeks start on Sunday, like GitHub
    const max = days.reduce((m, d) => Math.max(m, d.count), 0);
    const cells = days.map((d, i) => {
      const k = i + lead;
      return { ...d, x: Math.floor(k / 7), y: k % 7, level: levelOf(d.count, max) };
    });
    const weeks = Math.max(...cells.map(c => c.x)) + 1;
    const months = [];
    cells.forEach(c => {
      const dt = new Date(`${c.date}T00:00:00`);
      if (dt.getDate() <= 7 && c.y === 0) months.push({ x: c.x, label: MONTHS[dt.getMonth()] });
    });
    return { cells, weeks, months };
  }, [data]);

  if (failed) return null;

  return (
    <section className="block" aria-labelledby="commits">
      <SectionHead
        id="commits"
        title="Commit canvas"
        aside="the story behind the progress."
        action={data && <span className="see-all see-all--static">{data.total.toLocaleString()} contributions this year</span>}
      />
      <Reveal className="canvas">
        {!grid ? (
          <div className="canvas__loading" aria-label="Loading contributions" />
        ) : (
          <div className="canvas__scroll">
            <svg
              className="canvas__svg"
              viewBox={`0 -16 ${grid.weeks * PITCH} ${7 * PITCH + 16}`}
              role="img"
              aria-label={`${data.total} GitHub contributions in the last year`}
              onPointerLeave={() => setTip(null)}
            >
              {grid.months.map(m => (
                <text key={`${m.x}-${m.label}`} x={m.x * PITCH} y={-5} className="canvas__month">{m.label}</text>
              ))}
              {grid.cells.map((c, i) => (
                <rect
                  key={c.date}
                  x={c.x * PITCH}
                  y={c.y * PITCH}
                  width={CELL}
                  height={CELL}
                  rx="2.5"
                  className={`cell l${c.level}`}
                  style={{ '--i': c.x }}
                  onPointerEnter={() => setTip({ ...c, i })}
                />
              ))}
            </svg>
            {tip && (
              <div
                className="canvas__tip"
                style={{ left: `${((tip.x * PITCH + CELL / 2) / (grid.weeks * PITCH)) * 100}%`, top: `${((tip.y * PITCH + 16) / (7 * PITCH + 16)) * 100}%` }}
              >
                <b>{tip.count === 0 ? 'No' : tip.count} contribution{tip.count === 1 ? '' : 's'}</b>{' '}
                {new Date(`${tip.date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </div>
            )}
          </div>
        )}
      </Reveal>
    </section>
  );
}
