"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import CtaButton from "../ui/CtaButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const shapeClass = "rounded-tl-[3rem] rounded-br-[3rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] rounded-tr-xl rounded-bl-xl";

// Isolated so the per-second tick re-renders only this text node, not the whole footer.
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      const gmtOffset = -now.getTimezoneOffset() / 60;
      setTime(`${timeString} (GMT${gmtOffset >= 0 ? "+" : ""}${gmtOffset})`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  return <p className="text-neutral-600 font-mono text-sm">{time}</p>;
}

const indexLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const indexLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bigTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
      });

      const links = [...indexLinksRef.current, ...socialLinksRef.current].filter(Boolean);
      gsap.from(links, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: { trigger: links[0], start: "top 95%" },
      });

      if (bigTextRef.current) {
        const text = bigTextRef.current.textContent || "";
        bigTextRef.current.textContent = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.innerHTML = char === " " ? "&nbsp;" : char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          bigTextRef.current?.appendChild(span);
        });
        gsap.to(bigTextRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: bigTextRef.current, start: "top 90%" },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="footer"
      ref={footerRef}
      className="relative z-20 min-h-screen bg-black p-4 md:p-8 flex flex-col"
    >
      <div className={`relative bg-neutral-900/60 border border-white/10 overflow-hidden w-full grow flex flex-col ${shapeClass}`}>
        <div className="relative z-10 grow flex flex-col p-6 md:p-12">
          {/* Top CTA block */}
          <div
            ref={titleRef}
            className={`relative ${shapeClass} bg-linear-to-br from-sky-400/20 to-sky-500/30 p-8 sm:p-12 md:p-20 flex flex-col items-center text-center -m-6 md:-m-12 mb-12`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-sky-50 to-sky-200 mb-6">
              Join the thrill
            </h2>
            <CtaButton href="/contact">Book a call</CtaButton>
          </div>

          {/* Middle nav */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto pt-12">
            <div className="md:col-span-3 flex flex-col gap-4">
              <h3 className="text-neutral-500 uppercase tracking-wider text-sm font-medium">Index</h3>
              <nav className="flex flex-col gap-2">
                {indexLinks.map((item, i) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    ref={el => { indexLinksRef.current[i] = el; }}
                    className="text-neutral-300 hover:text-white transition-colors text-lg"
                  >
                    {item.name}
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
              <Clock />
            </div>
          </div>

          {/* Big wordmark */}
          <div className="w-full overflow-hidden relative mt-auto -mb-6 md:-mb-12">
            <p
              aria-hidden
              ref={bigTextRef}
              className="font-heading text-[13vw] leading-[1] font-bold text-white text-center tracking-tighter select-none opacity-90 whitespace-nowrap"
            >
              Skorbit Labs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
