# EJSV2 Admin Panel — Premium Light Redesign (E2E Implementation Doc)

Repository: `ubterzioglu/ejsv2` · Stack: **Next.js 16.2.1, React 19.2.4, @supabase/supabase-js, plain CSS** (no Tailwind / shadcn / MUI / icon library).

> Bu doküman **gerçek dosya yapısına göre** yazılmıştır. Hedef: admin paneli işlevselliğini hiç bozmadan, tamamen **light** ve **premium** bir SaaS yönetim paneline dönüştürmek. Yön: **CSS grid shell + topbar + gerçek dashboard + iki kolonlu içerik düzeni**.

---

## 0. Non-negotiable constraints

**Yapma:**
- Yeni dependency ekleme. Tailwind / shadcn / MUI / Bootstrap / icon paketi / dış görsel yok.
- Dark mode ekleme. Sadece light.
- `@/lib/admin-auth`, `@/lib/supabase/server`, `@/lib/locales` dosyalarına dokunma.
- Server action adlarını değiştirme: `createUpdate`, `updateUpdate`, `deleteUpdate`, `setRevisionStatus`, `deleteRevision`, `createRevision`, `loginAction`.
- Supabase tablo adlarını değiştirme: `articles`, `revision_requests`.
- Form `name` attribute'larını değiştirme (aşağıda listelendi).
- `export const dynamic = "force-dynamic" | "force-static"` direktiflerini kaldırma.
- `isAuthed()` redirect kontrolünü `layout.jsx`'ten kaldırma.
- `/admin/logout` link'i + `prefetch={false}`'u kaldırma.
- `import "../admin.css"`'i login sayfasından kaldırma.
- Build'i kırma (`npm run build`).

**Yapabilirsin:**
- CSS class yapısını genişlet, inline style'ları class'a taşı.
- Küçük reusable component ekle.
- CSS-only dekoratif şekiller + CSS logo mark ekle.
- Dashboard, boş durum kartları, silme onayı ekle.
- Türkçe UI metnini iyileştir.

**Korunacak form field name'leri:**
- `update-form`: `id`, `lang`, `existing_image_url`, `title`, `excerpt`, `body`, `image`, `sort_order`, `published`. Ayrıca `encType="multipart/form-data"` ve file input'taki `accept="image/png,image/jpeg,image/webp,image/gif"` korunur.
- `revision-form`: `name`, `email`, `message`.
- `login`: `password` (`autoComplete="current-password"`).

---

## 1. Mevcut mimari (gerçek)

```
app/layout.jsx                         → Manrope font, --font-body CSS değişkeni, globals.css
app/admin/admin.css                    → TÜM admin görünümü burada (login dahil)
app/admin/sections.js                  → sol menü: [{href,label}] x3
app/admin/login/page.jsx               → "use client", tek-kolon ortalı kart, import "../admin.css"
app/admin/login/actions.js             → loginAction (DOKUNMA)
app/admin/logout/route.js              → çıkış route (DOKUNMA)
app/admin/(panel)/layout.jsx           → server; isAuthed() redirect; <admin-shell><Sidebar/><main/></...>
app/admin/(panel)/sidebar.jsx          → "use client"; usePathname; marka + nav + çıkış
app/admin/(panel)/page.jsx             → redirect("/admin/updates")  ← dashboard'a dönüşecek
app/admin/(panel)/updates/page.jsx     → server; supabase articles fetch; <UpdatesManager/>
app/admin/(panel)/updates/updates-manager.jsx → "use client"; form + liste (tek kolon)
app/admin/(panel)/updates/update-form.jsx     → "use client"; useActionState; create/update
app/admin/(panel)/updates/actions.js   → createUpdate/updateUpdate/deleteUpdate (DOKUNMA)
app/admin/(panel)/updates-feed/page.jsx → force-static; hardcoded UPDATES timeline
app/admin/(panel)/revisions/page.jsx   → server; revision_requests fetch; liste + form
app/admin/(panel)/revisions/revision-form.jsx → "use client"; createRevision
app/admin/(panel)/revisions/actions.js → setRevisionStatus/deleteRevision/createRevision (DOKUNMA)
```

Mevcut CSS değişkenleri `:root`'ta değil, `.admin-shell` selector'ı içinde local tanımlı. `admin-shell` şu an **flex** (grid değil). Login zaten tek-kolon ortalı kart.

---

## 2. Tasarım yönü

Premium SaaS / consulting dashboard (Linear / Stripe / Vercel ruhu — kopya değil). Light/krem zemin, beyaz kartlar, soft shadow, ince border, iyi tipografi, geniş nefes. Emoji/gradient abartısı yok. Marka: EJS Consulting (üretim, süreç, kalite). Aksan: koyu yeşil + muted amber.

### Token seti (`.admin-shell` üstünde, ortak kullanım için `:root` yerine bir kök selector veya `.admin-shell, .admin-login` üzerinde tanımla)

```css
--admin-bg: #f6f3ec;
--admin-bg-soft: #fbfaf7;
--admin-surface: rgba(255,255,255,0.92);
--admin-surface-solid: #ffffff;
--admin-surface-muted: #f8f6f1;
--admin-border: rgba(31,42,36,0.10);
--admin-border-strong: rgba(31,42,36,0.16);
--admin-text: #17211b;
--admin-muted: #68736d;
--admin-muted-2: #8b948f;
--admin-accent: #0f5132;
--admin-accent-strong: #0b3d26;
--admin-accent-soft: #e8f2ec;
--admin-accent-softer: #f2f8f4;
--admin-warning: #b76b00;
--admin-warning-soft: #fff2dd;
--admin-danger: #b42318;
--admin-danger-soft: #fff1ef;
--admin-info: #2457a6;
--admin-info-soft: #edf4ff;
--admin-shadow-sm: 0 8px 24px rgba(23,33,27,0.06);
--admin-shadow-md: 0 18px 55px rgba(23,33,27,0.09);
--admin-radius-sm: 10px;
--admin-radius-md: 16px;
--admin-radius-lg: 24px;
--admin-radius-xl: 30px;
```

---

## 3. Dosya-dosya talimat

### 3.1 `app/admin/sections.js`
Her bölüme `description` ekle. Route ve label aynen kalır.
```js
export const adminSections = [
  { href: "/admin/updates", label: "Makaleler", description: "Yazılarımız alanını yönetin" },
  { href: "/admin/updates-feed", label: "Güncellemeler", description: "Panel ve site çalışma kaydı" },
  { href: "/admin/revisions", label: "Revizyon İstekleri", description: "Kullanıcı taleplerini takip edin" },
];
```
**Kabul:** sidebar 3 route'u render eder, aktif state çalışır, import kırılmaz.

### 3.2 `app/admin/(panel)/layout.jsx` (server kalır)
`admin-shell` içine `AdminSidebar` + `admin-workspace` (topbar + main). `isAuthed()` redirect aynen.
```jsx
return (
  <div className="admin-shell">
    <AdminSidebar />
    <div className="admin-workspace">
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <span className="admin-kicker">Yönetim merkezi</span>
          <strong>EJS Consulting</strong>
        </div>
        <div className="admin-topbar__actions">
          <a href="/" className="admin-topbar__link">Siteyi görüntüle</a>
          <span className="admin-status-pill">Güvenli oturum</span>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  </div>
);
```
**Kabul:** kimliksiz kullanıcı `/admin/login`'e gider; topbar tüm panel sayfalarında görünür.

### 3.3 `app/admin/(panel)/sidebar.jsx` (client kalır)
CSS logo mark + marka bloğu + açıklamalı nav + alt oturum/çıkış. `usePathname` aktif tespiti ve `prefetch={false}` korunur.
```jsx
<aside className="admin-sidebar">
  <div className="admin-brand">
    <div className="admin-brand__mark">EJS</div>
    <div className="admin-brand__copy">
      <span className="admin-brand__badge">Yönetim Paneli</span>
      <div className="admin-brand__name">EJS Consulting</div>
      <div className="admin-brand__subtitle">İçerik ve talep yönetimi</div>
    </div>
  </div>
  <nav className="admin-sidebar__nav" aria-label="Admin bölümleri">
    {adminSections.map((s) => {
      const active = pathname === s.href || pathname.startsWith(s.href + "/");
      return (
        <Link key={s.href} href={s.href}
          className={"admin-sidebar__link" + (active ? " admin-sidebar__link--active" : "")}>
          <span className="admin-sidebar__link-main">{s.label}</span>
          <span className="admin-sidebar__link-sub">{s.description}</span>
        </Link>
      );
    })}
  </nav>
  <div className="admin-session">
    <div>
      <div className="admin-session__label">Oturum</div>
      <div className="admin-session__text">Admin erişimi aktif</div>
    </div>
    <Link className="admin-sidebar__logout" href="/admin/logout" prefetch={false}>Çıkış</Link>
  </div>
</aside>
```

### 3.4 `app/admin/(panel)/page.jsx` (redirect → dashboard)
`redirect` ve `next/navigation` importunu **kaldır**. Gerçek dashboard yaz: hero + 3 hızlı kart (`adminSections`'tan map, `Link`) + "Bugünkü odak" / "Panel notları" panelleri. DB fetch yok.
Class'lar: `admin-hero`, `admin-kicker`, `admin-page__title`, `admin-page__subtitle`, `admin-dashboard-grid`, `admin-dashboard-card`, `admin-dashboard-card__title/__text/__action`, `admin-panel-grid`, `admin-panel-card`.
**Kabul:** `/admin` dashboard açar (redirect yok); kartlar `/admin/updates`, `/admin/updates-feed`, `/admin/revisions`'a gider; kullanılmayan import kalmaz (lint).

### 3.5 `app/admin/(panel)/components/admin-page-header.jsx` (yeni)
```jsx
export function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="admin-page-header">
      <div>
        {eyebrow ? <span className="admin-kicker">{eyebrow}</span> : null}
        <h1 className="admin-page__title">{title}</h1>
        {description ? <p className="admin-page__subtitle">{description}</p> : null}
      </div>
      {actions ? <div className="admin-page-header__actions">{actions}</div> : null}
    </header>
  );
}
```
updates / updates-feed / revisions sayfalarında kullan. Import yolu sorun çıkarırsa tekrarlı JSX'e düş.

### 3.6 `app/admin/(panel)/updates/page.jsx` (server)
`AdminPageHeader` kullan (eyebrow: "İçerik", title: "Makaleler", description: aşağıdaki metin). **Supabase query aynen.** `UpdatesManager`'a `lang` + `items` aynen geçir. Error state korunur.

### 3.7 `app/admin/(panel)/updates/updates-manager.jsx` (client)
İki kolon: `admin-content-layout__main` (liste) + `admin-content-layout__side` (`UpdateForm` yeni-ekleme). **4 inline style'ı class'a taşı.** Kartlar: media/placeholder (`EJS`), başlık, excerpt, durum badge (Yayında/Taslak), sıra, Düzenle/Sil. Sil butonuna `confirm("Bu makale silinsin mi?")` (zaten client). `deleteUpdate` aynen.
```jsx
<div className="admin-content-layout">
  <section className="admin-content-layout__main">
    <div className="admin-section-head">
      <div>
        <p className="admin-section-title">Mevcut makaleler</p>
        <p className="admin-section-subtitle">Sitede görünen yazıları buradan düzenleyin.</p>
      </div>
      <span className="admin-count-pill">{items.length} kayıt</span>
    </div>
    <div className="admin-list">… kartlar / boş durum …</div>
  </section>
  <aside className="admin-content-layout__side"><UpdateForm lang={lang} /></aside>
</div>
```
Kart iskeleti: `admin-card admin-card--article` → `admin-card__media` (img `admin-card__thumb` veya `admin-card__placeholder`), `admin-card__body` (`__title`,`__excerpt`,`__meta`+badge), `admin-card__actions` (ghost Düzenle + danger Sil formu). Düzenleme hâlâ kartı `UpdateForm`'la değiştirebilir.

### 3.8 `app/admin/(panel)/updates/update-form.jsx` (client)
Field name/encType/action AYNEN. Görsel: `admin-form__header` (`__title`+`__hint`), gruplar (`admin-form__group`), büyük textarea `admin-textarea admin-textarea--large`, küçük sıra input `admin-input admin-input--small`, `published` için `admin-toggle`. **3 inline style class'a taşı** (`body` textarea minHeight, `sort_order` width, button group, thumb margin). `pending`/`error`/edit-cancel davranışı korunur.

### 3.9 `app/admin/(panel)/updates-feed/page.jsx` (`force-static`)
Timeline/changelog. `UPDATES` verisine dokunma.
```jsx
<div className="admin-timeline">
  {UPDATES.map((day) => (
    <article key={day.date} className="admin-timeline-card">
      <div className="admin-timeline-card__marker" />
      <div className="admin-timeline-card__content">
        <div className="admin-timeline-card__head">
          <h3 className="admin-card__title">{day.title}</h3>
          <span className="admin-badge">{day.date}</span>
        </div>
        <ul className="admin-update-list">{day.items.map((l,i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </article>
  ))}
</div>
```

### 3.10 `app/admin/(panel)/revisions/page.jsx` (server)
Header + durum sayaç kartları + iki kolon (liste + `RevisionForm`). **2 inline style class'a taşı.** Action'lar + `STATUS_LABELS`/`STATUS_ORDER`/`formatDate` aynen.
```js
const requests = data ?? [];
const counts = {
  new: requests.filter((r) => r.status === "new").length,
  in_progress: requests.filter((r) => r.status === "in_progress").length,
  done: requests.filter((r) => r.status === "done").length,
};
```
`admin-stats-grid` → 3x `admin-stat-card` (`__label`,`__value`,`__hint`). Liste kartları: `admin-card` + `admin-card__actions` (durum değiştir formları ghost, Sil danger). Boş durum: `admin-empty-card`.

### 3.11 `app/admin/(panel)/revisions/revision-form.jsx` (client)
`name`/`email`/`message` + reset korunur. `admin-form` + `admin-form__header` ile iyileştir.

### 3.12 `app/admin/login/page.jsx` (client)
İki kolon premium login. `useActionState(loginAction,...)`, `password`, `formAction`, error/pending AYNEN. `import "../admin.css"` korunur.
```jsx
<div className="admin-login">
  <div className="admin-login__shell">
    <section className="admin-login__intro">
      <div className="admin-brand__mark admin-brand__mark--large">EJS</div>
      <span className="admin-login__badge">Yönetim Paneli</span>
      <h1 className="admin-login__title">EJS Consulting</h1>
      <p className="admin-login__hint">İçerikleri, güncellemeleri ve revizyon taleplerini güvenli şekilde yönetin.</p>
    </section>
    <form className="admin-login__card" action={formAction}>
      <label className="admin-login__label" htmlFor="password">Şifre</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className="admin-login__input" />
      {state?.error ? <p className="admin-login__error">{state.error}</p> : null}
      <button type="submit" className="admin-login__button" disabled={pending}>
        {pending ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
    </form>
  </div>
</div>
```

### 3.13 `app/admin/admin.css` (ana iş)
Token seti + tüm yeni class'lar. `admin-shell` → grid `grid-template-columns: 300px minmax(0,1fr)`. Premium sidebar (sticky, logo mark, açıklamalı nav, alt oturum). Page-header/hero/kicker. Dashboard grid + kartlar. content-layout (iki kolon). stats-grid. article card (media/placeholder/body/actions). Badge varyantları. Form grupları + `admin-textarea--large`/`admin-input--small`/`admin-toggle`. Timeline. İki kolon login. Responsive `980px` (tek kolon, nav 3'lü grid) ve `680px` (topbar dikey, kartlar tek kolon, action'lar full-width). **Eski class adlarını JSX güncellenmeden silme.**

---

## 4. QA checklist

```
npm run lint     # temiz
npm run build    # başarılı
npm run dev      # manuel test
```
- `/admin/login`: kart ortalı/iki kolon, yanlış şifre → hata, doğru şifre → giriş.
- `/admin`: dashboard (redirect YOK); 3 kart doğru route'lara gider.
- `/admin/updates`: liste sol, ekleme formu sağ (desktop); ekle / düzenle / görsel yükle / confirm sonrası sil.
- `/admin/updates-feed`: timeline temiz, statik.
- `/admin/revisions`: sayaçlar doğru; oluştur / durum değiştir / sil.
- Responsive 1440 / 1200 / 768 / 390 px: yatay scroll yok, sidebar mobilde kullanılabilir, butonlar/formlar okunur.

## 5. Beklenen sonuç
Gerçek bir SaaS/ürün admin paneli hissi: temiz, premium, light, güvenilir; teknik olmayan kişiler için kolay; danışmanlık sitesine uygun; aşırı tasarlanmamış; mobilde bozulmayan. Backend/işlevsellik korunur — yalnızca UI/UX/layout/stil iyileşir.
