import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const ogImage = {
  url: "/ejs_og.png",
  width: 1200,
  height: 630,
  alt: "EJS Consulting",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Kullanici zoom'u erisilebilirlik icin korunur (maximum-scale/user-scalable yok).
  themeColor: "#0a0e14",
};

export const metadata = {
  metadataBase: new URL("https://ejsconsulting.com"),
  title: "EJS Consulting | Üretim ve Proje Yönetimi Danışmanlığı",
  description:
    "EJS Consulting, üretim sektöründe yalin süreçler, kalite yönetimi ve proje danışmanlığı alanlarında sahada birlikte çalışan uzman ekibiniz.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "EJS Consulting",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Tuzla, İstanbul",
    "geo.position": "40.8159;29.3050",
    "ICBM": "40.8159, 29.3050",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "EJS Mühendislik Danışmanlık ve Eğitim",
  alternateName: "EJS Consulting",
  url: "https://ejsconsulting.com",
  logo: "https://ejsconsulting.com/ejs_og.png",
  image: "https://ejsconsulting.com/ejs_og.png",
  description:
    "Üretim sektöründe yalın süreçler, kalite yönetimi ve proje danışmanlığı alanlarında sahada birlikte çalışan uzman ekibiniz.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aydıntepe Mah. Alaaddin Sk. No.7 Evora Sitesi A Parsel, A13, İç Kapı No: 19",
    addressLocality: "Tuzla",
    addressRegion: "İstanbul",
    postalCode: "34947",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.8159,
    longitude: 29.305,
  },
  areaServed: ["TR", "DE", "BA"],
  knowsLanguage: ["tr", "en", "de", "bs"],
  sameAs: ["https://ejsconsulting.com"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={manrope.variable}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
