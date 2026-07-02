import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "اللهجة الأمريكية — قريبًا",
  description:
    "دورة اللهجة الأمريكية من زد لفل مع معلم لغته الأم الإنجليزية — اضبط نطقك من المصدر. سجل اهتمامك الآن.",
};

export default function AccentPage() {
  return (
    <ComingSoonPage
      title="اللهجة الأمريكية 🇺🇸"
      sub="اضبط نطقك من المصدر — مع معلم لغته الأم الإنجليزية."
      mascot="shab-side"
      notifyCourse="اللهجة الأمريكية"
      expectations={[
        "معلم Native — لغته الأم الإنجليزية الأمريكية",
        "تدريب نطق عملي على الأصوات اللي تصعّب علينا",
        "تصحيح مباشر لنطقك أنت — مو نظريات عامة",
        "التفاصيل الكاملة والجدول عند الافتتاح",
      ]}
    />
  );
}
