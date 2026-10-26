"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { motionTokens } from "@/components/arc/motion-tokens";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];
const img = (id: string) => `https://images.unsplash.com/${id}?q=75&w=1800&auto=format&fit=crop`;

// Photos already used on the site (services and the team-at-laptops shot); the middle one opens up on scroll.
const STRIP = [
  { src: img("photo-1677442136019-21780ecad995"), alt: "" },
  { src: img("photo-1461749280684-dccba630e2f6"), alt: "" },
  { src: img("photo-1519389950473-47ba0277781c"), alt: "A team working together around laptops" },
  { src: img("photo-1551288049-bebda4e38f71"), alt: "" },
  { src: img("photo-1460925895917-afdab827c52f"), alt: "" },
];
const CENTER = 2;

function StripImage({ src, alt, index, progress }: { src: string; alt: string; index: number; progress: MotionValue<number> }) {
  const center = index === CENTER;
  // Middle photo grows to fill the frame. Side photos grow with it at first, then give up their width and
  // slide outward (away from the middle) while fading, so the row stays balanced as the middle takes over.
  const side = Math.sign(index - CENTER);
  const width = useTransform(progress, [0, 1], center ? ["30%", "100%"] : ["14%", "0%"]);
  const height = useTransform(progress, [0, 0.5, 1], center ? ["42vh", "62vh", "78vh"] : ["24vh", "32vh", "32vh"]);
  const x = useTransform(progress, [0.2, 1], ["0%", `${side * 60}%`]);
  const opacity = useTransform(progress, [0.35, 0.8], [1, center ? 1 : 0]);
  const radius = useTransform(progress, [0, 1], [16, 24]);

  return (
    <motion.div
      style={{ width, height, x: center ? 0 : x, opacity, borderRadius: radius }}
      className="relative shrink-0 overflow-hidden border border-white/10"
    >
      <Image src={src} alt={alt} fill sizes={center ? "100vw" : "20vw"} priority={center} className="object-cover brightness-[0.85] saturate-[0.85]" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-[#2f9be0]/15 via-transparent to-transparent" />
    </motion.div>
  );
}

export default function AboutHero() {
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  // 0 when the strip pins, 1 when the middle photo fills the frame
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ["start start", "end end"] });
  // Reduced motion: the strip holds its first frame. Markup never branches on `reduce` (it is unknown during
  // server rendering, so branching would cause a hydration mismatch); layout differences use motion-reduce:.
  const still = useMotionValue(0);
  const progress = reduce ? still : scrollYProgress;
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[80vh] bg-[linear-gradient(180deg,rgba(47,155,224,0.14)_0%,rgba(47,155,224,0.04)_45%,transparent_100%)]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-56 pb-10 text-center md:pt-48 md:pb-12">
        <motion.h1 {...rise(0.5)} className="text-5xl leading-[1.04] tracking-[-0.03em] text-balance md:text-7xl lg:text-[5.5rem]">
          A human-centric agency that strives for excellence
        </motion.h1>
      </div>

      {/* Tall track: the strip pins centered on screen and only then does the middle photo open up.
          The negative margin pulls the frame up so, before pinning, the strip still sits right under the h1:
          the middle photo starts 42vh tall, so centered it begins 29vh below the frame top. */}
      <div ref={stripRef} className="-mt-[calc(29vh-2.5rem)] h-[220vh] motion-reduce:mt-0 motion-reduce:h-auto">
        <motion.div {...rise(0.65)} className="pointer-events-none sticky top-0 flex h-svh items-center overflow-hidden px-4 motion-reduce:static motion-reduce:h-auto md:px-8">
          <div className="flex w-full items-center justify-center gap-2 md:gap-3">
            {STRIP.map((s, i) => (
              <StripImage key={s.src} {...s} index={i} progress={progress} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
