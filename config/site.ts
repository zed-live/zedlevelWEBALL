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
    /** Digits only, with country code, no plus */
    number: "966567086238",
    /**
     * Dedicated line for the speaking test ONLY (+966 56 135 0651).
     * Every speaking-test WhatsApp handoff goes here; the rest of the site
     * uses `number` above.
     */
    speakingNumber: "966561350651",
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
  /**
   * Per-course Salla checkout links. The graded courses (a0, a1–b2) land on
   * their FULL package by default here (used by the sticky bar / generic CTAs);
   * the plan-picker popup has both the ذاتي and الكاملة links in config/plans.ts.
   */
  salla: {
    a0: "https://salla.sa/zedlevel/payment/p260738461?quantity=1&options%5B1665408955%5D=1591509895",
    a1: "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=717953145",
    a2: "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=717953145",
    b1: "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=717953145",
    b2: "https://salla.sa/zedlevel/payment/p1758387820?quantity=1&options%5B828948443%5D=717953145",
    conversation:
      "https://salla.sa/zedlevel/payment/p1774097412?quantity=1&options%5B879809035%5D=1935164633&options%5B106819860%5D=35736609",
  },
  /** Prices in SAR (digits only, e.g. "299"). TODO_ = "يُعلن مع فتح الدفعة". */
  pricing: {
    a0: "TODO_PRICE_A0",
    a1: "TODO_PRICE_A1",
    a2: "TODO_PRICE_A2",
    b1: "TODO_PRICE_B1",
    b2: "TODO_PRICE_B2",
    conversation: "249",
  },
  social: {
    instagram: "TODO_INSTAGRAM_URL",
    tiktok: "TODO_TIKTOK_URL",
    snapchat: "TODO_SNAPCHAT_URL",
    x: "TODO_X_URL",
    email: "TODO_EMAIL",
  },
  stats: { beneficiaries: "5,000+" },
} as const;

export type SallaCourse = keyof typeof site.salla;

/** True while a config value is still a TODO_ placeholder (must never ship live). */
export const isTodo = (value: string) => value.startsWith("TODO_");
