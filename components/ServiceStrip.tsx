import { SERVICES } from "@/lib/services";

// Frosted glass strip of the four services, used at the bottom of the hero and of the footer CTA.
// Borders draw the dividers for the 2-col (mobile) and 4-col layouts.
export default function ServiceStrip() {
  return (
    <div className="border-t border-white/10 bg-white/[0.03] px-4 backdrop-blur-xl md:px-8">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {SERVICES.map((service) => (
          <li key={service} className="flex items-center justify-center border-white/10 px-4 py-7 odd:border-r [&:nth-child(n+3)]:border-t md:border-l md:odd:border-r-0 md:first:border-l-0 md:[&:nth-child(n+3)]:border-t-0 text-center text-xs tracking-[0.18em] text-neutral-300 uppercase md:py-10 md:text-sm">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
