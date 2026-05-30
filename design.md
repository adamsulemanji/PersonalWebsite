# Design Language

The visual system for [adamsulemanji.com](https://adamsulemanji.com). This is the
source of truth for adding pages/components while keeping the site visually
consistent. It describes what is **actually implemented**, not an aspiration.

Stack: Next.js 15 (App Router, static export) · Tailwind CSS 3 · Framer Motion ·
next-themes · react-icons + lucide-react.

---

## 1. Principles

The site should feel **personal, quiet, and editorial** — not corporate or
SaaS-like.

- Keep surfaces neutral; use color as a small accent, never as a fill.
- Lean on **typography, whitespace, thin borders, and soft shadows** for structure.
- Serif for display headings only; sans for everything else.
- Motion supports content — restrained fades and small lifts, never decorative.
- Left-aligned by default; center only a true hero.

---

## 2. Color Tokens

Defined in `frontend/src/styles/globals.css`. Keep this set small — the rest of
the UI is built from Tailwind's default gray scale.

| Token          | Light     | Dark      | Use                             |
| -------------- | --------- | --------- | ------------------------------- |
| `--background` | `#f8f8f8` | `#1c1c1c` | Page background (set on `body`) |
| `--foreground` | `#1a1a1a` | `#f5f5f5` | Default text color              |
| `--border`     | `#e4e4e4` | `#262626` | Default token border            |
| `--main`       | `#15803d` | `#63b3ed` | **Accent** — emerald / sky blue |
| `--radius`     | `0.75rem` | —         | Base radius                     |

These are plain hex custom properties. In `tailwind.config.ts` they map to
`var(--x)` (e.g. `bg-background`, `text-foreground`, `border-border`, `text-main`).

> ⚠️ Reference tokens as `var(--x)` — **never** `hsl(var(--x))`. The values are
> hex, so wrapping them in `hsl()` produces invalid CSS. (This was a real bug that
> silently broke `bg-background`/`border-border`; it's fixed — don't reintroduce it.)

### Accent usage (`--main`)

There is exactly **one** accent. Use it sparingly, in this order of preference:

1. The trailing period in display titles — `<span className='accent'>.</span>`
2. The hero underline bar — `.accent-bar`
3. Thin borders / underline emphasis / selected states

Do **not** use the accent for large backgrounds, full card fills, or layout blocks.

### Gray scale (the working palette)

Color comes almost entirely from Tailwind grays. Use these exact pairings:

| Role                  | Class                                  |
| --------------------- | -------------------------------------- |
| Eyebrow / muted meta  | `text-gray-400 dark:text-gray-500`     |
| Body copy             | `text-gray-600 dark:text-gray-300`     |
| Secondary copy        | `text-gray-700 dark:text-gray-200`     |
| Strong / headings     | `text-gray-900 dark:text-white`        |
| Card surface          | `bg-gray-100 dark:bg-gray-800`         |
| Card / divider border | `border-gray-200 dark:border-gray-700` |
| List dividers         | `divide-gray-200 dark:divide-gray-800` |

### Category pills (projects)

The only place saturated color appears. Pills carry the color; the card stays
neutral. Colors come from `colorMap` in `frontend/src/assets/projects.tsx`
(red, blue, green, purple, orange, banana, sky, pink — each a `[base, light]` pair;
the lighter `[1]` shade is used).

```tsx
<span
  className="inline-block rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-white dark:border-white/20"
  style={{ backgroundColor: badgeColor }}
>
  {category}
</span>
```

Rule: white text on a colored pill, thin border, `rounded-full`. Never tint the card.

---

## 3. Typography

Two voices only.

### Display (serif)

Hero and major headings. Tailwind's default serif stack via `font-serif`.

- Always `font-serif font-light` with generous line height.
- Hero: `text-4xl sm:text-6xl md:text-7xl` (name itself goes larger).
- Page / post titles: `text-3xl font-light sm:text-4xl`.

```tsx
<h1 className='font-serif text-3xl font-light leading-tight sm:text-4xl'>
```

### UI / content (sans)

Body, nav, metadata, card titles, pills. Geist is loaded in `layout.tsx` as a
local variable font (`--font-geist-mono`); body otherwise uses the default sans.

- Body rhythm (the baseline for prose): `text-[15px] leading-7 sm:text-base`.
- Card titles: bold sans (`text-lg font-bold`), **not** serif.

### Uppercase metadata — two tiers

This is a deliberate system, not an inconsistency:

- **Section eyebrows** (the label above each section, 404 label, "Back" link):
  `text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500`
  → implemented once in `SectionHeader`.
- **Inline metadata** (dates, captions, highlight labels):
  `text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500`.

Avoid: all-caps body text, heavy tracking elsewhere, serif on metadata.

### Link emphasis pattern

Inline text links use a consistent underline treatment (no accent color):

```tsx
className='underline decoration-gray-300 underline-offset-4 transition-colors
           hover:decoration-gray-600 dark:decoration-gray-600 dark:hover:decoration-gray-300'
```

---

## 4. Layout

### Global frame (`layout.tsx`)

`body` centers the app horizontally; content is capped at `max-w-[1200px]`.

### Home page (`app/page.tsx`)

Single-page scroller. Outer padding then a centered, narrower column:

```tsx
<div className="w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20">
  <div className="mx-auto flex w-full max-w-4xl flex-col gap-24"> … </div>
</div>
```

- Sections are separated by `gap-24`.
- Prose / article pages (e.g. writing) narrow to `max-w-2xl` with `gap-10`.

### The `Section` wrapper

Every homepage section (except the bespoke hero, intro, and scroll-line) is wrapped
by the local `Section` component in `page.tsx`: a fade-in-on-scroll `motion.div`
with a `SectionHeader` eyebrow and an optional subtitle. **Reuse it** rather than
re-deriving the motion props.

```tsx
<Section title="Projects" subtitle="Things I've built">
  <Projects />
</Section>
```

### Spacing & shape

- `rounded-xl`/`rounded-2xl` on cards and image frames; `rounded-3xl` on larger panels.
- `shadow-md` on cards, up to `shadow-2xl` on hover for project cards; `shadow-sm` elsewhere.
- Generous but not cavernous vertical rhythm: `mt-3/mt-4` within blocks, `gap-8/gap-10` in grids.

---

## 5. Surfaces

There is **one** card surface family (the old "featured dark `neutral-950`" system
is gone — don't reintroduce it):

```tsx
className='rounded-xl border border-gray-200 bg-gray-100 text-gray-900 shadow-md
           dark:border-gray-700 dark:bg-gray-800 dark:text-white'
```

- Light mode: light-gray card on the off-white page.
- Dark mode: `gray-800` card on the near-black page.
- Images sit in a framed inner container with an inset border:
  `<div className='absolute inset-4 rounded-2xl border border-black/10 dark:border-white/15' />`.

Always specify border colors explicitly (`border-gray-200 dark:border-gray-700`).

---

## 6. Components

| Component          | Role                                                    |
| ------------------ | ------------------------------------------------------- |
| `SectionHeader`    | Uppercase section eyebrow (the `0.2em` tier).           |
| `Section` (page)   | Fade-in section wrapper: eyebrow + subtitle + content.  |
| `SocialLinks`      | Icon row driven by the `socials` array in `page.tsx`.   |
| `PictureCarousel`  | Auto-advancing image slider (Framer `AnimatePresence`). |
| `ThemeToggle`      | Sun/Moon manual light↔dark toggle.                      |
| `Experience`       | Left-bordered timeline with dot markers.                |
| `Project`          | Neutral card grid; hover reveals detail on desktop.     |
| `Writing`          | Divided list of posts → `/writing/[slug]`.              |
| `Books` / `Update` | Data-driven list sections.                              |
| `MovieList`        | Letterboxd cards from an external API (client fetch).   |
| `Footer`           | Thin divider + centered closing note + heart.           |

Icons: `react-icons` (`Fa*`, `Si*`, `Fi*`) and `lucide-react`. Keep icon usage light.

---

## 7. Theming

- `next-themes` with `attribute='class'`, `defaultTheme='light'`, `enableSystem={false}`.
- **First visit**: `ThemeScheduler` (in `theme-provider.tsx`) picks light/dark by local
  time of day (light 8am–8pm) when no preference is stored. After the visitor uses
  `ThemeToggle`, next-themes persists their choice and the scheduler no-ops.
- All Framer Motion respects `prefers-reduced-motion` via `MotionProvider`
  (`<MotionConfig reducedMotion='user'>`) in the layout.
- Every color must declare its `dark:` counterpart — never rely on a single value.

## 7a. Shared style fragments

Recurring class strings live in `frontend/src/lib/styles.ts` — compose with extra
utilities via a template literal:

- `sectionLabel` — `0.2em` uppercase eyebrow (used by `SectionHeader`).
- `metaLabel` — `0.15em` uppercase inline metadata (dates, captions, field labels).
- `underlineLink` — the inline gray underline link treatment.

```tsx
<span className={`shrink-0 ${metaLabel}`}>{date}</span>
```

---

## 8. Motion

Framer Motion, kept restrained:

- **Entrance**: opacity (and small `x`/`y`) on load for the hero and intro.
- **On scroll**: `whileInView={{ opacity: 1 }}` with `viewport={{ once: true, margin: '-100px' }}` (the `Section` default).
- **Hover**: subtle lift on project cards (`hover:-translate-y-1`), image scale.
- **Carousel**: horizontal slide via `AnimatePresence`.

Avoid springy UI everywhere, parallax, animated gradients, or long chained sequences.

---

## 9. Do / Don't

**Do**

- Keep pages calm, readable, left-aligned.
- Serif only for display headings; bold sans for card titles.
- Keep surfaces neutral gray; put any real color in pills.
- Reference tokens as `var(--x)`; declare `dark:` for every color.
- Reuse `Section` and `SectionHeader`.

**Don't**

- Tint a whole card when a pill can carry the accent.
- Add a second accent color or reintroduce the magenta shadcn palette.
- Wrap hex tokens in `hsl()`.
- Use `<a>` for internal routes (use `next/link`); leave images without `alt`.

---

## 10. Prompt template (for future LLM use)

> Match the personal-portfolio design language: off-white/near-black backgrounds,
> Tailwind gray scale for text and cards (`bg-gray-100 dark:bg-gray-800`, borders
> `gray-200/700`), a single accent (`--main`, emerald light / sky-blue dark) used
> only in dots/underlines/pills, serif `font-light` for display headings and sans
> for everything else. Two-tier uppercase metadata (`tracking-[0.2em]` eyebrows,
> `tracking-[0.15em]` inline). Neutral cards with thin borders and soft shadows;
> white-on-color category pills only. Wrap homepage sections in the `Section`
> component. Restrained Framer Motion (fade-in on scroll, light hover lift).
> Preserve desktop layout, stack cleanly on mobile, declare `dark:` for every color.
