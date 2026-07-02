import type { Metadata } from "next";
import { ComingSoonStub } from "@/components/ComingSoonStub";

export const metadata: Metadata = {
  title: "دورة الأطفال — قريبًا",
  description:
    "دورة الأطفال من زد لفل: تأسيس ممتع وآمن لأطفالك — قريبًا. سجل اهتمامك الآن.",
};

/** M2 stub — full teaser page (mother + girl characters) is milestone M5. */
export default function KidsPage() {
  return (
    <ComingSoonStub
      title="دورة الأطفال 👨‍👩‍👧"
      sub="تأسيس ممتع وآمن لأطفالك مع عائلة زد لفل — قريبًا."
      mascot="mother-front"
      notifyCourse="الأطفال"
    />
  );
}
