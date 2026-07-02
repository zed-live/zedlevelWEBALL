/** One of the 4 rules (A0) — glass card for dark brand-gradient sections. */
export function RuleCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm">
      <span
        aria-hidden
        className="absolute -top-6 end-2 text-[5.5rem] font-black leading-none text-accent/15"
      >
        {num}
      </span>
      <p className="relative text-xl font-black text-white">{title}</p>
      <p className="relative mt-2 leading-8 text-white/70">{desc}</p>
    </div>
  );
}
