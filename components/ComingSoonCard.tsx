import { BellRing } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { CourseCardBanner } from "./CourseCardBanner";
import { site } from "@/config/site";
import type { CourseMeta } from "@/config/courses";

/**
 * Coming-soon course card — the same shell as the live cards (banner +
 * medallion, equal height) but with a "قريبًا" state and a notify CTA instead
 * of a price + checklist. Keeps the /courses grid visually consistent.
 */
export function ComingSoonCard({ course }: { course: CourseMeta }) {
  return (
    <article className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-24px_rgba(2,17,80,0.35)] ring-1 ring-ink/[0.06]">
      <CourseCardBanner course={course} />

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2 text-center">
        <p className="text-[14px] font-bold leading-7 text-ink/65">
          {course.tagline}
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
            <BellRing className="h-6 w-6" aria-hidden />
          </span>
          <p className="text-[15px] font-black text-ink">تفتح قريبًا</p>
          <p className="text-[13px] font-semibold leading-6 text-ink/55">
            سجّل اهتمامك ونبّهك أول ما تُفتح الدفعة
          </p>
        </div>

        {/* CTA pinned to the foot so heights align */}
        <div className="mt-auto pt-6">
          <WhatsAppButton
            message={site.whatsapp.msgNotify(course.notifyName ?? course.title)}
            source={`coming-soon-${course.slug}`}
            event="notify_click"
            params={{ course: course.slug }}
            variant="solid"
            className="w-full justify-center sm:!w-full"
          >
            نبّهني عند الافتتاح
          </WhatsAppButton>

          <p className="pt-4 text-center text-[11px] font-medium text-ink/40">
            بدون أي التزام، نراسلك بس عند التوفّر
          </p>
        </div>
      </div>
    </article>
  );
}
