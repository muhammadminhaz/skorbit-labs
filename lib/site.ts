export const SITE_URL = "https://www.skorbit-labs.com";
export const SITE_NAME = "Skorbit Labs";
export const CONTACT_EMAIL = "hello@skorbit-labs.com";

export const SLOGAN = "Build products. Grow brands.";

// Where the business is based, as stated in the Terms and Privacy Policy (governing law: Western Australia)
export const HEAD_OFFICE = "Perth, Western Australia";
export const BRANCH_OFFICE = "Shantinagar, Dhaka, Bangladesh";
// Bump when the Terms, Privacy Policy or Standards change
export const LEGAL_UPDATED = { iso: "2026-10-28", text: "28 October 2026" };
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
