import Link from "next/link";
import { adminSections } from "../sections";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div>
      <section className="admin-hero">
        <span className="admin-kicker">Kontrol paneli</span>
        <h1 className="admin-page__title">
          EJS Consulting Yönetim Merkezi
        </h1>
        <p className="admin-page__subtitle">
          Makaleleri, site güncellemelerini ve revizyon taleplerini tek yerden
          yönetin.
        </p>
      </section>

      <section className="admin-readme-card">
        <span className="admin-kicker">Beni oku</span>
        <h2 className="admin-readme-card__title">
          Sayın Envera Hanım, panele hoş geldiniz
        </h2>

        <p className="admin-card__excerpt">
          Bu panel, EJS Consulting web sitesini kod bilgisi gerektirmeden,
          tamamen kendi başınıza yönetebilmeniz için hazırlandı. Son on günde
          hem siteyi hem de bu yönetim panelini baştan aşağı elden geçirdik;
          aşağıda neler yaptığımızı ve paneli nasıl kullanacağınızı sade bir
          dille özetledim. Acelesi yok; her şeyi dilediğiniz zaman, gönül
          rahatlığıyla deneyebilirsiniz.
        </p>

        <h3 className="admin-readme-card__subtitle">
          Son on günde sizin için neler yapıldı?
        </h3>
        <ul className="admin-update-list">
          <li>
            Şifreyle giriş yapılan bu yönetim paneli sıfırdan kuruldu; aydınlık,
            sade ve premium bir görünüme kavuşturuldu.
          </li>
          <li>
            Ana sayfanın en üstündeki büyük videoları (hero) artık panelden siz
            yönetebiliyorsunuz: video yükleyip sırasını belirleyebilir, yayına
            alıp kaldırabilirsiniz.
          </li>
          <li>
            Yazılar (Öğren ve Geliş) ve Haberler bölümleri eklendi; başlık,
            özet, metin ve kapak görseliyle içerik ekleyip düzenleyebiliyorsunuz.
          </li>
          <li>
            Ziyaretçiler için bülten (abonelik) sistemi kuruldu; gelen
            abonelikleri panelden görebiliyorsunuz.
          </li>
          <li>
            Siteye dört dil (Türkçe, İngilizce, Almanca, Boşnakça), site içi
            arama ve bölümler arası şık geçişler eklendi.
          </li>
          <li>
            Ana sayfanın tüm görünümü yenilendi: bölümler ayrı gri kartlara
            alındı, en üstteki video tam ekran yapıldı, kurucu bölümü yeniden
            düzenlenip tanıtım görseliniz büyütüldü.
          </li>
          <li>
            Yaptığımız her çalışmayı, sol menüdeki “Güncellemeler” bölümünde
            günü gününe, sade bir dille not ediyoruz; oradan neyin ne zaman
            yapıldığını takip edebilirsiniz.
          </li>
        </ul>

        <h3 className="admin-readme-card__subtitle">Paneli nasıl kullanırsınız?</h3>
        <ul className="admin-update-list">
          <li>
            Sol menüdeki her başlık, sitenin bir bölümünü yönetir. Bir bölümü
            açın, alanları doldurun ve kaydedin.
          </li>
          <li>
            Kaydettiğiniz an değişiklik canlı sitede görünür; ayrıca bir
            “yayınla” adımına gerek yoktur.
          </li>
          <li>
            Yazdığınız metinleri ve yüklediğiniz görselleri güvenle saklıyoruz;
            yanlış bir şey yapmaktan çekinmeyin, her zaman geri düzenleyebilirsiniz.
          </li>
          <li>
            Bir bölümün tam olarak nasıl kullanıldığından emin değilseniz, sol
            menüdeki “Yardım / Rehber” sayfasını açın; her alan için adım adım
            anlatım orada.
          </li>
          <li>
            İşiniz bittiğinde sağ üstten “Çıkış” yaparak paneli güvenle
            kapatabilirsiniz.
          </li>
        </ul>

        <p className="admin-card__excerpt">
          Aklınıza takılan ya da değişmesini istediğiniz bir şey olursa
          çekinmeden iletin; birlikte düzenleriz. Keyifli kullanımlar dileriz.
        </p>
      </section>

      <section className="admin-dashboard-grid admin-dashboard-grid--2x2">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="admin-dashboard-card"
          >
            <span className="admin-dashboard-card__title">{section.label}</span>
            <span className="admin-dashboard-card__text">
              {section.description}
            </span>
            <span className="admin-dashboard-card__action">Aç →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
