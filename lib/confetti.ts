/** Brand-colored celebration burst (level-test result). Reduced-motion safe. */
export async function celebrate() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const confetti = (await import("canvas-confetti")).default;
  const base = {
    colors: ["#0047ff", "#f8be4c", "#ffffff", "#dbe7ff"],
    disableForReducedMotion: true,
    zIndex: 60,
  };
  confetti({ ...base, particleCount: 90, spread: 75, origin: { y: 0.35 } });
  setTimeout(
    () =>
      confetti({
        ...base,
        particleCount: 55,
        spread: 100,
        angle: 60,
        origin: { x: 0, y: 0.55 },
      }),
    220,
  );
  setTimeout(
    () =>
      confetti({
        ...base,
        particleCount: 55,
        spread: 100,
        angle: 120,
        origin: { x: 1, y: 0.55 },
      }),
    380,
  );
}
