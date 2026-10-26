"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { motionTokens } from "@/components/arc/motion-tokens";

// Bottom-right button that appears after the first screen and scrolls back to the top.
export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 }}
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          transition={motionTokens.spring.snappy}
          className="group fixed right-5 bottom-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white shadow-[0_8px_28px_-8px_rgba(47,155,224,0.55)] backdrop-blur-md transition-colors hover:border-[#7ee3ff]/60 hover:text-[#7ee3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ee3ff] md:right-8 md:bottom-8"
        >
          <ArrowUp aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
