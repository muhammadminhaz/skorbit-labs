export type LegalSection = { id: string; title: string; body: React.ReactNode };

// Long-form legal text: a numbered contents list (sticky on lg) beside the numbered sections.
// Body content is plain p/ul/a/strong, styled from here so the pages stay plain JSX.
export default function LegalDoc({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="relative border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[4fr_8fr] lg:gap-20">
        <nav aria-label="On this page" className="self-start lg:sticky lg:top-40">
          <p className="mb-4 text-xs tracking-[0.2em] text-white/45 uppercase">On this page</p>
          <ol className="flex flex-col gap-2.5 text-white/70">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-[#7ee3ff]">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-40 border-t border-white/10 py-10 first:border-t-0 first:pt-0">
              <h2 id={`${s.id}-title`} className="text-2xl leading-tight tracking-[-0.01em] text-white md:text-3xl">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-5 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-(--fg-muted) text-pretty [&_a]:text-[#7ee3ff] [&_a]:underline-offset-4 [&_a:hover]:underline [&_strong]:font-normal [&_strong]:text-white [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_li]:marker:text-white/30">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
