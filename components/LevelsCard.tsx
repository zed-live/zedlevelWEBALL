"use client";

import { BookText, Puzzle, MessagesSquare, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { StoreCtaButton } from "./StoreCtaButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow, QuoteBox, ResultLine } from "./CheckRow";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { site } from "@/config/site";
import { LEVELS_PLANS, PLAN_PICKER_TITLE, PLAN_PICKER_SUB } from "@/config/plans";

/**
 * The "المستويات A1–A2–B1–B2" product card — one disciplined layout:
 * calm brand header + medallion, the four tracks (single-color line icons,
 * no emoji), a clean checklist (primary checks), a quiet scarcity note, CTAs.
 * The two-tier pricing lives in the plan-picker popup, not stacked here.
 */

const HEADLINE = "ارتقِ بمستواك نحو الاحتراف";
const SUBTITLE = "مهما كان مستواك";
const LEVELS_SEQ = "A1 - A2 - B1 - B2";

const TRACKS: { icon: LucideIcon; label: string; tail: string }[] = [
  { icon: BookText, label: "مفردات", tail: "تطوّر حصيلتك فتفهم أكثر" },
  { icon: Puzzle, label: "قواعد أساسية", tail: "تخليك تتكلم صح" },
  { icon: MessagesSquare, label: "محادثة عملية", tail: "من مطار لمقهى، تتصرف فيها صح" },
  { icon: Headphones, label: "استماع مقترح", tail: "يعرّفك وش تسمع كل يوم" },
];

const CHECKLIST = [
  "أكثر من ٣٠٠٠ كلمة من Oxford، بصوتيات ونطق واضح",
  "١٢ برنامج متدرّج، تتقدّم دورة دورة",
  "فلاش كاردز وتمارين تثبّت الجديد",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "اختبار لكل دورة + شهادة لكل مستوى (بالباقة الكاملة)",
];

const RESULT_LINE =
  "ترتفع مستوى بعد مستوى حتى تفهم وتتكلم وتكتب بثقة، وتوصل للطلاقة اللي تبيها.";

const PRICE_LINE = "يبدأ من 199 ريال / دورة، أو الباقة الكاملة بالحصص المباشرة 499";

export function LevelsCard() {
  const course = courses.find((c) => c.slug === "levels")!;

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
          <bdi dir="ltr" className="font-black text-primary">
            {LEVELS_SEQ}
          </bdi>
        </p>

        {/* course outcome */}
        <ResultLine>{RESULT_LINE}</ResultLine>

        {/* the four tracks — one quiet box, line icons in a single ink color */}
        <QuoteBox className="mt-4">
          <p className="text-[12.5px] font-bold text-primary/70">
            ٤ مسارات متكاملة في ١٢ دورة متدرّجة
          </p>
          <div className="mt-3 space-y-3">
            {TRACKS.map((t) => (
              <div key={t.label} className="flex items-start gap-2.5">
                <t.icon
                  aria-hidden
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary"
                  strokeWidth={2}
                />
                <p className="text-[13.5px] leading-6 text-ink">
                  <span className="font-black">{t.label}</span>
                  <span className="font-semibold text-ink/60"> — {t.tail}</span>
                </p>
              </div>
            ))}
          </div>
        </QuoteBox>

        {/* checklist */}
        <div className="mt-5">
          {CHECKLIST.map((t) => (
            <CheckRow key={t} text={t} />
          ))}
        </div>

        {/* foot — aligned across columns */}
        <div className="mt-auto pt-6">
          <p className="text-center text-[13.5px] font-black leading-7 text-ink">
            {PRICE_LINE}
          </p>

          <div className="mt-4">
            <ScarcityStrip text="الدورات تُفتح بدفعات محدودة، احجز مكانك الآن" />
          </div>

          <div className="mt-3 flex flex-col gap-2.5">
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
              استفسر عن الدورة واحجز مقعدك
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
