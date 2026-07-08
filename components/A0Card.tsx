"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { StoreCtaButton } from "./StoreCtaButton";
import { CourseCardHeader } from "./CourseCardHeader";
import { CheckRow, ResultLine } from "./CheckRow";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { site } from "@/config/site";
import { A0_PLANS, A0_PICKER_TITLE, A0_PICKER_SUB } from "@/config/plans";

/**
 * The A0 "التأسيس الصحيح" product card — disciplined layout:
 * calm brand header + medallion, one outcome statement, a single clean
 * checklist (primary checks, no green), a quiet scarcity note, then the CTAs.
 * Equal-height via h-full + mt-auto so columns align.
 */

const RESULT_LINE =
  "بعد الدورة: تقرأ وتنطق صح، تعرّف عن نفسك، وتتكلم عن عائلتك وحياتك، وتكوّن جملك بثقة.";
const RESULT_NOTE = "الدورة تغطي أجزاء من A1 و A2";

const CHECKLIST = [
  "26 درس فيديو مسجّل، مرتّبة وواضحة، تشوفها بأي وقت",
  "روتين عملي ١٥–٣٠ دقيقة يوميًا، يناسب استمراريتك",
  "أكثر من 460 مفردة + قواعد أساسية",
  "كتيّب تمارين + ملخصات مراجعة + فلاش كاردز",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "اختبار نهائي + شهادة (بالباقة الكاملة)",
];

const PRICE_LINE = "يبدأ من 199 ريال، أو الباقة الكاملة بالحصص المباشرة 499";

export function A0Card() {
  const course = courses.find((c) => c.slug === "a0")!;

  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(2,17,80,0.35)] ring-1 ring-ink/[0.06]">
      <CourseCardHeader course={course} />

      {/* generous top padding leaves room for the overhanging medallion */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
        {/* one outcome statement */}
        <ResultLine note={RESULT_NOTE}>{RESULT_LINE}</ResultLine>

        {/* one clean checklist */}
        <div className="mt-5">
          {CHECKLIST.map((t) => (
            <CheckRow key={t} text={t} />
          ))}
        </div>

        {/* everything below sits at the card's foot so columns align */}
        <div className="mt-auto pt-6">
          <p className="text-center text-[13.5px] font-black leading-7 text-ink">
            {PRICE_LINE}
          </p>

          <div className="mt-4">
            <ScarcityStrip text="الأماكن محدودة، الدورة تُفتح بدفعات خلال السنة" />
          </div>

          <div className="mt-3 flex flex-col gap-2.5">
            <StoreCtaButton
              title={A0_PICKER_TITLE}
              sub={A0_PICKER_SUB}
              plans={A0_PLANS}
              source="a0-card"
            />
            <WhatsAppButton
              message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
              source="a0-card"
              variant="solid"
              className="w-full justify-center sm:!w-full"
            >
              ابدأ بالواتساب
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  );
}
