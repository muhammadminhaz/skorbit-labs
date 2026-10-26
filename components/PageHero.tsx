"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { motionTokens } from "@/components/arc/motion-tokens";

const ease = [...motionTokens.ease.enter] as [number, number, number, number];

// Opening section of every inner page. Delays start as the curtain lands (0.8s drop).
export default function PageHero({ title, intro, back, children }: {
  title: string;
  intro: string;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="relative isolate overflow-hidden px-4 md:px-8">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(47,155,224,0.14)_0%,rgba(47,155,224,0.04)_45%,transparent_80%)]" />
      <div className="mx-auto max-w-7xl px-6 pt-56 pb-20 md:px-12 md:pt-48 md:pb-28">
        {back && (
          <motion.div {...rise(0.45)} className="mb-10">
            <Link href={back.href} className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#7ee3ff]">
              <ArrowLeft aria-hidden className="size-4" />
              {back.label}
            </Link>
          </motion.div>
        )}
        <motion.h1 {...rise(0.5)} className="max-w-5xl text-5xl leading-[1.02] tracking-[-0.03em] text-balance md:text-7xl lg:text-8xl">
          {title}
        </motion.h1>
        <motion.p {...rise(0.6)} className="mt-8 max-w-2xl text-lg leading-relaxed text-(--fg-muted) text-pretty md:text-xl">
          {intro}
        </motion.p>
        {children && <motion.div {...rise(0.7)} className="mt-12">{children}</motion.div>}
      </div>
    </section>
  );
}
