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

/** الباقة الكاملة — the featured plan (same copy for both graded courses) */
function fullPlan(key: string, href: string): Plan {
  return {
    key,
    name: "الباقة الكاملة",
    price: "499",
    priceUnit: "/ دورة",
    tagline: "كل شي في التعلّم الذاتي + التطبيق المباشر والشهادة",
    // everything the self-paced plan has (green ✓)…
    includes: [
      "المسارات الأربعة كاملة (مفردات · قواعد · محادثة · استماع)",
      "فلاش كاردز وتمارين تثبّت الجديد",
    ],
    // …plus the full-package extras (gold +)
    extras: [
      "الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
      "اختبار لكل دورة + شهادة المستوى 🏆",
    ],
    cta: "اشترك بالكاملة — 499",
    href,
    featured: true,
  };
}

/** التعلّم الذاتي — self-paced plan */
function selfPlan(key: string, href: string): Plan {
  return {
    key,
    name: "التعلّم الذاتي",
    price: "199",
    priceUnit: "/ دورة",
    tagline: "المسارات الأربعة بالكامل",
    includes: [
      "المسارات الأربعة كاملة",
      "فلاش كاردز وتمارين تثبّت الجديد",
    ],
    excludes: [
      "بدون الأسبوع المكثف (حصص مباشرة + تركيز على الكتابة)",
      "بدون شهادة المستوى",
    ],
    cta: "اشترك بالذاتي — 199",
    href,
  };
}

export const LEVELS_PLANS: Plan[] = [
  fullPlan("levels-full", CHECKOUT.levelsFull),
  selfPlan("levels-self", CHECKOUT.levelsSelf),
];
export const A0_PLANS: Plan[] = [
  fullPlan("a0-full", CHECKOUT.a0Full),
  selfPlan("a0-self", CHECKOUT.a0Self),
];

export const PLAN_PICKER_TITLE = "اختر باقتك — المستويات";
export const PLAN_PICKER_SUB = "السعر لكل دورة — نحدّد مستواك ونبدأك من مكانك";

export const A0_PICKER_TITLE = "اختر باقتك — التأسيس";
export const A0_PICKER_SUB = "السعر لدورة التأسيس — تبدأ صح من الصفر";
