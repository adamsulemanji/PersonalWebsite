# Personal Website Design Language

This file describes the current visual system implemented in the frontend. It is written for an LLM or engineer that needs to add new pages/components while keeping the result visually consistent with the existing site.

## Purpose

The site should feel:

- personal, not corporate
- clean, quiet, and readable
- a little editorial, but still lightweight
- modern without looking like a generic SaaS landing page
- restrained in color usage

The core rule is:

- keep most surfaces neutral
- use color as a small accent, not as the main background

## Design Summary

The visual language is built from 4 recurring ideas:

1. Serif display typography for major page titles and the homepage hero.
2. Clean sans typography for body copy, nav, buttons, and card metadata.
3. Neutral surfaces with thin borders and soft shadows.
4. Accent color used in dots, underlines, borders, and pill tags rather than large containers.

## Color System

### Global theme tokens

Defined in `frontend/src/styles/globals.css`.

Light mode:

- `--background: #ececec`
- `--foreground: #1a1a1a`
- `--main: #15803d`

Dark mode:

- `--background: #000`
- `--foreground: #f5f5f5`
- `--main: #63b3ed`

### Accent usage

`--main` is the site-wide accent.

Use it for:

- the trailing period in large titles via `.accent`
- subtle borders
- underline emphasis
- selected states
- small highlight pills when the pill is meant to feel site-native

Do not use `--main` for:

- large page backgrounds
- full card fills
- major layout blocks

### Project and picture tag colors

Homepage project cards and the newer projects/pictures pages use colored pills with white text. The color belongs in the pill, not the card body.

Common accent pill colors currently used:

- orange: `#fb923c`
- sky: `#38bdf8`
- teal/emerald: `#2dd4bf`
- amber: `#facc15`

Rule:

- if a component needs visual color, prefer a pill, chip, small badge, border, or dot
- the surrounding card should stay neutral/dark

## Typography

### Primary pattern

There are 2 type voices:

1. Display voice
   Used for:
   - homepage hero
   - major page headings

   Style:
   - `font-serif`
   - light weight
   - large scale
   - generous line height

   Example pattern:

   ```tsx
   <h1 className='mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl'>
   ```

2. Utility/content voice
   Used for:
   - body copy
   - nav
   - buttons
   - card titles outside major hero/page headers
   - metadata
   - pills

   Style:
   - sans
   - straightforward
   - medium to bold where needed
   - avoid over-stylized tracking except for rare small metadata labels

### Home page text rhythm

Homepage body copy is the baseline text rhythm:

- body text size around `text-[15px]` to `text-base`
- relaxed line height: `leading-7`
- simple paragraph blocks

Use this as the default for new descriptive text.

Preferred body style:

```tsx
className='text-[15px] leading-7 sm:text-base'
```

### Card title style

Use bold sans titles for cards unless the card is serving as a full page hero.

Examples:

- homepage project cards: bold sans
- project/picture item titles: bold sans
- page titles: serif

### What to avoid

- all-caps everywhere
- excessive letter spacing
- heavy editorial styling on metadata
- giant bold headings for every subsection
- mixing too many font personalities in one component

## Layout

### Global frame

Implemented in `frontend/src/app/layout.tsx`.

The site is centered and constrained:

- body centers the app horizontally
- main content width is capped at `1200px`
- pages usually use:

```tsx
className='mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16'
```

### Spacing

Use generous vertical spacing, but not oversized whitespace.

Typical patterns:

- `mt-6` after section labels
- `mt-10` to begin major content block
- `gap-6`, `gap-8`, `gap-10` for grid/card spacing
- `rounded-2xl` or `rounded-3xl` on cards

### Alignment

The site is mostly left-aligned.

Use centered alignment only when the component is clearly a hero or intentionally focal. The homepage hero is large but still left-aligned on actual text content.

## Surface System

There are 2 main surface families.

### 1. Standard content surfaces

Used mostly on About and lighter informational content.

Light mode:

- `bg-white`
- subtle border
- soft shadow

Dark mode:

- `dark:bg-neutral-950`

Typical pattern:

```tsx
className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 rounded-3xl border p-5 shadow-sm'
```

### 2. Featured dark surfaces

Used for:

- homepage project cards
- projects page showcase cards
- pictures page gallery cards

Style:

- dark neutral background even in light mode
- white text
- thin low-contrast border
- image framed inside rounded inner container

Typical pattern:

```tsx
className='border-white/15 bg-neutral-950 text-white dark:bg-neutral-900 rounded-3xl border shadow-sm'
```

Rule:

- if the component is image-led, portfolio-like, or meant to feel featured, use the featured dark surface system
- if the component is mainly informational prose, use the standard content surface system

## Page Header Pattern

Most internal pages follow this pattern:

1. Underlined section label.
2. Large serif heading.
3. Short supporting paragraph.
4. Optional small pills beneath the intro.

Example structure:

```tsx
<p className='underline-offset-3 decoration-gray-300 group relative inline-block text-xl font-bold underline'>
  Projects
</p>
<h1 className='mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl'>
  A few things I've built<span className='accent'>.</span>
</h1>
<p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl text-[15px] leading-7 sm:text-base'>
  ...
</p>
```

Use this whenever creating a new top-level page.

## Navigation

Navbar behavior from `frontend/src/components/NavBar.tsx`:

- sticky
- subtle blur
- nearly opaque white in light mode
- nearly opaque dark neutral in dark mode
- simple text links
- home identity shown as stacked name

Visual style:

- understated
- no large brand block
- no colorful nav chrome

Rule:

- navigation should feel like a frame around content, not the content itself

## Footer

Footer is intentionally simple:

- thin divider
- centered closing text
- icon links
- understated resume link

Do not turn the footer into a heavy branded section.

## Pills / Tags / Chips

This is one of the most important visual rules.

### Correct pill style

Use:

- rounded full shape
- small padding
- white text on colored background for accent pills
- thin border
- no giant glow

Homepage-aligned pill pattern:

```tsx
className='border-white/20 text-white rounded-full border px-3 py-1 text-xs font-semibold'
style={{ backgroundColor: accentColor }}
```

### Pill usage

Use pills for:

- project tech tags
- category tags
- filter controls
- state labels like `Live site`

Do not:

- put dark text on bright pills unless there is a strong reason
- turn the whole card into the accent color
- use oversized pill text with lots of uppercase tracking unless intentionally needed for a tiny metadata treatment

## Project Cards

Current homepage project cards are the reference implementation.

### Desktop behavior

- dark neutral card
- project image on top
- title + colored category pills visible by default
- description/date/link reveal on hover
- subtle lift on hover

### Mobile behavior

- no hover dependency
- image first
- content always visible
- same colored pills, neutral card

### Non-negotiable rules for new project-like components

- do not use a colored card background
- keep color in the pills only
- keep white text on dark card surfaces
- keep the card readable without hover on mobile

## Pictures / Gallery Cards

Gallery cards should follow the same featured dark surface system as project cards.

Use:

- dark card body
- framed image
- small title underneath
- colored category pill with white text

Filtering controls should visually match the same pill system.

Important interaction rule:

- clicking the image opens the modal
- clicking the category pill changes the filter

## Motion

Motion exists, but it is restrained.

Use:

- fade-in on section load
- small vertical movement on reveal
- very light hover lift
- image scale on hover

Do not use:

- large springy UI everywhere
- aggressive parallax
- overly animated gradients
- long chained decorative animation sequences

Motion should support the content, not compete with it.

## Borders and Shadows

The UI gets most of its structure from borders, not from loud backgrounds.

Preferred:

- thin border
- rounded corners
- light shadow
- subtle inner frame around images when useful

Examples:

- `border-white/15`
- `border-gray-200 dark:border-gray-700`
- `shadow-sm`, `shadow-md`, occasionally `shadow-lg`

Avoid:

- thick borders
- highly contrasted outlines everywhere
- dramatic shadow stacks

## Images

Images are usually:

- rounded
- cropped cleanly
- inside a padded container
- overlaid with a subtle dark gradient only when needed for hover/readability

Use framed image treatment for featured cards:

```tsx
<div className='relative aspect-[4/3] overflow-hidden rounded-xl'>
  <Image ... className='object-cover' />
  <div className='border-white/15 absolute inset-0 rounded-xl border' />
</div>
```

## Responsive Behavior

This project must preserve desktop appearance while remaining usable on phones.

Rules:

- desktop layout should not be degraded to solve mobile
- mobile should stack cleanly
- hover-only information must become always-visible on touch layouts
- text must wrap; never allow horizontal clipping
- cards should fit within the viewport without sideways overflow

For mobile:

- prioritize readable stacked layouts
- reduce padding before reducing readability
- keep actions large enough to tap comfortably

## Implementation Notes for LLMs

When adding a new component, choose one of these paths:

### If it is a new page section with prose

Use:

- underlined label
- serif page/section heading
- muted supporting paragraph
- light/neutral bordered cards for content blocks

### If it is a new portfolio/gallery/showcase component

Use:

- dark neutral card surface
- white text
- colored pills with white text
- image framed inside rounded inner container
- subtle hover lift only

### If you need emphasis

Prefer this order:

1. accent dot
2. accent underline
3. accent pill
4. accent border

Do not jump directly to:

- bright section backgrounds
- multicolor gradients
- tinted full cards

## Current Implementation Caveat

There is a current theme-token mismatch in the codebase:

- Tailwind theme utilities are configured around CSS variables
- but some CSS variables are stored as hex strings rather than HSL-compatible values

Practical consequence:

- classes like `bg-background` can be unreliable in some places
- explicit utility colors such as `bg-white`, `dark:bg-neutral-950`, `bg-neutral-950`, and direct `var(--main)` usage are safer in the current codebase

When matching the existing design, prefer the patterns already used in the page and card components rather than inventing new token usage.

## Do / Don't

Do:

- keep pages calm and readable
- use serif only for major display headings
- use bold sans for card titles
- keep surfaces mostly neutral
- use accent color in small, intentional places
- keep tags white-on-color for project/picture accents
- preserve the current desktop composition

Don't:

- color the entire card when a pill can carry the accent
- overuse uppercase tracked labels
- make every section feel like a different product
- introduce flashy gradients or saturated backgrounds
- replace the understated editorial tone with startup-marketing UI

## Short Prompt Template For Future LLM Use

If you need to create a new component/page in this project, follow this prompt:

> Match the existing personal portfolio design language: neutral backgrounds, thin borders, restrained shadows, serif only for major headings, sans for body and UI, accent color used sparingly in dots/underlines/pills, and white-on-color category tags. For project/gallery-like components, use dark neutral cards with white text and keep the color in the pills only. Preserve desktop layout, make mobile stacked and readable, and avoid flashy SaaS-style gradients or oversized decorative UI.

