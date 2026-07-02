"use client";

import { ShoppingBag } from "lucide-react";
import { site, isTodo, type SallaCourse } from "@/config/site";
import { track } from "@/lib/track";
import { DevTodoBadge } from "./DevTodoBadge";

/**
 * The Salla checkout button — spec §6.
 * - Filled blue by default; `hero` switches to the orange accent (page's single hero CTA).
 * - Opens the Salla product in a new tab, fires salla_click{course,source} first.
 * - While the URL is TODO_: renders disabled "قريبًا" + dev badge (never a dead link).
 * NOTE: using a placeholder bag icon until the official Salla mark SVG is provided
 * (place it at /public/icons/salla.svg and swap here). TODO_SALLA_ICON
 */
export function SallaButton({
  course,
  source,
  hero = false,
  showTrust = true,
  className = "",
}: {
  course: SallaCourse;
  source: string;
  hero?: boolean;
  showTrust?: boolean;
  className?: string;
}) {
  const url = site.salla[course];
  const todo = isTodo(url);

  const color = hero
    ? "bg-accent text-ink hover:bg-accent-dark"
    : "bg-primary text-white hover:bg-primary-dark";

  return (
    <div className={`w-full sm:w-auto ${className}`}>
      {todo ? (
        <span
          aria-disabled="true"
          className="relative inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-ink/10 px-6 py-3.5 text-lg font-black text-ink/50 sm:w-auto"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          قريبًا
          <DevTodoBadge label={`SALLA_${course.toUpperCase()}`} />
        </span>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("salla_click", { course, source })}
          className={`relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-lg font-black transition-colors sm:w-auto ${color}`}
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          اشترك الآن
        </a>
      )}
      {showTrust && (
        <p className="mt-2 text-center text-xs text-ink/60">
          دفع آمن عبر منصة سلة 🔒 · Apple Pay · مدى · Visa
        </p>
      )}
    </div>
  );
}
