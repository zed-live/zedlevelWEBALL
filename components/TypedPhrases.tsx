"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small self-contained typewriter effect (no external library) — types each
 * phrase, pauses, deletes, then moves to the next; loops forever. Respects
 * prefers-reduced-motion (shows the first phrase statically).
 */
export function TypedPhrases({
  phrases,
  typeSpeed = 70,
  backSpeed = 35,
  backDelay = 1600,
  startDelay = 400,
  className = "",
}: {
  phrases: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  className?: string;
}) {
  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setReduced(true);
      setText(phrases[0] ?? "");
      return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const step = () => {
      const current = phrases[phraseIdx] ?? "";
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer.current = setTimeout(step, backDelay);
          return;
        }
        timer.current = setTimeout(step, typeSpeed);
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer.current = setTimeout(step, typeSpeed);
          return;
        }
        timer.current = setTimeout(step, backSpeed);
      }
    };

    timer.current = setTimeout(step, startDelay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phrases, typeSpeed, backSpeed, backDelay, startDelay]);

  // Reserve the footprint of the LONGEST phrase so the animated text never
  // changes the layout as it types/wraps (prevents the page from shifting).
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid align-baseline">
      {/* invisible sizer: holds the max space, never changes */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
        <span className="ms-0.5 inline-block w-[0.06em]">|</span>
      </span>
      {/* visible animated text, laid over the sizer */}
      <span className={`col-start-1 row-start-1 ${className}`}>
        {text}
        {!reduced && (
          <span
            className="ms-0.5 inline-block w-[0.06em] animate-pulse align-baseline"
            aria-hidden
          >
            |
          </span>
        )}
      </span>
    </span>
  );
}
