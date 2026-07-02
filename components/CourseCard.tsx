import Link from "next/link";
import { ArrowMotif } from "./ArrowMotif";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";
import type { CourseMeta } from "@/config/courses";

/** Course card — ready / coming-soon variants (build spec §12). */
export function CourseCard({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";

  return (
    <article className="flex flex-col rounded-2xl border border-ink/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            ready ? "bg-primary-light text-primary" : "bg-accent/20 text-ink/70"
          }`}
        >
          {ready ? "متاح الآن" : "قريبًا"}
        </span>
        {course.badge && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-ink">
            {course.badge}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-black">{course.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-7 text-ink/70">
        {course.tagline}
      </p>

      {course.stats && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          <ArrowMotif className="h-2.5 w-3.5 shrink-0 text-accent" />
          {course.stats}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {ready ? (
          <Link
            href={course.href}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 font-bold text-white transition-colors hover:bg-primary-dark"
          >
            تفاصيل الدورة
          </Link>
        ) : (
          <>
            <WhatsAppButton
              message={site.whatsapp.msgNotify(course.notifyName ?? course.title)}
              source={`course-card-${course.slug}`}
              event="notify_click"
              params={{ course: course.slug }}
              className="w-full"
            >
              نبّهني عند الافتتاح 🔔
            </WhatsAppButton>
            <Link
              href={course.href}
              className="text-center text-sm font-semibold text-primary hover:underline"
            >
              اعرف أكثر عن الدورة
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
