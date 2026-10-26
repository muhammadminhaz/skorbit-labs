"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { motionTokens } from "@/components/arc/motion-tokens";
import TeamCards from "@/components/TeamCards";
import { TEAM } from "@/lib/site";

// Text between *asterisks* renders in the brand cyan once lit.
const MANIFESTO =
  "Skorbit Labs is a people-first studio that *treats your business like our own.* We work with honesty, close collaboration and full ownership. Every project, big or small, gets our best, turning your ideas into products, brands and growth that last.";

// Split into words, flagging the ones inside the *highlighted* span.
const WORDS = (() => {
  let on = false;
  return MANIFESTO.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") || raw.endsWith("*.") || raw.endsWith("*,");
    if (opens) on = true;
    const word = { text: raw.replaceAll("*", ""), highlight: on };
    if (closes) on = false;
    return word;
  });
})();


const ease = [...motionTokens.ease.enter] as [number, number, number, number];

function Word({ text, highlight, range, progress }: { text: string; highlight: boolean; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? "text-[#7ee3ff]" : ""}`}>
      {text}
    </motion.span>
  );
}

// Each word lights up in reading order as the paragraph scrolls through the viewport.
function Manifesto({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.65"] });

  return (
    <p ref={ref} className="max-w-4xl text-xl leading-[1.45] tracking-[-0.01em] text-white text-pretty md:text-2xl lg:text-[1.75rem]">
      {reduce
        ? WORDS.map((w, i) => (
            <span key={i} className={`mr-[0.25em] inline-block ${w.highlight ? "text-[#7ee3ff]" : ""}`}>{w.text}</span>
          ))
        : WORDS.map((w, i) => (
            <Word key={i} text={w.text} highlight={w.highlight} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]} />
          ))}
    </p>
  );
}

export default function WhoWeAre() {
  const reduce = useReducedMotion();
  const fadeUp = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-15% 0px" },
    transition: { duration: 0.8, ease },
  };

  return (
    <section id="who-we-are" className="relative overflow-hidden border-t border-white/10 px-4 md:px-8">
      {/* Faint cyan light behind the manifesto */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(47,155,224,0.12),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="px-6 py-28 md:px-12 md:py-40">
          <motion.h2 {...fadeUp} className="mb-10 text-4xl tracking-[-0.02em] md:mb-14 md:text-5xl lg:text-6xl">Who we are</motion.h2>
          <Manifesto reduce={reduce} />
          {TEAM.length > 0 && (
            <motion.div {...fadeUp} className="mt-20 md:mt-28">
              <TeamCards />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
