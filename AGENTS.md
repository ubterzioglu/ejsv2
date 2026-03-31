# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

```bash
npm run dev    # Next.js dev server (Turbopack)
npm run build  # Production build (SSG)
npm run start  # Start production server
npm run lint   # ESLint check
```

## Critical Gotchas (Non-Obvious)

- **`lib/language-context.jsx` is UNUSED** — do not import; lang comes from URL params via `usePathname()`
- **DE locale body copy is "TODO" placeholder** — only UI strings translated, content needs real translations
- **`html lang` hardcoded as "tr"** in [`app/layout.jsx`](app/layout.jsx:1) — doesn't update per locale
- **Contact form is static** — `onSubmit={(event) => event.preventDefault()}` with local state only
- **Hero videos use external Pexels URLs** — check license before adding new videos
- **`proxy.js` handles locale routing** — redirects bare paths to `/${defaultLocale}` before middleware

## Content Structure

All bilingual content in [`app/data/homepage-content.js`](app/data/homepage-content.js) with `tr`/`en`/`de` objects. Keys: `ariaLabels`, `utilityLinks`, `mainLinks`, `hero`, `identity`, `mission`, `methodology`, `articles`, `references`, `contact`, `footer`.

## Key Patterns

- **Server/Client split**: [`app/[lang]/page.jsx`](app/[lang]/page.jsx) is Server Component; interactive components (`SiteHeader`, `HeroVideoCarousel`, `ContactSection`, `ShareSection`) are Client Components with `"use client"`
- **Language switching**: Client-side via `useRouter/usePathname()` in [`components/site-header.jsx`](components/site-header.jsx), no context/global state
- **Images**: Use `next/image` with `/assets/filename` path (assets under `/public/assets/`)
- **ShareSection props**: Pass `lang`, `shareUrl`, `shareText` as encoded strings — component builds links internally
