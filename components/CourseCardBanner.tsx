import type { CourseMeta } from "@/config/courses";

/** default brand-blue banner when a course doesn't set its own */
export const DEFAULT_BANNER = "linear-gradient(160deg, #2f4fd8 0%, #1a237e 100%)";

/**
 * The top of a course card: the per-course banner (gradient / color / flag)
 * with the status/featured badges and the course circle hanging off its
 * bottom edge. Shared by the /courses grid card and the homepage cards so both
 * look identical up top. Leaves ~mb-16 room for the circle to overhang.
 */
export function CourseCardBanner({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";
  return (
    <div
      className="relative mb-16 px-5 pb-20 pt-16 text-center"
      style={{ background: course.banner ?? DEFAULT_BANNER }}
    >
      {/* darken overlay for text legibility over images */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1446]/15 to-[#0f1446]/35"
      />

      {/* status / featured badges */}
      <div className="relative z-[2] mb-3 flex flex-wrap items-center justify-center gap-2">
        {course.featured && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink">
            ابدأ من هنا ⭐
          </span>
        )}
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            ready ? "bg-white text-primary" : "bg-white/20 text-white"
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

      {/* the circle hangs off the bottom edge of the banner */}
      <div className="absolute -bottom-[38px] left-1/2 z-[3] flex h-[138px] w-[138px] -translate-x-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_12px_28px_rgba(10,15,60,0.28),inset_0_0_0_6px_#f4f5fb]">
        {course.circleEyebrow && (
          <div className="text-[10px] font-bold text-ink">
            {course.circleEyebrow}
          </div>
        )}
        <div className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text px-2 text-[22px] font-black leading-[1.08] tracking-tight text-transparent">
          {course.circleTitle ?? course.title}
        </div>
        {course.circleMeta && (
          <div className="mt-1 text-[9px] font-bold text-purple-600">
            {course.circleMeta}
          </div>
        )}
      </div>
    </div>
  );
}
