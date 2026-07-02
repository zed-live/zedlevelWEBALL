/**
 * The ZEDLEVEL "Level-Up Arrow" — the orange upward arrow from the logo,
 * used as the brand's repeating motif (section eyebrows, bullets, ladder).
 * Color via `currentColor`; pass text-accent for the brand orange.
 */
export function ArrowMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 17"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M10.83 1.06a1.65 1.65 0 0 1 2.34 0l9.9 10.5c.98 1.04.24 2.75-1.19 2.75h-5.1c-.46 0-.9-.19-1.21-.53L12 9.83l-3.57 3.95c-.31.34-.75.53-1.21.53h-5.1c-1.43 0-2.17-1.7-1.19-2.75l9.9-10.5Z" />
    </svg>
  );
}
