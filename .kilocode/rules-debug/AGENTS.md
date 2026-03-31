# Project Debug Rules (Non-Obvious Only)

- **Language context unused**: `lib/language-context.jsx` exists but is never imported — don't debug it
- **DE content shows TODO**: German locale renders placeholder text — not a bug, content needs translation
- **html lang stays "tr"**: Root layout doesn't update `html lang` per locale — known limitation
- **Form has no backend**: Contact form success state is local only — no network requests to debug
- **Videos from Pexels**: External CDN URLs — playback issues may be source-related
- **Proxy redirects first**: `proxy.js` handles bare paths before middleware — check here for routing issues
