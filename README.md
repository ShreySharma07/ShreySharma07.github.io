# Shrey Sharma — portfolio

An oil painting of a cottage and a lake, with me on a rock by the water with a
laptop. Drag the cursor across it and the paint smears like it is still wet,
then settles. Click me by the lake and the painting dissolves into a portrait
that says hi.

`index.html` holds everything: a WebGL fragment shader draws the painting and
the wet-paint smear, with a plain `<img>` fallback when WebGL is unavailable.
The images are in `assets/`. No build step and no libraries.

## Running it

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Next

- [ ] "Ask me anything": the chat behind the greeting
- [ ] Projects (from GitHub) and writing
- [ ] New headline
