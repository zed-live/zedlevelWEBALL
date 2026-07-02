import { ArrowMotif } from "./ArrowMotif";

/** Section heading with the signature arrow eyebrow. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "start";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : "text-start"}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          <ArrowMotif className="h-3 w-4 text-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-3 max-w-[60ch] text-base text-ink/70 sm:text-lg ${centered ? "mx-auto" : ""}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
