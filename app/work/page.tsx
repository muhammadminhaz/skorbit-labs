import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SplitSection from "@/components/SplitSection";
import FeaturedWork from "@/components/sections/FeaturedWork";

export const metadata: Metadata = pageMeta({
  title: "Our Work",
  description: "Explore the Skorbit Labs portfolio of web apps, SaaS platforms, mobile apps and AI products designed, built and grown for businesses worldwide.",
  path: "/work",
});

const INCLUDED = [
  { title: "A written plan before we build", body: "Goals, scope, timeline and a fixed estimate, agreed with you in writing. No surprises halfway through." },
  { title: "Designs you can click", body: "Clickable prototypes you can put in front of real users before a line of production code is written." },
  { title: "A weekly demo of working software", body: "You see real progress every week, not status reports, and you can change direction while it is still cheap." },
  { title: "Code, designs and accounts you own", body: "Everything lives in your accounts from day one, documented so any team could pick it up after us." },
  { title: "A calm launch", body: "Tested, monitored and deployed with a rollback plan, then watched closely in the days after release." },
  { title: "Support after go-live", body: "Fixes, improvements and the marketing that grows the product, for as long as it is useful to you." },
];

export default function WorkPage() {
  return (
    <main>
      <PageHero
        title="Work"
        intro="Products we have designed, built and grown. Each case study is written plainly: the problem, the decisions we made and what shipped."
      />
      <FeaturedWork header={false} showAllLink={false} />
      <SplitSection
        title="What every project includes"
        intro="Whatever the size of the brief, the same standards come with it. This is what you can hold us to."
        items={INCLUDED}
      />
    </main>
  );
}
