import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/ComingSoonPage";

export const metadata: Metadata = {
  title: "دورة المحادثة — قريبًا",
  description:
    "دورة المحادثة من زد لفل: سيناريوهات من حياتك اليومية بخمس مراحل تدريبية حتى تتكلم فعلًا — الأقرب افتتاحًا. سجل اهتمامك الآن.",
};

export default function ConversationPage() {
  return (
    <ComingSoonPage
      badge="الأقرب افتتاحًا 🔥"
      title="دورة المحادثة"
      sub="من أول أسبوع وأنت تتكلم — محادثات من حياتك اليومية، مو جمل كتب قديمة."
      mascot="girl-angle"
      notifyCourse="المحادثة"
      expectations={[
        "سيناريوهات من حياتك: مشوار، مقهى، مطار، زيارة صديق…",
        "مفردات أساسية ومتقدمة لكل موقف — بجمل مترجمة",
        "حوار ثنائي تمثيلي: المعلم طرف وأنت الطرف الثاني بصوتك",
        "تدريب حر بدون نص جاهز — تبني الجملة بنفسك",
        "تمرين مباشر مع الذكاء الاصطناعي يسألك ويصحح لك",
      ]}
    />
  );
}
