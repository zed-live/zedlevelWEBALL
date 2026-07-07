"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { SallaButton } from "./SallaButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { courses } from "@/config/courses";
import { site } from "@/config/site";

/**
 * The A0 "التأسيس الصحيح" product card — a checklist card built on the shared
 * course-card container (banner + hanging circle up top, gold Salla CTA +
 * WhatsApp below).
 *
 * Two variants of the SAME card:
 *  - variant="home"    → all 6 checklist items, NO toggle.
 *  - variant="details" → first 4 items always, a toggle (default EXPANDED),
 *                        then the last 2 items. Toggle swaps
 *                        "عرض أقل ^" / "عرض المزيد ▾" (site pattern).
 */

/** result line under the header */
const RESULT_LINE =
  "بعد الدورة: تقرأ وتنطق صح، تعرّف عن نفسك، وتتكلم عن عائلتك وحياتك، وتكوّن جملك بثقة. (الدورة تغطي أجزاء من A1 و A2)";

/** the 6 checklist items — first 4 = Group A, last 2 = Group B (details only) */
const CHECKLIST = [
  "26 درس فيديو مسجّل، مرتّبة وواضحة، تشوفها بأي وقت",
  "روتين عملي ١٥–٣٠ دقيقة يوميًا، يناسب استمراريتك",
  "أكثر من 460 مفردة + قواعد أساسية",
  "كتيّب تمارين + ملخصات مراجعة + فلاش كاردز",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "اختبار نهائي + شهادة 🏆 (بالباقة الكاملة)",
];

const GROUP_A_COUNT = 4;
const SUBTITLE = "إنجليزي من الصفر… تبنيه صح وتسدّ ثغراتك";
const PRICE_LINE = "يبدأ من 199 ريال / أو الباقة الكاملة بالحصص المباشرة 499";

function CheckRow({ text, isNew = false }: { text: string; isNew?: boolean }) {
  return (
    <div
      className={`flex items-start gap-2.5 py-[11px] ${
        isNew ? "animate-[fadeInRow_0.3s_ease]" : ""
      }`}
    >
      <span aria-hidden className="mt-0.5 shrink-0 text-[15px] leading-6">
        ✅
      </span>
      <span className="text-[14px] font-bold leading-7 text-ink">{text}</span>
    </div>
  );
}

export function A0Card({ variant = "home" }: { variant?: "home" | "details" }) {
  const course = courses.find((c) => c.slug === "a0")!;
  const isDetails = variant === "details";
  // details card defaults to EXPANDED (Group B shown)
  const [expanded, setExpanded] = useState(true);

  const groupA = CHECKLIST.slice(0, GROUP_A_COUNT);
  const groupB = CHECKLIST.slice(GROUP_A_COUNT);

  return (
    <article className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(26,35,126,0.14)] ring-2 ring-primary/15">
      {/* shared card top: banner + hanging circle + badges */}
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        {/* subtitle */}
        <p className="text-center text-[15px] font-bold leading-7 text-ink/70">
          {SUBTITLE}
        </p>

        {/* result line */}
        <p className="mt-4 rounded-2xl bg-primary-light px-4 py-3 text-center text-[13.5px] font-bold leading-7 text-primary">
          {RESULT_LINE}
        </p>

        {/* checklist */}
        <div className="mt-4 divide-y divide-[#eceef5]">
          {isDetails ? (
            <>
              {groupA.map((t) => (
                <CheckRow key={t} text={t} />
              ))}
              {expanded &&
                groupB.map((t) => <CheckRow key={t} text={t} isNew />)}
            </>
          ) : (
            CHECKLIST.map((t) => <CheckRow key={t} text={t} />)
          )}
        </div>

        {/* toggle — details card only, sits between Group A/B */}
        {isDetails && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-1 flex w-full items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold text-primary transition-colors hover:text-purple-600"
          >
            {expanded ? "عرض أقل" : "عرض المزيد"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}

        {/* price */}
        <p className="mt-5 text-center text-[14px] font-black leading-7 text-ink">
          {PRICE_LINE}
        </p>

        {/* CTAs */}
        <div className="mt-4 flex flex-col gap-2.5">
          <SallaButton
            course="a0"
            source={`a0-card-${variant}`}
            hero
            showTrust={false}
            label="اشترك من المتجر 🛒"
            className="!w-full [&_a]:!w-full [&_span]:!w-full [&_a]:justify-center"
          />
          <WhatsAppButton
            message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
            source={`a0-card-${variant}`}
            variant="solid"
            className="w-full justify-center sm:!w-full"
          >
            ابدأ بالواتساب 💬
          </WhatsAppButton>
        </div>

        {/* trust line */}
        <p className="pt-4 text-center text-[11px] font-medium text-[#8a8fa8]">
          دفع آمن عبر منصة سلة 🔒 · Apple Pay · مدى · Visa
        </p>
      </div>
    </article>
  );
}
