"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { StoreCtaButton } from "./StoreCtaButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow, QuoteBox } from "./CheckRow";
import { CollapsibleFeatures } from "./CollapsibleFeatures";
import { PriceBlock } from "./PriceBlock";
import { RiyalIcon } from "./RiyalIcon";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { site } from "@/config/site";
import { LEVELS_PLANS, PLAN_PICKER_TITLE, PLAN_PICKER_SUB } from "@/config/plans";

/**
 * The "المستويات A1–A2–B1–B2" product card. ONE outcome box (gold edge, RTL):
 * heading + outcome sentence + an always-visible stats line, and a toggle that
 * expands the four tracks (collapsed by default). No second box.
 */

const HEADLINE = "ارتقِ بمستواك نحو الاحتراف";
const SUBTITLE = "مهما كان مستواك";
const LEVELS_SEQ = "A1 - A2 - B1 - B2";

const RESULT_LINE =
  "ترتقي مستوى بعد مستوى..\nفيزيد فهمك وثقتك وطلاقتك، خطوة بخطوة";
const STATS_LINE = "١٢ دورة متدرّجة · ٤ مسارات متكاملة";

const TRACKS: { icon: string; label: string; tail: string }[] = [
  { icon: "📖", label: "مفردات", tail: "تطوّر حصيلتك فتفهم أكثر" },
  { icon: "🧩", label: "قواعد أساسية", tail: "تخليك تتكلم صح" },
  { icon: "💬", label: "محادثة عملية", tail: "من مطار لمقهى، تتصرّف فيها صح" },
  { icon: "🎧", label: "استماع مقترح", tail: "يعرّفك وش تسمع كل يوم" },
];

const CHECKLIST = [
  "أكثر من ٣٠٠٠ كلمة من Oxford، بصوتيات ونطق واضح",
  "١٢ برنامج متدرّج، تتقدّم دورة دورة",
  "فلاش كاردز وتمارين تثبّت الجديد",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "دروس وتمارين عملية لمهارة الكتابة (بالباقة الكاملة)",
  "اختبار لكل دورة + شهادة لكل مستوى (بالباقة الكاملة)",
];

export function LevelsCard() {
  const course = courses.find((c) => c.slug === "levels")!;
  const [open, setOpen] = useState(false);

  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(2,17,80,0.35)] ring-1 ring-ink/[0.06]">
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <h3 className="text-center text-[17px] font-black leading-7 text-ink">
          {HEADLINE}
        </h3>
        <p className="mt-1.5 text-center text-[13.5px] font-bold leading-6 text-ink/55">
          {SUBTITLE}
          {" · "}
          <bdi dir="ltr" className="font-black text-ink">
            {LEVELS_SEQ}
          </bdi>
        </p>

        {/* ONE outcome box: heading + sentence + stats + collapsible tracks */}
        <QuoteBox className="mt-5">
          <p className="mb-1.5 text-[12px] font-black text-accent-dark">
            مخرجات الدورة
          </p>
          <p className="whitespace-pre-line text-[13.5px] font-bold leading-7 text-ink">
            {RESULT_LINE}
          </p>

          {/* always-visible stats line */}
          <p className="mt-2.5 text-[13px] font-black text-ink">{STATS_LINE}</p>

          {/* toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-2 flex items-center gap-1 text-[12.5px] font-black text-primary transition-colors hover:text-primary-dark"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden
            />
            {open ? "إخفاء" : "انقر لمعرفة المسارات"}
          </button>

          {/* collapsible 4 tracks */}
          {open && (
            <div className="mt-3 space-y-2.5 border-t border-primary/15 pt-3">
              {TRACKS.map((t) => (
                <p
                  key={t.label}
                  className="flex items-start gap-2 text-[13px] leading-6 text-ink animate-[fadeInRow_0.3s_ease]"
                >
                  <span aria-hidden className="shrink-0">
                    {t.icon}
                  </span>
                  <span>
                    <span className="font-black">{t.label}</span>
                    <span className="font-semibold text-ink/60"> — {t.tail}</span>
                  </span>
                </p>
              ))}
            </div>
          )}
        </QuoteBox>

        {/* checklist — first 3 shown, rest fade behind read-more */}
        <div className="mt-5">
          <CollapsibleFeatures>
            {CHECKLIST.map((t) => (
              <CheckRow key={t} text={t} />
            ))}
          </CollapsibleFeatures>
        </div>

        {/* foot — aligned across columns */}
        <div className="mt-auto pt-6">
          <PriceBlock
            startsFrom
            amount="199"
            period="دورة"
            detail={
              <>
                أو الباقة الكاملة بالحصص المباشرة 499{" "}
                <RiyalIcon className="h-[13px] w-[13px] text-ink/50" />
              </>
            }
          />

          <div className="mt-4 flex flex-col gap-2.5">
            <StoreCtaButton
              title={PLAN_PICKER_TITLE}
              sub={PLAN_PICKER_SUB}
              plans={LEVELS_PLANS}
              source="levels-card"
            />
            <WhatsAppButton
              message={site.whatsapp.msgCourseInquiry("برنامج المستويات A1–B2")}
              source="levels-card"
              variant="solid"
              className="w-full justify-center sm:!w-full"
            >
              استفسر أو احجز مقعدك
            </WhatsAppButton>
          </div>

          <div className="mt-4">
            <ScarcityStrip text="الدورات تُفتح بدفعات محدودة خلال السنة" />
          </div>
        </div>
      </div>
    </article>
  );
}
