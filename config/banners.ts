/**
 * Course-card banner presets — self-contained CSS backgrounds (no image files),
 * so they work in the static export with zero external assets. Each course in
 * config/courses.ts references one via its `banner` field. Any preset can later
 * be swapped for a real photo, e.g. `url('/banners/us-flag.jpg') center/cover`.
 */

/** brand blue — the default look */
export const BANNER_BRAND =
  "linear-gradient(160deg, #2f4fd8 0%, #1a237e 100%)";

/** deep indigo→violet — for the leveled program */
export const BANNER_LEVELS =
  "linear-gradient(150deg, #3b3ad8 0%, #5b3fd9 55%, #7c3aed 100%)";

/** warm coral/orange — conversation, lively & spoken */
export const BANNER_CONVERSATION =
  "linear-gradient(150deg, #ff7a45 0%, #ef4d63 60%, #d6336c 100%)";

/** playful teal→sky — kids */
export const BANNER_KIDS =
  "linear-gradient(150deg, #22c1c3 0%, #2f80ed 100%)";

/**
 * American flag (stars & stripes), drawn entirely in CSS — for the American
 * accent course. Red/white stripes via a repeating gradient, a blue canton in
 * the top-inline corner (RTL: top-right), and a subtle star dot pattern on it.
 */
export const BANNER_US_FLAG = [
  // stars: tiny white dots confined to the canton
  "radial-gradient(circle, #fff 18%, transparent 20%) 6px 6px / 20px 14px",
  // blue canton (top-right in RTL) — ~46% wide, ~54% tall
  "linear-gradient(#3c3b6e, #3c3b6e) top right / 46% 54% no-repeat",
  // 13 red/white stripes
  "repeating-linear-gradient(180deg, #b22234 0 7.7%, #ffffff 7.7% 15.4%)",
].join(", ");
