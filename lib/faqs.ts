// FAQ copy, shared by the FAQ section and the home page's FAQPage structured data
export const FAQS = [
  {
    q: "What kinds of projects do you take on?",
    a: "Web apps, mobile apps, custom software and AI features, plus the marketing and SEO that grow them. No project is too small for our best work.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused website usually takes 3 to 6 weeks; a product or app MVP 8 to 14 weeks. After discovery you get a timeline with clear milestones, and we flag early if anything changes.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on scope. After a short discovery call we send a fixed estimate with the trade-offs spelled out, so you know what you are paying for before we start.",
  },
  {
    q: "Do you work with startups or established businesses?",
    a: "Both. We help founders get a first version to market and help established teams modernize, add AI or grow an existing product.",
  },
  {
    q: "Will I own the code and designs?",
    a: "Yes. Everything we make for you, code, designs and content, is yours, documented and handed over in your own accounts.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. We stay on for maintenance, improvements and ongoing marketing and SEO, so the product keeps growing after it ships.",
  },
  {
    q: "Can you improve a product we already have?",
    a: "Yes. We start with an audit of the code, design and analytics, then fix what is actually holding it back before adding anything new.",
  },
];

// Google wants one FAQPage per site for repeated FAQs, so only the home page renders this
export const FAQ_PAGE = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
