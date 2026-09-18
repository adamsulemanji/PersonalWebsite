# Frontend

The Next.js app behind [adamsulemanji.com](https://adamsulemanji.com). Next.js 15
(App Router) + React 19 + TypeScript + Tailwind CSS 3, **statically exported** and
served from S3 behind CloudFront. There is no server at runtime.

The visual system is documented in [`/design.md`](../design.md) at the repo root —
read it before adding UI.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Verify before pushing

`next.config.ts` only switches on `output: 'export'` and `distDir: 'build'` under
`NODE_ENV=production` — which `next build` sets itself, so the plain build is the
real thing. `npm run dev` does not exercise the export, so check before pushing:

```bash
npm run build
```

ESLint gates the build, so keep it clean:

```bash
npm run lint:check     # or lint:fix
npm run format:check   # or format
```

## Layout

```
src/
  app/          routes — the homepage, /writing/[slug], plus the generated
                sitemap.xml, robots.txt and feed.xml
  components/   UI. Server components by default; see below
  assets/       plain-TS content (projects, writing, books, updates, socials…)
  lib/          site constants, date formatting, shared class fragments
  styles/       globals.css (design tokens + focus treatment) and two
                component stylesheets
```

### Server components by default

The homepage is a server component. Only the animated wrappers (`Hero`,
`Section`) and the genuinely interactive pieces (`PictureCarousel`,
`ThemeToggle`, `ScrollThread`, `MovieList`, `FreshnessLabel`) carry
`'use client'` — they take their content as `children`, which React renders on
the server and hands over as finished markup.

Adding `'use client'` to a component with no hooks, handlers or Framer Motion
drags it and everything it imports into the browser bundle for nothing.

## Content

Everything on the page is plain TypeScript in `src/assets/`. Adding a post means
appending to `writing.ts`; the post page, sitemap entry and RSS item follow
automatically.

## Images

Photos in `public/images` are pre-optimized WebP (max 1600px wide, q80):

```bash
node scripts/optimize-images.mjs
```

Run it after adding photos and reference the `.webp`. It also regenerates the
1200×630 `og.jpg` used for link previews. `next/image` runs with
`unoptimized: true` because a static export has no image optimizer.

## Analytics

CloudWatch RUM. The CDK pipeline injects the three `NEXT_PUBLIC_AWS_RUM_*`
variables at build time; locally they are unset (see `.env.example`) and the
monitor simply never initializes.

The client is imported dynamically either way, so its ~128 KB stays off the
initial page load — deferred to after hydration in production, never fetched at
all when unconfigured.

Components declare click events as data attributes rather than calling a vendor:

```tsx
<a {...analyticsAttributes('project_clicked', { label: project.title })}>
```

`RumProvider` owns the single delegated listener that reads those back, so
swapping analytics providers touches one file.
