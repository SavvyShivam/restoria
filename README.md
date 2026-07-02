# Restoria — Landing & Privacy

Static marketing site + privacy policy for **Restoria**, the AI photo restorer (iOS & Android).
Zero build step, zero dependencies — plain HTML/CSS/JS, ready for GitHub Pages.

## Live URLs (GitHub Pages)
- Landing: `https://savvyshivam.github.io/restoria/`
- Privacy policy: `https://savvyshivam.github.io/restoria/privacy.html`  ← use this in Play Console

## Files
```
index.html      Landing page (hero before/after slider, features, screenshots, pricing pledge)
privacy.html    Play-compliant privacy policy
styles.css      Warm Archival design tokens (mirrors the app DESIGN.md)
app.js          Draggable before/after slider + scroll reveals (vanilla JS)
assets/         icon.png, feature.png,
                shots/shot-1..5-real.png  ← shown on the landing page
                shots/shot-1..5.png       ← generated ASO mockups (fallback source)
.nojekyll       Serve files verbatim (skip Jekyll processing)
```

## Updating the screenshots

The landing gallery loads `assets/shots/shot-N-real.png`. To swap in real device
captures, just overwrite those 5 `-real.png` files (any portrait size — CSS scales
them). No HTML changes needed. The plain `shot-N.png` files are the generated ASO
mockups kept as a fallback/source.

## Local preview
```bash
cd restoria-site
python -m http.server 8080   # then open http://localhost:8080
```

## Deploy (GitHub Pages)
Pushed to the `main` branch of `savvyshivam/restoria`; Pages is served from `main` / root.
Design: Warm Archival — Fraunces + Instrument Sans, terracotta `#C9603F` / deep teal `#2C6E6A`.
