"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

/** Global error state — no dead ends even when something breaks. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="bg-hero-glow">
      <div className="container-site flex flex-col items-center gap-6 py-24 text-center">
        <p className="text-6xl font-black text-primary/20">أوبس</p>
        <h1 className="text-3xl font-black">صار خلل بسيط — مو منك</h1>
        <p className="max-w-[40ch] text-lg leading-9 text-ink/65">
          جرّب تحديث الصفحة، وإذا تكررت المشكلة ارجع للرئيسية.
        </p>
        <div className="flex flex-col items-center gap-3.5 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            <RotateCcw className="h-5 w-5" aria-hidden />
            حاول مرة ثانية
          </button>
          <Link href="/" className="btn btn-outline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
