"use client";

import { House } from "lucide-react";
import CtaLink from "@/components/CtaLink";

export default function NotFound() {
  return (
    <main className="relative isolate px-4 md:px-8">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(47,155,224,0.14)_0%,transparent_70%)]" />
      <div className="mx-auto flex min-h-[80svh] max-w-7xl flex-col items-start justify-center px-6 pt-48 pb-24 md:px-12">
        <h1 className="text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">This page does not exist</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--fg-muted)">
          The link may be old or mistyped. Head back to the home page, or see what we have been building.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/" icon={House}>Back to home</CtaLink>
          <CtaLink href="/work" variant="secondary">See our work</CtaLink>
        </div>
      </div>
    </main>
  );
}
