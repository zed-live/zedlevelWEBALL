import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";

/**
 * Main-site chrome. Every normal page lives under this route group so it gets
 * the navbar, footer and floating WhatsApp button. Full-screen experiences
 * that need a bare page (e.g. the speaking test in the (speaking) group) live
 * in a sibling group and deliberately opt out of this chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        تجاوز إلى المحتوى
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <Analytics />
    </>
  );
}
