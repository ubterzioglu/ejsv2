import { Bodoni_Moda, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Roland Berger | Unternehmensberatung",
  description:
    "Next.js editorial landing page inspired by a corporate consulting homepage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${bodoniModa.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
