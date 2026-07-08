import type { CourseMeta } from "@/config/courses";

/**
 * A calm, disciplined card header — the opposite of the old busy banner.
 *
 *  - a single thin brand rail across the very top (the calm anchor / entry point)
 *  - a clean navy→primary field, NO decorative art, NO scattered color blocks
 *  - the course medallion (kept — it identifies each course at a glance) rendered
 *    quietly: soft ring, primary text, no gold
 *  - exactly ONE status pill (متاح الآن), and the featured mark ONLY when featured
 *
 * Gold appears nowhere here (design system: blue family; gold is scarce).
 */
export function CourseCardHeader({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";

  return (
    <div className="relative">
      {/* the calm brand field */}
      <div className="relative overflow-hidden bg-gradient-to-b from-navy to-primary-deep px-6 pb-14 pt-6 text-center">
        {/* one status pill, top-start */}
        <div className="relative z-10 flex items-center justify-center">
          <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-black text-white/90 ring-1 ring-white/15">
            {ready ? "متاح الآن" : "قريبًا"}
          </span>
        </div>

        {/* eyebrow + title, in white on the field */}
        <p className="relative z-10 mt-5 text-[11px] font-bold uppercase tracking-wide text-white/55">
          {course.circleEyebrow ?? "دورة"}
        </p>
        <h3 className="relative z-10 mt-1 text-[22px] font-black leading-tight text-white">
          {course.circleTitle ?? course.title}
        </h3>
        {course.circleMeta && (
          <p className="relative z-10 mt-1.5 text-[12px] font-bold text-white/60">
            {course.circleMeta}
          </p>
        )}
      </div>

      {/* the medallion — kept, but quiet: a clean white disc overhanging the
          field, primary text, soft ring. Identifies the course at a glance. */}
      <div className="absolute -bottom-9 left-1/2 z-20 flex h-[72px] w-[72px] -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-8px_rgba(2,17,80,0.4)] ring-4 ring-section">
        <span className="text-[16px] font-black tracking-tight text-primary">
          {shortCode(course)}
        </span>
      </div>
    </div>
  );
}

/** a short course code for the medallion when none is set (e.g. A0, A1–B2) */
function shortCode(course: CourseMeta): string {
  if (course.slug === "a0") return "A0";
  if (course.slug === "levels") return "A1–B2";
  if (course.slug === "conversation") return "محادثة";
  return course.circleTitle ?? course.title;
}
