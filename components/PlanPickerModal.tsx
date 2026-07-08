"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import { Check, X, Plus } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/track";

/**
 * The plan-picker popup shown when a graded course's "اشترك من المتجر" CTA is
 * clicked. Two packages: الباقة الكاملة (gold, "الأكثر اختيارًا") and
 * التعلّم الذاتي (blue). Each lists what's included (green ✓) and, for the
 * self-paced plan, what's excluded (grey ✕). Both subscribe buttons open the
 * Salla checkout.
 *
 * Rules: RTL · عامية · «الكاملة» is the only highlighted plan.
 */

export interface Plan {
  key: string;
  name: string;
  price: string;
  /** e.g. "ريال / دورة" */
  priceUnit: string;
  tagline: string;
  /** included lines (green ✓) */
  includes: string[];
  /** premium-only additions, rendered after `includes` with a gold "+" mark */
  extras?: string[];
  /** excluded lines (grey ✕) — self-paced only */
  excludes?: string[];
  cta: string;
  /** the Salla checkout URL for this plan */
  href: string;
  featured?: boolean;
}

function PlanCard({ plan, source }: { plan: Plan; source: string }) {
  const featured = plan.featured;
  return (
    <div
      className={`relative rounded-[20px] p-5 ${
        featured
          ? "bg-accent/[0.12] ring-2 ring-accent"
          : "bg-white ring-1 ring-ink/10"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-black text-ink shadow-sm">
          الأكثر اختيارًا ⭐
        </span>
      )}

      {/* header: name + price */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="min-w-0">
          <p className="text-[19px] font-black text-primary">{plan.name}</p>
          <p className="mt-1 text-[13px] font-bold leading-6 text-ink/55">
            {plan.tagline}
          </p>
        </div>
        <p className="shrink-0 text-start">
          <span dir="ltr" className="text-[26px] font-black tabular-nums text-ink">
            {plan.price}
          </span>
          <span className="block text-[11px] font-bold text-ink/50">
            {plan.priceUnit}
          </span>
        </p>
      </div>

      {/* checklist */}
      <div className="mt-4 space-y-0.5">
        {plan.includes.map((t) => (
          <div key={t} className="flex items-start gap-2.5 py-1.5">
            <Check
              aria-hidden
              className="mt-1 h-[17px] w-[17px] shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <span className="text-[13.5px] font-semibold leading-6 text-ink">
              {t}
            </span>
          </div>
        ))}
        {plan.extras?.map((t) => (
          <div key={t} className="flex items-start gap-2.5 py-1.5">
            <span
              aria-hidden
              className="mt-0.5 grid h-[17px] w-[17px] shrink-0 place-items-center rounded-full bg-accent text-ink"
            >
              <Plus className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[13.5px] font-black leading-6 text-ink">
              {t}
            </span>
          </div>
        ))}
        {plan.excludes?.map((t) => (
          <div key={t} className="flex items-start gap-2.5 py-1.5">
            <X
              aria-hidden
              className="mt-1 h-[17px] w-[17px] shrink-0 text-ink/30"
              strokeWidth={2.5}
            />
            <span className="text-[13.5px] font-semibold leading-6 text-ink/45">
              {t}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={plan.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("salla_click", { course: plan.key, source })}
        className={`mt-5 flex w-full items-center justify-center rounded-2xl px-4 py-4 text-[16px] font-black shadow-[0_10px_24px_-10px_rgba(15,23,41,0.4)] transition-transform hover:-translate-y-0.5 ${
          featured
            ? "bg-gradient-to-b from-accent to-accent-dark text-ink"
            : "bg-primary text-white"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export function PlanPickerModal({
  open,
  onClose,
  title,
  sub,
  plans,
  source,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  sub: string;
  plans: Plan[];
  source: string;
}) {
  // lock scroll + close on Escape while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          dir="rtl"
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative my-auto w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-7"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="absolute end-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-section text-ink/50 transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* header */}
            <div className="pt-1 text-center">
              <h2 className="text-[24px] font-black text-primary">{title}</h2>
              <p className="mx-auto mt-2 max-w-[34ch] text-[14px] font-bold leading-7 text-ink/55">
                {sub}
              </p>
            </div>

            {/* plans — featured first */}
            <div className="mt-7 space-y-5">
              {plans.map((p) => (
                <PlanCard key={p.key} plan={p} source={source} />
              ))}
            </div>

            {/* trust */}
            <p className="mt-6 text-center text-[11.5px] font-medium text-ink/45">
              دفع آمن عبر سلة 🔒 · Apple Pay · مدى · Visa
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
