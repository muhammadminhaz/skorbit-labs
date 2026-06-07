"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="cta" className="relative z-20 py-32 md:py-48 bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Ambient glow — no overflow-hidden on parent so blur renders fully */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6"
        >
          Let&apos;s build something<br />that lasts.
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-neutral-400 mb-12 max-w-md mx-auto leading-relaxed"
        >
          Share your vision. We will take it from there.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-950 font-medium hover:bg-neutral-100 transition-colors duration-150 shadow-[0_0_60px_rgba(255,255,255,0.1)] w-full sm:w-auto justify-center"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
          </Link>

          <Link
            href="mailto:hello@skorbitlabs.com"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-150 w-full sm:w-auto text-center"
          >
            Send a message
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
