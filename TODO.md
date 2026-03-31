# EJS v2 — Task List

## Tamamlananlar (50 Micro-Task + Bonus)

- [x] `referenceImages` — `image.src` → `image` fix
- [x] `layout.jsx` — `lang="de"` → `lang="tr"`
- [x] `layout.jsx` — metadata placeholder → gerçek içerik
- [x] `_tmp.txt` silindi
- [x] `hero-video-carousel.jsx` — `useMemo` kaldırıldı, CTA `href` → `#metodoloji`
- [x] `shareLinks` SVG'leri const'a alındı
- [x] `homepage-content.js` — TR + EN `footer` key eklendi
- [x] Form `submitted` state + başarı mesajı
- [x] `SiteHeader` — `ariaLabels` prop, search `<button>` dönüşümü
- [x] `SiteFooter` component ayrıştırıldı
- [x] Section componentleri: identity, mission, articles, references, contact, share
- [x] `sections/index.js` barrel export
- [x] `LanguageContext` — `lib/language-context.jsx` oluşturuldu (şu an unused)
- [x] `old/` submodule kaldırıldı, assets `public/assets/` altına taşındı
- [x] URL-based i18n altyapısı: `lib/locales.js`, `proxy.js`, `app/[lang]/layout.jsx`, `app/[lang]/page.jsx`
- [x] `app/[lang]/page.jsx` Server Component olarak yazıldı, `useLanguage` bağımlılığı kaldırıldı
- [x] `LanguageProvider` `app/layout.jsx`'ten kaldırıldı
- [x] `app/page.jsx` → `/tr` redirect
- [x] `ShareSection` — SVG'leri içselleştirdi, `{ lang, shareUrl, shareText }` props API
- [x] `SiteHeader` — `useRouter`/`usePathname` ile lang switching, DE butonu eklendi
- [x] `homepage-content.js` — DE skeleton eklendi (UI strings çevrildi, body TODO)
- [x] `proxy.js` — Next.js 16 format (fn adı `proxy`, dosya adı `proxy.js`)
- [x] Build doğrulandı: `/tr`, `/en`, `/de` statik SSG
- [x] `AGENTS.md` güncel proje yapısıyla yeniden yazıldı

---

## Kalan İşler

### Öncelikli
- [ ] **DE çevirisi** — `homepage-content.js` içindeki `"TODO"` placeholder'ları gerçek Almanca içerikle doldur
- [ ] **`html lang` dinamik** — `app/layout.jsx` → `app/[lang]/layout.jsx`'e taşı, `<html lang={lang}>` yap
- [ ] **`lib/language-context.jsx` sil** — artık hiçbir yerde import edilmiyor

### Orta Vadeli
- [ ] **Contact form backend** — API route veya form servisi (Resend, Formspree vb.)
- [ ] **Search** — search button gerçek işlev (modal veya arama sayfası)
- [ ] **Article detail sayfaları** — `app/[lang]/articles/[slug]/page.jsx`
- [ ] **SEO metadata per locale** — `generateMetadata()` her dil için başlık/açıklama

### Düşük Öncelik
- [ ] `app/globals.css` bölümlere ayır (şu an ~1600 satır monolith)
- [ ] `SiteFooter` copyright satırı lokalize edilmeli (şu an hardcoded Türkçe)
- [ ] Reference görselleri lazy-load optimizasyonu
