# Project Architecture Rules (Non-Obvious Only)

- **Server/Client boundary**: [`app/[lang]/page.jsx`](app/[lang]/page.jsx) is Server Component; all interactive components must be `"use client"`
- **No state management**: Language comes from URL via `usePathname()` — no Redux/Zustand/context needed
- **Proxy before middleware**: [`proxy.js`](proxy.js) handles locale redirect before middleware runs
- **Static SSG only**: `output: 'standalone'` in [`next.config.mjs`](next.config.mjs:1) — no server-side rendering
- **Content coupling**: All components read from single [`homepage-content.js`](app/data/homepage-content.js) source — changes affect all locales
- **No test infrastructure**: Project has no test framework — adding tests requires full setup
