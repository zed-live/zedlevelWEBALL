import type { CoverVariant } from "./CourseCover";

/**
 * Banner illustrations laid out around the card's center circle.
 *
 * Rules (see the banner safe-zone spec):
 *  - viewBox 0 0 380 150; the white circle overlaps the bottom-center — its
 *    dead zone is roughly a Ø150 circle centered at x≈190 entering from the
 *    bottom (avoid x 120–260, y > 55).
 *  - all focal art lives in the TOP strip and the LEFT / RIGHT sides.
 *  - light/pastel, flat, no text.
 */

const BRAND = "#0047ff";
const BRAND_SOFT = "#dbe7ff";
const GOLD = "#f8be4c";
const NAVY = "#021150";
const INK = "#1e1e1e";

export function CourseCardArt({ variant }: { variant: CoverVariant }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-primary-light via-primary-light/60 to-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(70%_80%_at_50%_0%,black,transparent)]"
      />
      <svg
        viewBox="0 0 380 150"
        className="relative h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === "a0" && (
          <g>
            {/* LEFT: foundation blocks */}
            <rect x="16" y="70" width="70" height="20" rx="7" fill={BRAND_SOFT} />
            <rect x="26" y="46" width="50" height="20" rx="7" fill={BRAND} />
            <text x="51" y="61" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">0</text>
            <rect x="34" y="22" width="34" height="20" rx="7" fill={GOLD} />
            <text x="51" y="37" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK}>A</text>
            {/* RIGHT: sparkles + block */}
            <path d="M320 34 l3 6.5 6.5 3 -6.5 3 -3 6.5 -3 -6.5 -6.5 -3 6.5 -3 z" fill={BRAND} opacity="0.55" />
            <circle cx="352" cy="60" r="4" fill={GOLD} opacity="0.8" />
            <circle cx="300" cy="26" r="3" fill={BRAND} opacity="0.35" />
            <rect x="322" y="70" width="26" height="26" rx="7" fill={GOLD} opacity="0.9" />
          </g>
        )}

        {variant === "levels" && (
          <g>
            {/* LEFT + RIGHT: ascending staircase framing the circle */}
            {[0, 1, 2].map((i) => (
              <rect key={"l" + i} x={16 + i * 26} y={92 - (i + 1) * 18} width="20" height={(i + 1) * 18 + 6} rx="6" fill={BRAND} opacity={0.35 + i * 0.2} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={"r" + i} x={324 - i * 26} y={92 - (i + 1) * 18} width="20" height={(i + 1) * 18 + 6} rx="6" fill={BRAND} opacity={0.35 + i * 0.2} />
            ))}
            {/* TOP: summit arrow */}
            <path d="M150 26 L230 26" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
            <path d="M226 20 l10 6 -10 6 2 -6 z" fill={GOLD} />
            <circle cx="190" cy="18" r="3" fill={BRAND} opacity="0.4" />
          </g>
        )}

        {variant === "conversation" && (
          <g>
            {/* LEFT: typing bubble */}
            <rect x="16" y="34" width="80" height="44" rx="15" fill={BRAND} />
            <path d="M34 78 v12 l14 -12 z" fill={BRAND} />
            <circle cx="40" cy="56" r="4" fill="#fff" opacity="0.95" />
            <circle cx="56" cy="56" r="4" fill="#fff" opacity="0.7" />
            <circle cx="72" cy="56" r="4" fill="#fff" opacity="0.45" />
            {/* RIGHT: reply bubble */}
            <rect x="286" y="30" width="78" height="42" rx="14" fill={GOLD} />
            <path d="M340 72 v11 l-12 -11 z" fill={GOLD} />
            <rect x="298" y="44" width="50" height="5" rx="2.5" fill={INK} opacity="0.55" />
            <rect x="298" y="55" width="32" height="5" rx="2.5" fill={INK} opacity="0.35" />
            {/* TOP sparkle */}
            <path d="M190 16 l2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5 z" fill={GOLD} opacity="0.7" />
          </g>
        )}

        {variant === "accent" && (
          <g>
            {/* LEFT: microphone */}
            <rect x="34" y="26" width="30" height="50" rx="15" fill={BRAND} />
            <line x1="40" y1="40" x2="58" y2="40" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <line x1="40" y1="50" x2="58" y2="50" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <path d="M24 60 a25 25 0 0 0 50 0" fill="none" stroke={BRAND} strokeWidth="6" strokeLinecap="round" />
            <line x1="49" y1="86" x2="49" y2="100" stroke={BRAND} strokeWidth="7" strokeLinecap="round" />
            <line x1="33" y1="106" x2="65" y2="106" stroke={BRAND} strokeWidth="7" strokeLinecap="round" />
            {/* sound arcs to the right of the mic */}
            <path d="M82 46 a16 16 0 0 1 0 22" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
            {/* RIGHT: US-flag chip */}
            <g transform="translate(300 40)">
              <rect width="60" height="42" rx="9" fill="#fff" stroke={BRAND_SOFT} strokeWidth="2" />
              <rect x="5" y="7" width="50" height="5.5" rx="2.75" fill={GOLD} />
              <rect x="5" y="18" width="50" height="5.5" rx="2.75" fill={GOLD} />
              <rect x="5" y="29" width="50" height="5.5" rx="2.75" fill={GOLD} />
              <rect x="5" y="5" width="24" height="16" rx="3" fill={BRAND} />
              <circle cx="11" cy="10" r="1.5" fill="#fff" />
              <circle cx="17" cy="10" r="1.5" fill="#fff" />
              <circle cx="23" cy="10" r="1.5" fill="#fff" />
              <circle cx="14" cy="15" r="1.5" fill="#fff" />
              <circle cx="20" cy="15" r="1.5" fill="#fff" />
            </g>
          </g>
        )}

        {variant === "kids" && (
          <g>
            {/* LEFT: smiling ball */}
            <circle cx="50" cy="62" r="28" fill={GOLD} />
            <circle cx="42" cy="56" r="3.5" fill={INK} />
            <circle cx="60" cy="56" r="3.5" fill={INK} />
            <path d="M40 68 a13 9 0 0 0 22 0" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            {/* RIGHT: ABC block + star */}
            <g transform="rotate(8 326 60)">
              <rect x="306" y="40" width="40" height="40" rx="10" fill={BRAND} />
              <text x="326" y="68" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">B</text>
            </g>
            <path d="M300 22 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 z" fill={BRAND} opacity="0.85" />
            {/* TOP-left balloon */}
            <circle cx="100" cy="28" r="9" fill={GOLD} opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
