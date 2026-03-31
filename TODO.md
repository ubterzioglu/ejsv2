# EJS v2 — Fix Listesi (50 Micro-Task)

## Tamamlananlar

- [x] `referenceImages` — `image.src` → `image` (tüm referans görseller kırık)
- [x] `layout.jsx` — `lang="de"` → `lang="tr"`
- [x] `layout.jsx` — metadata placeholder'ı gerçek içerikle değiştir
- [x] `_tmp.txt` sil

## PHASE 1 — HeroVideoCarousel Temizlik

- [x] 1. `hero-video-carousel.jsx:9` — `useMemo` import'tan kaldır
- [x] 2. `hero-video-carousel.jsx:9` — `activeVideo` satırını düz array lookup'a çevir

## PHASE 2 — shareLinks Dışarı

- [x] 3. `page.jsx` — `shareLinks` array'ini `HomePage` dışına taşı
- [x] 4. LinkedIn SVG'yi ayrı const'a al: `LinkedInIcon`
- [x] 5. X (Twitter) SVG'yi ayrı const'a al: `XIcon`
- [x] 6. Facebook SVG'yi ayrı const'a al: `FacebookIcon`
- [x] 7. Email SVG'yi ayrı const'a al: `EmailIcon`
- [x] 8. WhatsApp SVG'yi ayrı const'a al: `WhatsAppIcon`

## PHASE 3 — footerContent Dışarı

- [x] 9. `homepage-content.js` TR bloğuna `footer` key ekle
- [x] 10. `homepage-content.js` EN bloğuna `footer` key ekle
- [x] 11. `page.jsx` — `footerContent` object'ini sil
- [x] 12. `page.jsx` — `const footerContent = homepageContent[lang].footer` ile veriyi çek
- [x] 13. `page.jsx` JSX'te `footerContent.x` referansları korundu (değişken adı aynı)

## PHASE 4 — Küçük Fixler

- [x] 14. `page.jsx:188` — `slice(0, 3)` kaldır, tüm mission bullets göster
- [x] 15. `page.jsx:23` — `identityImage`'ı ayrı asset ile değiştir (`step-6-teamwork.jpg`)
- [x] 16. `page.jsx` — `footerLogo`, `missionImage`, `identityImage` sabitlerini `// Asset paths` yorumuyla gruplandı
- [x] 17. `hero-video-carousel.jsx` — CTA `href` Pexels'e değil `#metodoloji`'ye gitsin

## PHASE 5 — SiteHeader ARIA

- [x] 18. `site-header.jsx` — props'a `ariaLabels` objesi ekle
- [x] 19. `site-header.jsx:23` — `"Ust Navigasyon"` → `ariaLabels.utilityNav`
- [x] 20. `site-header.jsx:86` — `"Hauptnavigation"` → `ariaLabels.mainNav`
- [x] 21. `site-header.jsx:101` — `"Suche"` → `ariaLabels.search`
- [x] 22. `page.jsx` — `SiteHeader`'a `ariaLabels` prop geçir, `homepage-content.js`'e ekle

## PHASE 6 — Search & Form

- [x] 23. `site-header.jsx:100` — search `<a>` → `<button>`, `href="#search"` kaldır
- [x] 24. `site-header.jsx` — search button'a `onClick` placeholder ekle
- [x] 25. `page.jsx` — form'a `submitted` state ekle
- [x] 26. `page.jsx` — submit sonrası başarı mesajı göster

## PHASE 7 — Footer Component

- [x] 27. `components/site-footer.jsx` dosyasını oluştur
- [x] 28. `site-footer.jsx` — footer HTML'ini `page.jsx`'ten buraya taşı
- [x] 29. `site-footer.jsx` — `footer`, `shareLinks`, `lang` prop olarak al
- [x] 30. `site-footer.jsx` — `Fragment`, `Image` import'larını ekle
- [x] 31. `page.jsx` — `SiteFooter` import'u ekle
- [x] 32. `page.jsx` — `<footer>` bloğunu `<SiteFooter>` ile değiştir
- [x] 33. Dev server'da footer render'ını doğrula

## PHASE 8 — Section Component'leri

- [x] 34. `components/sections/identity-section.jsx` oluştur
- [x] 35. `components/sections/mission-section.jsx` oluştur
- [x] 36. `components/sections/articles-section.jsx` oluştur
- [x] 37. `components/sections/references-section.jsx` oluştur
- [x] 38. `components/sections/contact-section.jsx` oluştur (form state dahil)
- [x] 39. `components/sections/share-section.jsx` oluştur
- [x] 40. `page.jsx` — tüm section import'larını ekle
- [x] 41. `page.jsx` — inline section HTML'lerini component çağrılarıyla değiştir
- [x] 42. `page.jsx` satır sayısını doğrula (289 → 109 satır)
- [ ] 43. Her section için dev server'da görsel doğrulama
- [x] 44. `components/sections/index.js` barrel export ekle

## PHASE 9 — LanguageContext Migrasyonu

- [x] 45. `lib/language-context.jsx` oluştur — `LanguageContext` + `LanguageProvider`
- [x] 46. `app/layout.jsx` — `LanguageProvider`'ı wrap et
- [x] 47. `page.jsx` — `useState("tr")` kaldır, `useLanguage()` kullan
- [x] 48. `SiteHeader` — `lang`/`onLangChange` prop kaldırıldı, context'ten alıyor
- [ ] 49. `page.jsx:1` — `"use client"` kaldır (URL-based routing gerektirir, sonraki milestone)
- [x] 50. Dev server doğrulama — ✓ Compiled

## BONUS — old/ Migrasyonu

- [x] references/7-10.jpg kopyalandı
- [x] workflow/step-8-budget.jpg kopyalandı
- [x] assets/videos/identity-loop.mp4 + mission-loop.mp4 kopyalandı
- [x] favicon.ico + favicon.svg + robots.txt kopyalandı
- [x] old/ submodule git'ten kaldırıldı (staged D)
