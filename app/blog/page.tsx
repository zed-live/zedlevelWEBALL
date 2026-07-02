import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "المدونة",
  description:
    "مقالات عملية بالعربي لتعلم الإنجليزية: خطط واقعية، شرح المستويات، طرق حفظ المفردات، ونصائح تخليك تكمّل.",
};

/** M1 stub — the full blog system + 5 launch articles is milestone M7. */
export default function BlogPage() {
  return (
    <ComingSoonStub
      title="المدونة 📚"
      sub="مقالات عملية بالعربي: كيف تبدأ من الصفر، معنى المستويات A0–C1، وأفضل طرق الحفظ — قريبًا."
      mascot="grandpa-front"
    />
  );
}
