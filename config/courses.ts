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
}

export const courses: CourseMeta[] = [
  {
    slug: "a0",
    href: "/courses/a0",
    title: "التأسيس الصحيح A0",
    tagline: "ابدأ من الصفر بالطريقة الصحيحة — أساس يخدمك طول رحلتك",
    stats: "3 مراحل · 26 درسًا · +460 كلمة",
    status: "ready",
  },
  {
    slug: "levels",
    href: "/courses/levels",
    title: "برنامج المستويات A1–B2",
    tagline: "أربعة مسارات متوازية: مفردات، قواعد، محادثة، واستماع — درجة درجة حتى B2",
    stats: "12 دورة · 4 مسارات · +3,310 كلمة",
    status: "ready",
  },
  {
    slug: "conversation",
    href: "/courses/conversation",
    title: "دورة المحادثة",
    tagline: "محادثات من حياتك اليومية — تتدرب وتتكلم من أول أسبوع",
    status: "soon",
    notifyName: "المحادثة",
    badge: "الأقرب افتتاحًا",
  },
  {
    slug: "accent",
    href: "/courses/accent",
    title: "اللهجة الأمريكية",
    tagline: "اضبط نطقك مع معلم لغته الأم الإنجليزية",
    status: "soon",
    notifyName: "اللهجة الأمريكية",
  },
  {
    slug: "kids",
    href: "/courses/kids",
    title: "دورة الأطفال",
    tagline: "تأسيس ممتع وآمن لأطفالك",
    status: "soon",
    notifyName: "الأطفال",
  },
];
