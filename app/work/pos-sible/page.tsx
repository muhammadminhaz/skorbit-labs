import type { Metadata } from "next";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import Image from "next/image";
import { Boxes, Cookie, Fingerprint, Languages, Layers, Lightbulb, Server, ShieldCheck, ShoppingCart, Smartphone, Wallet } from "lucide-react";
import CtaLink from "@/components/CtaLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "POS-sible Case Study",
  description: "How Skorbit Labs designed and built POS-sible, a multi-language point of sale SaaS for retail shops that turns every sale into a clear next step.",
  path: "/work/pos-sible",
});

// Content from the old site's case study (old/app/work/pos-sible/page.tsx).
const LIVE_URL = "https://pos-sible.vercel.app";

const META = [
  { label: "Client", value: "In-house product" },
  { label: "Scope", value: "Product, design, engineering" },
  { label: "Platform", value: "Web app and Postgres API" },
  { label: "Languages", value: "English and Bangla" },
];

const LOCAL = [
  { icon: Languages, title: "Bangla throughout", body: "Every screen, receipt and report works in Bangla as well as English, not as a translated afterthought." },
  { icon: Wallet, title: "Mobile wallets at the till", body: "bKash, Nagad, Rocket and Upay sit next to cash and card, among nine payment methods, with split payments." },
  { icon: Smartphone, title: "Customers one tap away", body: "Phone numbers open straight into a call or WhatsApp, because that is how shops actually follow up." },
];

const BUILT = [
  { icon: ShoppingCart, title: "Selling", body: "A fast register with barcode scanning, variations, serial and IMEI tracking, split payments, suspend and resume, quotations, credit sales, and thermal or A4 receipts." },
  { icon: Boxes, title: "Back office", body: "Catalog, stock per location with FIFO or LIFO costing, transfers, purchases and returns, expenses, and double-entry accounts that reconcile with stock." },
  { icon: Lightbulb, title: "Growth layer", body: "An Opportunities inbox ranks the next best moves by the money each could bring. Goals forecast where the month will land and say how much more a day closes the gap." },
  { icon: ShieldCheck, title: "Teams and platform", body: "Staff sign-in, a role permission matrix, audit stamps on every record, and an owner console for subscriptions, packages and revenue across fully isolated businesses." },
];

const DECISIONS = [
  { icon: Layers, title: "One codebase, two modes", body: "The same app runs as a browser-only demo with generated data, or in API mode backed by Postgres. Sales demos need no server, and real shops get a real backend." },
  { icon: Server, title: "Rules live on the server", body: "Screens talk to services. In API mode those services run on the server, so permissions and business rules hold no matter which screen calls them." },
  { icon: Fingerprint, title: "Accountability in one place", body: "Created by, created at, updated by and updated at are written automatically on every record, so no screen can forget or forge them." },
  { icon: Cookie, title: "First-party sessions", body: "The web app proxies /api to the backend, so session cookies stay first-party and the browser only ever talks to one origin." },
];

const NUMBERS = [
  { value: "87", label: "Route pages live" },
  { value: "8 of 8", label: "Sub-projects shipped" },
  { value: "9", label: "Payment methods at the till, including bKash and Nagad" },
  { value: "2", label: "Modes from one codebase: browser demo and Postgres API" },
];

const STACK = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack", "next-intl", "Highcharts", "PostgreSQL", "Playwright", "Vercel", "Coolify"];

const shell = "mx-auto max-w-7xl px-6 md:px-12";
const h2 = "text-4xl leading-[1.08] tracking-[-0.02em] text-balance md:text-5xl";

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="relative border-t border-white/10 px-4 md:px-8">
      <div className={`${shell} py-24 md:py-32`}>
        <Reveal className="mb-14 max-w-3xl md:mb-16">
          <h2 className={h2}>{title}</h2>
          {intro && <p className="mt-6 text-lg leading-relaxed text-(--fg-muted) text-pretty">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function IconCard({ icon: Icon, title, body, delay }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
      <span className="mb-6 grid size-11 place-items-center rounded-xl border border-[#7ee3ff]/25 bg-[#2f9be0]/10 text-[#7ee3ff]">
        <Icon className="size-5" />
      </span>
      <h3 className="mb-3 text-2xl tracking-[-0.01em] text-white">{title}</h3>
      <p className="leading-relaxed text-(--fg-muted)">{body}</p>
    </Reveal>
  );
}

export default function PosSibleCaseStudy() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: "POS-sible", path: "/work/pos-sible" }])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "POS-sible case study",
        description: "How Skorbit Labs designed and built POS-sible, a point of sale SaaS for retail shops.",
        url: `${SITE_URL}/work/pos-sible`,
        image: `${SITE_URL}/images/work/possible-dashboard.webp`,
        inLanguage: "en",
        creator: { "@id": `${SITE_URL}/#organization` },
        about: { "@type": "SoftwareApplication", name: "POS-sible", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: LIVE_URL },
      }} />
      <PageHero
        back={{ href: "/work", label: "All work" }}
        title="POS-sible"
        intro="Other POS software records what happened. POS-sible shows shop owners what is possible next."
      >
        <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
          {META.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-white/45">{m.label}</dt>
              <dd className="mt-1.5 text-white">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:inline-grid sm:w-auto sm:grid-cols-[1fr_1fr]">
          <CtaLink href="/contact" className="w-full">Book a call</CtaLink>
          <CtaLink href={LIVE_URL} variant="secondary" className="w-full">Visit live site</CtaLink>
        </div>
      </PageHero>

      <section className="relative px-4 pb-24 md:px-8 md:pb-32">
        <Reveal className={shell}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(47,155,224,0.45)]">
            <Image
              src="/images/work/possible-dashboard.webp"
              alt="POS-sible home dashboard with sales, purchase, expense and net cards, a sales chart and top products"
              fill
              priority
              sizes="(min-width: 1280px) 1180px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </section>

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <div className={`${shell} grid gap-16 py-24 md:grid-cols-2 md:gap-20 md:py-32`}>
          <Reveal>
            <h2 className={`${h2} mb-8`}>Shops record everything and still guess</h2>
            <div className="space-y-5 text-lg leading-relaxed text-(--fg-muted)">
              <p>A typical retail shop already logs every sale, purchase and expense. The software stops there. The owner still has to work out which product will run out this week, which regulars have gone quiet, and whether the month will hit target.</p>
              <p>Owners in Bangladesh also need things most POS tools treat as an afterthought: Bangla throughout, mobile wallets at the till, and phone numbers that open straight into a call or WhatsApp.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={`${h2} mb-8`}>Turn the data shops already have into a next step</h2>
            <div className="space-y-5 text-lg leading-relaxed text-(--fg-muted)">
              <p>We wanted a point of sale that does the bookkeeping well and then reads it back to the owner in plain English or Bangla: restock this fast seller before it runs out, win back these customers, add this much a day to reach the goal.</p>
              <p>Every figure comes from the shop&apos;s own transactions, so the advice is specific and checkable. The name is the promise: more than a POS, it shows what is possible.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section title="Made for how local shops actually sell" intro="We designed around the counter, not a spreadsheet. Three things most POS tools treat as an afterthought sit at the center of POS-sible.">
        <div className="grid gap-4 md:grid-cols-3">
          {LOCAL.map((item, i) => <IconCard key={item.title} {...item} delay={i * 0.08} />)}
        </div>
      </Section>

      <Section title="A full retail back office with a growth layer on top" intro="Everything a shop needs to run day to day, and one layer most POS tools never get to: what to do next.">
        <div className="grid gap-4 sm:grid-cols-2">
          {BUILT.map((item, i) => <IconCard key={item.title} {...item} delay={(i % 2) * 0.08} />)}
        </div>
      </Section>

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <div className={`${shell} grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[7fr_5fr] lg:gap-20`}>
          <Reveal>
            <div className="relative aspect-[1270/960] overflow-hidden rounded-2xl border border-white/10">
              <Image src="/images/work/possible-landing.jpg" alt="POS-sible landing page explaining the product to shop owners" fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover object-top" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h2 className={h2}>Try it before you trust it</h2>
            <p className="text-lg leading-relaxed text-(--fg-muted) text-pretty">
              The landing page makes the promise in one line, and the demo mode backs it up: the whole app runs in the browser with generated data, so an owner can ring up a sale and read the Opportunities inbox before anyone sets up a server.
            </p>
            <div><CtaLink href={LIVE_URL} variant="secondary">Open the live demo</CtaLink></div>
          </Reveal>
        </div>
      </section>

      <Section title="Decisions that kept it fast to ship and safe to run">
        <div className="grid gap-4 sm:grid-cols-2">
          {DECISIONS.map((item, i) => <IconCard key={item.title} {...item} delay={(i % 2) * 0.08} />)}
        </div>
        <Reveal className="mt-16 border-t border-white/10 pt-10">
          <h3 className="mb-5 text-xl text-white">Stack</h3>
          <ul className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s} className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/80">{s}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section title="By the numbers">
        <Reveal>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {NUMBERS.map((n) => (
              <div key={n.label} className="flex flex-col-reverse justify-end bg-(--bg) p-7 md:p-8">
                <dt className="mt-3 leading-relaxed text-(--fg-muted)">{n.label}</dt>
                <dd className="text-5xl tracking-[-0.03em] text-[#7ee3ff] tabular-nums">{n.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <section className="relative border-t border-white/10 px-4 md:px-8">
        <Reveal className={`${shell} flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center`}>
          <div>
            <h2 className="text-3xl tracking-[-0.02em] md:text-4xl">More case studies are on the way</h2>
            <p className="mt-3 text-lg text-(--fg-muted)">We add new write-ups as projects ship.</p>
          </div>
          <CtaLink href="/work" variant="secondary">All work</CtaLink>
        </Reveal>
      </section>
    </main>
  );
}
