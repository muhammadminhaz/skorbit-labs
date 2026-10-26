# Skorbit Labs

Marketing site for Skorbit Labs, a product studio. Next.js 16 (App Router), React 19, Tailwind CSS 4, framer-motion and GSAP.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home: Hero, Philosophy (pinned scroll), Featured Work, Services, Capabilities bento, Process, Why Choose Us, Footer. Testimonials is hidden for now (component kept, not rendered). |
| `/work` | Work index (Featured Work without the "View all work" link) |
| `/work/pos-sible` | POS-sible case study (static, server component) |
| `/services`, `/about`, `/contact`, `/testimonials` | Supporting pages |

`app/template.tsx` plays the slat transition between routes.

## Structure

- `components/sections/*` one file per page section. Home sections below the hero load through `next/dynamic`.
- `components/ui/CtaButton.tsx` the only CTA button. Every call to action uses it.
- `app/globals.css` design tokens (`:root`), the `.cta` button styles and the `.bento-card` spotlight styles.
- `public/images/work/` case study images (served through `next/image`).

## CtaButton

```tsx
<CtaButton href="/contact">Book a call</CtaButton>                    // primary: white pill, dark arrow chip
<CtaButton href="/work" variant="ghost">Explore our work</CtaButton>  // ghost: dark pill, sky chip
<CtaButton type="submit" variant="dark">Send message</CtaButton>      // dark: for light backgrounds
<CtaButton href="https://..." external>Visit live site</CtaButton>    // opens in a new tab
```

A light orbits the border (React Bits StarBorder pattern) and the arrow swaps on hover. It is pure CSS with a transform-only animation, so it costs nothing on the main thread. Without `href` it renders a `<button>`. "Book a call" goes to `/contact`.

## Capabilities bento

`components/sections/Capabilities.tsx`. A 4 column grid on desktop, 2 on tablet, 1 on phones. Each card plays a one-time animation when it scrolls into view that acts out the value it describes:

| Card | Animation |
|---|---|
| One team from first sketch to scale | A progress line runs Strategy to Grow and each stage switches on as it is reached |
| AI that earns its place | A question types itself, then a grounded answer arrives |
| Web platforms | A page skeleton assembles and a performance score counts up to 100 |
| Mobile apps | iOS and Android phones slide in from opposite sides and meet on "1 codebase" |
| Data you can act on | Bars grow, then the bar that needs action is called out |
| Launch and growth | The trend line draws, the area fills, the end point pops |

Everything animates `transform`, `opacity` or SVG `pathLength` through framer-motion variants, and respects reduced motion.

## Featured Work

`components/sections/FeaturedWork.tsx` keeps the original card design: GSAP scroll-in, hover tags, custom cursor label. The card shows the project's landing page (`possible-landing.jpg`); hovering reveals the product (`possible-dashboard.webp`) through a cursor-following mask. The second card is "Coming soon". To add a project, add an entry to `projects` and an `app/work/<slug>/page.tsx` case study.

## Why Choose Us

`components/sections/WhyChooseUs.tsx`. A sticky intro with a Book a call button beside four principles (driven by the problem, honesty, full responsibility, principles over shortcuts). Each principle fades up and a sky rail fills as it scrolls into view (`useScroll` motion values, no re-renders).

## Icons and social preview

- `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` are generated from `public/images/logo_icon.png`.
- `app/opengraph-image.tsx` renders the 1200x630 share image (logo, who we are, what we do) in Outfit, fetched from Google Fonts at build with a fallback.
- Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://skorbitlabs.com`, no trailing slash) in production so `og:image` is an absolute URL. On Vercel it falls back to the production deployment URL.

## Motion and performance rules

- Animate `transform` and `opacity` only. No `filter: blur()`, no `backdrop-filter`, and no glow or spotlight on hover. Hover feedback is a border color change or a small lift. Ambient background glows use `radial-gradient`, never blurred blobs.
- Pointer effects write motion values or CSS variables, never React state.
- Hover-only effects are gated to `(hover: hover)` or `pointerType === "mouse"`, so taps on phones work as clicks.
- `body` uses `overflow-x: clip` (not `hidden`) so the sticky hero and the GSAP pin in Philosophy keep working.
- Philosophy calls `ScrollTrigger.refresh()` after creating its pin, because the sections below it load later as separate chunks.
- `prefers-reduced-motion` is honored globally in `globals.css` and per component with `useReducedMotion`.
