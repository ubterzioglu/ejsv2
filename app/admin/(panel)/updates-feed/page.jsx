// Guncellemeler bolumu: SABIT (hardcoded) icerik.
// Veritabani kullanmaz. Yeni bir is yapildikca buradaki "UPDATES" dizisine
// en uste yeni bir madde eklemen yeterli.

export const dynamic = "force-static";

/**
 * Her giris bir "gun" karti. items = o gun yapilan isler (gunluk dille, madde madde).
 * @type {Array<{ date: string, title: string, items: string[] }>}
 */
const UPDATES = [
  {
    date: "22 Haziran 2026",
    title: "Yönetim paneli ve site içeriği hayata geçti",
    items: [
      "Şifreyle giriş yapılan yönetim paneli kuruldu (giriş, çıkış, sol menü ve sayfa düzeni).",
      "Makaleler bölümü eklendi: panelden yazı ekleyebilir, düzenleyebilir, silebilir ve her yazıya kapak görseli yükleyebilirsiniz.",
      "Revizyon İstekleri bölümü eklendi; gelen talepler panelden takip edilebiliyor.",
      "Güncellemeler bölümü eklendi (şu an okuduğunuz bu liste).",
      "Veritabanı bağlantısı kuruldu; makaleler ve görseller güvenli şekilde Supabase üzerinde saklanıyor.",
      "Ana sayfa baştan elden geçirildi: 'Yaklaşımımız', 'Uzmanlık Alanları' ve 'Kurucu Hikayesi' bölümleri eklendi.",
      "Kimlik, misyon, referanslar ve paylaşım bölümleri yeniden düzenlendi; alt bilgi (footer) ve tanıtım videosu galerisi güncellendi.",
      "Site Türkçe/İngilizce/Almanca olacak şekilde çok dilli altyapıya hazırlandı.",
      "Yeni yin-yang logosu (favicon), kurucu görseli ve genel görsel stil güncellemeleri yapıldı.",
    ],
  },
];

export default function UpdatesFeedPage() {
  return (
    <div>
      <header className="admin-page-header">
        <div>
          <span className="admin-kicker">Çalışma kaydı</span>
          <h1 className="admin-page__title">Güncellemeler</h1>
          <p className="admin-page__subtitle">
            Panel ve site üzerinde yapılan çalışmaların sade ve takip edilebilir
            kayıt alanı (salt-okunur).
          </p>
        </div>
      </header>

      <div className="admin-timeline">
        {UPDATES.map((day) => (
          <article key={day.date} className="admin-timeline-card">
            <div className="admin-timeline-card__marker" />
            <div className="admin-timeline-card__content">
              <div className="admin-timeline-card__head">
                <h3 className="admin-card__title">{day.title}</h3>
                <span className="admin-badge">{day.date}</span>
              </div>
              <ul className="admin-update-list">
                {day.items.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
