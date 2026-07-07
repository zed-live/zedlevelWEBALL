"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { StoreCtaButton } from "./StoreCtaButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { CheckRow } from "./CheckRow";
import { courses } from "@/config/courses";
import { site } from "@/config/site";
import { LEVELS_PLANS, PLAN_PICKER_TITLE, PLAN_PICKER_SUB } from "@/config/plans";

/**
 * The "المستويات A1–A2–B1–B2" product card — a checklist card on the shared
 * course-card container (banner + hanging circle up top, gold Salla CTA +
 * WhatsApp below). Two variants of the SAME card, NO "عرض المزيد" toggle on
 * either:
 *  - variant="home"    → tracks intro (4 lines) + 5 ✅ items + price + CTAs.
 *  - variant="details" → grouped sections (المسارات الأربعة / شكل الدورة) + a
 *                        two-tier pricing table (الكاملة ⭐ is the only
 *                        highlighted row) + purchase line.
 *
 * Rules: RTL · «(بالباقة الكاملة)» only on live sessions + certificate ·
 * levels are always A1–A2–B1–B2 · never repeat the tracks inside one card.
 */

const SUBTITLE = "ارفع مستواك مستوى بعد مستوى، مهما كان مستواك";

/** the four tracks — shown ONCE per card (home = short intro, details = full) */
const TRACKS_INTRO = [
  { icon: "📚", label: "مفردات", tail: "تطوّر حصيلتك فتفهم أكثر" },
  { icon: "🔵", label: "قواعد أساسية", tail: "تخليك تتكلم صح" },
  { icon: "🗣️", label: "محادثة بمواقف عملية (من مطار لمقهى)", tail: "تتصرف فيها صح" },
  { icon: "🎧", label: "استماع مقترح", tail: "يعرّفك وش تسمع كل يوم" },
];

/** home checklist */
const HOME_CHECKLIST = [
  "أكثر من ٣٠٠٠ كلمة من Oxford، بصوتيات ونطق واضح",
  "١٢ برنامج متدرّج، تتقدّم دورة دورة",
  "فلاش كاردز وتمارين تثبّت الجديد",
  "دروس مباشرة تمارس فيها (بالباقة الكاملة)",
  "اختبار لكل دورة + شهادة لكل مستوى 🏆 (بالباقة الكاملة)",
];

/** details — the four tracks in full (Group A) */
const DETAILS_TRACKS = [
  "مسار المفردات — أكثر من ٣٠٠٠ كلمة من Oxford، ١٠ كلمات يوميًا بجمل وصوتيات واضحة + فلاش كاردز",
  "مسار القواعد — فيديوهات مركّزة لأهم القواعد اليومية + اختبارات فهم، تخلّصه في دورة وحدة",
  "مسار المحادثة — سيناريوهات من حياتك (مشوار، مقهى، مطار) + حوار ثنائي تقرأ نصفه + تدريب حر",
  "مسار الاستماع — مقترح استماع يومي يتجدّد، مختار على قدّ مستواك",
];

/** details — course shape (Group B) */
const DETAILS_SHAPE = [
  "٥ أسابيع دروس + أسبوع مكثف مباشر لكل دورة",
  "٦ دروس أسبوعيًا (السبت/الاثنين/الأربعاء) · الجمعة راحة 🕌",
  "فلاش كاردز وتمارين تثبّت اللي تعلمته",
  "المكثف: مجموعة صغيرة ١–٧، تركيز على الكتابة (بالباقة الكاملة)",
  "اختبار لكل دورة + شهادة لكل مستوى 🏆 (بالباقة الكاملة)",
];

const HOME_PRICE = "يبدأ من 199 ريال / دورة، أو الباقة الكاملة بالحصص المباشرة 499";

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 mb-1 text-[14px] font-black text-primary">{children}</p>
  );
}

function Ctas({ variant }: { variant: "home" | "details" }) {
  return (
    <div className="mt-4 flex flex-col gap-2.5">
      <StoreCtaButton
        title={PLAN_PICKER_TITLE}
        sub={PLAN_PICKER_SUB}
        plans={LEVELS_PLANS}
        source={`levels-card-${variant}`}
      />
      <WhatsAppButton
        message={site.whatsapp.msgCourseInquiry("برنامج المستويات A1–B2")}
        source={`levels-card-${variant}`}
        variant="solid"
        className="w-full justify-center sm:!w-full"
      >
        ابدأ بالواتساب 💬
      </WhatsAppButton>
    </div>
  );
}

export function LevelsCard({ variant = "home" }: { variant?: "home" | "details" }) {
  const course = courses.find((c) => c.slug === "levels")!;
  const isDetails = variant === "details";

  return (
    <article className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_60px_rgba(26,35,126,0.14)] ring-2 ring-primary/15">
      {/* shared card top: banner + hanging circle + badges */}
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        {isDetails ? (
          <>
            {/* details heading */}
            <span className="mx-auto rounded-full bg-primary-light px-3 py-1 text-[11px] font-black text-primary">
              اشتراك واحد لكل دورة
            </span>
            <h3 className="mt-3 text-center text-[19px] font-black leading-8 text-ink">
              نحدّد مستواك ونبدأك من مكانك
            </h3>
            <p className="mt-2 text-center text-[14px] font-bold leading-7 text-ink/65">
              اشترك مرة واحدة، نقيّمك، ونحطّك على المسار الصحيح، وتتقدّم درجة درجة.
            </p>
            <p className="mt-3 text-center text-[13.5px] font-bold leading-7 text-ink/55">
              برنامج من ١٢ دورة يوصلك لأعلى المستويات عبر ٤ مسارات متكاملة
            </p>

            {/* Group A — the four tracks */}
            <GroupHeading>المسارات الأربعة</GroupHeading>
            <div className="divide-y divide-[#eceef5]">
              {DETAILS_TRACKS.map((t) => (
                <CheckRow key={t} text={t} />
              ))}
            </div>

            {/* Group B — course shape */}
            <GroupHeading>شكل الدورة</GroupHeading>
            <div className="divide-y divide-[#eceef5]">
              {DETAILS_SHAPE.map((t) => (
                <CheckRow key={t} text={t} />
              ))}
            </div>

            {/* two-tier pricing table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/10">
              {/* self-paced tier */}
              <div className="flex items-start justify-between gap-3 bg-white p-4">
                <div className="min-w-0">
                  <p className="text-[14px] font-black text-ink">تعلّم ذاتي</p>
                  <p className="mt-0.5 text-[12px] font-bold leading-6 text-ink/55">
                    المسارات الأربعة كاملة + فلاش كاردز وتمارين
                  </p>
                </div>
                <p className="shrink-0 text-[13px] font-black text-primary">
                  199 ريال
                  <span className="block text-[10px] font-bold text-ink/45">
                    / دورة
                  </span>
                </p>
              </div>
              {/* full tier — the only highlighted row */}
              <div className="flex items-start justify-between gap-3 border-t-2 border-accent bg-accent/10 p-4">
                <div className="min-w-0">
                  <p className="text-[14px] font-black text-ink">
                    الكاملة ⭐
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold leading-6 text-ink/60">
                    + الأسبوع المكثف المباشر + شهادة المستوى
                  </p>
                </div>
                <p className="shrink-0 text-[13px] font-black text-ink">
                  499 ريال
                  <span className="block text-[10px] font-bold text-ink/50">
                    / دورة
                  </span>
                </p>
              </div>
            </div>

            <Ctas variant="details" />

            <p className="pt-3 text-center text-[12px] font-black text-primary">
              اشترك وإحنا نحدّد مستواك ومن وين تبدأ
            </p>
            <p className="pt-2 text-center text-[11px] font-medium text-[#8a8fa8]">
              دفع آمن عبر سلة 🔒 · Apple Pay · مدى · Visa
            </p>
          </>
        ) : (
          <>
            {/* subtitle */}
            <p className="text-center text-[15px] font-bold leading-7 text-ink/70">
              {SUBTITLE}
            </p>

            {/* tracks intro (shown once) */}
            <p className="mt-4 text-center text-[13.5px] font-bold leading-7 text-ink/65">
              برنامج من ١٢ دورة يوصلك لأعلى المستويات عبر ٤ مسارات:
            </p>
            <div className="mt-3 space-y-2 rounded-2xl bg-primary-light/60 p-4">
              {TRACKS_INTRO.map((t) => (
                <p
                  key={t.label}
                  className="flex items-start gap-2 text-[13.5px] leading-7 text-ink"
                >
                  <span aria-hidden className="shrink-0">
                    {t.icon}
                  </span>
                  <span>
                    <span className="font-black">{t.label}</span>
                    <span className="font-bold text-ink/60">، {t.tail}</span>
                  </span>
                </p>
              ))}
            </div>

            {/* checklist */}
            <div className="mt-4 divide-y divide-[#eceef5]">
              {HOME_CHECKLIST.map((t) => (
                <CheckRow key={t} text={t} />
              ))}
            </div>

            {/* price */}
            <p className="mt-5 text-center text-[14px] font-black leading-7 text-ink">
              {HOME_PRICE}
            </p>

            <Ctas variant="home" />

            <p className="pt-4 text-center text-[11px] font-medium text-[#8a8fa8]">
              دفع آمن عبر منصة سلة 🔒 · Apple Pay · مدى · Visa
            </p>
          </>
        )}
      </div>
    </article>
  );
}
