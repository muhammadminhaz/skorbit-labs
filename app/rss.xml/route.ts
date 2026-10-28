import { FEED_DESCRIPTION, FEED_ITEMS, FEED_TITLE } from "@/lib/feed";
import { SITE_URL } from "@/lib/site";

// RSS 2.0 feed of case studies and updates (lib/feed.ts), prerendered at build time.
export const dynamic = "force-static";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (date: string) => new Date(`${date}T00:00:00Z`).toUTCString();

export function GET() {
  const items = FEED_ITEMS.map((item) => {
    const url = `${SITE_URL}${item.path}`;
    return `    <item>
      <title>${escape(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(item.description)}</description>
      <pubDate>${rfc822(item.date)}</pubDate>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(FEED_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escape(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(FEED_ITEMS[0].date)}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
