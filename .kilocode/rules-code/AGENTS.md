# Project Coding Rules (Non-Obvious Only)

## Critical Patterns

- **Image imports**: Always use `next/image` with `@/old/src/assets/` prefix for legacy assets
- **Content structure**: Bilingual content in `app/data/homepage-content.js` with `tr`/`en` objects
- **Language state**: Managed in `app/page.jsx` with `useState("tr")` default
- **Legacy assets**: Components reference `old/src/assets/` directory structure
- **Video carousel**: Uses external Pexels video URLs with credit tracking
- **Share functionality**: Built-in social sharing with LinkedIn, X, Facebook, Email, WhatsApp
- **Contact form**: Static form with `onSubmit={(event) => event.preventDefault()}`

## Critical Gotchas

- **No test framework**: Tests are not implemented in this project
- **Static content**: Homepage content is hardcoded in JavaScript, not CMS-driven
- **Language switching**: Client-side only, no server-side routing
- **Form handling**: Contact form is static with placeholder functionality
