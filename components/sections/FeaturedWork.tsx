"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CtaLink from "@/components/CtaLink";
import { motionTokens } from "@/components/arc/motion-tokens";
import type { Service } from "@/lib/services";

interface Project {
  id: number;
  title: string;
  category: string;
  href?: string;
  image?: string;
  revealImage?: string;
  tags: Service[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "POS-sible",
    category: "Retail SaaS · Point of sale",
    href: "/work/pos-sible",
    image: "/images/work/possible-landing.jpg",
    revealImage: "/images/work/possible-dashboard.webp",
    tags: ["Software Development", "AI Integration"],
  },
  {
    id: 2,
    title: "Coming soon",
    category: "Next case study in progress",
    tags: [],
  },
];

const ease = [...motionTokens.ease.enter] as [number, number, number, number];

function ProjectCard({ project, index, hoveredId, setHoveredId }: {
  project: Project;
  index: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Spotlight that reveals the product dashboard under the landing page
  const mask = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && !isHovered;
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
        opacity: isOtherHovered ? 0.5 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => isLive && setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`group relative flex h-full flex-col gap-5 ${isLive ? "pointer-fine:cursor-none" : ""}`}
    >
      <div className={`relative aspect-4/3 w-full overflow-hidden rounded-2xl border bg-white/[0.03] transition-colors duration-500 ${isHovered ? "border-[#7ee3ff]/40" : "border-white/10"}`}>
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`${project.title} landing page`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${project.revealImage})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                maskImage: mask,
                WebkitMaskImage: mask,
                opacity: isHovered ? 1 : 0,
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <Image src="/images/dark_theme_logo.svg" alt="" width={374} height={455} className="h-14 w-auto opacity-40" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2f9be0]/40 bg-[#2f9be0]/10 px-4 py-2 text-sm text-[#7ee3ff]">
              <span className="size-2 rounded-full bg-[#7ee3ff] motion-safe:animate-pulse" />
              Coming soon
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute top-1/2 left-4 z-20 flex -translate-y-1/2 flex-col items-start gap-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -20 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="rounded-full border border-white/15 bg-[#07080b]/85 px-3.5 py-1.5 text-xs text-white backdrop-blur-md"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {isLive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-30 hidden min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#07080b]/85 px-5 text-sm whitespace-nowrap text-white shadow-[0_8px_30px_-8px_rgba(47,155,224,0.6)] backdrop-blur-md pointer-fine:flex"
          style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%", opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          View case study
          <ArrowUpRight aria-hidden className="size-4 text-[#7ee3ff]" strokeWidth={2} />
        </motion.div>
      )}

      <div className="space-y-1">
        <h3 className={`text-2xl text-white transition-colors ${isLive ? "group-hover:text-[#7ee3ff]" : ""}`}>{project.title}</h3>
        <p className="text-(--fg-muted)">{project.category}</p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: index === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease }}
      // Hovered card stacks above everything (sibling card, grid lines, navbar) so its cursor tooltip is never covered
      className={`relative h-full ${isHovered ? "z-[60]" : "z-0"}`}
    >
      {isLive ? <Link href={project.href!} className="block h-full">{card}</Link> : card}
    </motion.div>
  );
}

// header=false on /work, where the page hero already introduces the projects.
export default function FeaturedWork({ showAllLink = true, header = true }: { showAllLink?: boolean; header?: boolean }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="featured-work" className="relative border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        {header && <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="mb-4 text-4xl tracking-[-0.02em] md:text-5xl lg:text-6xl">Our work</h2>
            <p className="max-w-xl text-lg text-(--fg-muted)">Here&apos;s what the momentum looks like.</p>
          </motion.div>
          {showAllLink && (
            <div className="hidden md:block">
              <CtaLink href="/work" variant="secondary">View all work</CtaLink>
            </div>
          )}
        </div>}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} hoveredId={hoveredId} setHoveredId={setHoveredId} />
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 md:hidden">
            <CtaLink href="/work" variant="secondary" className="w-full">View all work</CtaLink>
          </div>
        )}
      </div>
    </section>
  );
}
