import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText, PRIVACY_EMAIL } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Alkota Cycles",
  description:
    "Transparency on data collection, Fit Engine inputs, saved configurations, lawful bases, retention schedules, and rider rights.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Alkota Cycles",
    description:
      "Transparency on data collection, Fit Engine inputs, saved configurations, lawful bases, retention schedules, and rider rights.",
    url: `${siteUrl}/privacy`,
  },
};

const RAW_PRIVACY_TEXT = `
1. WHO CONTROLS YOUR INFORMATION
The controller is: {{LEGAL_ENTITY_NAME}} trading as Alkota Cycles.
Registered office: {{REGISTERED_OFFICE}}
Privacy contact: {{PRIVACY_EMAIL}}
Website: https://alkotacycles.com

2. THE PRINCIPLES WE USE
We aim to: collect information for a defined reason; collect no more than we reasonably need; tell you what we are doing; keep information reasonably accurate; retain it only as long as justified; protect it; and give you meaningful control where the law provides it.

3. INFORMATION WE MAY COLLECT
A. Identity & Contact: Name, Email, Telephone, Country, Billing/Delivery address, Account identifiers.
B. Project 01 Development Register: Registration reference, Preferred finish, Size, Market, Purchase intent, Riding preferences.
C. Rider Fit Information: Height, Inside-leg measurement, Arm span, Shoe size, Weight (optional), Riding style, Terrain, Current bike & size, Reach preferences. We do not use Fit Engine measurements for biometric recognition. DO NOT SUBMIT MEDICAL OR HEALTH INFORMATION in Fit Engine fields.
D. Configuration Information: Saved Build reference, Finish, Size, Selected components, Engineering revision.
E. Reservation & Order Information: Reservation reference, Products, Price, Payment status, Delivery method, Accepted terms version.
F. Payment Information: Processed via secure payment providers. We do not store complete payment card details.
G. My Alkota / Ownership: Account details, Bike serial number, Build history, Setup & Service records.
H. Support & Warranty: Correspondence, Photos, Proof of purchase, Technical claim history.
I. Dealer / Partner & Ambassador Applications: Business details, Riding background, Event activity, Social links.
J. Recruitment: CV, Employment history, Interview notes, Eligibility to work.
K. Technical & Security Data: IP address, Browser details, Authentication logs, Security indicators.

4. WHY WE USE INFORMATION
To operate the Site, create accounts, process Project 01 registrations, generate Fit Engine guidance, administer reservations, process payments, deliver orders, provide warranty support, handle recruitment, manage safety recalls, and comply with law.

5. LAWFUL BASES
Contractual necessity, Legal obligations, Legitimate business interests, and Explicit Consent where required.

6. MARKETING
Joining Project 01 does not automatically consent to marketing. Marketing choices are separate and unticked by default. You may unsubscribe anytime.

7. PRODUCT SAFETY COMMUNICATIONS
Safety recall bulletins and critical technical notices are mandatory product-safety communications, separate from marketing.

8. AUTOMATED DECISION-MAKING
Fit Engine calculations provide guidance. They do not produce legal or automated binding decisions without human review.

9. WHO WE SHARE INFORMATION WITH
Infrastructure hosts, payment processors, transactional email services, delivery logistics partners, and professional advisors under contract.

10. COMPONENT MANUFACTURERS
Shared strictly when necessary to resolve specific technical warranty claims.

11. ALKOTA PARTNERS
Authorised dealers receive customer information only when requested by the customer for demo, PDI handover, or service.

12. BUSINESS TRANSFERS
Information may transfer during corporate restructuring subject to data protection laws.

13. LEGAL DISCLOSURES
Disclosed when required by valid legal authority or law enforcement.

14. INTERNATIONAL TRANSFERS
Transferred outside the UK/EEA using approved standard contractual clauses or adequacy decisions.

15. HOW LONG WE KEEP INFORMATION
Enquiries: 24 months. Project 01 Registrations: 36 months or duration of programme. Unsuccessful Applications: 6-12 months. Financial Records: 6 years. Bike History: Duration of bicycle life (owner identity separated).

16. SECURITY
Protected using encryption in transit, strict access controls, role-based permissions, and audit logs.

17. YOUR RIGHTS
Access, Rectification, Erasure, Restriction, Portability, and Objection.

18. RIGHT TO OBJECT
You have the absolute right to object to direct marketing and to object to legitimate interest processing.

19. HOW TO EXERCISE RIGHTS
Email: {{PRIVACY_EMAIL}}

20. CHILDREN
Services are intended for adults 18+. We do not knowingly profile children.

21. FREE-TEXT INFORMATION
Please do not submit sensitive medical or health information in open text fields.

22. PUBLIC CONTENT
Submitting media privately does not grant publication rights without permission.

23. COOKIES
See /cookies for full cookie policy and preference controls.

24. CHANGES
Material updates will be identified by version date.

25. COMPLAINTS
Contact privacy@alkotacycles.com or the Information Commissioner's Office (ICO).

26. CONTACT
Privacy: {{PRIVACY_EMAIL}} | Controller: {{LEGAL_ENTITY_NAME}}
`;

const TOC = [
  { id: "p-1", title: "1. Data Controller" },
  { id: "p-2", title: "2. Privacy Principles" },
  { id: "p-3", title: "3. Information We Collect" },
  { id: "p-4", title: "4. Purpose of Processing" },
  { id: "p-5", title: "5. Lawful Bases" },
  { id: "p-6", title: "6. Marketing Choices" },
  { id: "p-7", title: "7. Product Safety Bulletins" },
  { id: "p-8", title: "8. Automated Decision-Making" },
  { id: "p-9", title: "9. Information Sharing" },
  { id: "p-10", title: "10. Component Manufacturers" },
  { id: "p-11", title: "11. Alkota Partners" },
  { id: "p-12", title: "12. Business Transfers" },
  { id: "p-13", title: "13. Legal Disclosures" },
  { id: "p-14", title: "14. International Transfers" },
  { id: "p-15", title: "15. Retention Schedule" },
  { id: "p-16", title: "16. Security Measures" },
  { id: "p-17", title: "17. Your Data Rights" },
  { id: "p-18", title: "18. Right to Object" },
  { id: "p-19", title: "19. Exercising Your Rights" },
  { id: "p-20", title: "20. Children & Young Riders" },
  { id: "p-21", title: "21. Free-Text Information Warning" },
  { id: "p-22", title: "22. Public & Media Content" },
  { id: "p-23", title: "23. Cookie Policy Reference" },
  { id: "p-24", title: "24. Policy Changes" },
  { id: "p-25", title: "25. Complaints & Supervision" },
  { id: "p-26", title: "26. Privacy Contacts" },
];

export default function PrivacyPolicyPage() {
  const doc = LEGAL_DOCUMENTS.privacy;
  const cleanEmail = renderCleanLegalText(PRIVACY_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="DATA PRIVACY & PROTECTION">
      <div className="space-y-10">
        <section id="p-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. WHO CONTROLS YOUR INFORMATION
          </h2>
          <p>
            Alkota asks for more information than a conventional brochure website because parts of the experience are
            designed around the individual rider — Fit, Configuration, Reservations, Ownership, and Service.
          </p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div><span className="text-black/50">DATA CONTROLLER:</span> Alkota Cycles (Legal Entity Pending)</div>
            <div><span className="text-black/50">PRIVACY EMAIL:</span> {cleanEmail}</div>
            <div><span className="text-black/50">WEBSITE:</span> https://alkotacycles.com</div>
          </div>
        </section>

        <section id="p-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. THE PRINCIPLES WE USE
          </h2>
          <p>
            We collect information for defined reasons, collect no more than reasonably needed, inform you transparently,
            retain it only as long as justified, and maintain robust technical security.
          </p>
        </section>

        <section id="p-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. INFORMATION WE MAY COLLECT
          </h2>
          <ul className="space-y-2 text-sm">
            <li><strong>Identity & Contact:</strong> Name, Email, Telephone, Country, Address.</li>
            <li><strong>Project 01 Register:</strong> Preferences, riding discipline, intent.</li>
            <li>
              <strong>Rider Fit Information:</strong> Height, inside leg, arm span, riding style. We do not use Fit Engine data for biometric identification.
              <span className="block mt-1 text-amber-800 font-mono text-xs bg-amber-50 p-2 border border-amber-200">
                PLEASE DO NOT SUBMIT MEDICAL OR HEALTH INFORMATION IN FIT ENGINE FIELDS.
              </span>
            </li>
            <li><strong>Configurations & Orders:</strong> Saved builds, component choices, order transactions.</li>
            <li><strong>Ownership & Support:</strong> Serial numbers, service history, support correspondence.</li>
          </ul>
        </section>

        <section id="p-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. WHY WE USE INFORMATION
          </h2>
          <p>
            To operate the platform, generate Fit Engine recommendations, save configurations, fulfill orders,
            manage warranty claims, send technical safety bulletins, and maintain ownership records.
          </p>
        </section>

        <section id="p-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. LAWFUL BASES
          </h2>
          <p>Processing relies on Contractual performance, Legal obligations, Legitimate interests, and Consent.</p>
        </section>

        <section id="p-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. MARKETING
          </h2>
          <p>
            Marketing communications require separate opt-in consent. Joining Project 01 does not automatically opt you in to marketing.
          </p>
        </section>

        <section id="p-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. PRODUCT SAFETY COMMUNICATIONS
          </h2>
          <p>
            Safety recall notices and technical service bulletins are essential safety communications and are sent regardless of marketing preferences.
          </p>
        </section>

        <section id="p-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. AUTOMATED DECISION-MAKING
          </h2>
          <p>Fit Engine guidance is calculated via algorithm but does not produce automated binding legal decisions.</p>
        </section>

        <section id="p-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. WHO WE SHARE INFORMATION WITH
          </h2>
          <p>Hosting providers, payment processors, transactional email services, and logistics partners under strict data processor contracts.</p>
        </section>

        <section id="p-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. COMPONENT MANUFACTURERS
          </h2>
          <p>Information is shared with component partners only when necessary to investigate specific warranty claims.</p>
        </section>

        <section id="p-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. ALKOTA PARTNERS
          </h2>
          <p>Authorised dealers receive customer contact details only when requested by the customer for demo or handover.</p>
        </section>

        <section id="p-12" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. BUSINESS TRANSFERS
          </h2>
          <p>Corporate restructuring disclosures will comply with applicable data protection legislation.</p>
        </section>

        <section id="p-13" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            13. LEGAL DISCLOSURES
          </h2>
          <p>Disclosures to law enforcement occur strictly under valid legal duty.</p>
        </section>

        <section id="p-14" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            14. INTERNATIONAL TRANSFERS
          </h2>
          <p>Cross-border transfers utilize standard contractual clauses or adequacy decisions.</p>
        </section>

        <section id="p-15" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. HOW LONG WE KEEP INFORMATION
          </h2>
          <p>Enquiries: 24 months. Registrations: 36 months. Financial records: 6 years minimum. Bike provenance is retained separately from personal data.</p>
        </section>

        <section id="p-16" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            16. SECURITY
          </h2>
          <p>Encryption in transit, role-based access controls, and regular security logging protect user data.</p>
        </section>

        <section id="p-17" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            17. YOUR RIGHTS
          </h2>
          <p>You have rights of Access, Correction, Erasure, Restriction, Portability, and Objection.</p>
        </section>

        <section id="p-18" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            18. THE RIGHT TO OBJECT
          </h2>
          <p>You have the absolute right to object to direct marketing and to object to processing based on legitimate interests.</p>
        </section>

        <section id="p-19" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            19. HOW TO EXERCISE A PRIVACY RIGHT
          </h2>
          <p>Contact: {cleanEmail}</p>
        </section>

        <section id="p-20" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            20. CHILDREN
          </h2>
          <p>Services and registration are intended for riders aged 18 and over.</p>
        </section>

        <section id="p-21" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            21. FREE-TEXT INFORMATION
          </h2>
          <p>Please refrain from entering sensitive medical or personal health data in open text forms.</p>
        </section>

        <section id="p-22" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            22. PUBLIC CONTENT
          </h2>
          <p>Private media submissions are not published without explicit licensing.</p>
        </section>

        <section id="p-23" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            23. COOKIES
          </h2>
          <p>Read our Cookie Policy at /cookies to manage optional storage preferences.</p>
        </section>

        <section id="p-24" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            24. CHANGES
          </h2>
          <p>Material changes to this privacy policy will be highlighted with revised effective dates.</p>
        </section>

        <section id="p-25" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            25. COMPLAINTS
          </h2>
          <p>You have the right to lodge a complaint with the ICO (Information Commissioner&apos;s Office) in the UK.</p>
        </section>

        <section id="p-26" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            26. CONTACT
          </h2>
          <p>Privacy Enquiries: {cleanEmail}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
