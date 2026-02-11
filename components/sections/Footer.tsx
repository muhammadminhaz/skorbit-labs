"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "../ui/MagneticButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlowBlockProps {
  children: React.ReactNode;
  className?: string;
  mousePos: { x: number, y: number };
  containerHovered: boolean;
  glowColor?: string;
}

const GlowBlock = ({
  children,
  className = "",
  mousePos,
  containerHovered,
  glowColor = "rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)",
}: GlowBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [localMousePos, setLocalMousePos] = useState({ x: -1000, y: -1000 });

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

  const shapeClass = "rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-xl rounded-bl-xl";

  return (
    <div
      ref={blockRef}
      className={`relative group bg-neutral-900/60 backdrop-blur-xl border border-white/10 overflow-hidden ${shapeClass} ${className}`}
    >
      {/* Border Glow Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${shapeClass}`}
        style={{
          opacity: containerHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(600px circle at ${localMousePos.x}px ${localMousePos.y}px, ${glowColor}, transparent 80%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  );
};

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const indexLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const gmtOffset = -now.getTimezoneOffset() / 60;
      setTime(`${timeString} (GMT${gmtOffset >= 0 ? '+' : ''}${gmtOffset})`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const ctx = gsap.context(() => {
      // Animate title and button
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        }
      });

      // Animate links
      const animateLinks = (links: (HTMLAnchorElement | null)[]) => {
        links.forEach((link, index) => {
          if (link) {
            gsap.from(link, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: link,
                start: "top 95%",
              }
            });
          }
        });
      };
      animateLinks(indexLinksRef.current);
      animateLinks(socialLinksRef.current);

      // Animate big text
      if (bigTextRef.current) {
        const text = bigTextRef.current.textContent || "";
        bigTextRef.current.textContent = "";
        const chars = text.split("");
        
        chars.forEach((char, index) => {
          const span = document.createElement("span");
          span.innerHTML = char === ' ' ? '&nbsp;' : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          bigTextRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: {
              trigger: bigTextRef.current,
              start: "top 90%",
            }
          });
        });
      }
    }, footerRef);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  };

  const shapeClass = "rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-xl rounded-bl-xl";

  return (
      <section 
        id="footer" 
        ref={footerRef}
        className="relative z-20 min-h-screen bg-black p-4 md:p-8 flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          <GlowBlock
              mousePos={mousePos}
              containerHovered={isHovered}
              className="w-full grow flex flex-col"
          >
              <div className="relative z-10 grow flex flex-col p-6 md:p-12">
                {/* Top Sub-Container */}
                <div ref={titleRef} className={`relative ${shapeClass} bg-linear-to-br from-blue-400/20 to-blue-400 backdrop-blur-lg p-12 md:p-20 flex flex-col items-center text-center -m-6 md:-m-12 mb-12`}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/60 mb-6">
                        Join the thrill
                    </h2>
                    <MagneticButton className="text-lg cursor-pointer">Let's Talk</MagneticButton>
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto pt-12">
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <h3 className="text-neutral-500 uppercase tracking-wider text-sm font-medium">Index</h3>
                    <nav className="flex flex-col gap-2">
                      {['Home', 'Services', 'Privacy Policy', 'Terms of Use'].map((item, i) => (
                        <Link key={item} href="#" ref={el => indexLinksRef.current[i] = el} className="text-neutral-300 hover:text-white transition-colors text-lg">
                          {item}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <h3 className="text-neutral-500 uppercase tracking-wider text-sm font-medium">Social</h3>
                    <nav className="flex flex-col gap-2">
                      {['Facebook', 'X', 'Instagram', 'LinkedIn'].map((item, i) => (
                        <Link key={item} href="#" ref={el => socialLinksRef.current[i] = el} className="text-neutral-300 hover:text-white transition-colors text-lg">
                          {item}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="md:col-span-6 flex items-end justify-end">
                    <p className="text-neutral-600 font-mono text-sm">{time}</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="w-full overflow-hidden relative mt-auto -mb-6 md:-mb-12">
                    <h1 ref={bigTextRef} className="text-[13vw] leading-none font-bold text-white text-center tracking-tighter select-none opacity-90 whitespace-nowrap mb-1">
                        Skorbit Labs
                    </h1>
                </div>
              </div>
          </GlowBlock>
      </section>
  );
}
