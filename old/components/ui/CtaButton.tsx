import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "dark";

interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  type?: "button" | "submit";
  className?: string;
}

// One button for every CTA: pill face, a light that orbits the border (StarBorder pattern), arrow chip.
// Pure CSS (see .cta in globals.css) so it stays at 60fps on low-end phones.
export default function CtaButton({
  children,
  href,
  variant = "primary",
  external = false,
  type = "button",
  className = "",
}: CtaButtonProps) {
  const cls = `cta cta-${variant} ${className}`;
  const inner = (
    <>
      <span aria-hidden className="cta-star" />
      <span className="cta-face">
        <span className="cta-label">{children}</span>
        <span aria-hidden className="cta-chip">
          <ArrowUpRight className="cta-arrow" />
          <ArrowUpRight className="cta-arrow cta-arrow-in" />
        </span>
      </span>
    </>
  );

  if (!href) return <button type={type} className={cls}>{inner}</button>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <Link href={href} className={cls}>{inner}</Link>;
}
