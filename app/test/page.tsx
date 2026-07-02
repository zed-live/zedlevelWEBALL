import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "اختبار تحديد المستوى المجاني",
  description:
    "حدد مستواك في الإنجليزية خلال دقائق — اختبار مجاني بدون تسجيل، من A0 حتى C1.",
};

/** M1 stub — the full Free Level Test flow is milestone M4. */
export default function TestPage() {
  return (
    <ComingSoonStub
      title="اختبار تحديد المستوى ⭐"
      sub="نجهّز لك اختبارًا يحدد مستواك في دقائق. حاليًا تقدر تحصل على تقييم سريع مجاني عبر الواتساب."
      mascot="girl-front"
    />
  );
}
