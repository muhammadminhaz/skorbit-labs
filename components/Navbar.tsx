"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

interface GlowBlockProps {
  children: React.ReactNode;
  className?: string;
  mousePos: { x: number, y: number };
  isHovered: boolean;
  containerHovered: boolean;
  shape?: "square" | "pill" | "asymmetric" | "circle";
  glowColor?: string;
  onClick?: () => void;
}

const GlowBlock = ({ 
  children, 
  className = "", 
  mousePos, 
  isHovered, 
  containerHovered, 
  shape = "square",
  glowColor = "rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8)",
  onClick
}: GlowBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

  const shapeStyles = {
    square: "rounded-sm",
    pill: "rounded-full",
    asymmetric: "rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-sm rounded-bl-sm",
    circle: "rounded-full aspect-square !px-0",
  };

  useEffect(() => {
    const updateLocalMousePos = () => {
      if (blockRef.current) {
        const rect = blockRef.current.getBoundingClientRect();
        setLocalMousePos({
          x: Math.round(mousePos.x - rect.left),
          y: Math.round(mousePos.y - rect.top),
        });
      }
    };

    const rafId = requestAnimationFrame(updateLocalMousePos);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos]);

  return (
    <div
      ref={blockRef}
      onClick={onClick}
      className={`relative group bg-black/5 backdrop-blur-md border border-black/10 flex items-center justify-center transition-[background-color,border-color,transform] duration-200 whitespace-nowrap overflow-hidden px-6 h-14 ${shapeStyles[shape]} ${className}`}
    >
      {/* Border Glow Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${shapeStyles[shape]}`}
        style={{
          opacity: containerHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(120px circle at ${localMousePos.x}px ${localMousePos.y}px, ${glowColor}, transparent 80%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionColors: Record<string, string> = {
    hero: "rgba(239, 68, 68, 0.8), rgba(153, 27, 27, 0.8)", // Red
    "featured-work": "rgba(34, 197, 94, 0.8), rgba(21, 128, 61, 0.8)", // Green
    introduction: "rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.8)", // Blue
    services: "rgba(249, 115, 22, 0.8), rgba(194, 65, 12, 0.8)", // Orange
    testimonials: "rgba(239, 68, 68, 0.8), rgba(153, 27, 27, 0.8)", // Red
    contact: "rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.8)", // Blue
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // If we're not on the home page, set active section based on pathname
    if (pathname !== "/") {
      if (pathname.includes("/work")) setActiveSection("featured-work");
      else if (pathname.includes("/about")) setActiveSection("introduction");
      else if (pathname.includes("/services")) setActiveSection("services");
      else if (pathname.includes("/contact")) setActiveSection("contact");
      else if (pathname.includes("/testimonials")) setActiveSection("testimonials");
    } else {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      };

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      const sections = ["hero", "featured-work", "introduction", "services", "testimonials", "contact"];
      
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [pathname]);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  };

  const currentGlowColor = sectionColors[activeSection] || sectionColors.hero;

  return (
    <div className={`fixed left-0 w-full z-50 flex flex-col items-center px-4 transition-all duration-500 ease-in-out ${
      isScrolled ? "top-4 md:top-8" : "top-8"
    }`}>
      <nav 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex flex-col md:flex-row items-center gap-2 md:gap-4 p-2 group/nav"
      >
        {/* Glow Background for the entire nav group */}
        <div 
          className="absolute inset-0 bg-black/5 backdrop-blur-md border border-black/5 rounded-sm -z-10 opacity-0 transition-opacity duration-500"
        />

        {/* Menus Block - Top on mobile, Center on desktop */}
        <div className={`order-1 md:order-2 transition-all duration-500 ease-in-out overflow-hidden ${
          isScrolled 
            ? "max-h-0 opacity-0 -translate-y-4 pointer-events-none md:max-h-20 md:opacity-100 md:translate-y-0 md:pointer-events-auto" 
            : "max-h-20 opacity-100 translate-y-0"
        }`}>
          <GlowBlock 
            mousePos={mousePos} 
            isHovered={isHovered} 
            containerHovered={isHovered} 
            shape="pill"
            glowColor={currentGlowColor}
            className="px-4"
          >
            <ul className="flex items-center">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <li className="relative h-5 flex items-center overflow-hidden group/link">
                    <Link
                      href={link.href}
                      className="text-sm font-medium transition-transform duration-500 ease-in-out flex flex-col h-full"
                    >
                      <span className="flex items-center h-full group-hover/link:-translate-y-full transition-transform duration-500 ease-in-out">
                        {link.name}
                      </span>
                      <span className="flex items-center h-full group-hover/link:-translate-y-full transition-transform duration-500 ease-in-out text-black/60">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                  {index < navLinks.length - 1 && (
                    <span className="mx-2 md:mx-3 text-black/20 text-xs font-light">|</span>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </GlowBlock>
        </div>

        {/* Container for Studio and Icon on mobile to be side-by-side */}
        <div className="order-2 flex items-center gap-2 md:gap-4 md:contents">
          {/* Studio Name Block */}
          <div className="md:order-1">
            <GlowBlock 
              mousePos={mousePos} 
              isHovered={isHovered} 
              containerHovered={isHovered} 
              shape="asymmetric"
              glowColor={currentGlowColor}
              className="px-4 md:px-6"
            >
              <Link href="/" className="font-bold text-base md:text-lg tracking-tight">
                hrts.studio
              </Link>
            </GlowBlock>
          </div>

          {/* 9-Dot Icon Block */}
          <div className="md:order-3">
            <GlowBlock 
              mousePos={mousePos} 
              isHovered={isHovered} 
              containerHovered={isHovered} 
              shape="circle" 
              glowColor={currentGlowColor}
            >
              <div className="grid grid-cols-3 gap-1 group/dots transition-transform duration-500 ease-in-out group-hover:rotate-180">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-current rounded-full transition-transform"
                  />
                ))}
              </div>
            </GlowBlock>
          </div>
        </div>
      </nav>
    </div>
  );
}
