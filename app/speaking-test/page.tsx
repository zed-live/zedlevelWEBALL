import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "اختبار المحادثة",
  description:
    "قِس نطقك ومحادثتك في الإنجليزية — تقييم فوري بالذكاء الاصطناعي أو جلسة مباشرة مع معلم.",
};

/** M2 stub — the full Speaking Test page (AI + human cards) is milestone M5. */
export default function SpeakingTestPage() {
  return (
    <ComingSoonStub
      title="اختبار المحادثة 🎤"
      sub="تقييم فوري بالذكاء الاصطناعي أو جلسة مباشرة مع معلم — نجهزها لك الآن. تبغى تقييمًا سريعًا اليوم؟ راسلنا على الواتساب."
      mascot="girl-side"
    />
  );
}
