"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { site } from "@/config/site";
import type { CourseMeta } from "@/config/courses";

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
      {/* ── banner + hanging circle (shared with homepage cards) ── */}
      <CourseCardBanner course={course} />

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
