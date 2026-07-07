"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { PlanPickerModal, type Plan } from "./PlanPickerModal";

/**
 * The gold "اشترك من المتجر" CTA for graded courses — instead of jumping
 * straight to Salla, it opens the PlanPickerModal (الكاملة / التعلّم الذاتي),
 * and the chosen plan's button carries the user to the Salla checkout.
 */
export function StoreCtaButton({
  title,
  sub,
  plans,
  source,
  label = "اشترك من المتجر 🛒",
}: {
  title: string;
  sub: string;
  plans: Plan[];
  source: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-accent to-accent-dark px-4 py-3.5 text-base font-black text-ink shadow-[0_8px_20px_rgba(229,168,63,0.4)] transition-transform hover:-translate-y-0.5"
      >
        <ShoppingBag className="h-5 w-5" aria-hidden />
        {label}
      </button>
      <PlanPickerModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        sub={sub}
        plans={plans}
        source={source}
      />
    </>
  );
}
