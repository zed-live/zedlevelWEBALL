import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { A0Card } from "@/components/A0Card";
import { LevelsCard } from "@/components/LevelsCard";
import { ConversationCard } from "@/components/ConversationCard";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { courses } from "@/config/courses";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "الدورات",
  description:
    "دورات زد لفل لتعليم الإنجليزية: التأسيس الصحيح A0، برنامج المستويات A1–B2، وقريبًا المحادثة واللهجة الأمريكية ودورة الأطفال.",
};

export default function CoursesPage() {
  return (
    <section className="container-site py-16">
      <SectionHeading
        eyebrow="دوراتنا"
        title="اختر الدورة المناسبة لمستواك"
        sub="ما تعرف مستواك؟ ابدأ بالاختبار المجاني وخذ توصية مباشرة بالدورة الصح."
      />

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => {
          // the three live courses use the dedicated checklist cards;
          // coming-soon courses use the matching coming-soon card
          if (c.slug === "a0") return <A0Card key={c.slug} />;
          if (c.slug === "levels") return <LevelsCard key={c.slug} />;
          if (c.slug === "conversation")
            return <ConversationCard key={c.slug} />;
          return <ComingSoonCard key={c.slug} course={c} />;
        })}
      </div>

      {/* final CTA */}
      <div className="mt-16 rounded-[2rem] bg-brand-gradient px-6 py-10 text-center">
        <h2 className="text-2xl font-black text-white">محتار وش يناسبك؟</h2>
        <p className="mt-2 text-white/75">
          حدّد مستواك وبنقترح عليك الدورة الصح
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton
            message={site.whatsapp.msgLevel}
            source="courses-final"
            variant="solid"
          >
            حدّد مستواك عبر الواتساب
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
