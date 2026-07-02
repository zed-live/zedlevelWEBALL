import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "التأسيس الصحيح A0",
  description:
    "دورة التأسيس الصحيح بالإنجليزية: 3 مراحل، 26 درسًا، +460 كلمة — ابدأ من الصفر بالطريقة الصحيحة مع شهادة واختبار نهائي.",
};

/** M2 stub — the FULL A0 sales page (content ready in CONTENT.md §7) is milestone M3. */
export default function A0Page() {
  return (
    <ComingSoonStub
      title="التأسيس الصحيح A0 📘"
      sub="3 مراحل · 26 درسًا · +460 كلمة · اختبار نهائي وشهادة. صفحة الدورة الكاملة تحت البناء — تقدر تستفسر عن التسجيل عبر الواتساب الآن."
      mascot="shab-front2"
    />
  );
}
