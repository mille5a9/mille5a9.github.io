# mille5a9.github.io

Andrew Miller's portfolio, built with [Astro](https://astro.build) and served by GitHub Pages at https://mille5a9.github.io.

## Develop

```bash
npm install
npm run dev
```

Projects live in `src/data/projects.ts`. The resume page is `src/pages/resume.astro`, and `public/andrew-miller-resume.pdf` is the public PDF (no phone number).

## Deploy

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`. One-time setup: in the repo's Settings → Pages, set Source to "GitHub Actions".
