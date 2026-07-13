"use client";

import { StoreCtaButton } from "./StoreCtaButton";
import { LearnMoreButton } from "./LearnMoreButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow, ResultLine } from "./CheckRow";
import { CollapsibleFeatures } from "./CollapsibleFeatures";
import { PriceBlock } from "./PriceBlock";
import { RiyalIcon } from "./RiyalIcon";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { A0_PLANS, A0_PICKER_TITLE, A0_PICKER_SUB } from "@/config/plans";

/**
 * The A0 "التأسيس الصحيح" product card — disciplined layout:
 * calm brand header + medallion, one outcome statement, a single clean
 * checklist (primary checks, no green), a quiet scarcity note, then the CTAs.
 * Equal-height via h-full + mt-auto so columns align.
 */

const HEADLINE = "طوّر لغتك من الصفر بالطريقة الصح";
const SUBTITLE = "الأساس المتين يبني ثقتك ويسرّع تطورك";
const RESULT_LINE =
  "تقرأ وتنطق صح، تعرّف عن نفسك، وتتكلم عن عائلتك وحياتك، وتكوّن جملك بثقة.";
const RESULT_NOTE = "ملاحظة: الدورة تغطي أجزاء من A1 و A2";

const CHECKLIST = [
  "26 درس فيديو مسجّل، مرتّبة وواضحة، تشوفها بأي وقت",
  "روتين عملي ١٥–٣٠ دقيقة يوميًا، يناسب استمراريتك",
  "أكثر من 460 مفردة + قواعد أساسية",
  "كتيّب تمارين + ملخصات مراجعة + فلاش كاردز",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "اختبار نهائي + شهادة (بالباقة الكاملة)",
];


export function A0Card() {
  const course = courses.find((c) => c.slug === "a0")!;

  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(2,17,80,0.35)] ring-1 ring-ink/[0.06]">
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        {/* headline + subtitle */}
        <h3 className="text-center text-[17px] font-black leading-7 text-ink">
          {HEADLINE}
        </h3>
        <p className="mt-1.5 text-center text-[13.5px] font-bold leading-6 text-ink/55">
          {SUBTITLE}
        </p>

        {/* one outcome statement */}
        <ResultLine note={RESULT_NOTE}>{RESULT_LINE}</ResultLine>

        {/* one clean checklist — first 3 shown, rest fade behind read-more */}
        <div className="mt-5">
          <CollapsibleFeatures>
            {CHECKLIST.map((t) => (
              <CheckRow key={t} text={t} />
            ))}
          </CollapsibleFeatures>
        </div>

        {/* everything below sits at the card's foot so columns align */}
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
              title={A0_PICKER_TITLE}
              sub={A0_PICKER_SUB}
              plans={A0_PLANS}
              source="a0-card"
            />
            <LearnMoreButton href={course.href} />
          </div>

          <div className="mt-4">
            <ScarcityStrip text="الأماكن محدودة، الدورة تُفتح بدفعات خلال السنة" />
          </div>
        </div>
      </div>
    </article>
  );
}
