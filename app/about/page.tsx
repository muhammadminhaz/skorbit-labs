import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AboutHero from "@/components/about/AboutHero";
import ValueList from "@/components/about/ValueList";
import Reveal from "@/components/Reveal";
import TeamCards from "@/components/TeamCards";
import { TEAM, TEAM_COUNTRIES_TEXT } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Meet Skorbit Labs, a senior software and growth studio with a team across Saudi Arabia, Australia and Bangladesh, building for businesses worldwide.",
  path: "/about",
});

const HONEST = [
  { title: "Real estimates, in writing", body: "After discovery you get a fixed estimate with the trade-offs spelled out. If the scope changes, the estimate changes in the open, before the work does." },
  { title: "Bad news travels fast", body: "If something slips or a plan will not work, you hear it from us first, the same day, along with the options to fix it." },
  { title: "We say no when we should", body: "If we are the wrong fit, or a feature will not move your goal, we tell you so, even when saying yes would be easier for us." },
  { title: "Nothing hidden", body: "You see working software in a weekly demo, not polished status reports. Every decision is written down where you can find it later." },
  { title: "You own everything", body: "Code, designs, content and accounts are yours from day one, documented and handed over in your own accounts. No lock-in, ever." },
];

const CLIENT_FIRST = [
  { title: "Your goals are the scoreboard", body: "We agree on what success means for your business, in numbers where we can, then judge every feature and every hour against it." },
  { title: "Direct access to the people building", body: "You talk to the designers and engineers doing the work, not a layer of account managers passing messages along." },
  { title: "Your pace, your tools", body: "We fit into how you already work: your calendar, your chat, your way of making decisions, whether you are a solo founder or a growing team." },
  { title: "Every brief gets our best", body: "No project is too small. A landing page gets the same care, review and testing as a full platform." },
  { title: "We stay after launch", body: "Fixes, improvements and the marketing that grows the product. We measure success by how it does a year later, not on launch day." },
];

export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:px-12 md:py-40 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal>
            <h2 className="text-5xl leading-[1.02] tracking-[-0.03em] text-balance md:text-7xl">Our philosophy</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-8">
            <p className="text-2xl leading-[1.4] tracking-[-0.01em] text-white text-pretty md:text-3xl">
              We love what we do, and it shows in the details. Every project starts with someone trusting us with an idea they care about, and we never take that lightly.
            </p>
            <p className="text-lg leading-relaxed text-(--fg-muted) text-pretty md:text-xl">
              To us, a project is never just a ticket or an invoice. It is a business someone has bet on, a team counting on it and customers who will use it every day. So we treat it like our own: we sweat the small things, ask the hard questions early and celebrate your wins as if they were ours. When it launches, we are not done. We stay curious about how it performs and keep pushing to make it better.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 md:px-12 md:py-40 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal className="self-start lg:sticky lg:top-36">
            <h2 className="text-5xl leading-[1.02] tracking-[-0.03em] text-balance md:text-7xl">Mission and values</h2>
          </Reveal>

          <div className="flex flex-col gap-20">
            <Reveal>
              <h3 className="mb-5 text-xl text-white">Why we build</h3>
              <p className="max-w-2xl text-lg leading-relaxed text-(--fg-muted) text-pretty">
                Good products come from people who care about the business behind them. We start with the problem your customers actually have, build only what moves it, and stay accountable for the result. Big brief or small, you get the same craft, the same honesty and the same steady hand from first call to long after launch.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-xl text-white">Honest by default</h3>
              <ValueList items={HONEST} />
            </Reveal>
            <Reveal>
              <h3 className="mb-6 text-xl text-white">Built around you</h3>
              <ValueList items={CLIENT_FIRST} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <Reveal className="mx-auto max-w-7xl px-6 py-28 text-center md:px-12 md:py-40">
          <p className="mx-auto max-w-5xl text-3xl leading-[1.2] tracking-[-0.02em] text-white text-balance md:text-5xl lg:text-6xl">
            We would rather lose a deal than win it with a promise we cannot keep.
          </p>
        </Reveal>
      </section>

      {TEAM.length > 0 && (
        <section className="relative border-t border-white/10 px-4 md:px-8">
          <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
            <Reveal className="mb-16 text-center md:mb-24">
              <h2 className="text-5xl leading-[1.02] tracking-[-0.03em] text-balance md:text-7xl">Meet the team</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-(--fg-muted)">
                The people you will actually work with, from the first call to the last commit. We work remotely from{" "}
                {TEAM_COUNTRIES_TEXT}, so between us someone is usually online in your working hours, wherever you are.
              </p>
            </Reveal>
            <Reveal>
              <TeamCards />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
