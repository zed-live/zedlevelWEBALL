import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "برنامج المستويات A1–B2",
  description:
    "12 دورة مدرجة من A1 حتى B2 بأربعة مسارات: مفردات، قواعد، محادثة، واستماع — بشهادة لكل مستوى.",
};

/** M2 stub — the full Levels page (4 streams, word counts, 6-week structure) is milestone M5. */
export default function LevelsPage() {
  return (
    <ComingSoonStub
      title="برنامج المستويات A1–B2 📚"
      sub="12 دورة · 4 مسارات: مفردات وقواعد ومحادثة واستماع · شهادة لكل مستوى. الصفحة الكاملة تحت البناء — استفسر عبر الواتساب الآن."
      mascot="shab-side"
    />
  );
}
