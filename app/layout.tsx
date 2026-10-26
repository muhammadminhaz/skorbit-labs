import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Convergence } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, ORGANIZATION, TITLE_TEMPLATE, WEBSITE } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const convergence = Convergence({ weight: "400", subsets: ["latin"], variable: "--font-convergence" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: TITLE_TEMPLATE },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "software development agency", "web development company", "mobile app development", "AI integration services",
    "custom software development", "SaaS development", "SEO agency", "digital marketing agency", "product design studio",
    "MVP development", "remote development team", "software development agency worldwide",
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#07080b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={convergence.variable}>
      <body className="font-sans antialiased">
        <JsonLd data={ORGANIZATION} />
        <JsonLd data={WEBSITE} />
        <Navbar />
        <ScrollToTop />
        <div className="relative">
          {children}
          <Footer />
          {/* Site-wide grid: one hairline down each side of the content column, over every section */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 px-4 md:px-8">
            <div className="mx-auto h-full max-w-7xl border-x border-white/10" />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
