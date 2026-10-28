# Shrey Sharma — portfolio

A quiet, typographic personal site: one reading column, light and dark themes,
smooth inertial scrolling, and content that develops into focus as you read.

- **Home:** photo, name and a cycling role line; a short intro in mixed type
  (bold sans for weight, serif italics for voice); selected projects with a
  cursor-following preview of each headline number; writing from Medium; and a
  GitHub commit heatmap.
- **Case studies** at `/projects/:id`: problem, what I built, what went wrong and
  how I caught it, and the result, with the key number set large.

Built with Vite, React, React Router, Tailwind CSS v4, Lenis and lucide icons.
Type: Geist, Geist Mono and Instrument Serif.

## Editing

- **Projects:** `src/data/projects.js` (grid, hover preview and case studies all read it)
- **Posts:** `src/data/posts.js`
- **Links, roles, email:** `src/data/site.js`
- **Photo:** `src/assets/photo.jpg` · **Resume:** `public/resume.pdf`

## Commit heatmap

`scripts/fetch-contributions.mjs` writes `public/contributions.json` from GitHub's
API during deploy, using the workflow's built-in token. The workflow also runs
daily so the grid stays current. Locally (no token) the page falls back to a
public contributions API, and hides the section if that fails too.

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/, plus 404.html so deep links work on GitHub Pages
```

Deploys from `main` via `.github/workflows/deploy.yml`.
