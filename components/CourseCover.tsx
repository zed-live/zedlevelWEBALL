/**
 * Course card cover art — inline SVG scenes per the homepage prompt:
 * A0 = building block + letter A · levels = ascending ladder + orange arrow ·
 * conversation = speech bubbles · accent = mic + US-flag touch · kids = playful.
 * Brand palette only (accent flag touch as directed).
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
        viewBox="0 0 320 144"
        className="h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === "a0" && (
          <g>
            <rect x="120" y="88" width="80" height="34" rx="8" fill="#0047ff" opacity="0.15" />
            <rect x="108" y="62" width="66" height="32" rx="8" fill="#0047ff" />
            <rect x="152" y="34" width="58" height="32" rx="8" fill="#f8be4c" />
            <text x="181" y="58" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e1e1e" fontFamily="inherit">A</text>
            <text x="141" y="85" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ffffff" fontFamily="inherit">0</text>
          </g>
        )}
        {variant === "levels" && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={214 - i * 42}
                y={112 - (i + 1) * 20}
                width="34"
                height={(i + 1) * 20 + 8}
                rx="7"
                fill={i === 3 ? "#0047ff" : "#0047ff"}
                opacity={0.35 + i * 0.2}
              />
            ))}
            <path d="M96 46 l14 -16 14 16 h-9 v14 h-10 v-14 z" fill="#f8be4c" />
          </g>
        )}
        {variant === "conversation" && (
          <g>
            <rect x="88" y="38" width="88" height="48" rx="16" fill="#0047ff" />
            <path d="M108 86 l0 14 14 -14 z" fill="#0047ff" />
            <circle cx="112" cy="62" r="4" fill="#fff" />
            <circle cx="130" cy="62" r="4" fill="#fff" />
            <circle cx="148" cy="62" r="4" fill="#fff" />
            <rect x="164" y="62" width="72" height="42" rx="14" fill="#f8be4c" />
            <path d="M216 104 l0 12 -12 -12 z" fill="#f8be4c" />
            <rect x="176" y="76" width="46" height="5" rx="2.5" fill="#1e1e1e" opacity="0.55" />
            <rect x="176" y="86" width="30" height="5" rx="2.5" fill="#1e1e1e" opacity="0.35" />
          </g>
        )}
        {variant === "accent" && (
          <g>
            <rect x="146" y="30" width="30" height="52" rx="15" fill="#0047ff" />
            <path d="M136 66 a25 25 0 0 0 50 0" fill="none" stroke="#0047ff" strokeWidth="7" strokeLinecap="round" />
            <rect x="157" y="92" width="8" height="18" fill="#0047ff" />
            <rect x="143" y="110" width="36" height="7" rx="3.5" fill="#0047ff" />
            {/* US flag touch */}
            <g transform="translate(206 40)">
              <rect width="44" height="30" rx="5" fill="#fff" stroke="#0047ff" strokeWidth="2" />
              <rect x="2" y="4" width="40" height="4" fill="#f8be4c" />
              <rect x="2" y="13" width="40" height="4" fill="#f8be4c" />
              <rect x="2" y="22" width="40" height="4" fill="#f8be4c" />
              <rect x="2" y="2" width="18" height="12" rx="2" fill="#0047ff" />
            </g>
          </g>
        )}
        {variant === "kids" && (
          <g>
            <circle cx="112" cy="66" r="26" fill="#f8be4c" />
            <circle cx="104" cy="60" r="3.5" fill="#1e1e1e" />
            <circle cx="122" cy="60" r="3.5" fill="#1e1e1e" />
            <path d="M102 72 a12 9 0 0 0 22 0" fill="none" stroke="#1e1e1e" strokeWidth="3" strokeLinecap="round" />
            <rect x="158" y="44" width="34" height="34" rx="9" fill="#0047ff" transform="rotate(12 175 61)" />
            <path d="M222 52 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2 z" fill="#0047ff" opacity="0.85" />
            <circle cx="206" cy="102" r="9" fill="#f8be4c" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
