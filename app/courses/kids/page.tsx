import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "دورة الأطفال — قريبًا",
  description:
    "دورة الأطفال من زد لفل: تأسيس إنجليزي ممتع وآمن لأطفالك بنفس منهجية الأكاديمية — قريبًا. سجل اهتمامك الآن.",
};

export default function KidsPage() {
  return (
    <ComingSoonPage
      title="دورة الأطفال"
      sub="عائلة زد لفل تكبر — تأسيس إنجليزي ممتع وآمن لأطفالك، بنفس المنهجية اللي وثق فيها +5,000 مستفيد."
      mascot="mother-front"
      notifyCourse="الأطفال"
      expectations={[
        "تأسيس إنجليزي ممتع مصمم للأعمار الصغيرة",
        "نفس منهجية زد لفل: خطوات صغيرة ومتابعة مستمرة",
        "تواصل وجدولة سهلة عبر الواتساب",
        "التفاصيل الكاملة والأعمار المستهدفة عند الافتتاح",
      ]}
    />
  );
}
