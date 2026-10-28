// Entries in /rss.xml, newest first. Add case studies and announcements here.
export type FeedItem = { title: string; path: string; description: string; date: string };

export const FEED_TITLE = "Skorbit Labs: Work and Updates";
export const FEED_DESCRIPTION = "Case studies and news from Skorbit Labs, a software and digital growth studio.";

export const FEED_ITEMS: FeedItem[] = [
  {
    title: "Our standards: the work we take on, and the work we don't",
    path: "/standards",
    description: "The projects Skorbit Labs declines, from AI-generated people and gambling to interest-based lending, and how we apply these standards.",
    date: "2026-10-28",
  },
  {
    title: "POS-sible case study",
    path: "/work/pos-sible",
    description: "How Skorbit Labs designed and built POS-sible, a multi-language point of sale SaaS for retail shops that turns every sale into a clear next step.",
    date: "2026-10-26",
  },
];
