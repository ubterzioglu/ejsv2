# Referanslar Bölümü — Premium Kart Tasarımı

**Tarih:** 2026-06-24
**Dosyalar:** `components/sections/references-section.jsx`, `app/globals.css`

## Amaç

Mevcut referans şeridini (dairesel logo kartları, sağdan sola sonsuz kayan
marquee) yuvarlatılmış köşeli premium kartlara dönüştürmek. Her kartta logo
üstte, altında ince bir ayraç çizgisi, çizginin altında marka adı (sektörlü)
yer alacak. Sağdan sola geçiş ve hover'da durma davranışı korunur.

## Değişiklikler

### 1. `references-section.jsx`

- Salt `referenceImages` string dizisi yerine `{ src, name }` nesnelerinden
  oluşan `referenceBrands` listesi:

  1. GENBA Group
  2. World Medicine
  3. Trakya Verimlilik Platformu
  4. Yurtbay Seramik
  5. ALP Havacılık
  6. P3 Group GmbH
  7. Dalgakıran Kompresör
  8. TES Elektrik
  9. Petek Saraciye
  10. Avrasya Kırtasiye

- Her kart markup'ı: logo alanı (`.reference-logo`) → ayraç (CSS border) →
  marka adı (`.reference-name`).
- `alt` metni artık marka adını kullanır (erişilebilirlik iyileşmesi).
- Marquee için liste yine iki kez render edilir (`[...brands, ...brands]`).

### 2. `app/globals.css`

- `.reference-card`: daire/aspect-ratio:1 yerine sabit genişlik + dikey flex
  yerleşim. Yuvarlatılmış köşe (`var(--card-radius)`), premium gölge, hover'da
  yukarı kalkma + gölge derinleşmesi (mevcut token'lar).
- `.reference-logo`: logo kapsayıcısı, `object-fit: contain` ile logolar
  kırpılmadan ortalanır.
- `.reference-name`: çizgi altında küçük, letter-spacing'li, üst sınırda `1px`
  ayraç çizgisi olan marka adı bloğu.
- Mevcut marquee animasyonu (`scroll-left`, hover pause), kenar fade maskesi
  ve şerit padding'i korunur.

## Kapsam Dışı

- Admin panelinden marka adı yönetimi (şimdilik kod içinde sabit).
- Logo dosyalarının kendisi değiştirilmez.

## Riskler / Notlar

- Dosya→marka eşleşmesi (1.jpg = GENBA vb.) görselden çıkarıldı; sıra hatalıysa
  liste sırası elle düzeltilir, başka değişiklik gerekmez.
