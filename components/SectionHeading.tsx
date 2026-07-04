import { ArrowMotif } from "./ArrowMotif";

/** Section heading — pill eyebrow with the arrow motif + oversized title. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "start";
  /** dark = for use on blue/navy backgrounds */
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={centered ? "text-center" : "text-start"}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold ${
            dark
              ? "border-white/20 bg-white/10 text-white"
              : "border-primary/10 bg-primary-light text-primary"
          }`}
        >
          <ArrowMotif className="h-2.5 w-3.5 text-accent" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-black leading-[1.3] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 max-w-[58ch] text-base sm:text-lg ${
            dark ? "text-white/75" : "text-ink/65"
          } ${centered ? "mx-auto" : ""}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
