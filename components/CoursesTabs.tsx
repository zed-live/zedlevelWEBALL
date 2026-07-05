"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { SallaButton } from "./SallaButton";
import { PriceTag } from "./PriceTag";
import { DevTodoBadge } from "./DevTodoBadge";
import { CourseCover, type CoverVariant } from "./CourseCover";
import { ArrowMotif } from "./ArrowMotif";
import { site, isTodo, type SallaCourse } from "@/config/site";

/** Homepage courses — tabs: available now / coming soon (homepage prompt §5). */
interface CourseItem {
  cover: CoverVariant;
  title: string;
  desc: string;
  details?: string;
  href: string;
  salla?: SallaCourse;
  /** "تبدأ من" for multi-tier pricing */
  pricePrefix?: string;
  notify?: string;
}

const AVAILABLE: CourseItem[] = [
  {
    cover: "a0",
    title: "دورة التأسيس الصحيح",
    desc: "ابدأ من الصفر وابنِ أساس يثبت معك",
    details: "26 درس · 4 أسابيع + أسبوع تطبيق · شهادة",
    href: "/courses/a0",
    salla: "a0",
  },
  {
    cover: "levels",
    title: "دورة المستويات — A1 إلى B2",
    desc: "اطلع مستوى بعد مستوى عبر 4 مسارات",
    details: "12 دورة · 6 أسابيع للدورة · شهادة لكل مستوى",
    href: "/courses/levels",
    salla: "a1",
    pricePrefix: "تبدأ من",
  },
];

const SOON: CourseItem[] = [
  {
    cover: "conversation",
    title: "دورة المحادثة",
    desc: "حصص مباشرة لممارسة الكلام في مجموعة صغيرة",
    href: "/courses/conversation",
    notify: "المحادثة",
  },
  {
    cover: "accent",
    title: "اللهجة الأمريكية",
    desc: "اتقن النطق الأمريكي مع معلم متحدث أصلي",
    href: "/courses/accent",
    notify: "اللهجة الأمريكية",
  },
  {
    cover: "kids",
    title: "دورة الأطفال",
    desc: "إنجليزي ممتع ومصمّم للأطفال",
    href: "/courses/kids",
    notify: "الأطفال",
  },
];

export function CoursesTabs() {
  const [tab, setTab] = useState<"available" | "soon">("available");
  const items = tab === "available" ? AVAILABLE : SOON;

  return (
    <div>
      {/* tabs */}
      <div className="mx-auto flex w-fit rounded-2xl border border-ink/10 bg-white p-1.5 shadow-soft">
        {(
          [
            { key: "available", label: "متوفرة الآن" },
            { key: "soon", label: "قريبًا" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`relative min-h-11 rounded-xl px-6 py-2.5 font-black transition-colors ${
              tab === t.key ? "text-white" : "text-ink/60 hover:text-primary"
            }`}
          >
            {tab === t.key && (
              <m.span
                layoutId="courses-tab"
                className="absolute inset-0 rounded-xl bg-primary shadow-glow-blue"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {/* cards */}
      <AnimatePresence mode="wait">
        <m.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className={`mx-auto mt-10 grid max-w-4xl gap-6 ${
            items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((c) => {
            const sallaLive = c.salla && !isTodo(site.salla[c.salla]);
            return (
              <article
                key={c.title}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <Link href={c.href} aria-label={c.title} className="relative block">
                  <CourseCover variant={c.cover} />
                  <span
                    className={`absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-black shadow-soft ${
                      c.salla ? "bg-primary text-white" : "bg-white text-ink/70"
                    }`}
                  >
                    {c.salla ? "متوفرة الآن" : "قريبًا"}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col border-t border-ink/5 p-6">
                  <Link href={c.href}>
                    <h3 className="text-xl font-black transition-colors group-hover:text-primary">
                      {c.title}
                    </h3>
                  </Link>
                  <p className="mt-1.5 text-[15px] leading-8 text-ink/65">
                    {c.desc}
                  </p>
                  {c.details && (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink/55">
                      <ArrowMotif className="h-2.5 w-3.5 shrink-0 text-accent" />
                      {c.details}
                    </p>
                  )}

                  <div className="flex-1" />

                  {c.salla && (
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-ink/10 pt-4">
                      <span className="text-sm font-black text-ink/50">
                        الاشتراك
                      </span>
                      <PriceTag course={c.salla} prefix={c.pricePrefix} />
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    {c.salla ? (
                      sallaLive ? (
                        <>
                          <SallaButton
                            course={c.salla}
                            source={`home-course-${c.cover}`}
                            showTrust={false}
                            label="اشترك من المتجر"
                            className="[&_a]:w-full"
                          />
                          <WhatsAppButton
                            message={site.whatsapp.msgCourseInquiry(c.title)}
                            source={`home-course-${c.cover}`}
                            className="!w-full"
                          >
                            ابدأ بالواتساب
                          </WhatsAppButton>
                        </>
                      ) : (
                        <>
                          <WhatsAppButton
                            message={site.whatsapp.msgCourseInquiry(c.title)}
                            source={`home-course-${c.cover}`}
                            variant="solid"
                            className="!w-full"
                          >
                            ابدأ بالواتساب
                          </WhatsAppButton>
                          <p className="relative inline-flex items-center justify-center gap-1.5 py-1 text-center text-[13px] font-bold text-ink/55">
                            <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                            الشراء المباشر من المتجر — يفتح قريبًا
                            <DevTodoBadge label={`SALLA_${c.salla.toUpperCase()}`} />
                          </p>
                        </>
                      )
                    ) : (
                      <WhatsAppButton
                        message={site.whatsapp.msgNotify(c.notify ?? c.title)}
                        source={`home-course-${c.cover}`}
                        event="notify_click"
                        params={{ course: c.notify ?? c.title }}
                        className="!w-full"
                      >
                        نبّهني على الواتساب
                      </WhatsAppButton>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </m.div>
      </AnimatePresence>

      <p className="mt-9 text-center">
        <Link
          href="/courses"
          className="inline-flex min-h-11 items-center gap-2 font-black text-primary hover:underline"
        >
          عرض جميع الدورات
          <ArrowMotif className="h-2.5 w-3.5 -rotate-90 text-accent" />
        </Link>
      </p>
    </div>
  );
}
