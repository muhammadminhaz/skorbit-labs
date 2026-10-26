import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import FlutedGlassShader from "@/components/FlutedGlassShader";
import ServiceStrip from "@/components/ServiceStrip";
import { CONTACT_EMAIL as EMAIL, TEAM_COUNTRIES_TEXT } from "@/lib/site";

const PAGES = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* CTA band over the hero's shader, closed by the same service strip as the hero */}
      <div className="relative isolate overflow-hidden">
        <FlutedGlassShader className="absolute inset-0 -z-10 h-full w-full" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_55%_at_50%_45%,rgba(7,8,11,0.72),transparent)]" />

        <div className="flex flex-col items-center px-6 py-28 text-center md:py-40">
          <h2 className="max-w-4xl text-4xl leading-[1.08] tracking-[-0.03em] text-balance md:text-6xl lg:text-7xl">
            Turn your idea into a product that grows
          </h2>
          <div className="mt-10">
            <CtaLink href="/contact">Book a call</CtaLink>
          </div>
        </div>

        <ServiceStrip />
      </div>

      <div className="border-t border-white/10 px-4 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-12 md:py-20">
          <div className="flex max-w-sm flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 text-xl text-white">
              <Image src="/images/dark_theme_logo.svg" alt="" width={374} height={455} className="h-8 w-auto" />
              Skorbit Labs
            </Link>
            <p className="leading-relaxed text-(--fg-muted)">
              A people-first studio turning ideas into products, brands and growth that last. Working worldwide from{" "}
              {TEAM_COUNTRIES_TEXT}.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <span className="text-xs tracking-[0.2em] text-white/45 uppercase">Pages</span>
            <ul className="flex flex-col gap-2.5">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="text-white/85 transition-colors hover:text-[#7ee3ff]">{page.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="text-xs tracking-[0.2em] text-white/45 uppercase">Get in touch</span>
            <a href={`mailto:${EMAIL}`} className="w-fit text-white/85 transition-colors hover:text-[#7ee3ff]">{EMAIL}</a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 px-6 py-6 text-sm text-white/40 md:flex-row md:px-12">
          <span>© {new Date().getFullYear()} Skorbit Labs. All rights reserved.</span>
          <span>Built with intention, clarity and care.</span>
        </div>
      </div>
    </footer>
  );
}
