"use client";

import { useState } from "react";
import { PlanPickerModal, type Plan } from "./PlanPickerModal";
import { StoreButtonTrigger } from "./StoreButton";

/**
 * The "سجّل الآن عبر سلة" CTA for graded courses — instead of jumping straight
 * to Salla, it opens the PlanPickerModal (الكاملة / التعلّم الذاتي), and the
 * chosen plan's button carries the user to the Salla checkout.
 */
export function StoreCtaButton({
  title,
  sub,
  plans,
  source,
}: {
  title: string;
  sub: string;
  plans: Plan[];
  source: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StoreButtonTrigger onClick={() => setOpen(true)} />
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
