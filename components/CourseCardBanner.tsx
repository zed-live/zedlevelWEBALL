import type { CourseMeta } from "@/config/courses";
import { type CoverVariant } from "./CourseCover";
import { CourseCardArt } from "./CourseCardArt";

/** default brand-blue banner when a course doesn't set its own */
export const DEFAULT_BANNER = "linear-gradient(160deg, #2f4fd8 0%, #1a237e 100%)";

const COVER_VARIANTS: CoverVariant[] = ["a0", "levels", "conversation", "accent", "kids"];

/**
 * The top of a course card: a light illustrated banner (the course's old cover
 * art — mic+flag, chat bubbles, foundation blocks, …) with the status/featured
 * badges and the course circle hanging off its bottom edge. Shared by the
 * /courses grid card and the homepage cards so both look identical up top.
 * Leaves ~mb-16 room for the circle to overhang. (A course may still override
 * with a plain `banner` background.)
 */
export function CourseCardBanner({ course }: { course: CourseMeta }) {
  const ready = course.status === "ready";
  const cover = COVER_VARIANTS.includes(course.slug as CoverVariant)
    ? (course.slug as CoverVariant)
    : null;

  return (
    <div
      className="relative mb-16 px-5 pb-24 pt-5 text-center"
      style={course.banner ? { background: course.banner } : undefined}
    >
      {/* light illustrated background — art laid out AROUND the center circle
          (top strip + left/right sides), keeping the bottom-center dead zone
          clear where the white circle overhangs. */}
      {cover && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <CourseCardArt variant={cover} />
        </div>
      )}

      {/* status / featured badges */}
      <div className="relative z-[2] mb-3 flex flex-wrap items-center justify-center gap-2">
        {course.featured && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink shadow-sm">
            ابدأ من هنا ⭐
          </span>
        )}
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-primary shadow-sm">
          {ready ? "متاح الآن" : "قريبًا"}
        </span>
        {course.badge && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink shadow-sm">
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
