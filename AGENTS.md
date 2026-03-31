# AGENTS.md

Guidance for AI agents working in this repository. Read this before editing any file.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Runtime | React 19 (Server Components by default) |
| Language | JavaScript / JSX (no TypeScript) |
| Styling | Single CSS file: `app/globals.css` (~1600 lines, BEM-ish class names) |
| Fonts | Manrope via `next/font/google` |
| Deployment | Docker standalone (`output: 'standalone'` in next.config.mjs) |
| No state management library | No Redux, Zustand, etc. |
| No CMS | All content is hardcoded in `app/data/homepage-content.js` |
| No test framework | Tests are not implemented |

---

## Routing

```
/          → proxy.js redirects → /tr
/tr        → app/[lang]/page.jsx  (static, SSG)
/en        → app/[lang]/page.jsx  (static, SSG)
/de        → app/[lang]/page.jsx  (static, SSG)
```

- `lib/locales.js` — single source of truth: `locales = ["tr","en","de"]`, `defaultLocale = "tr"`
- `proxy.js` — Next.js 16 proxy (previously "middleware"), redirects bare paths to `/${defaultLocale}`
- `app/[lang]/layout.jsx` — validates `lang` param, calls `notFound()` for unsupported locales, exports `generateStaticParams()`
- `app/[lang]/page.jsx` — **Server Component**, reads `lang` from `params`, no context dependency
- `app/page.jsx` — thin `redirect(`/${defaultLocale}`)` fallback (middleware handles this before it's hit)

---

## File Map

```
app/
  layout.jsx              Root layout: Manrope font, <html lang="tr">, no providers
  page.jsx                Redirect to /tr
  globals.css             All styles (~1600 lines)
  [lang]/
    layout.jsx            Locale validation + generateStaticParams
    page.jsx              Homepage Server Component (lang → content → render)
  data/
    homepage-content.js   All page copy: { tr: {...}, en: {...}, de: {...} }
                          heroVideos[] exported separately (Pexels URLs)

components/
  site-header.jsx         "use client" — language switcher (useRouter/usePathname), mobile menu
  site-footer.jsx         "use client" — office address, nav links, logo
  hero-video-carousel.jsx "use client" — autoplay video background, muted loop, CTA
  expert-spotlight.jsx    Static section — consultant bio with image
  process-highlight.jsx   Static section — shopfloor process visual
  methodology-cards.jsx   Renders methodology steps grid
  sections/
    index.js              Barrel export for all section components
    identity-section.jsx  Kimligimiz / Identity
    mission-section.jsx   Misyonumuz / Mission
    articles-section.jsx  Yazilarimiz / Articles
    references-section.jsx Referanslar / References (image grid)
    contact-section.jsx   Iletisim / Contact — static form with submitted state
    share-section.jsx     Social share links (LinkedIn, X, Facebook, Email, WhatsApp)
                          Owns its own SVG icons; accepts { lang, shareUrl, shareText }

lib/
  locales.js              locales[], defaultLocale
  language-context.jsx    UNUSED — LanguageProvider/useLanguage (kept for reference, not imported anywhere)

public/assets/
  ejsmenulogo.png         Header logo
  ejsprofil.png           Expert spotlight profile photo
  references/1-10.jpg     Reference client logos (grid)
  videos/
    identity-loop.mp4     Looping background for Identity section
    mission-loop.mp4      Looping background for Mission section
  workflow/
    step-2-factory.jpg    Process highlight image
    step-6-teamwork.jpg   Identity section image
    step-8-budget.jpg     Methodology card image
```

---

## Content Structure

`app/data/homepage-content.js` exports:

```js
heroVideos   // array of { title, src, creditUrl } — Pexels video URLs
homepageContent  // { tr: {...}, en: {...}, de: {...} }
```

Each locale object has these keys:
`ariaLabels`, `utilityLinks`, `mainLinks`, `hero`, `identity`, `mission`,
`methodology`, `articles`, `references`, `contact`, `footer`

**DE status:** UI strings (labels, headings, nav) are translated. Body copy (`intro`, `bullets`, step `description`, article `excerpt`) is placeholder `"TODO"` — not yet translated.

---

## Key Patterns

### Language switching
`SiteHeader` is a Client Component. It reads the current locale from `usePathname()` and calls `router.push(`/${code}${pathWithoutLang}`)`. No context, no global state.

### Server vs Client split
- `app/[lang]/page.jsx` — Server Component. Gets `lang` from `await params`. Passes content as props.
- All interactive components (`SiteHeader`, `HeroVideoCarousel`, `ContactSection`, `ShareSection`, etc.) are Client Components marked `"use client"`.

### Images
Always use `next/image` with explicit `width` and `height`. All assets are under `/public/assets/` — reference as `/assets/filename`.

### ShareSection props
```jsx
<ShareSection lang={lang} shareUrl={encodeURIComponent("https://...")} shareText={encodeURIComponent("...")} />
```
The component builds the share links internally — do not pass pre-built `shareLinks` array.

### Contact form
Static form in `contact-section.jsx` with local `submitted` state. No backend, no API route. `onSubmit` sets `submitted = true` and shows a success message.

---

## Critical Gotchas

- **`lib/language-context.jsx` is not used anywhere** — do not import it, do not revive it.
- **No `useLanguage()` hook** anywhere in the active codebase. Lang always comes from URL params or `usePathname()`.
- **DE content body is TODO** — the DE locale renders but shows placeholder text. Real translations are needed.
- **`html lang` attribute is hardcoded `"tr"`** in `app/layout.jsx` — it does not update per locale yet.
- **No form backend** — contact form is purely presentational.
- **No search** — search button logs to console; feature not implemented.
- **Pexels videos** — hero carousel uses external CDN URLs with credit tracking in `heroVideos`. Do not hotlink new videos without checking license.
