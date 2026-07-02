import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "دورة المحادثة — قريبًا",
  description:
    "دورة المحادثة من زد لفل: محادثات من حياتك اليومية بخمس مراحل تدريبية — قريبًا. سجل اهتمامك الآن.",
};

/** M2 stub — full teaser page is milestone M5. Opening soonest of the coming courses. */
export default function ConversationPage() {
  return (
    <ComingSoonStub
      title="دورة المحادثة 🗣️"
      sub="محادثات من حياتك اليومية — إطار، مفردات، حوار، تدريب حر، وتمرين مع الذكاء الاصطناعي. الأقرب افتتاحًا!"
      mascot="girl-angle"
      notifyCourse="المحادثة"
    />
  );
}
