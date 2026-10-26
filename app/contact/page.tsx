import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import SplitSection from "@/components/SplitSection";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: "Contact Skorbit Labs about your website, app or AI project. We work with clients worldwide and reply within one business day.",
  path: "/contact",
});

const NEXT_STEPS = [
  { title: "We reply within one business day", body: "A real reply from the people who would build your project, with any questions we need answered first." },
  { title: "A short discovery call", body: "We talk through your goals, users and constraints. If we are not the right fit, we will say so and point you somewhere better." },
  { title: "A fixed estimate, in writing", body: "Scope, timeline and cost with the trade-offs spelled out, so you know exactly what you are agreeing to." },
  { title: "We start, and you see progress weekly", body: "Work begins on an agreed date, with a demo of working software every week until launch." },
];

export default function ContactPage() {
  return (
    <main>
      <Contact asPage />
      <SplitSection
        title="What happens next"
        intro="No sales pipeline and no pressure. Here is exactly what follows once you send your message."
        items={NEXT_STEPS}
        numbered
      />
      <FAQ />
    </main>
  );
}
