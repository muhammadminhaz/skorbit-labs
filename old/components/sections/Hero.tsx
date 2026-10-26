"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Floating geometric shape
interface FloatingShape {
  id: number;
  type: "circle" | "square" | "ring";
  x: number;
  y: number;
  size: number;
  depth: number; // 0 = far, 1 = close
  color: string;
  rotation: number;
  rotationSpeed: number;
  floatSpeed: number;
  floatOffset: number;
}

// Seeded so server and client render the same shapes (no hydration mismatch, no setState-in-effect).
const SHAPES: FloatingShape[] = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const types: FloatingShape["type"][] = ["circle", "square", "ring"];
  const colors = ["rgba(14, 165, 233, 0.08)", "rgba(56, 189, 248, 0.08)", "rgba(125, 211, 252, 0.08)", "rgba(3, 105, 161, 0.06)"];
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    type: types[Math.floor(rand() * types.length)],
    x: 15 + rand() * 70,
    y: 15 + rand() * 70,
    size: 30 + rand() * 60,
    depth: rand() * 0.6,
    color: colors[Math.floor(rand() * colors.length)],
    rotation: rand() * 360,
    rotationSpeed: (rand() - 0.5) * 0.3,
    floatSpeed: 4 + rand() * 3,
    floatOffset: rand() * Math.PI * 2,
  }));
})();

// Parallax runs on motion values, so mouse movement never re-renders React.
function Shape({ shape, mx, my, isLoaded, reduceMotion }: {
  shape: FloatingShape;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  isLoaded: boolean;
  reduceMotion: boolean | null;
}) {
  const x = useTransform(mx, (v) => v * shape.depth * 100);
  const y = useTransform(my, (v) => v * shape.depth * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: shape.id * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{ left: `${shape.x}%`, top: `${shape.y}%`, width: shape.size, height: shape.size, x, y }}
    >
      <motion.div
        animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [shape.rotation, shape.rotation + 360 * Math.sign(shape.rotationSpeed || 1)] }}
        transition={{
          y: { duration: shape.floatSpeed, repeat: Infinity, ease: "easeInOut", delay: shape.floatOffset },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
        }}
        className="w-full h-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        {shape.type === "circle" && <div className="w-full h-full rounded-full" style={{ background: shape.color }} />}
        {shape.type === "square" && (
          <div className="w-full h-full rotate-45 border border-white/5" style={{ background: shape.color }} />
        )}
        {shape.type === "ring" && <div className="w-full h-full rounded-full border-[1.5px]" style={{ borderColor: shape.color }} />}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);


  // Handle mouse move for parallax and spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  }, [mouseX, mouseY]);

  // Scroll-triggered fade/blur effect
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.94,
        y: -40,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Trigger load animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: "0.6em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const headline = "From execution to distribution, we do it all";
  const words = headline.split(" ");

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="hero-container sticky top-0 z-0 min-h-[100svh] flex flex-col items-center overflow-hidden bg-neutral-950 text-white"
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 z-0" />

      {/* Animated mesh gradient blobs */}
      {/* No overflow-hidden here — Chrome clips filter:blur at container boundary.
          The parent section's overflow-hidden handles containment. */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Blob 1 - Large cyan */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "15%", "-5%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw]"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 65%)",
          }}
        />

        {/* Blob 2 - Light blue */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            x: ["10%", "-15%", "10%"],
            y: ["5%", "-10%", "5%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 -right-1/4 w-[70vw] h-[70vw]"
          style={{
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 65%)",
          }}
        />

        {/* Blob 3 - Sky blue */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            x: ["-5%", "5%", "-5%"],
            y: ["10%", "-5%", "10%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vw]"
          style={{
            background: "radial-gradient(circle, rgba(125, 211, 252, 0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Floating geometric shapes with parallax */}
      <div className="hidden md:block absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {SHAPES.map((shape) => (
          <Shape key={shape.id} shape={shape} mx={smoothMouseX} my={smoothMouseY} isLoaded={isLoaded} reduceMotion={prefersReducedMotion} />
        ))}
      </div>

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="hero-content w-full flex-1 flex flex-col items-center justify-center relative z-20 pt-48 pb-16 md:pt-0 md:pb-0"
      >
        {/* Logo Icon - positioned between nav bottom and headline */}
        <div className="md:pt-36">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind logo — radial-gradient to transparent, no filter blur (avoids Chrome paint-clip issue) */}
          <div className="absolute -inset-16 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.28) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 70%)' }} />
          <div className="absolute -inset-8 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(125, 211, 252, 0.15) 0%, transparent 65%)' }} />

          {/* Logo container with only vertical movement */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative will-change-transform"
          >
            <Image
              src="/images/logo_icon.png"
              alt="Skorbit Labs"
              width={144}
              height={126}
              priority
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain drop-shadow-[0_0_50px_rgba(14,165,233,0.3)]"
            />
          </motion.div>

          {/* 4 orbiting dots with different blue shades */}
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-8 sm:-m-10 will-change-transform"
          >
            {/* Dot 1 - Top - Lightest blue */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-200 rounded-full shadow-[0_0_8px_rgba(186,230,253,0.7)]" />
            {/* Dot 2 - Bottom - Medium blue */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
          </motion.div>

          {/* Second ring with 2 more dots - rotating opposite direction */}
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-12 sm:-m-14 will-change-transform"
          >
            {/* Dot 3 - Left - Darker blue */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-sky-500 rounded-full shadow-[0_0_6px_rgba(14,165,233,0.6)]" />
            {/* Dot 4 - Right - Deepest blue */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 bg-sky-600 rounded-full shadow-[0_0_6px_rgba(2,132,199,0.6)]" />
          </motion.div>
        </motion.div>
        </div>

        {/* Text content — vertically centered in remaining space */}
        <div className="md:flex-1 flex flex-col items-center justify-center text-center gap-7 md:gap-8 max-w-6xl px-6 md:px-12 pb-0 md:pb-20 pt-10 sm:pt-16 w-full">

        {/* Headline with character animation - improved mobile sizing */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] px-2"
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block overflow-hidden pb-[0.08em] mr-[0.25em] align-bottom">
              <motion.span variants={wordVariants} className="inline-block will-change-transform">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subheading - improved mobile responsiveness */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed px-4"
        >
          Eliminating friction between product creation, market entry, and growth
        </motion.p>

        {/* CTA Buttons - improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2"
        >
          <CtaButton href="/contact" className="w-full shadow-[0_0_40px_-4px_rgba(56,189,248,0.55)]">Book a call</CtaButton>
          <CtaButton href="/work" variant="ghost" className="w-full opacity-80 hover:opacity-100 transition-[opacity,transform] [&_.cta-star]:hidden">Explore our work</CtaButton>
        </motion.div>
        </div>
      </div>

      {/* Subtle Corner Frame Elements - hidden on small mobile */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-20 sm:w-32 h-20 sm:h-32 z-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] sm:h-[2px] bg-linear-to-r from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-[1px] sm:w-[2px] h-full bg-linear-to-b from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-l border-t sm:border-l-2 sm:border-t-2 border-sky-400/50 sm:border-sky-400/60" />
      </div>

      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-20 sm:w-32 h-20 sm:h-32 z-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[1px] sm:h-[2px] bg-linear-to-l from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute top-0 right-0 w-[1px] sm:w-[2px] h-full bg-linear-to-b from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute top-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-r border-t sm:border-r-2 sm:border-t-2 border-sky-400/50 sm:border-sky-400/60" />
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-20 sm:w-32 h-20 sm:h-32 z-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[1px] sm:h-[2px] bg-linear-to-r from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[1px] sm:w-[2px] h-full bg-linear-to-r from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-3 sm:w-4 h-3 sm:h-4 border-l border-b sm:border-l-2 sm:border-b-2 border-sky-400/50 sm:border-sky-400/60" />
      </div>

      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-20 sm:w-32 h-20 sm:h-32 z-30 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[1px] sm:h-[2px] bg-linear-to-l from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[1px] sm:w-[2px] h-full bg-linear-to-t from-white/30 sm:from-white/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3 sm:w-4 h-3 sm:h-4 border-r border-b sm:border-r-2 sm:border-b-2 border-sky-400/50 sm:border-sky-400/60" />
      </div>

      {/* Accent glow at corners - all blue */}
      <div className="absolute -top-32 -left-32 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 65%)" }} />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 65%)" }} />
    </section>
  );
}
