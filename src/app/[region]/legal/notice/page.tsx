import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText } from "@/config/legal";
import { getCompany } from "@/lib/company";
import LegalPageLayout from "@/components/legal/LegalPageLayout";



const RAW_LEGAL_TEXT = `
1. SITE OPERATOR
alkotacycles.com is operated by:
{{LEGAL_ENTITY_NAME}} trading as Alkota Cycles.
Company number: {{COMPANY_NUMBER}}
Registered office: {{REGISTERED_OFFICE}}
Registered in: {{REGISTERED_IN}}
VAT: {{VAT_NUMBER_IF_APPLICABLE}}

2. THE PURPOSE OF THIS SITE
The Site documents Alkota, Project 01 and the wider development, commercial and ownership programme.
It contains a mixture of: brand information; engineering explanation; development records; product information; editorial material; design artifacts; pre-production content; commerce; and interactive tools.
Not every page represents a product currently available for purchase.

3. DEVELOPMENT INFORMATION
Project 01 is a pre-production programme.
Labels including: DEVELOPMENT TARGET, R00, UNDER REVIEW, PLANNED, PROTOTYPE, SUBJECT TO VALIDATION, PRE-PRODUCTION have deliberate meanings.
They should not be read as equivalent to: VALIDATED, FINAL, PRODUCTION RELEASED or PRODUCTION SPECIFICATION.
Where development information changes, the latest controlled release takes precedence.

4. RENDERS AND DEVELOPMENT IMAGERY
Some imagery may include: CAD renders; digitally created or composited imagery; pre-production representations; prototype imagery; or other visualisations.
Such images are used to communicate design intent and the development world around Project 01.
They must not be used to imply that an unbuilt prototype, location, component specification or production event has occurred.
Where imagery materially differs from a production product, appropriate context should be provided.

5. TECHNICAL CONTENT
Technical articles are intended to explain Alkota's design and engineering process.
They are not a substitute for: the owner manual; product-specific service documentation; professional mechanical inspection; or instructions issued for a particular Bike.
Do not use general editorial content as a torque specification, workshop manual or authorisation to modify a bicycle.

6. INTELLECTUAL PROPERTY
Unless otherwise stated, Site content is owned by or licensed to {{LEGAL_ENTITY_NAME}}.
This includes: ALKOTA and Alkota Cycles branding; Project 01 branding; logos; copy; layouts; graphics; photography; video; technical illustrations; design archive material; software; and proprietary product information.
You may access the Site for normal personal and lawful business evaluation.
You may not, without permission: reproduce substantial parts of the Site; sell or commercially exploit Site material; remove rights notices; misrepresent Alkota material as your own; publish confidential or restricted technical documents; systematically scrape protected content for commercial republication; or use restricted Alkota design material to manufacture competing products.
Nothing prevents uses required or permitted by law.

7. PRESS AND AUTHORISED MEDIA
Assets specifically identified as approved press/media assets may be used subject to the licence or media conditions accompanying them.
The existence of a publicly viewable image elsewhere on the Site does not automatically create a commercial media licence.

8. TRADE MARKS
ALKOTA™, ALKOTA CYCLES™, and PROJECT 01™ are unregistered trade marks and brand identifiers used by Alkota Cycles.
No trade mark registration is claimed or asserted in this jurisdiction.
Third-party names and marks belong to their respective owners.
A reference to a component manufacturer does not imply sponsorship, endorsement or commercial partnership unless expressly stated.

9. THIRD-PARTY COMPONENTS
The Site may discuss components manufactured by third parties.
Component specifications and availability can change.
For safety-critical information, refer to the current information issued by the relevant manufacturer and the product-specific Alkota documentation.

10. EXTERNAL LINKS
Links to external websites are provided where useful.
We do not control every third-party website and cannot guarantee its continued availability or content.
A link does not automatically constitute endorsement.

11. SITE AVAILABILITY
We aim to keep alkotacycles.com available and accurate.
We do not promise uninterrupted operation.
We may suspend or alter parts of the Site for maintenance, security, development or commercial reasons.

12. SECURITY
You must not: attempt unauthorised access; probe restricted systems; circumvent authentication; introduce malicious software; abuse Site forms; or intentionally interfere with Site operation.

13. USER ACCOUNTS
You are responsible for keeping access to your account secure.
Tell us promptly if you believe your My Alkota account has been compromised.

14. NO EXCLUSION OF MANDATORY LIABILITY
Nothing in this Legal Notice excludes liability that cannot lawfully be excluded.

15. CONTACT
Legal enquiries: {{LEGAL_EMAIL}}
`;

const TOC = [
  { id: "sec-1", title: "Site Operator" },
  { id: "sec-2", title: "Purpose of This Site" },
  { id: "sec-3", title: "Development Information" },
  { id: "sec-4", title: "Renders & Development Imagery" },
  { id: "sec-5", title: "Technical Content" },
  { id: "sec-6", title: "Intellectual Property" },
  { id: "sec-7", title: "Press & Authorised Media" },
  { id: "sec-8", title: "Trade Marks" },
  { id: "sec-9", title: "Third-Party Components" },
  { id: "sec-10", title: "External Links" },
  { id: "sec-11", title: "Site Availability" },
  { id: "sec-12", title: "Security Rules" },
  { id: "sec-13", title: "User Accounts" },
  { id: "sec-14", title: "Mandatory Liability" },
  { id: "sec-15", title: "Legal Contact" },
];


export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "/legal/notice",
    title: "Legal Notice",
    description: "Operator particulars, website terms of use, intellectual property protections, press guidance, and pre-production development disclaimers.",
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const companyEntity = getCompany(regionCode);
  const doc = LEGAL_DOCUMENTS.legal;
  const cleanText = renderCleanLegalText(RAW_LEGAL_TEXT);

  return (
    <LegalPageLayout document={doc} toc={TOC} rawTextForGateCheck={RAW_LEGAL_TEXT}>
      <div className="space-y-10">
        <section id="sec-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. SITE OPERATOR
          </h2>
          <p>alkotacycles.com is operated by Alkota Cycles.</p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div><span className="text-black/50">LEGAL ENTITY:</span> {cleanText.includes("Legal Entity Pending") ? "Alkota Cycles (Legal Entity Pending)" : "Alkota Cycles"}</div>
            <div><span className="text-black/50">REGISTERED IN:</span> England and Wales</div>
            <div><span className="text-black/50">LEGAL CONTACT:</span> legal@alkotacycles.com</div>
          </div>
        </section>

        <section id="sec-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. THE PURPOSE OF THIS SITE
          </h2>
          <p>The Site documents Alkota, Project 01 and the wider development programme.</p>
          <p>Not every page represents a product currently available for purchase.</p>
        </section>

        <section id="sec-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. DEVELOPMENT INFORMATION
          </h2>
          <p>Project 01 is a pre-production programme. Labels like R00, DEVELOPMENT TARGET, and PROTOTYPE indicate pre-production state.</p>
        </section>

        <section id="sec-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. RENDERS AND DEVELOPMENT IMAGERY
          </h2>
          <p>Renders communicate design intent and development context around Project 01.</p>
        </section>

        <section id="sec-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. TECHNICAL CONTENT
          </h2>
          <p>Editorial articles are not workshop manuals or torque specifications. Refer to official product manuals.</p>
        </section>

        <section id="sec-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. INTELLECTUAL PROPERTY
          </h2>
          <p>All photography, schematics, logos, and software are protected property of Alkota Cycles or its licensors.</p>
        </section>

        <section id="sec-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. PRESS AND AUTHORISED MEDIA
          </h2>
          <p>Press downloads are for accredited media evaluation subject to press terms.</p>
        </section>

        <section id="sec-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. TRADE MARKS
          </h2>
          {(() => {
            const registered = companyEntity.trademarks.filter(
              (t) => t.status === "REGISTERED" && t.registrationNumber
            );
            if (registered.length === 0) {
              return (
                <div className="space-y-2">
                  <p>
                    ALKOTA™, ALKOTA CYCLES™, and PROJECT 01™ are unregistered trade marks and brand identifiers used by Alkota Cycles.
                  </p>
                  <p className="text-xs text-black/70">
                    No trade mark registration is claimed or asserted in this jurisdiction. Plain ™ marks require no registration and carry no representation of statutory registration. All third-party trade marks, product names, and brand names referenced on this site belong to their respective owners. Reference to third-party component manufacturers does not imply endorsement, sponsorship, or affiliation.
                  </p>
                </div>
              );
            }
            return (
              <div className="space-y-2">
                <p>The following trade marks are registered in this jurisdiction:</p>
                <ul className="list-disc pl-5 text-xs font-mono">
                  {registered.map((t) => (
                    <li key={t.mark}>
                      {t.mark}\u00AE — Registration No. {t.registrationNumber} (Class {t.niceClass ?? "N/A"})
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </section>

        <section id="sec-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. THIRD-PARTY COMPONENTS
          </h2>
          <p>Component specifications from third-party manufacturers are subject to change.</p>
        </section>

        <section id="sec-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. EXTERNAL LINKS
          </h2>
          <p>Links to third-party websites are provided for convenience without endorsement.</p>
        </section>

        <section id="sec-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. SITE AVAILABILITY
          </h2>
          <p>We aim to maintain high availability but reserve the right to perform scheduled maintenance.</p>
        </section>

        <section id="sec-12" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. SECURITY
          </h2>
          <p>Unauthorised system probing or malicious automated scraping is prohibited.</p>
        </section>

        <section id="sec-13" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            13. USER ACCOUNTS
          </h2>
          <p>Riders are responsible for account security credentials.</p>
        </section>

        <section id="sec-14" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            14. NO EXCLUSION OF MANDATORY LIABILITY
          </h2>
          <p>Statutory rights and mandatory legal liabilities remain un-excluded.</p>
        </section>

        <section id="sec-15" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. CONTACT
          </h2>
          <p>Email legal enquiries to: legal@alkotacycles.com</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
