# Shrey Sharma — portfolio

A white page with a status pill, an `S/` mark, "Hey, I'm Shrey 👋", the headline
"AI and ML Engineer", an avatar, an "Ask my AI agent" bar and a four-item dock
(Me · Projects · RAG & Agents · Contact). Moving the cursor spreads vibrant
watercolour ink across the page. Projects sit on a circular carousel you can drag.

Built with Vite, React, Tailwind CSS v4 and lucide icons. The fluid cursor and the
carousel are [React Bits](https://reactbits.dev) components in
`src/components/reactbits/` (`npx shadcn@latest add @react-bits/CircularCarousel-JS-CSS`
installs the carousel). `CircularCarousel` is unmodified. `SplashCursor` has one
change, marked in its display shader: light-theme ink is absorbed into pure white
(`1 - clamp(c * 0.45, 0, 0.65)`) so trails never turn grey at the edges.

## Editing

- **Projects:** `src/data/projects.js` holds every title, number and bullet. The
  carousel cards are drawn from it (`src/data/cardArt.js`).
- **Avatar:** `public/avatar.png` (a square, transparent-background Memoji). If it
  fails to load, an animated iridescent orb shows instead.
- **Ink colours:** the `SplashCursor` props in `src/App.jsx`.
- **Resume:** `public/resume.pdf`.

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
```

## Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
One-time setup: repo **Settings → Pages → Source → GitHub Actions**.
