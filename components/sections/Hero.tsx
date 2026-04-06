"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";

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

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Generate floating shapes on mount
  useEffect(() => {
    const generatedShapes: FloatingShape[] = [];
    const shapeCount = 12;

    for (let i = 0; i < shapeCount; i++) {
      const types: ("circle" | "square" | "ring")[] = ["circle", "square", "ring"];
      const colors = [
        "rgba(14, 165, 233, 0.15)",   // sky-500
        "rgba(168, 85, 247, 0.1)",    // purple-500
        "rgba(56, 189, 248, 0.12)",   // sky-400
        "rgba(99, 102, 241, 0.1)",    // indigo-500
      ];

      generatedShapes.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: 10 + Math.random() * 80, // percentage
        y: 10 + Math.random() * 80,
        size: 60 + Math.random() * 140,
        depth: Math.random(), // 0-1 for parallax intensity
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        floatSpeed: 3 + Math.random() * 4,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    setShapes(generatedShapes);
  }, []);

  // Handle mouse move for parallax and spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePos({ x, y });
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);

    // Update spotlight position
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `
        radial-gradient(
          600px circle at ${x * 100}% ${y * 100}%,
          rgba(14, 165, 233, 0.08),
          transparent 40%
        )
      `;
    }
  }, [mouseX, mouseY]);

  // Scroll-triggered fade/blur effect
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        filter: "blur(20px)",
        opacity: 0,
        scale: 0.9,
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
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  const headline = "From execution to distribution, we do it all";
  const words = headline.split(" ");

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="hero-container sticky top-0 z-0 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white pt-20 relative"
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 z-0" />

      {/* Animated mesh gradient blobs */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Blob 1 - Large cyan */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "15%", "-5%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Blob 2 - Purple */}
        <motion.div
          animate={{
            x: ["10%", "-15%", "10%"],
            y: ["5%", "-10%", "5%"],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -right-1/4 w-[70vw] h-[70vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Blob 3 - Indigo */}
        <motion.div
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["10%", "-5%", "10%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Floating geometric shapes with parallax */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {shapes.map((shape) => {
          // Calculate parallax offset based on mouse position and depth
          const parallaxX = (mousePos.x - 0.5) * shape.depth * 100;
          const parallaxY = (mousePos.y - 0.5) * shape.depth * 100;

          return (
            <motion.div
              key={shape.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isLoaded ? {
                opacity: 1,
                scale: 1,
                x: parallaxX,
                y: parallaxY,
                rotate: shape.rotation + 360 * shape.rotationSpeed * 10,
              } : {}}
              transition={{
                opacity: { duration: 1, delay: shape.id * 0.05 },
                scale: { duration: 0.8, delay: shape.id * 0.05, type: "spring" },
                x: { duration: 0.8, ease: "easeOut" },
                y: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className="absolute"
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: shape.size,
                height: shape.size,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: shape.floatSpeed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: shape.floatOffset,
                }}
                className="w-full h-full"
              >
                {shape.type === "circle" && (
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: shape.color,
                      boxShadow: `0 0 ${shape.size}px ${shape.color}`,
                    }}
                  />
                )}
                {shape.type === "square" && (
                  <div
                    className="w-full h-full rotate-45"
                    style={{
                      background: shape.color,
                      border: `1px solid rgba(255,255,255,0.1)`,
                    }}
                  />
                )}
                {shape.type === "ring" && (
                  <div
                    className="w-full h-full rounded-full border-2"
                    style={{
                      borderColor: shape.color,
                      boxShadow: `0 0 ${shape.size * 0.3}px ${shape.color}`,
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive spotlight that follows cursor */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-[3] pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(
            600px circle at 50% 50%,
            rgba(14, 165, 233, 0.08),
            transparent 40%
          )`,
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-[4] pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
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
        className="hero-content container relative z-20 px-6 md:px-12 flex flex-col items-center text-center gap-8 max-w-6xl"
      >
        {/* Logo Icon - Positioned as brand anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind logo */}
          <div className="absolute inset-0 bg-sky-500/30 blur-[40px] rounded-full scale-150" />

          {/* Logo container */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <img
              src="/images/logo_icon.png"
              alt="Skorbit Labs"
              className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_30px_rgba(14,165,233,0.4)]"
            />
          </motion.div>

          {/* Orbiting ring decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-6"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400/60 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Status Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-sm font-medium text-neutral-300">Open for projects</span>
        </motion.div>

        {/* Headline with character animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
          style={{ perspective: "1000px" }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  className="inline-block"
                  style={{
                    transformStyle: "preserve-3d",
                    textShadow: "0 0 80px rgba(14, 165, 233, 0.3)"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Eliminating friction between product creation, market entry, and growth
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full"
        >
          <Link href="/book" className="group w-full sm:w-auto flex justify-center">
            <MagneticButton className="bg-white text-neutral-950 hover:bg-neutral-100 flex items-center justify-center gap-3 px-8 py-4 text-base font-medium shadow-[0_0_60px_rgba(255,255,255,0.15)] w-full sm:w-auto">
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </Link>

          <Link href="/work" className="w-full sm:w-auto flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm w-full sm:w-auto"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Explore Our Work</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Bold Corner Frame Elements */}
      <div className="absolute top-6 left-6 w-32 h-32 z-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-sky-400/60" />
      </div>

      <div className="absolute top-6 right-6 w-32 h-32 z-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-white/40 to-transparent" />
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-white/40 to-transparent" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-sky-400/60" />
      </div>

      <div className="absolute bottom-6 left-6 w-32 h-32 z-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-sky-400/60" />
      </div>

      <div className="absolute bottom-6 right-6 w-32 h-32 z-30 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-white/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-white/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-sky-400/60" />
      </div>

      {/* Accent glow at corners */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
