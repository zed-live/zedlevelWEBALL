import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة — 404",
};

/** 404 — the back-view mascot: "ليه معطينا ظهرك؟" (family plan). */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
      />
      <Stagger className="container-site relative flex flex-col items-center gap-6 py-20 text-center lg:py-28">
        <StaggerItem>
          <Mascot
            name="grandpa-back"
            size="section"
            priority
            className="h-56 w-auto animate-breathe drop-shadow-xl"
          />
        </StaggerItem>
        <StaggerItem>
          <p className="text-6xl font-black text-primary/20">404</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            يبدو إنك خذيت لفة غلط 😅
          </h1>
          <p className="mx-auto mt-3 max-w-[44ch] text-lg leading-9 text-ink/65">
            الصفحة اللي تدور عليها مو هنا — بس مستواك الجديد ممكن يكون على بعد
            5 دقائق 👇
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link href="/test" className="btn btn-primary text-lg">
              اختبر مستواك مجانًا
            </Link>
            <Link href="/" className="btn btn-outline">
              العودة للرئيسية
            </Link>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
