/**
 * Two-tier package data for graded courses (المستويات + التأسيس), shown in the
 * PlanPickerModal that opens from the "اشترك من المتجر" CTA.
 *
 * الكاملة (499) is always the featured plan; التعلّم الذاتي (199) lists the
 * live-session + certificate items as EXCLUDED (grey ✕).
 *
 * ── Salla checkout links ──────────────────────────────────────────────────
 * Each package points to its exact Salla payment URL below. The two links per
 * course differ ONLY by their `options[...]` variant value. If a price ends up
 * mismatched at checkout, just swap the SELF/FULL URL for that course here.
 * Assumed mapping (per the order the links were provided): first = ذاتي 199,
 * second = كاملة 499. TODO_VERIFY on Salla.
 */
import type { Plan } from "@/components/PlanPickerModal";

const CHECKOUT = {
  a0Self:
    "https://salla.sa/zedlevel/payment/p260738461?quantity=1&options%5B1665408955%5D=217474182",
  a0Full:
    "https://salla.sa/zedlevel/payment/p260738461?quantity=1&options%5B1665408955%5D=1591509895",
  levelsSelf:
    "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=717953145",
  levelsFull:
    "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=76556154",
};

/** per-course copy that differs between the two graded courses */
type PlanCopy = {
  /** the "التعلّم الذاتي" green ✓ items (also shown as included in الكاملة) */
  selfIncludes: string[];
  /** the "الكاملة" extras (gold +) — what the full package adds */
  fullExtras: string[];
  /** what the self plan does NOT include (grey ✕) */
  selfExcludes: string[];
  /** the الكاملة tagline */
  fullTagline: string;
  /** the التعلّم الذاتي tagline */
  selfTagline: string;
};

function fullPlan(key: string, href: string, copy: PlanCopy): Plan {
  return {
    key,
    name: "الباقة الكاملة",
    price: "499",
    priceUnit: "/ دورة",
    tagline: copy.fullTagline,
    includes: copy.selfIncludes, // green ✓ (everything the self plan has)…
    extras: copy.fullExtras, // …plus the full-package extras (gold +)
    cta: "اشترك بالكاملة — 499",
    href,
    featured: true,
  };
}

function selfPlan(key: string, href: string, copy: PlanCopy): Plan {
  return {
    key,
    name: "التعلّم الذاتي",
    price: "199",
    priceUnit: "/ دورة",
    tagline: copy.selfTagline,
    includes: copy.selfIncludes,
    excludes: copy.selfExcludes,
    cta: "اشترك بالذاتي — 199",
    href,
  };
}

/* ── المستويات copy ── */
const LEVELS_COPY: PlanCopy = {
  fullTagline: "كل شي في التعلّم الذاتي + التطبيق المباشر والشهادة",
  selfTagline: "المسارات الأربعة بالكامل",
  selfIncludes: [
    "المسارات الأربعة كاملة (مفردات · قواعد · محادثة · استماع)",
    "فلاش كاردز وتمارين تثبّت الجديد",
  ],
  fullExtras: [
    "الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
    "اختبار لكل دورة + شهادة المستوى 🏆",
  ],
  selfExcludes: [
    "بدون الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
    "بدون شهادة المستوى",
  ],
};

/* ── التأسيس copy ── */
const FOUNDATION_COPY: PlanCopy = {
  fullTagline: "كل شي في التعلّم الذاتي + الأسبوع المكثف والشهادة",
  selfTagline: "الدروس المسجّلة والتمارين والفلاش كاردز",
  selfIncludes: [
    "٢٦ درس فيديو مسجّل، مرتّبة وواضحة",
    "أكثر من 460 مفردة + قواعد أساسية",
    "كتيّب تمارين + ملخصات مراجعة + فلاش كاردز",
  ],
  fullExtras: [
    "الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
    "الاختبار النهائي + شهادة الإتمام 🏆",
  ],
  selfExcludes: [
    "بدون الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
    "بدون الاختبار النهائي والشهادة",
  ],
};

// Levels: the الكاملة/499 link is the "…Self" URL slot and the ذاتي/199 link is
// the "…Full" URL slot (the two Salla variants were reversed vs. their names).
export const LEVELS_PLANS: Plan[] = [
  fullPlan("levels-full", CHECKOUT.levelsSelf, LEVELS_COPY),
  selfPlan("levels-self", CHECKOUT.levelsFull, LEVELS_COPY),
];
export const A0_PLANS: Plan[] = [
  fullPlan("a0-full", CHECKOUT.a0Full, FOUNDATION_COPY),
  selfPlan("a0-self", CHECKOUT.a0Self, FOUNDATION_COPY),
];

export const PLAN_PICKER_TITLE = "اختر باقتك — المستويات";
export const PLAN_PICKER_SUB = "السعر لكل دورة — نحدّد مستواك ونبدأك من مكانك";

export const A0_PICKER_TITLE = "اختر باقتك — التأسيس";
export const A0_PICKER_SUB = "السعر لدورة التأسيس — تبدأ صح من الصفر";
