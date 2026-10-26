export const SERVICES = ["AI Integration", "Software Development", "Marketing", "SEO"] as const;
export type Service = (typeof SERVICES)[number];

const unsplash = (id: string) => `https://images.unsplash.com/${id}?q=75&w=1600&auto=format&fit=crop`;

// Shared by the home Services stack (title, description, image) and the /services page (all fields).
// Photos and descriptions carried over from the old site.
export const SERVICE_ROWS = [
  {
    slug: "ai-integration",
    title: "AI Integration",
    description: "Leverage the power of artificial intelligence to automate processes, enhance decision-making, and create personalized experiences for your users.",
    image: unsplash("photo-1677442136019-21780ecad995"),
    includes: [
      "An audit of where AI saves real time or money in your workflow, and where it does not",
      "Assistants, search and chat built on your own data, with guardrails and human review",
      "Document, email and support automation wired into the tools you already use",
      "Evaluation and monitoring, so you can see quality and cost before and after launch",
    ],
    fit: "You have repetitive work, a pile of documents or a support queue, and want AI that earns its place.",
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "Build scalable, high-performance web applications with modern frameworks. We focus on responsive design, SEO optimization, and seamless user experiences.",
    image: unsplash("photo-1461749280684-dccba630e2f6"),
    includes: [
      "Marketing sites, web apps and SaaS products, designed and built end to end",
      "Accessible, responsive interfaces that load fast on real phones and networks",
      "Secure APIs, databases, sign-in and payments, with tests and logging from day one",
      "Hosting, deployment and handover in your own accounts, fully documented",
    ],
    fit: "You need a site that converts or a product people log into every day.",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Create native and cross-platform mobile apps that engage users on the go. From concept to launch, we deliver robust solutions for iOS and Android.",
    image: unsplash("photo-1512941937669-90a1b58e7e9c"),
    includes: [
      "One cross-platform codebase for iOS and Android, or native where it matters",
      "Offline-friendly data, push notifications and in-app purchases",
      "Clickable prototypes you can test with users before we build",
      "App Store and Play Store submission, release notes and crash monitoring",
    ],
    fit: "Your customers live on their phones and you want an app they keep.",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description: "Turn raw data into actionable insights. Our analytics solutions help you understand user behavior, optimize performance, and drive business growth.",
    image: unsplash("photo-1551288049-bebda4e38f71"),
    includes: [
      "Tracking plans that measure what your business actually cares about",
      "Dashboards your team can read without a data analyst in the room",
      "Funnels, retention and revenue reporting tied back to product decisions",
      "Clean pipelines from your app, payments and marketing tools into one place",
    ],
    fit: "You have data everywhere and still make decisions on gut feel.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Amplify your brand's reach with data-driven marketing strategies. We specialize in SEO, content marketing, and paid advertising to maximize ROI.",
    image: unsplash("photo-1460925895917-afdab827c52f"),
    includes: [
      "Technical SEO and content that ranks for what your customers search",
      "Paid campaigns on search and social, with budgets tied to real returns",
      "Landing pages and experiments that turn visits into leads",
      "Monthly reports in plain language: what worked, what did not, what is next",
    ],
    fit: "Your product is ready and the right people still have not found it.",
  },
];
