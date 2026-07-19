# Static Site

Arabic-first (RTL) marketing site built with Next.js (App Router, TypeScript) and exported as a fully static bundle.

## Stack

- **Next.js** — static export (`output: "export"`), SSG
- **Tailwind CSS v4** — design tokens via `@theme`, RTL via logical properties
- **Fonts:** Cairo + Source Sans 3 via `next/font/google`
- **Icons:** lucide-react + custom inline SVGs
- **Analytics:** GA4 via env var + a single `track()` util

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static output is generated into `./out` and deployed via GitHub Actions.
