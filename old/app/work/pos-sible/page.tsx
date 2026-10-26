import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Boxes, Lightbulb, ShieldCheck, Layers, Server, Fingerprint, Cookie } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import CtaButton from "@/components/ui/CtaButton";

export const metadata: Metadata = {
  title: "POS-sible case study | Skorbit Labs",
  description: "How we designed and built POS-sible, a point of sale for retail shops that turns every sale into a clear next step.",
};

const LIVE_URL = "https://pos-sible.vercel.app";

const meta = [
  { label: "Client", value: "In-house product" },
  { label: "Scope", value: "Product, design, engineering" },
  { label: "Platform", value: "Web app and Postgres API" },
  { label: "Languages", value: "English and Bangla" },
];

const numbers = [
  { value: "87", label: "Route pages live" },
  { value: "8 of 8", label: "Sub-projects shipped" },
  { value: "9", label: "Payment methods at the till, including bKash and Nagad" },
  { value: "2", label: "Modes from one codebase: browser demo and Postgres API" },
];

const built = [
  {
    icon: ShoppingCart,
    title: "Selling",
    body: "A fast register with barcode scanning, variations, serial and IMEI tracking, split payments, suspend and resume, quotations, credit sales, and thermal or A4 receipts.",
  },
  {
    icon: Boxes,
    title: "Back office",
    body: "Catalog, stock per location with FIFO or LIFO costing, transfers, purchases and returns, expenses, and double-entry accounts that reconcile with stock.",
  },
  {
    icon: Lightbulb,
    title: "Growth layer",
    body: "An Opportunities inbox ranks the next best moves by the money each could bring. Goals forecast where the month will land and say how much more a day closes the gap.",
  },
  {
    icon: ShieldCheck,
    title: "Teams and platform",
    body: "Staff sign-in, a role permission matrix, audit stamps on every record, and an owner console for subscriptions, packages and revenue across fully isolated businesses.",
  },
];

const decisions = [
  {
    icon: Layers,
    title: "One codebase, two modes",
    body: "The same app runs as a browser-only demo with generated data, or in API mode backed by Postgres. Sales demos need no server, and real shops get a real backend.",
  },
  {
    icon: Server,
    title: "Rules live in services, enforced on the server",
    body: "Screens talk to services. In API mode those services run on the server, so permissions and business rules hold no matter which screen calls them.",
  },
  {
    icon: Fingerprint,
    title: "Accountability stamped in one place",
    body: "Created by, created at, updated by and updated at are written automatically on every record, so no screen can forget or forge them.",
  },
  {
    icon: Cookie,
    title: "First-party sessions",
    body: "The web app proxies /api to the backend, so session cookies stay first-party and the browser only ever talks to one origin.",
  },
];

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack", "next-intl", "Highcharts", "PostgreSQL", "Playwright", "Vercel", "Coolify"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-sky-400 font-label">{children}</p>;
}

export default function PosSibleCaseStudy() {
  return (
    <main className="bg-neutral-950 text-neutral-400 selection:bg-sky-900 selection:text-sky-200">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 md:pt-40 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute -top-40 right-0 w-[700px] h-[700px] max-w-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.14), transparent 65%)" }} />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/work" className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All work
          </Link>
          <SectionLabel>Case study · Retail SaaS</SectionLabel>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">POS-sible</h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl leading-relaxed">
            Other POS software records what happened. POS-sible shows shop owners what is possible next.
          </p>

          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-neutral-500 font-label">{m.label}</dt>
                <dd className="mt-2 text-white font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <CtaButton href="/contact" className="w-full sm:w-auto">Book a call</CtaButton>
            <CtaButton href={LIVE_URL} external variant="ghost" className="w-full sm:w-auto">Visit live site</CtaButton>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/work/possible-dashboard.webp"
            alt="POS-sible home dashboard with sales, purchase, expense and net cards, a sales chart and top products"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Problem and why */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-24 md:py-32 grid md:grid-cols-2 gap-14 md:gap-20">
        <div>
          <SectionLabel>The problem</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">Shops record everything and still guess</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              A typical retail shop already logs every sale, purchase and expense. The software stops there. The owner still has to work out
              which product will run out this week, which regulars have gone quiet, and whether the month will hit target.
            </p>
            <p>
              Owners in Bangladesh also need things most POS tools treat as an afterthought: Bangla throughout, mobile wallets like bKash,
              Nagad, Rocket and Upay at the till, and phone numbers that open straight into a call or WhatsApp.
            </p>
          </div>
        </div>
        <div>
          <SectionLabel>Why we built it</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">Turn the data shops already have into a next step</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              We wanted a point of sale that does the bookkeeping well and then reads it back to the owner in plain English or Bangla:
              restock this fast seller before it runs out, win back these customers, add this much a day to reach the goal.
            </p>
            <p>
              Every figure comes from the shop&apos;s own transactions, so the advice is specific and checkable. The name is the promise:
              more than a POS, it shows what is possible.
            </p>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="border-y border-white/[0.06] bg-[#0b0b0d]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-24 md:py-32">
          <SectionLabel>What we built</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-14 max-w-2xl">A full retail back office with a growth layer on top</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {built.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-3xl border border-white/[0.07] bg-[#0f0f12] p-7 md:p-9">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-300 mb-6">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{title}</h3>
                <p className="leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Decisions */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl py-24 md:py-32">
        <SectionLabel>How we built it</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-14 max-w-2xl">Decisions that kept it fast to ship and safe to run</h2>
        <ol className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {decisions.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex gap-5">
              <span className="text-sm font-label text-neutral-600 pt-1 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="flex items-center gap-2.5 text-lg md:text-xl font-semibold text-white mb-2">
                  <Icon className="w-5 h-5 text-sky-400 shrink-0" />
                  {title}
                </h3>
                <p className="leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 pt-10 border-t border-white/[0.06]">
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 font-label mb-4">Stack</p>
          <ul className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-neutral-300">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl pb-24 md:pb-32">
        <SectionLabel>By the numbers</SectionLabel>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07]">
          {numbers.map((n) => (
            <div key={n.label} className="flex flex-col-reverse justify-end bg-neutral-950 p-7 md:p-8">
              <dt className="mt-3 text-sm leading-relaxed">{n.label}</dt>
              <dd className="text-4xl md:text-5xl font-bold text-white tracking-tight">{n.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing CTA */}
      <section className="container mx-auto px-4 sm:px-6 max-w-6xl pb-24 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-[#0b1118] px-6 py-14 md:p-20 text-center">
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(14,165,233,0.18), transparent 70%)" }} />
          <h2 className="relative text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Have a product like this in mind?</h2>
          <p className="relative text-lg max-w-xl mx-auto mb-10">Tell us what you want to build. We will scope it with you and ship it end to end.</p>
          <div className="relative flex justify-center">
            <CtaButton href="/contact" className="w-full sm:w-auto">Book a call</CtaButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
