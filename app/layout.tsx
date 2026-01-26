import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hrts.studio",
  description: "A people first digital studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
