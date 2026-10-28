import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, SLOGAN, TEAM, TEAM_COUNTRIES_TEXT } from "@/lib/site";
import { SERVICE_ROWS } from "@/lib/services";
import { FEED_TITLE } from "@/lib/feed";

// Brand-first titles, like estrela.studio: "Skorbit Labs | About Us". The home page gets the keyword line.
export const TITLE_TEMPLATE = `${SITE_NAME} | %s`;
export const DEFAULT_TITLE = `${SITE_NAME} | Websites, Apps, AI and Digital Growth`;

export const DEFAULT_DESCRIPTION =
  "Skorbit Labs is a software and digital growth studio building websites, mobile apps, SaaS and AI integrations for ambitious businesses worldwide.";

// Per-page metadata. Child openGraph replaces the layout's, so every page restates the shared fields here.
// Share image is app/opengraph-image.jpg (JPEG keeps it near 100 KB; WhatsApp drops previews over ~300 KB). Named here too: a page's own openGraph drops the inherited file image.
const OG_IMAGE = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME}: ${SLOGAN} Web, mobile and AI studio for clients worldwide.` };
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : DEFAULT_TITLE;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path, types: { "application/rss+xml": [{ url: "/rss.xml", title: FEED_TITLE }] } },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: path, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE] },
  };
}

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  slogan: SLOGAN,
  email: CONTACT_EMAIL,
  description: DEFAULT_DESCRIPTION,
  areaServed: "Worldwide",
  // Distributed team: say where people are without claiming offices
  location: `${SITE_NAME} works remotely from ${TEAM_COUNTRIES_TEXT}`,
  employee: TEAM.map((m) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    image: `${SITE_URL}${m.photo}`,
    homeLocation: { "@type": "Country", name: m.country },
  })),
  founder: TEAM.filter((m) => m.role.includes("Founder")).map((m) => ({ "@type": "Person", name: m.name })),
  knowsLanguage: ["en"],
  knowsAbout: SERVICE_ROWS.map((s) => s.title),
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL, availableLanguage: ["English"], areaServed: "Worldwide" },
};

export const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${SITE_URL}${item.path}` })),
});
