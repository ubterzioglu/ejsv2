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
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
