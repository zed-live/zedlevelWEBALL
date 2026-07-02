import type { Metadata } from "next";
import { Cairo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "زد لفل — فرصتك الذهبية لإتقان الإنجليزية | ZEDLEVEL",
    template: "%s | زد لفل ZEDLEVEL",
  },
  description:
    "أكاديمية زد لفل لتعليم الإنجليزية — دورات مدرجة من التأسيس A0 حتى B2، اختبار مستوى مجاني، ومتابعة حقيقية خطوة بخطوة. +5,000 مستفيد.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${sourceSans.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          تجاوز إلى المحتوى
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
