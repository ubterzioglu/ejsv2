import { homepageContent } from "@/app/data/homepage-content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubscriptionForm } from "./subscription-form";
import { defaultLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

const missionImage = "/assets/workflow/mission-factory.jpg";
const identityImage = "/assets/workflow/identity-industry.jpg";
const processImage = "/assets/workflow/process-design.jpg";

// Bulten (Subscription Center) sayfasina ozel, 4 dilde yerellestirilmis metinler.
const bultenStrings = {
  tr: {
    eyebrow: "Bülten",
    title: "Bülten Merkezi",
    intro:
      "Şimdi kaydolun; sektörel gelişmeler, yayınlar, etkinlikler ve daha fazlası doğrudan e-postanıza gelsin. EJS Consulting'ten güncel içerikleri kaçırmayın.",
    topicsTitle: "Abonelik tercihleriniz",
    topics: [
      {
        key: "company",
        image: identityImage,
        title: "Şirket Güncellemeleri",
        text: "EJS Consulting'ten aylık bülten; yeni yayınlar, duyurular ve özel etkinlik davetleri.",
      },
      {
        key: "insight",
        image: processImage,
        title: "EJS Insight Bülteni",
        text: "Yalın dönüşüm, üretim ve kalite üzerine sahadan derlenmiş içgörüler ve uygulama notları.",
      },
      {
        key: "sector",
        image: missionImage,
        title: "Sektörel İçgörüler",
        text: "Branşa ve uzmanlık alanına özel düzenli güncellemeler. Sizin için ilgili olanı seçin.",
      },
    ],
    fields: {
      salutation: "Hitap",
      salutationPlaceholder: "Lütfen seçin",
      salutationOptions: ["Sayın", "Bay", "Bayan"],
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta",
      company: "Şirket",
      jobTitle: "Görev / Unvan",
      country: "Ülke",
      countryPlaceholder: "Lütfen seçin",
      countryOptions: ["Türkiye", "Almanya", "Bosna-Hersek", "Diğer"],
    },
    consent:
      "EJS Consulting'in, e-posta ile bilgilendirme ve etkinlik davetleri göndermek amacıyla kişisel verilerimi işlemesini kabul ediyorum. Onayımı dilediğim zaman geri çekebilirim.",
    submit: "Abone ol",
    submitting: "Gönderiliyor...",
    success: "Aboneliğiniz alındı. İlginiz için teşekkür ederiz!",
    back: "← Ana sayfaya dön",
    errors: {
      missing_first_name: "Lütfen adınızı girin.",
      missing_last_name: "Lütfen soyadınızı girin.",
      invalid_email: "Geçerli bir e-posta adresi girin.",
      missing_company: "Lütfen şirket adını girin.",
      missing_job_title: "Lütfen görev/unvan girin.",
      missing_consent: "Devam etmek için onay kutusunu işaretleyin.",
      server: "Bir hata oluştu. Lütfen tekrar deneyin.",
    },
  },
  en: {
    eyebrow: "Newsletter",
    title: "Subscription Center",
    intro:
      "Sign up now to receive industry updates, publications, events, and more directly by email. Stay up to date with the latest from EJS Consulting.",
    topicsTitle: "Your subscription preferences",
    topics: [
      {
        key: "company",
        image: identityImage,
        title: "Company Updates",
        text: "Monthly newsletter from EJS Consulting with new publications, announcements, and exclusive event invitations.",
      },
      {
        key: "insight",
        image: processImage,
        title: "EJS Insight Newsletter",
        text: "Field-tested insights and practical notes on lean transformation, production, and quality.",
      },
      {
        key: "sector",
        image: missionImage,
        title: "Sector Insights",
        text: "Regular industry- and topic-specific updates. Choose what is relevant for you.",
      },
    ],
    fields: {
      salutation: "Salutation",
      salutationPlaceholder: "Please select",
      salutationOptions: ["Mr.", "Ms.", "Mx."],
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      company: "Company",
      jobTitle: "Job title",
      country: "Country",
      countryPlaceholder: "Please select",
      countryOptions: ["Turkey", "Germany", "Bosnia & Herzegovina", "Other"],
    },
    consent:
      "I agree that EJS Consulting may process my personal data to send me information and event invitations by email. I can withdraw my consent at any time.",
    submit: "Subscribe",
    submitting: "Sending...",
    success: "Your subscription has been received. Thank you!",
    back: "← Back to home",
    errors: {
      missing_first_name: "Please enter your first name.",
      missing_last_name: "Please enter your last name.",
      invalid_email: "Please enter a valid email address.",
      missing_company: "Please enter your company.",
      missing_job_title: "Please enter your job title.",
      missing_consent: "Please check the consent box to continue.",
      server: "Something went wrong. Please try again.",
    },
  },
  de: {
    eyebrow: "Newsletter",
    title: "Abonnement-Center",
    intro:
      "Melden Sie sich jetzt an, um Branchennews, Publikationen, Veranstaltungen und mehr direkt per E-Mail zu erhalten. Bleiben Sie mit EJS Consulting auf dem Laufenden.",
    topicsTitle: "Ihre Abonnement-Präferenzen",
    topics: [
      {
        key: "company",
        image: identityImage,
        title: "Unternehmens-Updates",
        text: "Monatlicher Newsletter von EJS Consulting mit neuen Publikationen, Ankündigungen und exklusiven Veranstaltungseinladungen.",
      },
      {
        key: "insight",
        image: processImage,
        title: "EJS Insight Newsletter",
        text: "Praxiserprobte Einblicke und Umsetzungshinweise zu Lean-Transformation, Produktion und Qualität.",
      },
      {
        key: "sector",
        image: missionImage,
        title: "Brancheneinblicke",
        text: "Regelmäßige branchen- und themenspezifische Updates. Wählen Sie, was für Sie relevant ist.",
      },
    ],
    fields: {
      salutation: "Anrede",
      salutationPlaceholder: "Bitte auswählen",
      salutationOptions: ["Herr", "Frau", "Divers"],
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      company: "Unternehmen",
      jobTitle: "Position",
      country: "Land",
      countryPlaceholder: "Bitte auswählen",
      countryOptions: ["Türkei", "Deutschland", "Bosnien und Herzegowina", "Andere"],
    },
    consent:
      "Ich bin damit einverstanden, dass EJS Consulting meine personenbezogenen Daten verarbeitet, um mir per E-Mail Informationen und Veranstaltungseinladungen zu senden. Ich kann meine Einwilligung jederzeit widerrufen.",
    submit: "Abonnieren",
    submitting: "Wird gesendet...",
    success: "Ihr Abonnement wurde registriert. Vielen Dank!",
    back: "← Zurück zur Startseite",
    errors: {
      missing_first_name: "Bitte geben Sie Ihren Vornamen ein.",
      missing_last_name: "Bitte geben Sie Ihren Nachnamen ein.",
      invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      missing_company: "Bitte geben Sie Ihr Unternehmen ein.",
      missing_job_title: "Bitte geben Sie Ihre Position ein.",
      missing_consent: "Bitte bestätigen Sie die Einwilligung, um fortzufahren.",
      server: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    },
  },
  bs: {
    eyebrow: "Newsletter",
    title: "Centar za pretplatu",
    intro:
      "Prijavite se sada da biste primali novosti iz industrije, publikacije, događaje i više, direktno na e-mail. Budite u toku s najnovijim iz EJS Consultinga.",
    topicsTitle: "Vaše pretplatničke postavke",
    topics: [
      {
        key: "company",
        image: identityImage,
        title: "Novosti kompanije",
        text: "Mjesečni newsletter EJS Consultinga s novim publikacijama, najavama i ekskluzivnim pozivnicama za događaje.",
      },
      {
        key: "insight",
        image: processImage,
        title: "EJS Insight Newsletter",
        text: "Uvidi i praktične napomene iz prakse o lean transformaciji, proizvodnji i kvaliteti.",
      },
      {
        key: "sector",
        image: missionImage,
        title: "Industrijski uvidi",
        text: "Redovne novosti specifične za industriju i temu. Odaberite ono što je relevantno za vas.",
      },
    ],
    fields: {
      salutation: "Oslovljavanje",
      salutationPlaceholder: "Molimo odaberite",
      salutationOptions: ["Gosp.", "Gđa", "Ostalo"],
      firstName: "Ime",
      lastName: "Prezime",
      email: "E-mail",
      company: "Kompanija",
      jobTitle: "Pozicija",
      country: "Država",
      countryPlaceholder: "Molimo odaberite",
      countryOptions: ["Turska", "Njemačka", "Bosna i Hercegovina", "Ostalo"],
    },
    consent:
      "Slažem se da EJS Consulting obrađuje moje lične podatke kako bi mi slao informacije i pozivnice za događaje putem e-maila. Saglasnost mogu povući u bilo kojem trenutku.",
    submit: "Pretplati se",
    submitting: "Slanje...",
    success: "Vaša pretplata je zaprimljena. Hvala!",
    back: "← Nazad na početnu",
    errors: {
      missing_first_name: "Molimo unesite ime.",
      missing_last_name: "Molimo unesite prezime.",
      invalid_email: "Unesite ispravnu e-mail adresu.",
      missing_company: "Molimo unesite kompaniju.",
      missing_job_title: "Molimo unesite poziciju.",
      missing_consent: "Označite saglasnost da biste nastavili.",
      server: "Došlo je do greške. Pokušajte ponovo.",
    },
  },
};

// Header/footer linkleri ana sayfa ankrlarini (#bolum) kullanir; alt sayfada
// bunlar ana sayfaya cozumlenmeli: "#anchor" -> "/{lang}#anchor".
function withLangBase(links, lang) {
  return (links ?? []).map((link) =>
    link.href?.startsWith("#") ? { ...link, href: `/${lang}${link.href}` } : link,
  );
}

export default async function BultenPage({ params }) {
  const { lang } = await params;
  const t = bultenStrings[lang] ?? bultenStrings[defaultLocale];
  const content = homepageContent[lang] ?? homepageContent[defaultLocale];

  const shareUrl = encodeURIComponent("https://ejsconsulting.com");
  const shareText = encodeURIComponent(t.title);

  return (
    <div className="page-shell" id="top">
      <SiteHeader
        utilityLinks={withLangBase(content.utilityLinks, lang)}
        mainLinks={withLangBase(content.mainLinks, lang)}
        ariaLabels={content.ariaLabels}
      />

      <main className="hero-page">
        <section className="content-section section bulten-page">
          <div className="section-heading-block compact-heading">
            <p className="structure-label">{t.eyebrow}</p>
            <h1 className="section-title">{t.title}</h1>
            <p className="section-intro">{t.intro}</p>
          </div>

          <SubscriptionForm lang={lang} strings={t} backHref={`/${lang}`} />
        </section>
      </main>

      <SiteFooter
        footer={{ ...content.footer, links: withLangBase(content.footer.links, lang) }}
        lang={lang}
        shareUrl={shareUrl}
        shareText={shareText}
      />
    </div>
  );
}
