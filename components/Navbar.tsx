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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logo = (
    manifest.brand as Record<
      string,
      { src: string; width: number; height: number }
    >
  )["logo-full"];

  return (
    <header
      className={`sticky top-0 z-40 bg-white/85 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgb(2_6_23/0.15)]" : ""
      }`}
    >
      <nav
        className="container-site flex h-[4.25rem] items-center justify-between gap-4"
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
              className="h-9 w-auto sm:h-10"
              priority
            />
          ) : (
            <span className="text-xl font-black text-primary">ZEDLEVEL</span>
          )}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 text-[15px] font-bold transition-colors hover:text-primary ${
                pathname === l.href ? "text-primary" : "text-ink/70"
              }`}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute -bottom-0.5 start-0 h-0.5 w-full rounded-full bg-accent" />
              )}
            </Link>
          ))}
          <Link
            href="/test"
            className="btn btn-primary !min-h-11 rounded-full !px-6 !py-2.5 text-sm"
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
          className="border-t border-ink/5 bg-white shadow-lifted lg:hidden"
        >
          <div className="container-site flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-4 py-3.5 text-[15px] font-bold ${
                  pathname === l.href
                    ? "bg-primary-light text-primary"
                    : "text-ink/75 hover:bg-section"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/test" className="btn btn-primary mt-3 w-full">
              حدد مستواك — ابدأ الاختبار المجاني
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
