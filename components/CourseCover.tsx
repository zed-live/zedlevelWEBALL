/**
 * Course card cover art — refined inline SVG scenes (brand palette only):
 * A0 = foundation blocks · levels = staircase + summit arrow ·
 * conversation = chatting bubbles · accent = mic + US-flag chip · kids = playful.
 */
export type CoverVariant = "a0" | "levels" | "conversation" | "accent" | "kids";

export function CourseCover({ variant }: { variant: CoverVariant }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-t-3xl bg-gradient-to-b from-primary-light via-primary-light/60 to-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(70%_80%_at_50%_0%,black,transparent)]"
      />
      <svg
        viewBox="0 0 320 160"
        className="relative h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === "a0" && (
          <g>
            <ellipse cx="160" cy="132" rx="70" ry="9" fill="#0047ff" opacity="0.08" />
            {/* foundation blocks pyramid */}
            <rect x="104" y="98" width="112" height="30" rx="9" fill="#dbe7ff" />
            <rect x="118" y="66" width="84" height="30" rx="9" fill="#0047ff" />
            <text x="160" y="88" textAnchor="middle" fontSize="19" fontWeight="900" fill="#ffffff">0</text>
            <rect x="132" y="34" width="56" height="30" rx="9" fill="#f8be4c" />
            <text x="160" y="56" textAnchor="middle" fontSize="19" fontWeight="900" fill="#1e1e1e">A</text>
            {/* sparkles */}
            <circle cx="105" cy="46" r="4" fill="#f8be4c" opacity="0.7" />
            <circle cx="218" cy="58" r="3" fill="#0047ff" opacity="0.35" />
            <path d="M226 34 l2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5 z" fill="#0047ff" opacity="0.5" />
          </g>
        )}
        {variant === "levels" && (
          <g>
            <ellipse cx="160" cy="134" rx="86" ry="9" fill="#0047ff" opacity="0.08" />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={206 - i * 44}
                y={126 - (i + 1) * 22}
                width="36"
                height={(i + 1) * 22 + 4}
                rx="9"
                fill="#0047ff"
                opacity={0.3 + i * 0.23}
              />
            ))}
            {/* ascent line + summit arrow */}
            <path
              d="M 224 96 L 92 40"
              stroke="#f8be4c"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="1 9"
            />
            <path d="M86 46 l7 -18 14 13 -9.5 1 -3 9 z" fill="#f8be4c" />
            <circle cx="236" cy="42" r="3.5" fill="#0047ff" opacity="0.35" />
          </g>
        )}
        {variant === "conversation" && (
          <g>
            <ellipse cx="160" cy="134" rx="82" ry="9" fill="#0047ff" opacity="0.08" />
            {/* left bubble (typing) */}
            <rect x="84" y="36" width="96" height="52" rx="18" fill="#0047ff" />
            <path d="M104 88 v14 l16 -14 z" fill="#0047ff" />
            <circle cx="114" cy="62" r="4.5" fill="#fff" opacity="0.95" />
            <circle cx="132" cy="62" r="4.5" fill="#fff" opacity="0.7" />
            <circle cx="150" cy="62" r="4.5" fill="#fff" opacity="0.45" />
            {/* reply bubble */}
            <rect x="168" y="70" width="76" height="46" rx="16" fill="#f8be4c" />
            <path d="M224 116 v12 l-13 -12 z" fill="#f8be4c" />
            <rect x="181" y="84" width="50" height="5.5" rx="2.75" fill="#1e1e1e" opacity="0.6" />
            <rect x="181" y="96" width="32" height="5.5" rx="2.75" fill="#1e1e1e" opacity="0.35" />
            <path d="M236 40 l2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5 z" fill="#f8be4c" opacity="0.8" />
          </g>
        )}
        {variant === "accent" && (
          <g>
            <ellipse cx="150" cy="136" rx="64" ry="8" fill="#0047ff" opacity="0.08" />
            {/* mic */}
            <rect x="134" y="30" width="32" height="56" rx="16" fill="#0047ff" />
            <line x1="140" y1="46" x2="160" y2="46" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <line x1="140" y1="56" x2="160" y2="56" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <line x1="140" y1="66" x2="160" y2="66" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M122 70 a28 28 0 0 0 56 0" fill="none" stroke="#0047ff" strokeWidth="7" strokeLinecap="round" />
            <line x1="150" y1="100" x2="150" y2="116" stroke="#0047ff" strokeWidth="8" strokeLinecap="round" />
            <line x1="132" y1="122" x2="168" y2="122" stroke="#0047ff" strokeWidth="8" strokeLinecap="round" />
            {/* sound arcs */}
            <path d="M186 52 a18 18 0 0 1 0 24" fill="none" stroke="#f8be4c" strokeWidth="4" strokeLinecap="round" />
            <path d="M196 44 a30 30 0 0 1 0 40" fill="none" stroke="#f8be4c" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            {/* US flag chip */}
            <g transform="translate(206 84)">
              <rect width="52" height="36" rx="8" fill="#ffffff" stroke="#dbe7ff" strokeWidth="2" />
              <rect x="4" y="6" width="44" height="5" rx="2.5" fill="#f8be4c" />
              <rect x="4" y="15.5" width="44" height="5" rx="2.5" fill="#f8be4c" />
              <rect x="4" y="25" width="44" height="5" rx="2.5" fill="#f8be4c" />
              <rect x="4" y="4" width="21" height="14" rx="3" fill="#0047ff" />
              <circle cx="10" cy="9" r="1.4" fill="#fff" />
              <circle cx="15" cy="9" r="1.4" fill="#fff" />
              <circle cx="20" cy="9" r="1.4" fill="#fff" />
              <circle cx="12.5" cy="13.5" r="1.4" fill="#fff" />
              <circle cx="17.5" cy="13.5" r="1.4" fill="#fff" />
            </g>
          </g>
        )}
        {variant === "kids" && (
          <g>
            <ellipse cx="160" cy="136" rx="84" ry="9" fill="#0047ff" opacity="0.08" />
            {/* smiling ball */}
            <circle cx="112" cy="78" r="30" fill="#f8be4c" />
            <circle cx="103" cy="71" r="4" fill="#1e1e1e" />
            <circle cx="123" cy="71" r="4" fill="#1e1e1e" />
            <path d="M100 84 a14 10 0 0 0 24 0" fill="none" stroke="#1e1e1e" strokeWidth="3.5" strokeLinecap="round" />
            {/* ABC block */}
            <g transform="rotate(10 178 84)">
              <rect x="158" y="64" width="40" height="40" rx="10" fill="#0047ff" />
              <text x="178" y="92" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">B</text>
            </g>
            {/* star + balloon */}
            <path d="M230 44 l6 13 14 2 -10 10 2.5 14 -12.5 -7 -12.5 7 2.5 -14 -10 -10 14 -2 z" fill="#0047ff" opacity="0.9" />
            <circle cx="222" cy="108" r="11" fill="#f8be4c" opacity="0.75" />
            <path d="M222 119 q-3 8 2 14" fill="none" stroke="#f8be4c" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
