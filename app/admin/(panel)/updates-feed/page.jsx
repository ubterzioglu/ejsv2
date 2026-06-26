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
    date: "26 Haziran 2026",
    title: "Bölümler gri kartlara alındı, tam ekran hero, yenilenen kurucu bölümü ve tüm yazılar sayfası",
    items: [
      "Ana sayfadaki tüm bölümler artık beyaz zemin üzerinde, ayrı ayrı duran açık gri kartlar halinde görünüyor; böylece her bölümün nerede başlayıp bittiği çok daha net.",
      "En üstteki büyük video (hero) artık ekranı kenardan kenara, tam genişlikte kaplıyor; diğer bölümler ise iki yanı boşluklu kart düzeninde kalmaya devam ediyor.",
      'Uzman vitrini bölümünde "Tüm Uzmanlıklar" ve "Tam Profili İnceleyin" butonları, isim ve unvan yazısının üzerine biniyordu; butonlar yazının altına alınarak bu çakışma giderildi.',
      "Sayfanın en altındaki paylaşım bölümü, koyu alt bilginin içinde yamalı bir gri kutu gibi görünüyordu; arka planı şeffaf yapılarak yazılar yeniden okunur hale getirildi.",
      "Büyük video ile ilk bölüm arasına da diğer bölümlerdeki gibi bir geçiş eklendi: ince dikey çizgi, iki kısa söz ve ilgili bölüme götüren bir buton.",
      'Kurucu bölümü yeniden düzenlendi: fotoğraf kartı üstte, hikâye metni altta olacak şekilde alt alta dizildi ve kurucunun büyük tanıtım görseli, altındaki metin kartıyla aynı genişliğe getirilerek belirgin şekilde büyütüldü.',
      'Yazıların (Öğren ve Geliş) detay sayfasındaki "Tüm yazılara dön" bağlantısı artık ana sayfaya değil, tüm yazıların listelendiği yeni bir ara sayfaya götürüyor.',
    ],
  },
  {
    date: "24 Haziran 2026",
    title: "Bölüm geçişlerine anlamlı sözler, üst menüye Anasayfa bağlantısı ve görsel tutarlılık",
    items: [
      "Ana sayfadaki bölüm geçişlerine artık birer özlü söz eklendi: her geçişte verimlilik, kalite ve sürekli iyileştirmeyle ilgili kısa bir üst ve alt cümle görünüyor; ortadaki buton ise ilgili bölüme (Haberler, Bülten, Öğren ve Geliş) yönlendiriyor.",
      'Üst menüye dört dilde de "Anasayfa" bağlantısı eklendi; ziyaretçiler tek tıkla ana sayfanın başına dönebiliyor.',
      'Panelden "Çıkış" yapma daha güvenilir hale getirildi; çıkışta giriş ekranına dönüş sorunsuz çalışıyor.',
      'Uzman vitrini ve süreç vurgusu bölümleri, diğer bölümlerle aynı genişlik ve hizaya getirilerek sayfanın bütünlüğü güçlendirildi.',
      "Ana sayfa genelinde renk, boşluk ve hizalama ince ayarları yapılarak daha derli toplu ve premium bir görünüm sağlandı.",
    ],
  },
  {
    date: "24 Haziran 2026",
    title: "Haberler ve Bülten bölümleri, yenilenen bölüm geçişleri ve panel rehberi",
    items: [
      'Yeni "Haberler" bölümü eklendi: üst menüden ulaşılan ayrı bir haberler sayfası oluşturuldu; panelden başlık, etiket, özet, metin ve kapak fotoğrafıyla haber ekleyip düzenleyebilirsiniz.',
      'Yeni "Bülten" (abonelik) bölümü eklendi: ziyaretçiler dört dilde abonelik formuyla şirket güncellemeleri, içgörü bülteni ve sektörel güncellemelere kaydolabilir; gelen abonelikler panelde "Bülten Aboneleri" bölümünden görüntülenir.',
      "Ana sayfada bölümler arası geçişler yenilendi: bölümler ince bir dikey çizgiyle birbirine bağlanıyor ve ortadaki tıklanabilir etikete basınca ilgili bölüme yumuşakça kayıyor.",
      'Üst menüdeki arama artık büyüteç yerine "Ara" yazısıyla görünüyor; menü öğeleri yeniden hizalandı ve üst üste binme sorunu giderildi.',
      "Menüden bir bölüme atlandığında başlıkların üst menünün altında kesilmesi sorunu düzeltildi.",
      '"Kimliğimiz" bölümündeki "Kurucumuzun hikayesine bir göz atın" bağlantısı, sitedeki diğer butonlarla aynı premium siyah buton haline getirildi.',
      'Her bölüm başlığı aynı düzene getirildi (ortalanmış başlık ve açıklama); "Çalışmamız Hakkında" bölümündeki kartlar daha belirgin hale getirildi.',
      'Yönetim paneline "Beni oku" karşılama kartı ve bölümlerin günlük dille nasıl kullanıldığını anlatan "Yardım / Rehber" sayfası eklendi; ana sayfadaki kısayol kartları yeniden düzenlendi.',
      "Arama, Haberler ve Bülten sayfalarına da üst menü ve alt bilgi (footer) eklenerek tüm sayfalar bütünleştirildi.",
    ],
  },
  {
    date: "24 Haziran 2026",
    title: "Site içi arama, yenilenen referanslar ve videolu alt bilgi",
    items: [
      "Siteye arama özelliği eklendi: üst menüdeki arama (büyüteç) simgesine tıklayıp ayrı bir arama sayfasında site içeriğinde arama yapabilirsiniz.",
      "Arama sonuçları doğrudan ilgili bölüme götürür (örneğin kimlik, yaklaşımımız, uzmanlık alanları, kurucu hikayesi, referanslar, iletişim).",
      "Arama tamamen site içinde çalışır; ek bir altyapı veya veritabanı gerektirmez ve dört dilde (Türkçe, İngilizce, Almanca, Boşnakça) içerikte arar.",
      '"Referanslar" bölümü yeni, daha şık premium kart tasarımıyla yenilendi.',
      "Sayfanın en altına (alt bilgi) hareketli arka plan videosu eklenerek daha canlı bir görünüm sağlandı.",
      "Üst menü iyileştirildi: arama simgesi artık net görünüyor ve üst araç çubuğu biraz daha derli toplu hale getirildi.",
      "Kurucu bölümünde \"Savaşın ortasında başlayan yolculuk…\" cümlesi fotoğrafın altına alındı; konuştuğu diller ise ayrı bir etiket yerine yazının sonuna doğal bir cümle olarak işlendi.",
    ],
  },
  {
    date: "23 Haziran 2026",
    title: "Hero video yönetimi, Boşnakça dil ve premium tasarım yenilemesi",
    items: [
      'Yeni "Hero Slaytları" bölümü eklendi: ana sayfadaki büyük video şovunu artık panelden yönetebilirsiniz — video yükleyin (200 MB\'a kadar), sırasını belirleyin ve yayına alın/kaldırın.',
      "Her hero videosunun altyazısını dört dilde (Türkçe, İngilizce, Almanca, Boşnakça) ayrı ayrı girebilirsiniz.",
      "Otomatik çeviri eklendi: Türkçe altyazıyı yazıp tek tuşla İngilizce, Almanca ve Boşnakça'ya çevirtebilirsiniz (DeepL); çeviriyi isterseniz elle düzeltebilirsiniz.",
      "Siteye dördüncü dil olarak Boşnakça (BS) eklendi; üst menüdeki dil seçeneklerinde artık BS de var.",
      'Sol menüye yeni "Hero Slaytları" bölümü eklendi; menü ve panel düzeni buna göre güncellendi.',
      "Yönetim paneli baştan aşağı yenilendi: aydınlık, sade ve premium bir görünüm; giriş ekranı, sol menü, başlıklar ve kartlar elden geçirildi; ana sayfa artık yönlendirme yerine gerçek bir özet panosu (dashboard) açıyor.",
      "Ana sayfanın görünümü iyileştirildi: iletişim bölümü daha şık hale getirildi, uzmanlık alanları, yaklaşımımız, kimlik ve üst başlık bölümlerinin tasarımı tazelendi.",
      "Çalışma akışını anlatan yeni görseller eklendi (sektör, fabrika ve süreç tasarımı görselleri).",
    ],
  },
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
