import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "EJS Consulting | Üretim ve Proje Yönetimi Danışmanlığı",
  description:
    "EJS Consulting, üretim sektöründe yalin süreçler, kalite yönetimi ve proje danışmanlığı alanlarında sahada birlikte çalışan uzman ekibiniz.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
