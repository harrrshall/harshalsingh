# harshalsingh

Personal site — a single-page research-style document with a writing section.

Built with Next.js (static export), Lora serif, no client-side analytics, no
external storage. Deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
```

Outputs a fully static site to `./out`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

Live at <https://harrrshall.github.io/harshalsingh/>.
