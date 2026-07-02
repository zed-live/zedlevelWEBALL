import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "كيف نعمل",
  description:
    "اشترك عبر سلة، انضم لقروب الواتساب، وتعلّم بخطة يومية واضحة — هكذا تعمل زد لفل.",
};

/** M1 stub — the full How It Works page is milestone M6. */
export default function HowItWorksPage() {
  return (
    <ComingSoonStub
      title="كيف نعمل ⚙️"
      sub="١) اشترك عبر سلة → ٢) انضم لقروب الواتساب → ٣) تعلّم بخطة يومية مع أسبوع مكثف مباشر. الصفحة الكاملة قريبًا."
      mascot="father-angle"
    />
  );
}
