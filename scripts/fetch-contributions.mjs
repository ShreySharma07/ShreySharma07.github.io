// Writes public/contributions.json: the last year of GitHub contributions for
// the site's heatmap. Runs in the deploy workflow with the built-in
// GITHUB_TOKEN. Without a token it does nothing, and the page falls back to a
// public API at runtime.
import { mkdir, writeFile } from 'node:fs/promises';

const user = process.env.GITHUB_USER || 'ShreySharma07';
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.log('fetch-contributions: no GITHUB_TOKEN, skipping');
  process.exit(0);
}

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

try {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: user } })
  });
  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error(JSON.stringify(json?.errors ?? json));
  const days = cal.weeks.flatMap(w => w.contributionDays.map(d => ({ date: d.date, count: d.contributionCount })));
  await mkdir('public', { recursive: true });
  await writeFile('public/contributions.json', JSON.stringify({ user, total: cal.totalContributions, days, fetchedAt: new Date().toISOString() }));
  console.log(`fetch-contributions: ${cal.totalContributions} contributions, ${days.length} days`);
} catch (err) {
  // Never fail the deploy over the heatmap.
  console.warn('fetch-contributions: failed, the page will use its fallback', err.message);
}
