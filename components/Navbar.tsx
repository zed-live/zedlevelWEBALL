"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import manifest from "@/public/characters/manifest.json";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/courses", label: "الدورات" },
  { href: "/test", label: "اختبار المستوى" },
  { href: "/how-it-works", label: "كيف نعمل" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  const logo = (
    manifest.brand as Record<
      string,
      { src: string; width: number; height: number }
    >
  )["logo-full"];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-white/90 backdrop-blur">
      <nav
        className="container-site flex h-16 items-center justify-between"
        aria-label="التنقل الرئيسي"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="زد لفل — الصفحة الرئيسية"
        >
          {logo ? (
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt="شعار زد لفل ZEDLEVEL"
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span className="text-xl font-black text-primary">ZEDLEVEL</span>
          )}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                pathname === l.href ? "text-primary" : "text-ink/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/test"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            حدد مستواك
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-ink hover:bg-section lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-ink/5 bg-white shadow-sm lg:hidden"
        >
          <div className="container-site flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3 py-3 font-semibold ${
                  pathname === l.href
                    ? "bg-primary-light text-primary"
                    : "text-ink/80 hover:bg-section"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/test"
              className="mt-2 rounded-xl bg-primary px-5 py-3 text-center font-bold text-white"
            >
              حدد مستواك — ابدأ الاختبار المجاني
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
