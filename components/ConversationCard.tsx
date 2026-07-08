"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { StoreButtonLink } from "./StoreButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow, ResultLine } from "./CheckRow";
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

const SUBTITLE = "حصص مباشرة بمجموعة صغيرة، تتكلم بصوتك من أول يوم";

const RESULT_LINE =
  "تتكلم في مواقف يومك بطلاقة وثقة، وتفهم وترد بسرعة، بنطق أقرب للأصلي.";

const CHECKLIST = [
  "حصتان مباشرتان أسبوعيًا (~ساعة)، مجموعة صغيرة تبدأ من ٢-٨",
  "نشاط جماعي ٣ أيام، تسجيلات + مفردات منهجية للمحادثة",
  "سيناريوهات من حياتك: مشوار، مقهى، مطار… تتصرف فيها صح",
  "تركيز على النطق والطلاقة، تتكلم بثقة",
  "مفتوح للجميع، تنضم لمجموعة بمستواك",
  "إمكانية إضافة حصص خصوصية +١٠٠ ريال للحصة",
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

        {/* checklist */}
        <div className="mt-5">
          {CHECKLIST.map((t) => (
            <CheckRow key={t} text={t} />
          ))}
        </div>

        {/* foot — aligned across columns */}
        <div className="mt-auto pt-6">
          <p className="text-center text-[15px] font-black leading-7 text-ink">
            اشترك — 249 ريال{" "}
            <span className="text-[13px] font-bold text-ink/55">/ شهر</span>
          </p>

          <div className="mt-4">
            <ScarcityStrip text="المجموعات تُفتح بأعداد محدودة، احجز مكانك الآن" />
          </div>

          <div className="mt-3 flex flex-col gap-2.5">
            <StoreButtonLink
              href={site.salla.conversation}
              onClick={() =>
                track("salla_click", {
                  course: "conversation",
                  source: "conversation-card",
                })
              }
            />
            <WhatsAppButton
              message={site.whatsapp.msgCourseInquiry("المحادثة")}
              source="conversation-card"
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
