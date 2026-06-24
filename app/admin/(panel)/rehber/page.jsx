import { AdminAccordion } from "../components/admin-accordion";

export const dynamic = "force-dynamic";

// Her admin bolumunun gunluk dilde, madde madde kullanim rehberi.
const guideCards = [
  {
    title: "Hero Slaytları",
    intro:
      "Ana sayfanın en üstündeki büyük video gösterisini buradan yönetirsiniz.",
    steps: [
      "Sol menüden “Hero Slaytları” bölümünü açın.",
      "Yeni bir slayt eklemek için video dosyasını seçip kısa bir başlık yazın.",
      "Slaytların sırasını değiştirerek hangisinin önce görüneceğini belirleyin.",
      "Göstermek istemediğiniz bir slaydı silebilir veya pasifleştirebilirsiniz.",
      "Kaydettiğiniz anda değişiklik ana sayfada görünür.",
    ],
  },
  {
    title: "Makaleler",
    intro:
      "Sitenin “Öğren ve Geliş” alanındaki yazıları buradan ekler ve düzenlersiniz.",
    steps: [
      "Yeni yazı eklemek için başlık, kısa özet ve içerik metnini girin.",
      "Her yazının site adresinde görünecek kısa bir bağlantı adı (slug) vardır; sade tutun.",
      "Var olan bir yazıyı düzenlemek için listeden seçip metni güncelleyin.",
      "Yayından kaldırmak istediğiniz yazıyı silebilirsiniz.",
      "Yazılar kaydedildiği anda sitenin makaleler bölümünde listelenir.",
    ],
  },
  {
    title: "Güncellemeler",
    intro:
      "Panelde ve sitede yapılan çalışmaların kaydını burada tutarsınız.",
    steps: [
      "Yaptığınız önemli bir değişikliği kısa bir notla buraya ekleyin.",
      "Notları sade ve anlaşılır tutun; tarih otomatik kaydedilir.",
      "Geçmiş güncellemeleri görüntüleyerek neyin ne zaman yapıldığını takip edin.",
      "Gereksiz veya yanlış girilen bir notu silebilirsiniz.",
    ],
  },
  {
    title: "Revizyon İstekleri",
    intro:
      "Kullanıcılardan veya ekipten gelen değişiklik taleplerini buradan takip edersiniz.",
    steps: [
      "Gelen talepleri listeden görüntüleyin.",
      "Bir talebi ele aldığınızda durumunu güncelleyin (örneğin tamamlandı olarak işaretleyin).",
      "İlgili değişikliği yaptıktan sonra talebi kapatın.",
      "Artık geçerli olmayan talepleri silerek listeyi temiz tutun.",
    ],
  },
];

export default function AdminGuidePage() {
  return (
    <div>
      <section className="admin-hero">
        <span className="admin-kicker">Yardım / Rehber</span>
        <h1 className="admin-page__title">Panel Kullanım Rehberi</h1>
        <p className="admin-page__subtitle">
          Aşağıdaki kartlar, panelin her bölümünün ne işe yaradığını ve nasıl
          kullanıldığını günlük dilde, adım adım anlatır.
        </p>
      </section>

      <section className="admin-guide-list">
        {guideCards.map((card) => (
          <AdminAccordion
            key={card.title}
            title={`${card.title} Nasıl Kullanılır?`}
            hint={card.intro}
          >
            <ul className="admin-update-list">
              {card.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </AdminAccordion>
        ))}
      </section>
    </div>
  );
}
