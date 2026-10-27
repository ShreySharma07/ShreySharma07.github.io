# Shrey Sharma — portfolio

An Apple-white page: name, "AI Engineer", a Memoji, and three glass boxes
(About me · Projects · Contact). Moving the cursor spreads soft pastel ink across
the page. Projects sit on a circular carousel that you can drag.

Built with Vite + React. The fluid cursor and the carousel are
[React Bits](https://reactbits.dev) components (`SplashCursor`, `CircularCarousel`),
vendored unmodified in `src/components/reactbits/`
(`npx shadcn@latest add @react-bits/CircularCarousel-JS-CSS` installs the same files).

## Editing

- **Projects:** `src/data/projects.js` holds every title, number and bullet. The
  carousel cards are drawn from it (`src/data/cardArt.js`).
- **Avatar:** drop a square transparent PNG at `public/memoji.png`. Until then a
  macOS-style silhouette shows.
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
