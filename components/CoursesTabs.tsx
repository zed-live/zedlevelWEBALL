"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { A0Card } from "./A0Card";
import { LevelsCard } from "./LevelsCard";
import { ConversationCard } from "./ConversationCard";
import { ComingSoonCard } from "./ComingSoonCard";
import { type CoverVariant } from "./CourseCover";
import { ArrowMotif } from "./ArrowMotif";
import { type SallaCourse } from "@/config/site";
import { courses } from "@/config/courses";

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
  {
    cover: "conversation",
    title: "دورة المحادثة",
    desc: "ممارسة مباشرة مع مدرسين أجانب في مجموعة صغيرة",
    details: "حصتان مباشرتان أسبوعيًا · مجموعة ٢–٨ · نطق وطلاقة",
    href: "/courses/conversation",
    salla: "conversation",
  },
];

const SOON: CourseItem[] = [
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
          className={`mx-auto mt-10 grid max-w-5xl items-stretch gap-6 ${
            items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((c) => {
            // A0 + levels + conversation use dedicated checklist cards
            if (c.cover === "a0") {
              return <A0Card key={c.title} />;
            }
            if (c.cover === "levels") {
              return <LevelsCard key={c.title} />;
            }
            if (c.cover === "conversation") {
              return <ConversationCard key={c.title} />;
            }
            const course = courses.find((x) => x.slug === c.cover);
            return course ? (
              <ComingSoonCard key={c.title} course={course} />
            ) : null;
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
