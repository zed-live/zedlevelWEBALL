import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "الدورات",
  description:
    "دورات زد لفل لتعليم الإنجليزية: التأسيس الصحيح A0، برنامج المستويات A1–B2، وقريبًا المحادثة واللهجة الأمريكية ودورة الأطفال.",
};

const courses = [
  {
    title: "التأسيس الصحيح A0",
    desc: "3 مراحل · 26 درسًا · +460 كلمة — البداية الصحيحة من الصفر",
    ready: true,
  },
  {
    title: "برنامج المستويات A1–B2",
    desc: "4 مسارات لكل دورة: مفردات، قواعد، محادثة، استماع",
    ready: true,
  },
  {
    title: "دورة المحادثة",
    desc: "محادثات من حياتك اليومية — أقرب إطلاقًا",
    ready: false,
    notify: "المحادثة",
  },
  {
    title: "اللهجة الأمريكية",
    desc: "مع معلم لغته الأم الإنجليزية",
    ready: false,
    notify: "اللهجة الأمريكية",
  },
  {
    title: "دورة الأطفال",
    desc: "تعليم ممتع وآمن لأطفالك",
    ready: false,
    notify: "الأطفال",
  },
];

/** M1 stub — full catalog with CourseCard components is milestone M2/M5. */
export default function CoursesPage() {
  return (
    <section className="container-site py-16">
      <SectionHeading
        eyebrow="دوراتنا"
        title="اختر الدورة المناسبة لمستواك"
        sub="صفحات الدورات التفصيلية قيد البناء — تقدر تستفسر أو تحجز مكانك عبر الواتساب من الآن."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <article
            key={c.title}
            className="flex flex-col rounded-2xl border border-ink/5 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black">{c.title}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  c.ready
                    ? "bg-primary-light text-primary"
                    : "bg-accent/20 text-ink/70"
                }`}
              >
                {c.ready ? "متاح الآن" : "قريبًا"}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm leading-7 text-ink/70">
              {c.desc}
            </p>
            <div className="mt-4">
              <WhatsAppButton
                message={
                  c.ready
                    ? site.whatsapp.msgCourseInquiry(c.title)
                    : site.whatsapp.msgNotify(c.notify ?? c.title)
                }
                source={`courses-${c.ready ? "inquiry" : "notify"}`}
                className="w-full"
              >
                {c.ready ? "استفسر عن الدورة" : "نبّهني عند الافتتاح 🔔"}
              </WhatsAppButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
