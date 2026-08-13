# Shrey Sharma — portfolio

A static portfolio site. No build step, no dependencies — open `index.html` and it runs.

| Page | What it does |
|---|---|
| `index.html` | A sprout of ASCII characters that grows into a tree as you scroll. The three leaf tips are the navigation, labelled in binary until you hover them. |
| `projects.html` | A four-layer neural network firing signals forward and backward. Scrolling dissolves it into glyph shrapnel, fills the screen with ML/DL vocabulary, then springs the project list up. |
| `about.html` | A live black hole with a rainbow accretion disk on a white sky. Click the singularity and four stars fall out; click a star to read what it holds. |
| `links.html` | Where to find me. |

## Layout

```
index.html      tree.js     the growing tree
projects.html   net.js      the neural network + word field
about.html      hole.js     the black hole + stars
links.html
style.css                   shared design system for every page
```

`style.css` holds the palette, type scale, and shared components (header, page shell,
project entries, link channels). Per-page styles live in a `<style>` block in that page.

## Running it

Any static server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Opening the files directly over `file://` mostly works, but a server is closer to production.

## Still to do

- [ ] Add `music.mp3` to this folder — the landing page's audio toggle expects it
- [ ] Real LinkedIn URL (placeholder in `links.html` and `hole.js`)
- [ ] Blog posts for the Writing star in `about.html`
- [ ] Review the "What's next" copy in `hole.js`
