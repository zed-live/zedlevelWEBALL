/**
 * The A0 weekly rhythm — Sat/Mon/Wed lessons drop, next day to complete,
 * Friday is ALWAYS rest 🕌 (CONTENT.md §7 Weekly Rhythm).
 */
const DAYS = [
  { day: "السبت", type: "send" },
  { day: "الأحد", type: "do" },
  { day: "الاثنين", type: "send" },
  { day: "الثلاثاء", type: "do" },
  { day: "الأربعاء", type: "send" },
  { day: "الخميس", type: "do" },
  { day: "الجمعة", type: "rest" },
] as const;

const STYLE = {
  send: {
    box: "bg-primary text-white shadow-glow-blue",
    icon: "📤",
    label: "درسان جديدان",
    sub: "text-white/75",
  },
  do: {
    box: "bg-white border border-ink/5 shadow-soft",
    icon: "✍️",
    label: "تكمل الدرسين",
    sub: "text-ink/50",
  },
  rest: {
    box: "bg-accent text-ink shadow-glow-accent",
    icon: "🕌",
    label: "راحة — دائمًا",
    sub: "text-ink/60",
  },
} as const;

export function WeeklyRhythm() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {DAYS.map((d) => {
          const s = STYLE[d.type];
          return (
            <div
              key={d.day}
              className={`rounded-2xl p-4 text-center ${s.box} ${
                d.type === "rest" ? "col-span-2 sm:col-span-4 lg:col-span-1" : ""
              }`}
            >
              <span className="block text-2xl" aria-hidden>
                {s.icon}
              </span>
              <span className="mt-1.5 block font-black">{d.day}</span>
              <span className={`block text-xs font-bold ${s.sub}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-center text-sm font-bold text-ink/55">
        ٦ دروس في الأسبوع — يوم يوصلك درسان، واليوم التالي لإكمالهما · والجمعة
        إجازة مهما صار 🕌
      </p>
    </div>
  );
}
