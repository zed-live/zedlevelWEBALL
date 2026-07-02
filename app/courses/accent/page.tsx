import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "اللهجة الأمريكية — قريبًا",
  description:
    "دورة اللهجة الأمريكية من زد لفل مع معلم لغته الأم الإنجليزية — قريبًا. سجل اهتمامك الآن.",
};

/** M2 stub — full teaser page is milestone M5. */
export default function AccentPage() {
  return (
    <ComingSoonStub
      title="اللهجة الأمريكية 🇺🇸"
      sub="اضبط نطقك مع معلم لغته الأم الإنجليزية — قريبًا في زد لفل."
      mascot="shab-side"
      notifyCourse="اللهجة الأمريكية"
    />
  );
}
