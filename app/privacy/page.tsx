import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BRANCH_OFFICE, CONTACT_EMAIL, HEAD_OFFICE, LEGAL_UPDATED, SITE_NAME, TEAM_COUNTRIES_TEXT } from "@/lib/site";
import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Skorbit Labs collects, uses and protects personal information: no tracking cookies, privacy-friendly analytics, and your rights under Australian and international privacy law.",
  path: "/privacy",
});

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

// Matches how the site actually works: the contact form opens the visitor's email app (no form backend),
// Vercel hosts the site and runs cookie-free Web Analytics, fonts are self-hosted, and Unsplash photos are
// served through next/image, so visitors' browsers make no third-party requests. Update this if any of that changes.
const SECTIONS: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <>
        <p>
          {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a software and digital growth studio based in {HEAD_OFFICE},
          Australia, with a branch in {BRANCH_OFFICE}. We are responsible for the personal information described in this policy.
        </p>
        <p>
          We handle personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth) and, where they apply to you, the
          EU and UK General Data Protection Regulation (GDPR) and other local privacy laws.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "What we collect",
    body: (
      <>
        <p>
          <strong>When you contact us.</strong> Our contact form does not send anything to our servers. It opens your own email app with a message
          ready to send, so we only receive what you choose to send: usually your name, email address, the services you are interested in and your
          message. The same applies when you email or call us directly.
        </p>
        <p>
          <strong>When we work together.</strong> Contact details for you and your team, billing details, and the project materials and data you
          share with us or give us access to.
        </p>
        <p>
          <strong>When you browse the site.</strong> We use Vercel Web Analytics, a privacy-friendly service from our hosting provider. It counts page
          views and records the page, referring site, browser, operating system, device type and country. It uses no cookies, does not identify you,
          and does not follow you across other websites. Our hosting provider also processes technical data, such as IP addresses, to deliver the
          site and protect it from abuse.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        We do not use cookies for analytics, advertising or tracking, so there is no cookie banner. If that ever changes, we will update this policy
        and ask for your consent where the law requires it.
      </p>
    ),
  },
  {
    id: "use",
    title: "How we use your information",
    body: (
      <>
        <ul>
          <li>to reply to your enquiry and prepare an estimate;</li>
          <li>to deliver projects, send invoices and keep business records;</li>
          <li>to understand how the site is used, so we can improve it;</li>
          <li>to keep the site and our systems secure;</li>
          <li>to meet our legal obligations.</li>
        </ul>
        <p>
          We do not sell personal information or use it for advertising. We only send you marketing emails if you have asked for them, and you can
          unsubscribe at any time.
        </p>
      </>
    ),
  },
  {
    id: "bases",
    title: "Legal bases (EU and UK visitors)",
    body: (
      <p>
        Where the GDPR applies, we rely on: taking steps you ask for before a contract, and performing it (enquiries and projects); our legitimate
        interests in replying to you, improving the site and keeping it secure; compliance with legal obligations (such as tax records); and your
        consent where we ask for it, which you can withdraw at any time.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We share personal information only with those who need it to help us run the business, and only what they need:</p>
        <ul>
          <li>our hosting and analytics provider, Vercel Inc.;</li>
          <li>our email, productivity, accounting and payment providers;</li>
          <li>project tools we agree with you, such as code hosting or design tools;</li>
          <li>professional advisers, such as accountants and lawyers;</li>
          <li>authorities, when the law requires it.</li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Our team works from {TEAM_COUNTRIES_TEXT}, and our service providers may store data in other countries, including the United States. When
        personal information leaves the country it was collected in, we take reasonable steps to make sure it is protected to the standard of this
        policy, including, where the GDPR applies, safeguards such as standard contractual clauses.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <ul>
        <li>Enquiries that do not lead to a project: up to 2 years, so we have the context if you get in touch again.</li>
        <li>Client and billing records: for the length of the project and as long as the law requires afterwards (in Australia, generally 5 years for financial records).</li>
        <li>Analytics: kept only in aggregate, which does not identify anyone.</li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We take reasonable steps to protect personal information, including encrypted connections, access limited to the people who need it, and
        two-factor authentication on our accounts. No system is perfectly secure; if a data breach is likely to cause you serious harm, we will tell
        you and the relevant regulator as the law requires, including under Australia&apos;s Notifiable Data Breaches scheme.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask to access the personal information we hold about you, correct it, or delete it. Where the GDPR applies, you can also ask us to
          restrict or stop using it, or to give you a copy in a portable format.
        </p>
        <p>
          Email us at {email} and we will reply within 30 days. For general questions you are welcome to contact us without giving your name, or under
          a pseudonym.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <p>
        If you are unhappy with how we have handled your information, please contact us first so we can put it right. If we cannot resolve it, you can
        complain to the Office of the Australian Information Commissioner (<a href="https://www.oaic.gov.au" rel="noopener">oaic.gov.au</a>) or to
        the data protection authority where you live.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>The site and our services are meant for businesses and adults. We do not knowingly collect personal information from children under 16.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy as our services or the law change. The date at the top of this page shows the latest version.</p>,
  },
  {
    id: "contact",
    title: "Contact us",
    body: <p>Questions or requests about your privacy? Email us at {email}.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero title="Privacy Policy" intro={`Last updated ${LEGAL_UPDATED.text}. What we collect, why, and the choices you have. No tracking cookies.`} />
      <LegalDoc sections={SECTIONS} />
    </main>
  );
}
