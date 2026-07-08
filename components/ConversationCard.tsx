"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { SallaButton } from "./SallaButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow } from "./CheckRow";
import { ScarcityStrip } from "./ScarcityStrip";
import { courses } from "@/config/courses";
import { site } from "@/config/site";

/**
 * The "دورة المحادثة" details card — live speaking practice with foreign
 * teachers. Built on the shared course-card container (banner + hanging circle
 * up top, gold Salla CTA + WhatsApp below). No "عرض المزيد" toggle.
 *
 * Rules: RTL · عامية · monthly subscription (249/شهر).
 */

const SUBTITLE =
  "جلسات مباشرة مع معلم ومجموعة صغيرة، تمارس اللغة بصوتك وتطور المحادثة بثقة";

const HOW = [
  "حصتان مباشرتان أسبوعيًا (~ساعة)، مجموعة صغيرة تبدأ من ٢-٨",
  "نشاط جماعي ٣ أيام، تسجيلات + مفردات منهجية تبني حصيلتك للمحادثة",
  "سيناريوهات من حياتك: مشوار، مقهى، مطار… تتصرف فيها صح",
  "تركيز على النطق والطلاقة، تتكلم بثقة",
];

const TEACHERS = [
  { icon: "✅", text: "مفتوح للجميع، تنضم لمجموعة بمستواك" },
  { icon: "✅", text: "إمكانية إضافة حصص خصوصية +١٠٠ ريال للحصة" },
  {
    icon: "🎟️",
    text: "المجموعات تُفتح بأعداد محدودة، احجز مكانك في مجموعة مستواك",
  },
];

/** an emoji-badge row (used for the 🎟️ availability note) — badge on the LEFT,
 *  matching the checklist style */
function EmojiRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3">
      <span className="text-[14px] font-bold leading-7 text-ink">{text}</span>
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-[15px] leading-6"
      >
        {icon}
      </span>
    </div>
  );
}

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 mb-1 text-[14px] font-black text-primary">{children}</p>
  );
}

export function ConversationCard() {
  const course = courses.find((c) => c.slug === "conversation")!;

  return (
    <article className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(26,35,126,0.14)] ring-2 ring-primary/15">
      {/* shared card top: banner + hanging circle + badges */}
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        {/* heading */}
        <h3 className="text-center text-[19px] font-black leading-8 text-ink">
          ممارسة مباشرة مع مدرسين أجانب
        </h3>
        <p className="mt-2 text-center text-[14px] font-bold leading-7 text-ink/65">
          {SUBTITLE}
        </p>

        {/* Group A — كيف تمارس؟ */}
        <GroupHeading>كيف تمارس؟</GroupHeading>
        <div className="divide-y divide-[#eceef5]">
          {HOW.map((t) => (
            <CheckRow key={t} text={t} />
          ))}
        </div>

        {/* Group B — المعلمون والمستويات */}
        <GroupHeading>المعلمون والمستويات</GroupHeading>
        <div className="divide-y divide-[#eceef5]">
          {TEACHERS.map((t) =>
            t.icon === "✅" ? (
              <CheckRow key={t.text} text={t.text} />
            ) : (
              <EmojiRow key={t.text} icon={t.icon} text={t.text} />
            ),
          )}
        </div>

        {/* price */}
        <p className="mt-5 text-center text-[15px] font-black leading-7 text-ink">
          اشترك — 249 ريال{" "}
          <span className="text-[13px] font-bold text-ink/55">/ شهر</span>
        </p>

        {/* scarcity strip — directly above the CTAs */}
        <div className="mt-4">
          <ScarcityStrip text="المجموعات تُفتح بأعداد محدودة، احجز مكانك في مجموعة مستواك" />
        </div>

        {/* CTAs */}
        <div className="mt-3 flex flex-col gap-2.5">
          <SallaButton
            course="conversation"
            source="conversation-card-details"
            hero
            showTrust={false}
            label="اشترك من المتجر 🛒"
            className="!w-full [&_a]:!w-full [&_span]:!w-full [&_a]:justify-center"
          />
          <WhatsAppButton
            message={site.whatsapp.msgCourseInquiry("المحادثة")}
            source="conversation-card-details"
            variant="solid"
            className="w-full justify-center sm:!w-full"
          >
            استفسر بالواتساب 💬
          </WhatsAppButton>
        </div>

        {/* trust line */}
        <p className="pt-4 text-center text-[11px] font-medium text-[#8a8fa8]">
          دفع آمن عبر سلة 🔒 · Apple Pay · مدى · Visa
        </p>
      </div>
    </article>
  );
}
