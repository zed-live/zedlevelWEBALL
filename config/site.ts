/**
 * ZEDLEVEL central config — the ONLY place external links & business facts live.
 * Every TODO_ value renders a visible dev-only warning badge (see <DevTodoBadge/>)
 * so we never ship a dead button. `grep -r "TODO_"` is part of the pre-deploy checklist.
 */
export const site = {
  name: "ZEDLEVEL",
  nameAr: "أكاديمية زد لفل لتعليم الإنجليزية",
  shortAr: "زد لفل",
  whatsapp: {
    /** Digits only, with country code, no plus — e.g. "9665XXXXXXXX" */
    number: "TODO_WHATSAPP_NUMBER",
    msgGeneral: "مرحبًا، عندي استفسار عن دورات زد لفل 👋",
    msgAfterTest: (level: string) =>
      `مرحبًا! أنهيت اختبار تحديد المستوى ونتيجتي: ${level} — أبغى أعرف الدورة المناسبة لي`,
    msgNotify: (course: string) => `أبغى تنبهوني عند فتح دورة ${course} 🔔`,
    msgCourseInquiry: (course: string) => `عندي استفسار عن دورة ${course}`,
    msgSpeakingAI: "أبغى أجرب اختبار المحادثة بالذكاء الاصطناعي 🎤",
    msgSpeakingHuman: "أبغى أحجز جلسة تقييم محادثة مباشرة مع معلم 🎤",
    /** the unified level-check mechanism — every حدّد مستواك button */
    msgLevel: "مرحبًا! أبغى أحدد مستواي في الإنجليزية وتقترحون لي الدورة المناسبة 👋",
  },
  salla: {
    a0: "TODO_SALLA_URL_A0",
    a1: "TODO_SALLA_URL_A1",
    a2: "TODO_SALLA_URL_A2",
    b1: "TODO_SALLA_URL_B1",
    b2: "TODO_SALLA_URL_B2",
  },
  /** Prices in SAR (digits only, e.g. "299"). TODO_ = "يُعلن مع فتح الدفعة". */
  pricing: {
    a0: "TODO_PRICE_A0",
    a1: "TODO_PRICE_A1",
    a2: "TODO_PRICE_A2",
    b1: "TODO_PRICE_B1",
    b2: "TODO_PRICE_B2",
  },
  social: {
    instagram: "TODO_INSTAGRAM_URL",
    tiktok: "TODO_TIKTOK_URL",
    x: "TODO_X_URL",
    email: "TODO_EMAIL",
  },
  stats: { beneficiaries: "5,000+" },
} as const;

export type SallaCourse = keyof typeof site.salla;

/** True while a config value is still a TODO_ placeholder (must never ship live). */
export const isTodo = (value: string) => value.startsWith("TODO_");
