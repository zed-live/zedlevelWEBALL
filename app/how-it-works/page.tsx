import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, GraduationCap, ArrowDown } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton, WhatsAppIcon } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "كيف نعمل — من الاشتراك إلى الشهادة",
  description:
    "ثلاث خطوات فقط: اشترك عبر سلة، انضم لقروب الواتساب، وتعلّم بخطة يومية واضحة مع أسبوع مكثف مباشر واختبار وشهادة.",
};

const steps = [
  {
    icon: ShoppingBag,
    num: "1",
    title: "اشترك",
    desc: "اشترِ تذكرة الدورة عبر منصة سلة — دفع آمن بـ Apple Pay ومدى وVisa",
  },
  {
    icon: WhatsAppIcon,
    num: "2",
    title: "انضم للواتساب",
    desc: "يوصلك رابط الدروس + الجدول + الملفات — وقروب للأسئلة والدعم",
  },
  {
    icon: GraduationCap,
    num: "3",
    title: "تعلّم",
    desc: "درس يومي مسجّل بخطة واضحة + أسبوع مكثف مباشر → اختبار وشهادة 🎓",
  },
];

const rails = [
  {
    title: "الموقع",
    role: "نساعدك تختار",
    desc: "اختبار المستوى + تفاصيل الدورات — عشان تعرف بالضبط وش يناسبك",
  },
  {
    title: "سلة",
    role: "الدفع الآمن",
    desc: "الاشتراك والدفع كله عبر منصة سلة الموثوقة",
  },
  {
    title: "واتساب",
    role: "التوصيل والدعم",
    desc: "الدروس والجدول والملفات والأسئلة — كل شي يوصلك هنا",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-24 end-[-8rem] h-96 w-96"
        />
        <Stagger className="container-site relative flex flex-col items-center gap-6 py-16 text-center lg:py-20">
          <StaggerItem>
            <Mascot
              name="father-angle"
              size="section"
              priority
              className="h-52 w-auto animate-breathe drop-shadow-xl sm:h-60"
            />
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              كيف نعمل ⚙️
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              <Underline className="text-primary">ثلاث خطوات</Underline> — وتبدأ
            </h1>
            <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-9 text-ink/65">
              كل شي على أدوات تستخدمها كل يوم — بدون تعقيد.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ═══ The 3 steps ═══ */}
      <section className="py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 120} className="h-full">
                <div className="card card-hover relative h-full overflow-hidden p-7 text-center">
                  <span
                    aria-hidden
                    className="absolute -top-5 end-3 text-[5rem] font-black leading-none text-primary/[0.07]"
                  >
                    {s.num}
                  </span>
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-glow-blue">
                    <s.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-xl font-black">{s.title}</h2>
                  <p className="mt-2 text-[15px] leading-8 text-ink/65">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the critical handoff */}
          <Reveal delay={300}>
            <div className="mx-auto mt-8 max-w-4xl rounded-3xl border-2 border-accent/40 bg-accent/10 p-6 text-center">
              <p className="text-lg font-black">
                📌 بعد الدفع، راسلنا على الواتساب لاستلام رابط الدورة والجدول
              </p>
              <p className="mt-1 text-sm font-bold text-ink/60">
                لا تنتظر أحد يتواصل معك — رسالة وحدة منك وكل شي يوصلك
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Three tools, one job each ═══ */}
      <section className="bg-section py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="وين يصير كل شي؟"
              title="ثلاث أدوات — لكل وحدة مهمة"
            />
          </Reveal>
          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            {rails.map((r, i) => (
              <div key={r.title} className="contents">
                <Reveal delay={i * 120} className="flex-1">
                  <div className="card h-full p-6 text-center">
                    <h3 className="text-lg font-black text-primary">
                      {r.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-black text-ink/45">
                      {r.role}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ink/65">
                      {r.desc}
                    </p>
                  </div>
                </Reveal>
                {i < rails.length - 1 && (
                  <ArrowMotif
                    aria-hidden
                    className="mx-auto h-3 w-4 shrink-0 -rotate-180 text-accent lg:-rotate-90"
                  />
                )}
              </div>
            ))}
          </div>
          <Reveal delay={350}>
            <p className="mt-8 text-center text-sm font-bold text-ink/55">
              وفيديوهات الدروس تشتغل عندك مباشرة عبر روابط Notion — بدون تسجيل
              دخول
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="container-site pb-4 pt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-14 text-center sm:px-12">
            <ArrowMotif
              aria-hidden
              className="absolute -start-8 top-6 h-24 w-36 -rotate-12 text-white/[0.07]"
            />
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              جاهز للخطوة الأولى؟
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-white/75 sm:text-lg">
              حدد مستواك مجانًا — والباقي نمشيه معك خطوة بخطوة
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link href="/test" className="btn btn-accent w-full text-lg sm:w-auto">
                اختبر مستواك مجانًا
              </Link>
              <WhatsAppButton
                message={site.whatsapp.msgGeneral}
                source="how-it-works"
                variant="inverse"
              >
                عندي سؤال قبل
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
