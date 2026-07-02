# ZEDLEVEL Website — أكاديمية زد لفل لتعليم الإنجليزية

Arabic-first (RTL) **showcase + conversion funnel** for ZEDLEVEL English courses.
Not an LMS — the site persuades, sorts visitors by level (Free Level Test), and sends
them to checkout (Salla) and delivery (WhatsApp).

**Single source of truth for all copy, curriculum data, and page specs: [`CONTENT.md`](./CONTENT.md).**

## Stack

- **Next.js (App Router, TypeScript)** — SSG/SEO, blog, image optimization
- **Tailwind CSS v4** — brand tokens in `app/globals.css` (`@theme`), RTL via logical properties
- **Fonts:** Cairo (Arabic) + Source Sans 3 (Latin) via `next/font/google`
- **Icons:** lucide-react + custom SVGs (`ArrowMotif` = the brand's level-up arrow)
- **Analytics:** GA4 via `NEXT_PUBLIC_GA4_ID` (see `.env.example`) + single `track()` util

## Getting started

```bash
npm install
npm run optimize-images   # one-time: builds /public/characters + /public/brand from source renders
npm run dev               # http://localhost:3000
npm run build             # production build
```

> Source character renders live in `صور الشخصيات المعتمدة/` (~50–100MB each, gitignored).
> Only the optimized WebP outputs in `/public` are committed. `npm run optimize-images -- --force` re-encodes everything.

## Central config — `config/site.ts`

The ONLY place external links & business facts live: WhatsApp number + pre-filled
messages, Salla product URLs, social links, stats. Values still reading `TODO_…`
render a red dev-only badge and are hidden/disabled in production so we never ship
a dead button.

**Pre-deploy checklist includes:** `grep -r "TODO_" config/ --include="*.ts"` must come back clean.

## Analytics events (GA4)

| Event | Params | Fired when |
|---|---|---|
| `test_start` | — | Level test started |
| `test_complete` | `level` | Level test finished |
| `salla_click` | `course`, `source` | Any Salla buy button clicked |
| `whatsapp_click` | `source` | Any WhatsApp CTA clicked |
| `notify_click` | `course` | Coming-soon "نبّهني" clicked |
| `blog_cta_click` | `slug` | In-article test CTA clicked |

All fired through `lib/track.ts` — no-ops when GA4 isn't configured, logs to console in dev.

## Character system

The mascot family (blue Z-cap characters) is mapped in `config/characters.json`
(file → semantic slug + Arabic alt). `<Mascot name="shab-front" size="hero"/>` renders
optimized images with correct dimensions from `/public/characters/manifest.json`.

Placement plan (user-approved): الشاب = primary mascot (hero/ladder/success) ·
البنت = test intro · الأم + البنت = kids course · الأب = about/how-it-works ·
الجدة = testimonials · الجد = blog · back views = 404.

## Build milestones

M1 foundation ✅ → M2 homepage → M3 A0 landing → M4 Free Level Test → M5 levels/speaking/teasers → M6 secondary pages → M7 blog + SEO → M8 QA (Lighthouse ≥ 90 mobile, RTL integrity, tap targets ≥ 44px, no image > 150KB).

## Deploy

Target: GitHub → Vercel auto-deploy on push to `main` (pending owner approval).
Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA4_ID` in Vercel project env.
