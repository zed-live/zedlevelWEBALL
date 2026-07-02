import Link from "next/link";
import { ArrowMotif } from "./ArrowMotif";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";
import type { CourseMeta } from "@/config/courses";

/** Course card — ready / coming-soon variants (build spec §12). */
export function CourseCard({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";
  const stats = course.stats?.split("·").map((s) => s.trim()) ?? [];

  return (
    <article className="card card-hover relative flex flex-col overflow-hidden p-7">
      {/* watermark motif */}
      <ArrowMotif
        aria-hidden
        className="absolute -bottom-5 -start-5 h-24 w-32 rotate-12 text-primary/[0.04]"
      />

      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            ready ? "bg-primary text-white" : "bg-section text-ink/60"
          }`}
        >
          {ready ? "متاح الآن" : "قريبًا"}
        </span>
        {course.badge && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
            {course.badge} 🔥
          </span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-black">{course.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-8 text-ink/65">
        {course.tagline}
      </p>

      {stats.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span
              key={s}
              className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        {ready ? (
          <Link href={course.href} className="btn btn-primary w-full">
            تفاصيل الدورة
            <ArrowMotif className="h-2.5 w-3.5 -rotate-90" />
          </Link>
        ) : (
          <>
            <WhatsAppButton
              message={site.whatsapp.msgNotify(course.notifyName ?? course.title)}
              source={`course-card-${course.slug}`}
              event="notify_click"
              params={{ course: course.slug }}
              className="!w-full"
            >
              نبّهني عند الافتتاح 🔔
            </WhatsAppButton>
            <Link
              href={course.href}
              className="text-center text-sm font-bold text-primary hover:underline"
            >
              اعرف أكثر عن الدورة
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
