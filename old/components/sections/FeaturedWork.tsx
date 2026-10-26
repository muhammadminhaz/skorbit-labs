"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/ui/CtaButton";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Project {
    id: number;
    title: string;
    category: string;
    href?: string;
    image?: string;
    revealImage?: string;
    tags: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "POS-sible",
        category: "Retail SaaS · Point of sale",
        href: "/work/pos-sible",
        image: "/images/work/possible-landing.jpg",
        revealImage: "/images/work/possible-dashboard.webp",
        tags: ["Next.js", "Postgres", "English + Bangla"],
    },
    {
        id: 2,
        title: "Coming soon",
        category: "Next case study in progress",
        tags: [],
    },
];

function ProjectCard({ project, hoveredId, setHoveredId }: {
    project: Project,
    hoveredId: number | null,
    setHoveredId: (id: number | null) => void
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;
  const isLive = Boolean(project.href);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const card = (
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : isOtherHovered ? 0.98 : 1,
            x: isOtherHovered ? (project.id < (hoveredId || 0) ? -10 : 10) : 0,
            opacity: isOtherHovered ? 0.5 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseMove={onMouseMove}
          onMouseEnter={() => isLive && setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`group relative flex flex-col gap-4 h-full ${isLive ? "pointer-fine:cursor-none" : ""}`}
        >
            {/* Image Container */}
            <div className={`relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 border transition-colors duration-500 ${isHovered ? "border-white/30" : "border-white/10"}`}>
                {project.image ? (
                    <>
                        {/* Default Image: landing page */}
                        <img
                            src={project.image}
                            alt={`${project.title} landing page`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Reveal Image (Masked): product */}
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                            style={{
                                backgroundImage: `url(${project.revealImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "top center",
                                maskImage: mask,
                                WebkitMaskImage: mask,
                                opacity: isHovered ? 1 : 0
                            }}
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#0b0f14] border border-dashed border-white/10 rounded-2xl">
                        <img src="/images/logo_icon.png" alt="" className="w-16 h-16 object-contain opacity-30" />
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            Coming soon
                        </span>
                    </div>
                )}

                {/* Tags */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 pointer-events-none">
                    {project.tags.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className="px-3 py-1.5 rounded-lg bg-neutral-950/85 border border-white/15 text-xs font-medium text-white"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Custom Cursor */}
            {isLive && (
                <motion.div
                    className="hidden pointer-fine:flex absolute z-30 pointer-events-none items-center justify-center bg-sky-400 text-neutral-950 text-sm font-bold rounded-lg px-4 py-2 whitespace-nowrap"
                    style={{
                        left: mouseX,
                        top: mouseY,
                        x: "-50%",
                        y: "-50%",
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.5,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                >
                    View case study
                </motion.div>
            )}

            {/* Content */}
            <div className="space-y-1">
                <h3 className={`text-2xl font-semibold text-white transition-colors ${isLive ? "group-hover:text-sky-400" : ""}`}>{project.title}</h3>
                <p className="text-neutral-400">{project.category}</p>
            </div>
        </motion.div>
  );

  return isLive ? (
    <Link href={project.href!} className="block h-full project-card">{card}</Link>
  ) : (
    <div className="h-full project-card">{card}</div>
  );
}

export default function FeaturedWork({ showAllLink = true }: { showAllLink?: boolean }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
      const ctx = gsap.context(() => {
          gsap.from(titleRef.current, {
              scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  end: "top 50%",
                  scrub: 1,
              },
              y: 100,
              opacity: 0,
          });

          // Left card enters from the left, right card from the right
          const cards = gsap.utils.toArray<HTMLElement>(".project-card", cardsRef.current);
          cards.forEach((card, i) => {
              gsap.from(card, {
                  scrollTrigger: {
                      trigger: cardsRef.current,
                      start: "top 90%",
                      end: "top 40%",
                      scrub: 1,
                  },
                  x: i === 0 ? -200 : 200,
                  opacity: 0,
              });
          });
      }, sectionRef);

      return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featured-work" className="relative z-20 min-h-screen w-full max-w-[100vw] flex flex-col justify-center py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div ref={titleRef}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-blue-50 to-blue-300 mb-4">Featured Work</h2>
                    <p className="text-lg text-neutral-400 max-w-xl">
                        Products we design, build and ship end to end.
                    </p>
                </div>
                {showAllLink && (
                    <div className="hidden md:block">
                        <CtaButton href="/work" variant="ghost">View all work</CtaButton>
                    </div>
                )}
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                    />
                ))}
            </div>

            {showAllLink && (
                <div className="mt-12 flex md:hidden justify-center">
                    <CtaButton href="/work" variant="ghost" className="w-full">View all work</CtaButton>
                </div>
            )}
        </div>
    </section>
  );
}
