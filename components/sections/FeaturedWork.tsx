"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const projects = [
    {
        id: 1,
        title: "Lumina Finance",
        category: "Fintech Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        revealImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        tags: ["AI Integration", "Data Viz", "React"]
    },
    {
        id: 2,
        title: "Nebula Health",
        category: "Medical Platform",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2670&auto=format&fit=crop",
        revealImage: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2670&auto=format&fit=crop",
        tags: ["Telemedicine", "Mobile App", "Secure"]
    },
    {
        id: 3,
        title: "Elevate Commerce",
        category: "E-commerce Solution",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        revealImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2670&auto=format&fit=crop",
        tags: ["Shopify", "UX/UI", "Conversion"]
    }
];

function ProjectCard({ project, hoveredId, setHoveredId }: { 
    project: typeof projects[0], 
    hoveredId: number | null, 
    setHoveredId: (id: number | null) => void 
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={`/work/${project.id}`} className="block h-full project-card">
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : isOtherHovered ? 0.98 : 1,
            x: isOtherHovered ? (project.id < (hoveredId || 0) ? -10 : 10) : 0,
            opacity: isOtherHovered ? 0.5 : 1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="group relative flex flex-col gap-4 cursor-none h-full"
        >
            {/* Image Container */}
            <div className={`relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-500 ${isHovered ? 'shadow-[0_0_30px_rgba(14,165,233,0.3)] ring-2 ring-sky-400/50' : 'border border-white/10'}`}>
                {/* Default Image */}
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                
                {/* Reveal Image (Masked) */}
                <motion.div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        backgroundImage: `url(${project.revealImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        maskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
                        WebkitMaskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* Glassmorphic Tags */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 pointer-events-none">
                    {project.tags.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-lg"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Custom Cursor "Show Project" */}
            <motion.div
                className="absolute z-30 pointer-events-none flex items-center justify-center bg-sky-500/90 text-white text-sm font-bold rounded-lg px-4 py-2 backdrop-blur-sm shadow-xl whitespace-nowrap"
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
                Show Project
            </motion.div>

            {/* Content */}
            <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-white group-hover:text-sky-400 transition-colors">{project.title}</h3>
                <p className="text-neutral-400">{project.category}</p>
            </div>
        </motion.div>
    </Link>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode, href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Link 
                ref={ref}
                href={href}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
            >
                {children}
            </Link>
        </motion.div>
    );
}

export default function FeaturedWork() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
      const ctx = gsap.context(() => {
          // Title Animation
          gsap.from(titleRef.current, {
              scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  end: "top 50%",
                  scrub: 1,
              },
              y: 100,
              opacity: 0,
              duration: 1
          });

          // Cards Animation
          const cards = document.querySelectorAll(".project-card");
          
          // Left Card (Index 0) - Enters from Left
          gsap.from(cards[0], {
              scrollTrigger: {
                  trigger: cardsRef.current,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1,
              },
              x: -200,
              opacity: 0,
              duration: 1
          });

          // Middle Card (Index 1) - Enters from Bottom
          gsap.from(cards[1], {
              scrollTrigger: {
                  trigger: cardsRef.current,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1,
              },
              y: 100,
              opacity: 0,
              duration: 1
          });

          // Right Card (Index 2) - Enters from Right
          gsap.from(cards[2], {
              scrollTrigger: {
                  trigger: cardsRef.current,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1,
              },
              x: 200,
              opacity: 0,
              duration: 1
          });

      }, sectionRef);

      return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featured-work" className="relative z-20 min-h-screen w-full max-w-[100vw] flex flex-col justify-center py-32 bg-neutral-950 text-white overflow-hidden">
        <div className="container px-4 mx-auto w-full max-w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div ref={titleRef}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/60 mb-4">Featured Work</h2>
                    <p className="text-lg text-neutral-400 max-w-xl">
                        We build digital products that define brands and drive growth. Here are a few of our favorites.
                    </p>
                </div>
                <div className="hidden md:block">
                    <MagneticButton href="/work">
                        View All Work
                        <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                </div>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                    />
                ))}
            </div>

            <div className="mt-12 flex md:hidden justify-center">
                 <MagneticButton href="/work">
                    View All Work
                    <ArrowRight className="w-4 h-4" />
                </MagneticButton>
            </div>
        </div>
    </section>
  );
}
