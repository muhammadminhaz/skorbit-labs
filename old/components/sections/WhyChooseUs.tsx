"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";

const principles = [
  {
    title: "Driven by the problem",
    body: "We start with what is actually broken for your users and your business. Features come second. If something does not move the problem, we say so and leave it out.",
  },
  {
    title: "Honest, even when it costs us",
    body: "Real estimates, clear trade-offs and early warnings. If a plan will not work or we are the wrong fit, you hear it from us first.",
  },
  {
    title: "Full responsibility",
    body: "We own what we ship, from the first commit to the last bug fix. No hiding behind tickets, handoffs or fine print.",
  },
  {
    title: "Principles over shortcuts",
    body: "Secure by default, accessible, tested and documented. We hold these standards when deadlines get tight, because that is when they matter most.",
  },
];

function Principle({ index, title, body, reduceMotion }: { index: number; title: string; body: string; reduceMotion: boolean | null }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <li ref={ref} className="relative grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-10 md:py-14 border-t border-white/[0.07]">
      <div className="relative w-px self-stretch bg-white/10">
        <motion.span className="absolute inset-0 bg-sky-400 origin-top" style={{ scaleY: reduceMotion ? 1 : rail }} />
      </div>
      <motion.div style={reduceMotion ? undefined : { opacity, y }} className="flex flex-col gap-4">
        <span className="text-sm text-sky-400 font-label">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-tight leading-tight">{title}</h3>
        <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">{body}</p>
      </motion.div>
    </li>
  );
}

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="why-choose-us" className="relative z-20 py-24 md:py-32 bg-neutral-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-40 self-start flex flex-col gap-6"
        >
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-sky-400 font-label">Why choose us</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-blue-50 to-blue-300 leading-[1.1]">
            People who own the outcome
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-md">
            We are a small team that goes after hard problems and treats your product like our own. These are the rules we work by.
          </p>
          <div className="pt-2">
            <CtaButton href="/contact">Book a call</CtaButton>
          </div>
        </motion.div>

        <ol>
          {principles.map((p, i) => (
            <Principle key={p.title} index={i} {...p} reduceMotion={reduceMotion} />
          ))}
        </ol>
      </div>
    </section>
  );
}
