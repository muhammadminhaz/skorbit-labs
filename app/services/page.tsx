import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/sections/FAQ";
import Process from "@/components/sections/Process";
import { SERVICE_ROWS } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Our Services",
  description: "Explore Skorbit Labs services in AI integration, web and mobile app development, data analytics, SEO and digital marketing for businesses worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: SERVICE_ROWS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `${SITE_URL}/services#${s.slug}`,
            areaServed: "Worldwide",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      }} />
      <PageHero
        title="Services"
        intro="Strategy, design, engineering and marketing under one roof. Pick one service or all of them; either way you get one team that owns the outcome."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2.5">
            {SERVICE_ROWS.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition-colors hover:border-[#7ee3ff]/50 hover:text-[#7ee3ff]">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {SERVICE_ROWS.map((s, i) => (
        <section key={s.slug} id={s.slug} className="relative scroll-mt-28 border-t border-white/10 px-4 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-20">
            <Reveal className={`self-start lg:sticky lg:top-32 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover brightness-[0.8] saturate-[0.85]" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-[#2f9be0]/15 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-8">
              <div>
                <h2 className="text-4xl leading-[1.08] tracking-[-0.02em] md:text-5xl">{s.title}</h2>
                <p className="mt-6 text-lg leading-relaxed text-(--fg-muted) text-pretty">{s.description}</p>
              </div>

              <div>
                <h3 className="mb-5 text-xl text-white">What you get</h3>
                <ul className="flex flex-col gap-4">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3.5 leading-relaxed text-white/80">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#2f9be0]/15 text-[#7ee3ff]">
                        <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <h3 className="mb-2 text-white">A good fit if</h3>
                <p className="leading-relaxed text-(--fg-muted)">{s.fit}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <Process />
      <FAQ />
    </main>
  );
}
