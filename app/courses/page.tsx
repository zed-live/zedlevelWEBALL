import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/config/courses";

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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </section>
  );
}
