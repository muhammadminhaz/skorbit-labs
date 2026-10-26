import type { Metadata } from "next";
import "./globals.css";

const description =
  "Skorbit Labs is a senior product studio. We design, build and ship web, mobile and AI products end to end.";

// Absolute base for og:image. Set NEXT_PUBLIC_SITE_URL once the domain is live; Vercel's production URL is the fallback.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Skorbit Labs",
  description,
  openGraph: { title: "Skorbit Labs", description, siteName: "Skorbit Labs", type: "website" },
  twitter: { card: "summary_large_image", title: "Skorbit Labs", description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
