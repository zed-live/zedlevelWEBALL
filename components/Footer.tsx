import Link from "next/link";
import Image from "next/image";
import { site, isTodo } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";
import manifest from "@/public/characters/manifest.json";

const columns = [
  {
    title: "الأكاديمية",
    links: [
      { href: "/courses", label: "الدورات" },
      { href: "/test", label: "اختبار تحديد المستوى" },
      { href: "/speaking-test", label: "اختبار المحادثة" },
      { href: "/how-it-works", label: "كيف نعمل" },
    ],
  },
  {
    title: "تعرّف علينا",
    links: [
      { href: "/about", label: "ليه زد لفل؟" },
      { href: "/teachers", label: "المعلمون" },
      { href: "/blog", label: "المدونة" },
      { href: "/contact", label: "تواصل معنا" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const icon = (
    manifest.brand as Record<
      string,
      { src: string; width: number; height: number }
    >
  )["logo-icon"];

  return (
    <footer className="mt-28 bg-navy text-white">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            {icon && (
              <Image
                src={icon.src}
                width={44}
                height={44}
                alt=""
                aria-hidden
                className="h-11 w-11"
              />
            )}
            <div>
              <span className="block text-2xl font-black tracking-tight">
                ZEDLEVEL
              </span>
              <span className="block text-xs text-white/60">
                {site.nameAr}
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-[42ch] leading-8 text-white/70">
            نمشي معك خطوة بخطوة — محتوى يختصر وقتك ومتابعة تشجعك تستمر، حتى
            توصل للمستوى اللي تبيه.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold">
            ⭐ {site.stats.beneficiaries} مستفيد
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-black uppercase tracking-wide text-white/50">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-semibold text-white/80 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {col.title === "تعرّف علينا" && (
              <div className="mt-6">
                <WhatsAppButton
                  message={site.whatsapp.msgGeneral}
                  source="footer"
                  variant="solid"
                  className="!w-full sm:!w-auto"
                >
                  راسلنا على واتساب
                </WhatsAppButton>
                {!isTodo(site.social.email) && (
                  <a
                    href={`mailto:${site.social.email}`}
                    className="mt-3 block text-sm text-white/60 hover:text-accent"
                  >
                    {site.social.email}
                  </a>
                )}
              </div>
            )}
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-site text-center text-xs font-semibold text-white/65">
          © {year} ZEDLEVEL — {site.nameAr} · جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
