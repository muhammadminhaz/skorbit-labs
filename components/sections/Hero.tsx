import type { CSSProperties } from "react";
import CtaLink from "@/components/CtaLink";
import FlutedGlassShader from "@/components/FlutedGlassShader";
import { motionTokens } from "@/components/arc/motion-tokens";
import ServiceStrip from "@/components/ServiceStrip";

const HEADLINE = ["From execution to distribution,", "we do it all"];
// Entrance runs in CSS (.hero-rise in globals.css), not framer-motion, so the copy paints before
// JavaScript loads instead of waiting for hydration; that copy is the page's LCP.
const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as CSSProperties;

export default function Hero() {

  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(47,155,224,0.14)_0%,rgba(47,155,224,0.04)_35%,transparent_65%)]" />
      <FlutedGlassShader className="absolute inset-0 -z-10 h-full w-full" />
      {/* Scrim keeps the copy readable over the brightest ridges */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(7,8,11,0.72),transparent)]" />

      <div className="flex flex-1 items-center justify-center px-6 pt-56 pb-16 md:px-12 md:pt-32">
      <div className="flex max-w-6xl flex-col items-center text-center">
        <h1 className="text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
          {HEADLINE.map((line, l) => (
            <span key={l} className="block lg:whitespace-nowrap">
              {line.split(" ").map((word, w) => {
                const i = (l ? HEADLINE[0].split(" ").length : 0) + w;
                return (
                  <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
                    <span className="hero-rise inline-block" style={rise(0.15 + i * motionTokens.stagger.word * 1.5)}>
                      {word}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p style={rise(0.7)} className="hero-rise mt-7 max-w-3xl text-lg leading-relaxed text-(--fg-muted) text-pretty md:text-xl">
          We build brands, websites and digital experiences with intention, clarity and care, and run the marketing that drives growth.
        </p>

        {/* 1fr columns in a shrink-wrapped grid: both buttons take the wider label's width */}
        <div style={rise(0.85)} className="hero-rise mt-11 grid w-full grid-cols-1 gap-3 sm:inline-grid sm:w-auto sm:grid-cols-[1fr_1fr]">
          <CtaLink href="/contact" className="w-full text-base!">Book a call</CtaLink>
          <CtaLink href="/work" variant="secondary" className="w-full text-base!">Explore our work</CtaLink>
        </div>
      </div>
      </div>

      <div style={rise(1)} className="hero-rise">
        <ServiceStrip />
      </div>
    </section>
  );
}
