"use client";

import { StoreButtonLink } from "./StoreButton";
import { LearnMoreButton } from "./LearnMoreButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow, ResultLine } from "./CheckRow";
import { CollapsibleFeatures } from "./CollapsibleFeatures";
import { PriceBlock } from "./PriceBlock";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { site } from "@/config/site";
import { track } from "@/lib/track";

/**
 * The "دورة المحادثة" card — one disciplined layout matching A0/Levels:
 * calm brand header + medallion, one outcome line, a single clean checklist
 * (primary checks, no green/emoji), a quiet scarcity note, then the CTAs.
 * Monthly subscription (249/شهر), direct to Salla (single package).
 */

const SUBTITLE = "رحلتك من «أخاف أغلط» إلى «أتكلم بثقة»";

const RESULT_LINE =
  "تزيد قدرتك على التواصل وثقتك لما تتكلم مع الأجانب.";

const CHECKLIST = [
  "حصتان مباشرتان أسبوعيًا (~ساعة)",
  "مجموعة صغيرة مع معلم، عشان تتحفّز تشارك وتتفاعل",
  "مفردات وجمل منهجية تساعدك تتكلم",
  "سيناريوهات من حياتك (مشوار، مقهى، مطار…) عشان تتصرّف صح",
  "قروب تمارس فيه بتسجيلات صوتية عشان تستمر الممارسة",
  "معلمون أجانب ومتحدثون أصليون",
  "وللمبتدئين جدًا… مجموعات بمدرّسين عرب",
];

export function ConversationCard() {
  const course = courses.find((c) => c.slug === "conversation")!;

  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(2,17,80,0.35)] ring-1 ring-ink/[0.06]">
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <h3 className="text-center text-[17px] font-black leading-7 text-ink">
          ممارسة مباشرة مع مدرسين أجانب
        </h3>
        <p className="mt-1.5 text-center text-[13.5px] font-bold leading-6 text-ink/55">
          {SUBTITLE}
        </p>

        {/* outcome */}
        <ResultLine>{RESULT_LINE}</ResultLine>

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
          <PriceBlock amount="249" period="شهر" />

          <div className="mt-4 flex flex-col gap-2.5">
            <StoreButtonLink
              href={site.salla.conversation}
              onClick={() =>
                track("salla_click", {
                  course: "conversation",
                  source: "conversation-card",
                })
              }
            />
            <LearnMoreButton href={course.href} />
          </div>

          <div className="mt-4">
            <ScarcityStrip text="المجموعات تُفتح بأعداد محدودة خلال السنة" />
          </div>
        </div>
      </div>
    </article>
  );
}
