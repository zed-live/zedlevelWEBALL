import { redirect } from "next/navigation";

/**
 * /speaking-test-new was the scratch page used to build the native speaking
 * test. The native flow now lives at the canonical /speaking-test, so this
 * route permanently redirects there.
 */
export default function SpeakingTestNewPage() {
  redirect("/speaking-test");
}
