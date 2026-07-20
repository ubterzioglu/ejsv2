# ejsconsulting.org → NewEra Geçiş Planı

Amaç: `ejsconsulting.org` üzerindeki mevcut WordPress sitesini, bu repodaki Next.js
sitesiyle değiştirmek. Geçiş sırasında kullanıcı kaybı yaşamamak için **önce**
WordPress'te "yenileniyoruz" mesajı gösterip, **arka planda** yeni siteyi
`/newera` route'unda hazırlayacağız, en son domain'i yeni siteye yönlendireceğiz
(exchange).

Durum lejantı: `[ ]` yapılmadı · `[~]` sırada/devam ediyor · `[x]` tamamlandı

---

## Aşama 0 — Güvenlik (ön koşul)

- [x] WordPress ve domain hizmetleri erişim bilgileri `credentials.md` dosyasına
      kaydedildi, `.gitignore`'a eklendi (repoya commit edilmeyecek).
- [ ] WordPress **tam yedeği** alınacak (dosyalar + veritabanı). Hosting panelinde
      (muhtemelen cPanel/Softaculous ya da eklenti üzerinden — örn. UpdraftPlus,
      All-in-One WP Migration) "Backup / Export" seçeneği aranacak.
  - Yedek indirilip güvenli bir yere (örn. bu makinede `backups/` klasörü, repo
    dışında) kaydedilecek.
  - **Bu adımı ben yapamam** — hosting panelinde manuel işlem gerektiriyor.
    Yapman gerekenler ekranda karşına çıkarsa söyle, adım adım yönlendiririm.

---

## Aşama 1 — WordPress'te "Yenileniyoruz" Mesajı

Amaç: Ziyaretçiler siteye girdiğinde boş/bozuk bir şey görmesin, kısa ve net bir
bakım mesajı görsün.

- [ ] WordPress'e "Yenileniyoruz" / "Maintenance Mode" mesajı eklenecek. İki yöntem:
  1. **Basit yöntem (kod gerektirmez):** WordPress admin panelinden bir bakım
     modu eklentisi (örn. "SeedProd", "Coming Soon Page & Maintenance Mode") ile
     tek sayfalık bir mesaj yayınlamak.
  2. **Manuel yöntem:** Aktif temanın ana sayfasına geçici bir bildirim şeridi
     eklemek (eklenti kurmak istemezsen).
- [ ] Mesaj metni netleştirilecek. Örnek taslak:
  > "EJS Consulting yeni yüzüne kavuşuyor. Çok yakında burada olacağız."
- [ ] Mesajın yayınlandığı doğrulanacak (ejsconsulting.org ziyaret edilerek).

**Not:** Bu aşama WordPress admin paneli üzerinden yapılıyor, bu repoyla ilgisi
yok. İstersen mesaj metnini birlikte yazarız, uygulamayı sen (ya da senin
yetkilendirdiğin biri) WordPress tarafında yapar.

---

## Aşama 2 — Bu Repoda `/newera` Route'unun Hazırlanması

Amaç: Şu an `/[lang]` (örn. `/tr`, `/en`) altında yayınlanan ana sayfa içeriğinin
aynısını (ya da güncellenmiş halini), yeni bir `/newera` yolunda erişilebilir
hale getirmek — mevcut siteyi bozmadan, yanına eklemek.

- [x] `app/[lang]/newera/page.jsx` oluşturuldu. Mevcut `app/[lang]/page.jsx`
      içeriği (`homepage-content` verisini kullanan ana sayfa bileşenleri) buraya
      taşındı/bağlandı.
- [x] `generateStaticParams` ve `generateMetadata` mevcut sayfadaki pattern'e
      uygun şekilde eklendi.
- [x] Header/footer bu sayfa kendi içinde tam sayfa olduğu için mevcut
      `#anchor` linkleri doğrudan çalışıyor (ayrı bir `withLangBase` gerekmedi).
- [x] Yerelde (`npm run dev`) `/tr/newera`, `/en/newera`, `/de/newera`,
      `/bs/newera` test edildi — hepsi 200 dönüyor, ana sayfa regresyonu yok.
      `npm run build` ile de `/newera` tüm dillerde statik (SSG) üretildi.
- [ ] `askanai.online` üzerindeki mevcut deployment'a bu değişiklik yayınlanacak
      (mevcut deploy sürecine göre — Docker image güncellemesi / redeploy).
- [ ] `askanai.online/tr/newera` gibi bir adresten canlıda doğrulanacak.

---

## Aşama 3 — Domain Exchange (ejsconsulting.org → Bu Site)

Amaç: `ejsconsulting.org` domain'inin DNS kayıtlarını, WordPress hosting'i yerine
bu Next.js uygulamasının çalıştığı sunucuya yönlendirmek.

- [ ] Bu Next.js uygulamasının **hangi sunucuda / hangi IP'de** çalıştığı teyit
      edilecek (askanai.online'ın A/AAAA kaydı neyse, muhtemelen aynısı).
- [ ] domainhizmetleri.com panelinden `ejsconsulting.org` için DNS kayıtları
      (A kaydı ve/veya CNAME) yeni sunucuya güncellenecek.
  - **Bu adımı ben yapamam** — panelde manuel giriş ve DNS değişikliği
    gerektiriyor, geri dönüşü zor bir işlem (DNS yayılması saatler sürebilir).
    Adımları birlikte, ekran ekran ilerleriz.
- [ ] DNS yayılması beklenecek (birkaç dakika – birkaç saat arası değişebilir).
- [ ] `ejsconsulting.org` üzerinde artık Next.js sitesinin göründüğü doğrulanacak.
- [ ] SSL sertifikası kontrol edilecek (yeni sunucuda `ejsconsulting.org` için
      geçerli bir sertifika olmalı — Let's Encrypt/Certbot ya da mevcut proxy
      config'i üzerinden).
- [ ] `/newera` route'u artık gereksizse, ana sayfa (`/[lang]`) içeriği
      `/newera` ile aynı hale getirilip `/newera` kaldırılabilir ya da
      `/newera`'dan ana sayfaya kalıcı yönlendirme (301 redirect) eklenir.
      **Bu karar Aşama 2 tamamlandığında birlikte netleştirilecek.**

---

## Açık Sorular / Sonraki Konuşmada Netleştirilecekler

- [ ] Aşama 1'deki "yenileniyoruz" mesajının tam metni ve tasarımı.
- [ ] Bu Next.js sitesinin şu an tam olarak nerede/nasıl deploy edildiği
      (hangi sunucu, hangi IP, Docker mı yoksa başka bir platform mu —
      `askanai.online` domain'inin arkasındaki altyapı).
- [ ] Aşama 3'te WordPress hosting'i tamamen iptal mi edilecek, yoksa yedek
      olarak bir süre daha tutulacak mı.
