"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "../ui/MagneticButton";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlowBlockProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const shapeClass = "rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-xl rounded-bl-xl";

const GlowBlock = ({
  children,
  className = "",
  glowColor = "rgba(14, 165, 233, 0.7), rgba(56, 189, 248, 0.4)",
}: GlowBlockProps) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [hovered, setHovered] = useState(false);
  const gradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        mouseX.set(-1000);
        mouseY.set(-1000);
      }}
      className={`relative group bg-neutral-900/60 backdrop-blur-xl border border-white/10 overflow-hidden ${shapeClass} ${className}`}
    >
      <motion.div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${shapeClass}`}
        style={{
          opacity: hovered ? 1 : 0,
          padding: "1px",
          background: gradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
};

export default function Footer() {
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const indexLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      const gmtOffset = -now.getTimezoneOffset() / 60;
      setTime(`${timeString} (GMT${gmtOffset >= 0 ? "+" : ""}${gmtOffset})`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
      });

      const animateLinks = (links: (HTMLAnchorElement | null)[]) => {
        links.forEach((link, index) => {
          if (link) {
            gsap.from(link, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: { trigger: link, start: "top 95%" },
            });
          }
        });
      };
      animateLinks(indexLinksRef.current);
      animateLinks(socialLinksRef.current);

      if (bigTextRef.current) {
        const text = bigTextRef.current.textContent || "";
        bigTextRef.current.textContent = "";
        text.split("").forEach((char, index) => {
          const span = document.createElement("span");
          span.innerHTML = char === " " ? "&nbsp;" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          bigTextRef.current?.appendChild(span);
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: { trigger: bigTextRef.current, start: "top 90%" },
          });
        });
      }
    }, footerRef);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="footer"
      ref={footerRef}
      className="relative z-20 min-h-screen bg-black p-4 md:p-8 flex flex-col"
    >
      <GlowBlock className="w-full grow flex flex-col">
        <div className="relative z-10 grow flex flex-col p-6 md:p-12">
          {/* Top CTA block */}
          <div
            ref={titleRef}
            className={`relative ${shapeClass} bg-linear-to-br from-sky-400/20 to-sky-500/30 backdrop-blur-lg p-12 md:p-20 flex flex-col items-center text-center -m-6 md:-m-12 mb-12`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-sky-50 to-sky-200 mb-6">
              Join the thrill
            </h2>
            <MagneticButton className="text-lg cursor-pointer">Let&apos;s Talk</MagneticButton>
          </div>

          {/* Middle nav */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto pt-12">
            <div className="md:col-span-3 flex flex-col gap-4">
              <h3 className="text-neutral-500 uppercase tracking-wider text-sm font-medium">Index</h3>
              <nav className="flex flex-col gap-2">
                {["Home", "Services", "Privacy Policy", "Terms of Use"].map((item, i) => (
                  <Link
                    key={item}
                    href="#"
                    ref={el => { indexLinksRef.current[i] = el; }}
                    className="text-neutral-300 hover:text-white transition-colors text-lg"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4">
              <h3 className="text-neutral-500 uppercase tracking-wider text-sm font-medium">Social</h3>
              <nav className="flex flex-col gap-2">
                {["Facebook", "X", "Instagram", "LinkedIn"].map((item, i) => (
                  <Link
                    key={item}
                    href="#"
                    ref={el => { socialLinksRef.current[i] = el; }}
                    className="text-neutral-300 hover:text-white transition-colors text-lg"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="md:col-span-6 flex items-end justify-end">
              <p className="text-neutral-600 font-mono text-sm">{time}</p>
            </div>
          </div>

          {/* Big wordmark */}
          <div className="w-full overflow-hidden relative mt-auto -mb-6 md:-mb-12">
            <h1
              ref={bigTextRef}
              className="text-[13vw] leading-[1] font-bold text-white text-center tracking-tighter select-none opacity-90 whitespace-nowrap"
            >
              Skorbit Labs
            </h1>
          </div>
        </div>
      </GlowBlock>
    </section>
  );
}
