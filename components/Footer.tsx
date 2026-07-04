import Link from "next/link";
import Image from "next/image";
import { site, isTodo } from "@/config/site";
import manifest from "@/public/characters/manifest.json";

/** Footer per the homepage prompt §10 — brand + tagline + 5 links + social + © */
const links = [
  { href: "/courses", label: "الدورات" },
  { href: "/test", label: "اختبار المستوى" },
  { href: "/speaking-test", label: "اختبار المحادثة" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
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
      <div className="container-site flex flex-col items-center gap-7 py-14 text-center">
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
          <div className="text-start">
            <span className="block text-2xl font-black tracking-tight">
              زد لفل
            </span>
            <span className="block text-xs text-white/60">{site.nameAr}</span>
          </div>
        </div>

        <p className="font-semibold text-white/70">
          محتوى يختصر وقتك، ومتابعة تشجعك تستمر
        </p>

        <nav aria-label="روابط الموقع">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-bold text-white/80 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* social — renders when the accounts are provided in config/site.ts */}
        {(!isTodo(site.social.instagram) ||
          !isTodo(site.social.tiktok) ||
          !isTodo(site.social.x)) && (
          <div className="flex items-center gap-4 text-sm font-bold text-white/60">
            تابعنا:
            {!isTodo(site.social.instagram) && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                إنستقرام
              </a>
            )}
            {!isTodo(site.social.tiktok) && (
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                تيك توك
              </a>
            )}
            {!isTodo(site.social.x) && (
              <a href={site.social.x} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                X
              </a>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-site text-center text-xs font-semibold text-white/65">
          © {year} زد لفل — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
