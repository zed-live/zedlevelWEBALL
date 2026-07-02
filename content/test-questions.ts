/**
 * Free Level Test — question bank + scoring (build spec §8).
 *
 * // PLACEHOLDER — replace: these 20 questions are solid CEFR-banded
 * placeholders written to be replaced by the academy's final vetted set.
 * Keep the same shape; ordering is easy → hard across A0–C1.
 * Correct answers are distributed across option positions.
 *
 * Scoring (documented): raw correct count → CEFR band
 *   0–3 → A0 · 4–7 → A1 · 8–11 → A2 · 12–15 → B1 · 16–18 → B2 · 19–20 → C1
 */
export type LevelCode = "A0" | "A1" | "A2" | "B1" | "B2" | "C1";

export interface TestQuestion {
  id: number;
  band: LevelCode;
  prompt: string;
  options: string[];
  /** index into options */
  answer: number;
}

export const questions: TestQuestion[] = [
  // ── A0 ──
  {
    id: 1,
    band: "A0",
    prompt: "اختر الترجمة الصحيحة لكلمة «كتاب»:",
    options: ["door", "apple", "book", "car"],
    answer: 2,
  },
  {
    id: 2,
    band: "A0",
    prompt: "أكمل الجملة: I ___ a student.",
    options: ["am", "is", "are", "be"],
    answer: 0,
  },
  {
    id: 3,
    band: "A0",
    prompt: "ما عكس كلمة big؟",
    options: ["tall", "small", "happy", "fast"],
    answer: 1,
  },
  {
    id: 4,
    band: "A0",
    prompt: "اختر الجملة الصحيحة:",
    options: [
      "She teacher is.",
      "Is teacher she.",
      "She is a teacher.",
      "Teacher she is.",
    ],
    answer: 2,
  },
  // ── A1 ──
  {
    id: 5,
    band: "A1",
    prompt: "أكمل السؤال: ___ you like coffee?",
    options: ["Do", "Does", "Are", "Is"],
    answer: 0,
  },
  {
    id: 6,
    band: "A1",
    prompt: "أكمل: There ___ two books on the table.",
    options: ["is", "am", "be", "are"],
    answer: 3,
  },
  {
    id: 7,
    band: "A1",
    prompt: "اختر الكلمة المختلفة عن الباقي:",
    options: ["apple", "chair", "banana", "orange"],
    answer: 1,
  },
  {
    id: 8,
    band: "A1",
    prompt: "أكمل: I go ___ school every day.",
    options: ["to", "at", "in", "on"],
    answer: 0,
  },
  // ── A2 ──
  {
    id: 9,
    band: "A2",
    prompt: "أكمل: She ___ TV when I called her.",
    options: ["watches", "watch", "was watching", "is watch"],
    answer: 2,
  },
  {
    id: 10,
    band: "A2",
    prompt: "أكمل: I have lived here ___ 2020.",
    options: ["for", "since", "from", "at"],
    answer: 1,
  },
  {
    id: 11,
    band: "A2",
    prompt: "اختر الصيغة الصحيحة: This bag is ___ than mine.",
    options: ["heavier", "more heavy", "heaviest", "heavy"],
    answer: 0,
  },
  {
    id: 12,
    band: "A2",
    prompt: "أكمل: If it rains tomorrow, we ___ at home.",
    options: ["stayed", "staying", "stays", "will stay"],
    answer: 3,
  },
  // ── B1 ──
  {
    id: 13,
    band: "B1",
    prompt: "أكمل: I've never ___ sushi before.",
    options: ["ate", "eaten", "eat", "eating"],
    answer: 1,
  },
  {
    id: 14,
    band: "B1",
    prompt: "ما المعنى الأقرب لعبارة “I'm broke”؟",
    options: ["أنا تعبان", "أنا مكسور", "ما عندي فلوس", "أنا مشغول"],
    answer: 2,
  },
  {
    id: 15,
    band: "B1",
    prompt: "أكمل: The report ___ by the manager yesterday.",
    options: ["was written", "wrote", "is writing", "has written"],
    answer: 0,
  },
  {
    id: 16,
    band: "B1",
    prompt: "أكمل الجملة المنقولة: She asked me where ___.",
    options: ["do I live", "I am live", "did I lived", "I lived"],
    answer: 3,
  },
  // ── B2 ──
  {
    id: 17,
    band: "B2",
    prompt: "أكمل: ___ he studied harder, he would have passed.",
    options: ["If had", "Had", "Should", "Would"],
    answer: 1,
  },
  {
    id: 18,
    band: "B2",
    prompt: "ما معنى العبارة “to put off”؟",
    options: ["يؤجّل", "يطفئ", "يلبس", "يزعج"],
    answer: 0,
  },
  {
    id: 19,
    band: "B2",
    prompt: "أكمل: By next year, I ___ my degree.",
    options: ["finish", "will finish", "will have finished", "finished"],
    answer: 2,
  },
  // ── C1 ──
  {
    id: 20,
    band: "C1",
    prompt: "اختر الكلمة الأدق: The evidence was ___; no one could refute it.",
    options: ["nice", "compelling", "big", "strongly"],
    answer: 1,
  },
];

export function scoreToLevel(correct: number): LevelCode {
  if (correct <= 3) return "A0";
  if (correct <= 7) return "A1";
  if (correct <= 11) return "A2";
  if (correct <= 15) return "B1";
  if (correct <= 18) return "B2";
  return "C1";
}

export const LEVEL_INFO: Record<
  LevelCode,
  {
    meaning: string;
    course: {
      title: string;
      note: string;
      stats: string;
      href: string;
      /** key into site.salla — absent for C1 (no course above B2 yet) */
      salla?: "a0" | "a1" | "a2" | "b1" | "b2";
    };
  }
> = {
  A0: {
    meaning: "بداية الرحلة — تحتاج تأسيسًا صحيحًا من الصفر، وهذا أفضل مكان تبدأ منه.",
    course: {
      title: "التأسيس الصحيح A0",
      note: "نبني أساسك من أول حرف — بالعربي وخطوة بخطوة",
      stats: "3 مراحل · 26 درسًا · +460 كلمة",
      href: "/courses/a0",
      salla: "a0",
    },
  },
  A1: {
    meaning: "مبتدئ — عندك أساسيات جيدة وتحتاج بناءً منظمًا يوسّعها.",
    course: {
      title: "برنامج المستويات — المستوى A1",
      note: "4 مسارات متوازية: مفردات، قواعد، محادثة، واستماع",
      stats: "6 أسابيع للدورة · شهادة للمستوى",
      href: "/courses/levels",
      salla: "a1",
    },
  },
  A2: {
    meaning: "أساسي — تفهم الجمل المألوفة وجاهز تتوسع بثقة.",
    course: {
      title: "برنامج المستويات — المستوى A2",
      note: "4 مسارات متوازية: مفردات، قواعد، محادثة، واستماع",
      stats: "6 أسابيع للدورة · شهادة للمستوى",
      href: "/courses/levels",
      salla: "a2",
    },
  },
  B1: {
    meaning: "متوسط — تتواصل في أغلب المواقف اليومية وجاهز للانطلاق الأكبر.",
    course: {
      title: "برنامج المستويات — المستوى B1",
      note: "4 مسارات متوازية: مفردات، قواعد، محادثة، واستماع",
      stats: "6 أسابيع للدورة · شهادة للمستوى",
      href: "/courses/levels",
      salla: "b1",
    },
  },
  B2: {
    meaning: "فوق المتوسط — قريب من الطلاقة، والصقل الصحيح يوصلك لها.",
    course: {
      title: "برنامج المستويات — المستوى B2",
      note: "4 مسارات متوازية: مفردات، قواعد، محادثة، واستماع",
      stats: "6 أسابيع للدورة · شهادة للمستوى",
      href: "/courses/levels",
      salla: "b2",
    },
  },
  C1: {
    meaning: "متقدم — ما شاء الله! مستواك فوق دوراتنا الحالية (حتى B2).",
    course: {
      title: "استشارة مخصصة",
      note: "كلمنا على الواتساب ونرشدك للخطوة الأنسب لمستواك المتقدم",
      stats: "دورات C1 قريبًا",
      href: "/courses",
    },
  },
};
