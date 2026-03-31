# Project Documentation Rules (Non-Obvious Only)

- **`lib/language-context.jsx` is dead code**: Created for reference but never used — don't ask about it
- **Content lives in one place**: All text in [`app/data/homepage-content.js`](app/data/homepage-content.js), not scattered
- **DE locale incomplete**: German body copy is "TODO" — UI translated, content not
- **`app/page.jsx` is redirect only**: Thin wrapper that redirects to `/tr` — real page is `[lang]/page.jsx`
- **No CMS/backend**: Site is fully static SSG — no API routes, no database, no admin panel
- **Two separate video systems**: Hero carousel (Pexels external) vs section videos (local MP4s in `/public/assets/videos/`)
