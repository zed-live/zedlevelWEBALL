"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";
import type { CourseMeta } from "@/config/courses";

/** default brand-blue banner when a course doesn't set its own */
const DEFAULT_BANNER =
  "linear-gradient(160deg, #2f4fd8 0%, #1a237e 100%)";

/**
 * Course card — the site's course template: a banner (swappable per course:
 * gradient / color / flag image) with the course circle hanging off its bottom
 * edge, a price pill, a collapsible details list ("عرض المزيد"), and the CTA
 * (gold "تفاصيل الدورة" for ready courses, WhatsApp "نبّهني" for coming-soon).
 */
export function CourseCard({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";
  const details = course.details ?? [];
  const baseCount = course.detailsVisible ?? 3;
  const hasExtra = details.length > baseCount;
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(26,35,126,0.14)] ${
        course.featured ? "ring-2 ring-primary/25" : ""
      }`}
    >
      {/* ── banner + hanging circle ── */}
      <div
        className="relative mb-16 px-5 pb-20 pt-16 text-center"
        style={{ background: course.banner ?? DEFAULT_BANNER }}
      >
        {/* darken overlay for text legibility over images */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1446]/15 to-[#0f1446]/35"
        />

        {/* status / featured badges */}
        <div className="relative z-[2] mb-3 flex flex-wrap items-center justify-center gap-2">
          {course.featured && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
              ابدأ من هنا ⭐
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              ready ? "bg-white text-primary" : "bg-white/20 text-white"
            }`}
          >
            {ready ? "متاح الآن" : "قريبًا"}
          </span>
          {course.badge && (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
              {course.badge} 🔥
            </span>
          )}
        </div>

        {/* the circle hangs off the bottom edge of the banner */}
        <div className="absolute -bottom-[38px] left-1/2 z-[3] flex h-[138px] w-[138px] -translate-x-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_12px_28px_rgba(10,15,60,0.28),inset_0_0_0_6px_#f4f5fb]">
          {course.circleEyebrow && (
            <div className="text-[10px] font-bold text-ink">
              {course.circleEyebrow}
            </div>
          )}
          <div className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text px-2 text-[22px] font-black leading-[1.08] tracking-tight text-transparent">
            {course.circleTitle ?? course.title}
          </div>
          {course.circleMeta && (
            <div className="mt-1 text-[9px] font-bold text-purple-600">
              {course.circleMeta}
            </div>
          )}
        </div>
      </div>

      {/* price pill (overlaps below the circle) */}
      {course.price && (
        <div className="relative z-[2] mx-auto w-fit rounded-full bg-gradient-to-br from-primary to-purple-600 px-5 py-2 text-xs font-bold text-white shadow-[0_6px_16px_rgba(47,79,216,0.30)]">
          {course.price}
        </div>
      )}

      {/* ── details list ── */}
      {details.length > 0 && (
        <div className="px-[22px] pb-2 pt-6">
          {details.map((d, i) => {
            const isExtra = i >= baseCount;
            if (isExtra && !expanded) return null;
            const isLastVisible = i === details.length - 1;
            return (
              <div
                key={d.label}
                className={`flex items-center justify-between gap-3 py-[13px] ${
                  isLastVisible ? "" : "border-b border-[#eceef5]"
                } ${isExtra ? "animate-[fadeInRow_0.3s_ease]" : ""}`}
              >
                <span className="whitespace-nowrap text-[13px] font-bold text-[#8a8fa8]">
                  {d.label}
                </span>
                <span className="text-start text-[13.5px] font-bold text-ink">
                  {d.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* show more / less */}
      {hasExtra && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold text-primary transition-colors hover:text-purple-600"
        >
          {expanded ? "عرض أقل" : "عرض المزيد"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {/* ── CTA ── */}
      <div className="mt-auto px-[22px] pb-2 pt-2.5">
        {ready ? (
          <Link
            href={course.href}
            className="flex w-full items-center justify-center gap-2 rounded-[15px] bg-gradient-to-b from-accent to-accent-dark px-4 py-3.5 text-base font-black text-ink shadow-[0_8px_20px_rgba(229,168,63,0.4)] transition-transform hover:-translate-y-0.5"
          >
            تفاصيل الدورة 🛍️
          </Link>
        ) : (
          <div className="flex flex-col gap-2.5">
            <WhatsAppButton
              message={site.whatsapp.msgNotify(course.notifyName ?? course.title)}
              source={`course-card-${course.slug}`}
              event="notify_click"
              params={{ course: course.slug }}
              className="!w-full"
            >
              نبّهني عند الافتتاح
            </WhatsAppButton>
            <Link
              href={course.href}
              className="text-center text-sm font-bold text-primary hover:underline"
            >
              اعرف أكثر عن الدورة
            </Link>
          </div>
        )}
      </div>

      {/* trust line */}
      <p className="px-4 pb-5 pt-2.5 text-center text-[11px] font-medium text-[#8a8fa8]">
        دفع آمن عبر منصة سلة 🔒 · Apple Pay · مدى · Visa
      </p>
    </article>
  );
}
