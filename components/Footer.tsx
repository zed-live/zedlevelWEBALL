import Link from "next/link";
import { site, isTodo } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { ArrowMotif } from "./ArrowMotif";

const footerLinks = [
  { href: "/courses", label: "الدورات" },
  { href: "/test", label: "اختبار تحديد المستوى" },
  { href: "/how-it-works", label: "كيف نعمل" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink/5 bg-section">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <ArrowMotif className="h-4 w-5 text-accent" />
            <span className="text-2xl font-black text-primary">ZEDLEVEL</span>
          </div>
          <p className="mt-3 max-w-[40ch] text-sm leading-7 text-ink/70">
            {site.nameAr} — نمشي معك خطوة بخطوة حتى تتقن الإنجليزية.{" "}
            {site.stats.beneficiaries} مستفيد.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="روابط الموقع">
          <h3 className="font-bold">روابط سريعة</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink/70 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-bold">تواصل معنا</h3>
          <div className="mt-3">
            <WhatsAppButton
              message={site.whatsapp.msgGeneral}
              source="footer"
            >
              راسلنا على واتساب
            </WhatsAppButton>
          </div>
          {!isTodo(site.social.email) && (
            <a
              href={`mailto:${site.social.email}`}
              className="mt-3 block text-sm text-ink/70 hover:text-primary"
            >
              {site.social.email}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-ink/5 py-4">
        <p className="container-site text-center text-xs text-ink/60">
          © {year} ZEDLEVEL — {site.nameAr}
        </p>
      </div>
    </footer>
  );
}
