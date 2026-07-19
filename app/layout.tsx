import type { Metadata } from "next";
import { Cairo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zedlevel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "زد لفل — فرصتك الذهبية لإتقان الإنجليزية | ZEDLEVEL",
    template: "%s | زد لفل ZEDLEVEL",
  },
  description:
    "أكاديمية زد لفل لتعليم الإنجليزية — دورات مدرجة من التأسيس A0 حتى B2، اختبار مستوى مجاني، ومتابعة حقيقية خطوة بخطوة. +5,000 مستفيد.",
  // self-referencing canonical per page (resolved against metadataBase)
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "زد لفل ZEDLEVEL",
    locale: "ar_SA",
  },
  twitter: { card: "summary" },
};

/* Organization + WebSite structured data — brand entity for Google */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "أكاديمية زد لفل لتعليم الإنجليزية",
  alternateName: "ZEDLEVEL",
  url: "https://zedlevel.com",
  logo: "https://zedlevel.com/icon.png",
  sameAs: ["https://www.tiktok.com/@zedlevel.official"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "زد لفل ZEDLEVEL",
  url: "https://zedlevel.com",
  inLanguage: "ar",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
