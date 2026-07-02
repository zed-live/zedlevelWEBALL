/** A0 stage card — the three-stage journey (CONTENT.md §7). */
export function StageCard({
  emoji,
  stage,
  lessons,
  title,
  promise,
  covers,
}: {
  emoji: string;
  stage: string;
  lessons: string;
  title: string;
  promise: string;
  covers: string[];
}) {
  return (
    <article className="card card-hover flex h-full flex-col p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-3xl">
          {emoji}
        </span>
        <div>
          <p className="text-xs font-black text-primary">{stage}</p>
          <p className="text-xs font-bold text-ink/45">{lessons}</p>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-1.5 font-semibold leading-8 text-primary">{promise}</p>

      <div className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
        {covers.map((c) => (
          <span
            key={c}
            className="rounded-full bg-section px-3 py-1 text-xs font-bold text-ink/65"
          >
            {c}
          </span>
        ))}
      </div>
    </article>
  );
}
