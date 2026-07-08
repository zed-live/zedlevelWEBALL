/**
 * Two-tier package data for graded courses (المستويات + التأسيس), shown in the
 * PlanPickerModal that opens from the "اشترك من المتجر" CTA.
 *
 * الكاملة (499) is always the featured plan; التعلّم الذاتي (199) lists the
 * live-session + certificate items as EXCLUDED (grey ✕).
 * Both plans open the Salla checkout (swap `href` per-product when ready).
 */
import { site } from "./site";
import type { Plan } from "@/components/PlanPickerModal";

const SALLA_URL = site.salla.a1; // shared store link for now

/** الباقة الكاملة — the featured plan (same for both graded courses) */
function fullPlan(key: string): Plan {
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
      "الأسبوع المكثف المباشر (تركيز على الكتابة)",
      "اختبار لكل دورة + شهادة المستوى 🏆",
    ],
    cta: "اشترك بالكاملة — 499",
    href: SALLA_URL,
    featured: true,
  };
}

/** التعلّم الذاتي — self-paced plan */
function selfPlan(key: string): Plan {
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
    excludes: ["بدون الأسبوع المكثف المباشر", "بدون شهادة المستوى"],
    cta: "اشترك بالذاتي — 199",
    href: SALLA_URL,
  };
}

export const LEVELS_PLANS: Plan[] = [fullPlan("levels-full"), selfPlan("levels-self")];
export const A0_PLANS: Plan[] = [fullPlan("a0-full"), selfPlan("a0-self")];

export const PLAN_PICKER_TITLE = "اختر باقتك — المستويات";
export const PLAN_PICKER_SUB = "السعر لكل دورة — نحدّد مستواك ونبدأك من مكانك";

export const A0_PICKER_TITLE = "اختر باقتك — التأسيس";
export const A0_PICKER_SUB = "السعر لدورة التأسيس — تبدأ صح من الصفر";
