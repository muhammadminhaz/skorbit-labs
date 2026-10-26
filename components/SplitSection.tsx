import Reveal from "@/components/Reveal";

export type SplitItem = { title: string; body: string };

// Sticky heading on the left, rows on the right. `numbered` only for real sequences (steps in order).
export default function SplitSection({ title, intro, items, numbered = false, children }: {
  title: string;
  intro: string;
  items: SplitItem[];
  numbered?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative border-t border-white/10 px-4 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6 self-start lg:sticky lg:top-40">
          <h2 className="text-4xl leading-[1.08] tracking-[-0.02em] text-balance md:text-5xl lg:text-6xl">{title}</h2>
          <p className="max-w-md text-lg leading-relaxed text-(--fg-muted) text-pretty">{intro}</p>
          {children}
        </Reveal>

        <ol className="flex flex-col">
          {items.map((item, i) => (
            <li key={item.title} className="border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:py-10">
              <Reveal delay={0.05} className="flex gap-5 md:gap-8">
                {numbered && (
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#7ee3ff]/35 bg-[#2f9be0]/10 text-sm text-[#7ee3ff] tabular-nums">
                    {i + 1}
                  </span>
                )}
                <div>
                  <h3 className="text-2xl leading-tight tracking-[-0.01em] text-white md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-(--fg-muted) text-pretty">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
