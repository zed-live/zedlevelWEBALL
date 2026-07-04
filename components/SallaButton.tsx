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
 * NOTE: placeholder bag icon until the official Salla mark SVG is provided
 * (place at /public/icons/salla.svg and swap here). TODO_SALLA_ICON
 */
export function SallaButton({
  course,
  source,
  hero = false,
  showTrust = true,
  label = "اشترك الآن",
  className = "",
}: {
  course: SallaCourse;
  source: string;
  hero?: boolean;
  showTrust?: boolean;
  label?: string;
  className?: string;
}) {
  const url = site.salla[course];
  const todo = isTodo(url);

  return (
    <div className={`w-full sm:w-auto ${className}`}>
      {todo ? (
        <span
          role="button"
          aria-disabled="true"
          aria-label="زر الاشتراك — التسجيل يفتح قريبًا"
          className="btn relative w-full cursor-not-allowed bg-ink/10 text-lg text-ink/45 sm:w-auto"
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
          className={`btn relative w-full text-lg sm:w-auto ${
            hero ? "btn-accent" : "btn-primary"
          }`}
        >
          <ShoppingBag className="h-5 w-5" aria-hidden />
          {label}
        </a>
      )}
      {showTrust && (
        <p className="mt-2.5 text-center text-xs font-semibold text-ink/55">
          دفع آمن عبر منصة سلة 🔒 · Apple Pay · مدى · Visa
        </p>
      )}
    </div>
  );
}
