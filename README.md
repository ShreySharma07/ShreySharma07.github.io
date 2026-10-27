# Shrey Sharma — portfolio

A white hero with vibrant watercolour ink under the cursor, and a black projects
band in holographic chrome (silver → pearl → lilac → violet → ice).

- **Hero:** mono top bar (availability, `S/` mark, GitHub), Memoji avatar with an
  ink-coloured ring, "Hey, I'm Shrey" in Instrument Serif italic, and a full-width
  Geist headline, "AI and ML Engineer". On load, ink blooms out of the avatar and the
  headline reveals word by word. Ink also drops on its own while a visitor is idle.
- **Capsule:** one glass bar holding the "Ask my AI agent about …" prompt (visual for
  now; it drops ink and scrolls to Projects) and icon buttons for Me, Projects,
  RAG & Agents and Contact.
- **Projects:** React Bits `CircularCarousel` (cylinder) on black, with cards drawn on
  a canvas in Geist with chrome numbers, and a detail panel that follows the front card.

Built with Vite, React, Tailwind CSS v4 and lucide icons; type is Geist, Geist Mono
and Instrument Serif. The fluid cursor and the carousel are
[React Bits](https://reactbits.dev) components in `src/components/reactbits/`.
`CircularCarousel` is unmodified. `SplashCursor` has two marked changes: light-theme
ink is absorbed into pure white (`1 - clamp(c * 0.45, 0, 0.65)`), and it listens for
`ink:burst` events so the page can drop ink anywhere.

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
