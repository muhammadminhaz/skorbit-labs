import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { BRANCH_OFFICE, CONTACT_EMAIL, HEAD_OFFICE, LEGAL_UPDATED, SITE_NAME } from "@/lib/site";
import LegalDoc, { type LegalSection } from "@/components/LegalDoc";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description: "The terms that apply when you use the Skorbit Labs website or work with us on a project, including payments, ownership, our project standards and governing law.",
  path: "/terms",
});

const email = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These terms apply when you use www.skorbit-labs.com (the &ldquo;site&rdquo;) and when you work with {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;). We are based in {HEAD_OFFICE}, Australia, with a branch in {BRANCH_OFFICE}.
        </p>
        <p>By using the site or engaging us for a project, you agree to these terms. If you do not agree, please do not use the site.</p>
      </>
    ),
  },
  {
    id: "website",
    title: "Using our website",
    body: (
      <>
        <p>The site describes our services and work. Its content is general information, not professional advice, and may change without notice.</p>
        <p>When you use the site, please do not:</p>
        <ul>
          <li>try to break, overload or get around its security;</li>
          <li>copy or scrape it in a way that harms its performance;</li>
          <li>use its content to mislead anyone, or to pretend to be us.</li>
        </ul>
        <p>Links to other websites are for convenience. We do not control those sites and are not responsible for them.</p>
      </>
    ),
  },
  {
    id: "content",
    title: "Our content",
    body: (
      <p>
        The text, designs, graphics, code and logos on the site belong to us or to the people who licensed them to us. You are welcome to link to the
        site and quote short passages with credit. Anything beyond that, including commercial use, needs our written permission.
      </p>
    ),
  },
  {
    id: "projects",
    title: "Projects and proposals",
    body: (
      <>
        <p>
          Every project starts with a written proposal or statement of work (the &ldquo;project agreement&rdquo;) that sets out the scope, timeline, fees and
          payment schedule. These terms apply alongside it. If the two conflict, the project agreement wins.
        </p>
        <p>
          Our estimates are fixed for the agreed scope. If you want to change the scope, we will agree the change in writing, with any effect on the
          timeline and fees, before we do the extra work.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <>
        <p>
          We invoice according to the project agreement. Unless it says otherwise, invoices are due within 14 days. Fees do not include taxes such as
          GST, which we add where they apply.
        </p>
        <p>If an invoice is overdue, we will remind you first. If it stays unpaid, we may pause work until it is settled.</p>
      </>
    ),
  },
  {
    id: "responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <p>To keep a project on track, we rely on you to give us timely feedback, decisions and access to the accounts and materials we need.</p>
        <p>
          You confirm that you have the right to use everything you give us (such as logos, text, images and data), and that your project and the way
          you use what we deliver comply with the law.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Ownership of the work",
    body: (
      <>
        <p>
          Once the project is paid in full, you own the code, designs and content we create specifically for you, and we hand them over in your own
          accounts.
        </p>
        <p>
          Third-party and open-source components stay under their own licences. We keep ownership of our pre-existing tools, know-how and general
          techniques; where any of these are built into your deliverables, you get a permanent licence to use them as part of that work.
        </p>
        <p>We only show your project in our portfolio, or name you as a client, with your permission.</p>
      </>
    ),
  },
  {
    id: "standards",
    title: "Our project standards",
    body: (
      <>
        <p>
          We choose the work we take on. We do not accept projects, or parts of projects, that fall under the categories on our{" "}
          <Link href="/standards">Standards</Link> page, and we may decline any enquiry without giving a reason.
        </p>
        <p>
          If a project changes during our work so that it falls under those categories, we will talk to you first. If we cannot continue, we may end
          the project under section 11; you pay only for work done up to that point, and we hand over what we have completed.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        We each keep the other&apos;s confidential information private and use it only for the project, unless the law requires us to disclose it.
        This continues after the project ends. We are happy to sign a separate non-disclosure agreement if you need one.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Warranties and liability",
    body: (
      <>
        <p>
          We carry out our services with due care and skill. The site itself is provided &ldquo;as is&rdquo;, and we do not promise it will always be
          available or free of errors.
        </p>
        <p>
          To the extent the law allows, we are not liable for indirect or consequential loss, such as lost profits, revenue, data or business
          opportunities, and our total liability for a project is limited to the fees you paid us for it in the 12 months before the claim.
        </p>
        <p>
          <strong>Australian Consumer Law.</strong> Our services come with guarantees that cannot be excluded under the Australian Consumer Law, and
          nothing in these terms excludes, restricts or changes them, or any similar rights you have under the law where you live. Where the law
          allows us to limit our liability for breaching such a guarantee, it is limited to supplying the services again or paying the cost of having
          them supplied again.
        </p>
      </>
    ),
  },
  {
    id: "ending",
    title: "Ending a project",
    body: (
      <p>
        Either of us may end a project as set out in the project agreement. If it does not cover this, either of us may end the project with 14
        days&apos; written notice. You pay for the work done up to the end date, and once that is paid we hand over the work completed so far.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <>
        <p>
          These terms and any project agreement are governed by the laws of Western Australia, Australia. Both of us accept the jurisdiction of the
          courts of Western Australia and the courts that can hear appeals from them.
        </p>
        <p>
          If a dispute arises, we will both first try to resolve it in good faith, by talking it through, for at least 30 days before starting court
          proceedings. If you are a consumer, you keep any rights the law of your own country gives you that cannot be waived.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The date at the top of this page shows the latest version. Changes do not affect project
        agreements that are already signed, unless we both agree in writing.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: <p>Questions about these terms? Email us at {email}.</p>,
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero title="Terms of Service" intro={`Last updated ${LEGAL_UPDATED.text}. Plain-language terms for using our website and working with us.`} />
      <LegalDoc sections={SECTIONS} />
    </main>
  );
}
