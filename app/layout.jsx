import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "EJS Consulting | Consulting",
  description:
    "Next.js editorial landing page inspired by a corporate consulting homepage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
