export const SITE_URL = "https://www.skorbit-labs.com";
export const SITE_NAME = "Skorbit Labs";
export const CONTACT_EMAIL = "hello@skorbit-labs.com";

export const SLOGAN = "Build products. Grow brands.";
// Countries the team works from, in TEAM order with duplicates dropped.
export const TEAM_COUNTRIES_TEXT = "Saudi Arabia, Australia and Bangladesh";

export type TeamMember = { name: string; role: string; photo: string; country: string };

// Photos go in /public/images/team: square head-and-shoulders crops, eyes about 40% from the top.
export const TEAM: TeamMember[] = [
  { name: "Rasul Al Foysal Redoy", role: "Co-Founder & Creative Director", photo: "/images/team/redoy.jpg", country: "Saudi Arabia" },
  { name: "Ahmad Al Hasib", role: "Co-Founder & Chief Executive Officer", photo: "/images/team/hasib.jpg", country: "Australia" },
  { name: "Md Asiful Islam", role: "Co-Founder & Chief Operation Officer", photo: "/images/team/asiful.jpg", country: "Bangladesh" },
  { name: "Md Minhazur Rahman", role: "Co-Founder & Chief Technology Officer", photo: "/images/team/minhaz.jpg", country: "Bangladesh" },
];
