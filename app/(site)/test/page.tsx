import type { Metadata } from "next";
import { LevelTest } from "@/components/test/LevelTest";

export const metadata: Metadata = {
  title: "اختبار تحديد مستوى الإنجليزية — مجاني",
  description:
    "حدد مستواك في الإنجليزية خلال 5 دقائق: 20 سؤالًا متدرجًا من A0 حتى C1، بدون تسجيل، مع توصية فورية بالدورة المناسبة لك.",
};

export default function TestPage() {
  return <LevelTest />;
}
