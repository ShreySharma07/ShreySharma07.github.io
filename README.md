# Shrey Sharma — portfolio

One page, one object. A lattice of 1,728 cells — a tensor — that never leaves
the screen and reshapes itself into whatever the section is about. No build step,
no bundler: three files and a CDN import.

| Section  | The lattice becomes                              | Why                          |
|----------|--------------------------------------------------|------------------------------|
| Hero     | a loose lattice                                  | raw material                 |
| Approach | a tight solid cube                               | structure, rigor             |
| KARMA    | a GPU grid with an execution wave sweeping it    | kernels running              |
| Repliq   | a ring with three pulses circling it             | the reason → act → observe loop |
| Llama 2  | a frozen matrix plus two thin bright slabs       | W + ΔW — literally LoRA      |
| Now      | a low horizon with one lit cell moving           | the current work             |
| Contact  | the loose lattice again                          | bookend                      |

## Files

```
index.html   the page — all copy lives here
style.css    type, layout, reveal transitions
scene.js     the tensor: layouts, scroll blending, per-layout motion (Three.js)
resume.pdf
```

`scene.js` is where the argument is made. Each layout is a function returning
positions, scales and glow for every cell; `LIVE` gives each layout its motion;
the frame loop blends between adjacent layouts by scroll position, with a
per-cell lag so the morph ripples instead of snapping.

## Running it

Any static server — the module import needs `http://`, not `file://`.

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Dependency

Three.js 0.170 from jsDelivr via an import map in `index.html`. Nothing else.

## Still to do

- [ ] Blog / writing links, once there are posts to point at
