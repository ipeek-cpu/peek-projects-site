# Peek Projects — Vercel Deployment

This folder is ready for Vercel as a **static site** (no build step).

## Deploy (GitHub flow)
1. Create a new repo on GitHub and push these files.
2. In Vercel: **Add New → Project → Import Git Repository**.
3. Framework Preset: **Other**. Build command: *(none)*. Output directory: `.`
4. Click Deploy. Then attach your domain **peek.consulting** in **Settings → Domains** and follow the DNS prompts.

## Direct Upload (optional)
You can also use the Vercel CLI:
```bash
npm i -g vercel
vercel
```
Accept defaults and link to a new project.

## Notes
- `index.html` now loads **GSAP** and **Three.js** from CDNs.
- `main.js` is loaded with `type="module"` to enable dynamic import of `heroScene.js`.
- Content is populated from `content.json` at runtime.
- If you use images/icons referenced under `assets/`, create an `assets/` folder and add files there.
