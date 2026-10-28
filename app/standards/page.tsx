import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";
import CtaLink from "@/components/CtaLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SplitSection, { type SplitItem } from "@/components/SplitSection";

export const metadata: Metadata = pageMeta({
  title: "Our Standards",
  description: "The work Skorbit Labs takes on and the work we decline, from AI-generated people, immodest imagery and gambling to interest-based lending, and how we apply these standards.",
  path: "/standards",
});

// Also summarised in the FAQ (lib/faqs.ts) and referenced by the Terms (section 8). Keep them in step.
const DECLINED: SplitItem[] = [
  {
    title: "AI-generated people",
    body: "Realistic AI images, videos, avatars or voice clones of people, including deepfakes. We gladly build AI for text, data, search, automation and product imagery.",
  },
  {
    title: "Immodest imagery",
    body: "Revealing, suggestive or sexualised images of people, in designs, ads or content. People in the visuals we create or choose are modestly dressed.",
  },
  {
    title: "Music in content",
    body: "We don't add music to the videos, ads, apps or social content we produce. We use voiceover, natural sound and motion instead.",
  },
  {
    title: "Gambling and betting",
    body: "Casinos, sports betting, lotteries, and other products built around games of chance for money.",
  },
  {
    title: "Alcohol, tobacco and drugs",
    body: "Brands, shops and marketing for alcohol, tobacco, vaping or recreational drugs.",
  },
  {
    title: "Interest-based lending",
    body: "Payday loans, high-interest credit and other finance products that earn from charging interest. We are glad to work on ethical and Islamic finance.",
  },
  {
    title: "Adult and dating services",
    body: "Adult content, escort services, and dating or hookup apps.",
  },
  {
    title: "Deception and harm",
    body: "Scams, fake reviews, misinformation, hate, harassment, covert tracking of people, or anything designed to exploit or mislead, or that is unlawful where it is made or used.",
  },
];

const APPLY: SplitItem[] = [
  {
    title: "We check before we quote",
    body: "Every enquiry is reviewed against these standards before we send an estimate, so you hear early if we are not the right fit.",
  },
  {
    title: "When only part of a project is affected",
    body: "If most of a project fits but one part doesn't, we will say which part we can't do, and you can decide whether we are still the right team.",
  },
  {
    title: "If a project changes direction",
    body: "If ongoing work moves into one of these areas, we talk to you first. If we can't continue, we hand over what is complete and bill only for work done, as our Terms set out.",
  },
  {
    title: "Not sure? Ask us",
    body: "If you aren't sure whether your idea fits, email us before writing a brief. You will get a straight, friendly answer.",
  },
];

export default function StandardsPage() {
  return (
    <main>
      <PageHero
        title="Our standards"
        intro="The work we take on, and the work we don't. We would rather tell you up front than turn you down halfway through."
      />

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <Reveal className="max-w-4xl">
            <p className="text-2xl leading-snug tracking-[-0.01em] text-white text-pretty md:text-4xl md:leading-[1.2]">
              Skorbit Labs was founded by people whose Islamic faith shapes how we work: honesty, fairness, modesty and care for the people our work
              reaches.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-(--fg-muted) text-pretty">
              We work with clients of every background and belief. These standards are about the work we put our name to, never a judgement of anyone.
            </p>
          </Reveal>
        </div>
      </section>

      <SplitSection title="Work we don't take on" intro="We decline projects, or parts of projects, that involve:" items={DECLINED} />

      <SplitSection title="How we apply them" intro="Clear rules, applied the same way for everyone." items={APPLY} numbered>
        <CtaLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary" className="self-start">Ask us about your project</CtaLink>
      </SplitSection>
    </main>
  );
}
