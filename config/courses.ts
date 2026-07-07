/**
 * Course catalog metadata — shared by the homepage grid and /courses.
 * Copy per CONTENT.md §6/§9. Detailed sales pages: /courses/a0 (M3), /courses/levels (M5).
 */

export type CourseStatus = "ready" | "soon";

export interface CourseMeta {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  stats?: string;
  status: CourseStatus;
  /** Arabic name used in the "نبّهني" WhatsApp message */
  notifyName?: string;
  /** extra badge, e.g. الأقرب افتتاحًا */
  badge?: string;
  /** featured = the "ابدأ من هنا" spotlight treatment */
  featured?: boolean;

  /* ── rich course-card template (banner + circle + details) ── */
  /**
   * Banner background behind the circle. Any CSS background value:
   * a gradient (default), a color, or `url('/path.jpg') center/cover`
   * — e.g. an American flag for the accent course. Falls back to the
   * brand blue gradient when omitted.
   */
  banner?: string;
  /** small word above the circle title, e.g. "دورة" */
  circleEyebrow?: string;
  /** the big gradient title inside the circle (defaults to `title`) */
  circleTitle?: string;
  /** meta line under the circle title, e.g. "+460 كلمة · 26 درس" */
  circleMeta?: string;
  /** price pill text, e.g. "السعر يُعلن مع فتح الدفعة" */
  price?: string;
  /** detail rows (label → value) shown under the card */
  details?: { label: string; value: string }[];
  /** how many detail rows stay visible before "عرض المزيد" (default 3) */
  detailsVisible?: number;
}

export const courses: CourseMeta[] = [
  {
    slug: "a0",
    href: "/courses/a0",
    title: "دورة التأسيس الصحيح",
    tagline: "ابدأ من الصفر بالطريقة الصحيحة — أساس يخدمك طول رحلتك",
    stats: "3 مراحل · 26 درسًا · +460 كلمة",
    status: "ready",
    featured: true,
    circleEyebrow: "دورة",
    circleTitle: "التأسيس الصحيح",
    circleMeta: "+460 كلمة · 26 درس",
    price: "السعر يُعلن مع فتح الدفعة",
    details: [
      { label: "المدة", value: "4 أسابيع دروس + أسبوع تطبيق مباشر" },
      { label: "الدروس", value: "26 درس فيديو مسجّل" },
      { label: "وقتك اليومي", value: "١٥–٣٠ دقيقة" },
      { label: "المجموعة المباشرة", value: "من 1 إلى 7 متعلمين" },
      { label: "الشهادة", value: "بعد اجتياز الاختبار النهائي 🏆" },
      { label: "اللغة", value: "العربية" },
      { label: "الوصول", value: "مدى الحياة" },
    ],
  },
  {
    slug: "levels",
    href: "/courses/levels",
    title: "برنامج المستويات A1–B2",
    tagline: "أربعة مسارات متوازية: مفردات، قواعد، محادثة، واستماع — درجة درجة حتى B2",
    stats: "12 دورة · 4 مسارات · +3,310 كلمة",
    status: "ready",
    circleEyebrow: "برنامج",
    circleTitle: "المستويات A1–B2",
    circleMeta: "12 دورة · 4 مسارات",
    price: "السعر يُعلن مع فتح الدفعة",
    details: [
      { label: "المسارات", value: "مفردات · قواعد · محادثة · استماع" },
      { label: "الدورات", value: "12 دورة متدرّجة" },
      { label: "المفردات", value: "+3,310 كلمة" },
      { label: "اللغة", value: "العربية والإنجليزية" },
      { label: "الوصول", value: "مدى الحياة" },
    ],
  },
  {
    slug: "conversation",
    href: "/courses/conversation",
    title: "دورة المحادثة",
    tagline: "ممارسة مباشرة مع مدرسين أجانب، تتكلم بصوتك من أول أسبوع",
    status: "ready",
    circleEyebrow: "دورة",
    circleTitle: "المحادثة",
    circleMeta: "جلسات مباشرة · مجموعة صغيرة",
    price: "249 ريال / شهر",
    details: [
      { label: "الحصص", value: "حصتان مباشرتان أسبوعيًا (~ساعة)" },
      { label: "المجموعة", value: "من 2 إلى 8 متعلمين" },
      { label: "التركيز", value: "النطق والطلاقة" },
    ],
  },
  {
    slug: "accent",
    href: "/courses/accent",
    title: "اللهجة الأمريكية",
    tagline: "اضبط نطقك مع معلم لغته الأم الإنجليزية",
    status: "soon",
    notifyName: "اللهجة الأمريكية",
    circleEyebrow: "دورة",
    circleTitle: "اللهجة الأمريكية",
    circleMeta: "نطق مع معلم لغته الأم",
    price: "السعر يُعلن مع فتح الدفعة",
    details: [
      { label: "التركيز", value: "النطق واللهجة الأمريكية" },
      { label: "المعلم", value: "لغته الأم الإنجليزية" },
      { label: "اللغة", value: "الإنجليزية" },
    ],
  },
  {
    slug: "kids",
    href: "/courses/kids",
    title: "دورة الأطفال",
    tagline: "تأسيس ممتع وآمن لأطفالك",
    status: "soon",
    notifyName: "الأطفال",
    circleEyebrow: "دورة",
    circleTitle: "الأطفال",
    circleMeta: "تأسيس ممتع وآمن",
    price: "السعر يُعلن مع فتح الدفعة",
    details: [
      { label: "الفئة", value: "الأطفال المبتدئون" },
      { label: "الأسلوب", value: "تعلّم ممتع بالألعاب" },
      { label: "اللغة", value: "العربية والإنجليزية" },
    ],
  },
];
