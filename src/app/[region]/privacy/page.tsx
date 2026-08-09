import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { getLegalDocument } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import type { RegionCode } from "@/lib/regions";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const isUS = region === "us";
  const title = isUS ? "US Privacy Notice & Consumer Rights" : "Privacy Policy";
  const description = isUS
    ? "US Multi-State Privacy Notice covering CCPA/CPRA rights, GPC signal support, state Attorney General contact, and Do Not Sell/Share choices."
    : "Transparency on data collection, Fit Engine inputs, saved configurations, lawful bases, retention schedules, and UK ICO rights.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/privacy`,
      languages: {
        "en-GB": `${siteUrl}/uk/privacy`,
        "en-US": `${siteUrl}/us/privacy`,
        "x-default": `${siteUrl}/us/privacy`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      url: `${siteUrl}/${region}/privacy`,
    },
  };
}

const UK_TOC = [
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
  { id: "p-25", title: "25. Complaints & Supervision (ICO)" },
  { id: "p-26", title: "26. Privacy Contacts" },
];

const US_TOC = [
  { id: "us-1", title: "1. Scope & Controller Identity" },
  { id: "us-2", title: "2. Categories of Information Collected" },
  { id: "us-3", title: "3. Business Purposes for Processing" },
  { id: "us-4", title: "4. Disclosures to Third Parties" },
  { id: "us-5", title: "5. Do Not Sell or Share Personal Information" },
  { id: "us-6", title: "6. Global Privacy Control (GPC) Signal" },
  { id: "us-7", title: "7. Your State Privacy Rights" },
  { id: "us-8", title: "8. How to Exercise Your Rights" },
  { id: "us-9", title: "9. Non-Discrimination & Financial Incentives" },
  { id: "us-10", title: "10. California Shine the Light" },
  { id: "us-11", title: "11. Children's Privacy" },
  { id: "us-12", title: "12. Data Retention & Security" },
  { id: "us-13", title: "13. State Attorney General Contact" },
];

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("privacy", regionCode);
  const company = getCompany(regionCode);

  if (isUS) {
    return (
      <LegalPageLayout
        document={doc}
        toc={US_TOC}
        eyebrow="US PRIVACY & CONSUMER RIGHTS"
      >
        <div className="space-y-10">
          <section id="us-1" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              01. SCOPE &amp; CONTROLLER IDENTITY
            </h2>
            <p>
              This US Privacy Notice applies to visitors and customers residing in the United States. The data controller for US operations is:
            </p>
            <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
              <div><span className="text-black/50">DATA CONTROLLER:</span> {company.legalEntityName ?? company.tradingName}</div>
              <div><span className="text-black/50">ENTITY TYPE:</span> {"entityType" in company ? company.entityType : "US Entity"}</div>
              <div><span className="text-black/50">PRIVACY EMAIL:</span> {company.email.privacy}</div>
              <div><span className="text-black/50">WEBSITE:</span> {company.websiteUrl}</div>
            </div>
          </section>

          <section id="us-2" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              02. CATEGORIES OF PERSONAL INFORMATION COLLECTED
            </h2>
            <p>
              Under state privacy frameworks (including CCPA/CPRA and state comprehensive privacy laws), we collect the following categories of personal information:
            </p>
            <ul className="space-y-2 text-sm list-disc pl-5">
              <li><strong>Identifiers:</strong> Name, postal address, email address, IP address, and unique account identifiers.</li>
              <li><strong>Commercial Information:</strong> Project 01 build configurations, reservation records, order history, and product preferences.</li>
              <li><strong>Physical & Fit Measurement Data:</strong> Height, inside leg measurement, arm span, riding style, and reach preferences used by the Fit Engine. <em>(Fit Engine data is used exclusively to generate chassis sizing recommendations and is not used for biometric identification.)</em></li>
              <li><strong>Internet &amp; Network Activity:</strong> Browsing history on our website, interaction with web pages, and technical logs.</li>
              <li><strong>Geolocation Data:</strong> Region and coarse location derived from IP address for localized pricing and delivery choices.</li>
              <li><strong>Inferences:</strong> Preferred frame sizing and component geometry recommendations generated from your inputs.</li>
            </ul>
          </section>

          <section id="us-3" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              03. BUSINESS PURPOSES FOR PROCESSING
            </h2>
            <p>We process personal information for the following business purposes:</p>
            <ul className="space-y-1 text-sm list-disc pl-5">
              <li>Providing and operating the website, Fit Engine, and configurator.</li>
              <li>Fulfilling pre-production registrations, reservations, and sales orders.</li>
              <li>Communicating mandatory product safety bulletins and technical updates.</li>
              <li>Administering customer service, warranty claims, and technical support.</li>
              <li>Detecting, investigating, and preventing security incidents or fraudulent activity.</li>
            </ul>
          </section>

          <section id="us-4" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              04. DISCLOSURES TO THIRD PARTIES
            </h2>
            <p>
              We disclose personal information to service providers strictly as necessary to support operations (e.g. cloud infrastructure, payment processors, transactional email, and logistics). All service providers are bound by contractual confidentiality obligations.
            </p>
          </section>

          <section id="us-5" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              05. DO NOT SELL OR SHARE PERSONAL INFORMATION
            </h2>
            <div className="p-4 bg-alkota-snow border border-black/10 space-y-2">
              <p className="font-bold text-alkota-black">
                Alkota Cycles does NOT sell your personal information for monetary or other valuable consideration, nor do we share your personal data for cross-context behavioral advertising.
              </p>
              <p className="text-xs text-black/70">
                Regardless of our practice, state privacy laws require a designated mechanism for consumers to express opt-out preferences. You may exercise your opt-out preference at any time.
              </p>
              <div className="pt-2">
                <Link
                  href="/us/cookies"
                  className="inline-block px-3 py-1.5 bg-alkota-black text-white font-mono text-xs uppercase tracking-wider hover:bg-alkota-black/80"
                >
                  Your Privacy Choices / Cookie Settings
                </Link>
              </div>
            </div>
          </section>

          <section id="us-6" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              06. GLOBAL PRIVACY CONTROL (GPC) SIGNAL
            </h2>
            <p>
              Alkota Cycles automatically detects and respects the Global Privacy Control (GPC) browser signal. If your browser broadcasts an active GPC signal, our system interprets it as an opt-out request for non-essential cookies and tracking technologies.
            </p>
          </section>

          <section id="us-7" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              07. YOUR STATE PRIVACY RIGHTS
            </h2>
            <p>Depending on your state of residence, you have the following privacy rights:</p>
            <ul className="space-y-2 text-sm list-disc pl-5">
              <li><strong>Right to Know / Access:</strong> Request details regarding categories and specific pieces of personal information collected.</li>
              <li><strong>Right to Delete:</strong> Request deletion of personal information collected from you, subject to legal exceptions.</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
              <li><strong>Right to Portability:</strong> Request a copy of your personal data in a readily usable electronic format.</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of data sales, sharing for targeted advertising, or profiling.</li>
              <li><strong>Right to Appeal:</strong> If we decline your privacy request, you have the right to appeal our decision.</li>
            </ul>
          </section>

          <section id="us-8" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              08. HOW TO EXERCISE YOUR RIGHTS
            </h2>
            <p>
              To submit a privacy rights request, email us at <a href={`mailto:${company.email.privacy}`} className="underline font-mono">{company.email.privacy}</a> with the subject line <em>&quot;US Privacy Request&quot;</em>.
            </p>
            <p className="text-xs text-black/70">
              We will verify your identity before processing requests. Authorized agents may submit requests on your behalf with written authorization.
            </p>
          </section>

          <section id="us-9" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              09. NON-DISCRIMINATION &amp; FINANCIAL INCENTIVES
            </h2>
            <p>
              We will not discriminate against you for exercising your privacy rights. Alkota Cycles does not offer financial incentives, price discounts, or service tier differences in exchange for the retention or sale of personal data.
            </p>
          </section>

          <section id="us-10" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              10. CALIFORNIA SHINE THE LIGHT
            </h2>
            <p>
              Under California Civil Code §1798.83 (Shine the Light), California residents may ask whether personal information was disclosed to third parties for direct marketing purposes. Alkota Cycles does not disclose personal data to third parties for direct marketing.
            </p>
          </section>

          <section id="us-11" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              11. CHILDREN&apos;S PRIVACY
            </h2>
            <p>
              Our website and services are intended for individuals aged 18 and older. We do not knowingly collect or sell personal information from minors under 16.
            </p>
          </section>

          <section id="us-12" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              12. DATA RETENTION &amp; SECURITY
            </h2>
            <p>
              Personal data is retained only as long as necessary to fulfill the business purposes outlined or as required by applicable US federal or state law. We maintain physical, technical, and administrative safeguards.
            </p>
          </section>

          <section id="us-13" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              13. REGULATORY CONTACT &amp; APPEALS
            </h2>
            <p>
              If you have concerns regarding our privacy practices or wish to appeal a denied request, you may contact our privacy office at <a href={`mailto:${company.email.privacy}`} className="underline font-mono">{company.email.privacy}</a> or submit an enquiry to your state Attorney General&apos;s Consumer Protection Division.
            </p>
          </section>
        </div>
      </LegalPageLayout>
    );
  }

  // UK Privacy Policy
  return (
    <LegalPageLayout document={doc} toc={UK_TOC} eyebrow="DATA PRIVACY & PROTECTION (UK)">
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
            <div><span className="text-black/50">DATA CONTROLLER:</span> {company.legalEntityName ?? company.tradingName}</div>
            <div><span className="text-black/50">PRIVACY EMAIL:</span> {company.email.privacy}</div>
            <div><span className="text-black/50">WEBSITE:</span> {company.websiteUrl}</div>
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
            <li><strong>Identity &amp; Contact:</strong> Name, Email, Telephone, Country, Address.</li>
            <li><strong>Project 01 Register:</strong> Preferences, riding discipline, intent.</li>
            <li>
              <strong>Rider Fit Information:</strong> Height, inside leg, arm span, riding style. We do not use Fit Engine data for biometric identification.
              <span className="block mt-1 text-amber-800 font-mono text-xs bg-amber-50 p-2 border border-amber-200">
                PLEASE DO NOT SUBMIT MEDICAL OR HEALTH INFORMATION IN FIT ENGINE FIELDS.
              </span>
            </li>
            <li><strong>Configurations &amp; Orders:</strong> Saved builds, component choices, order transactions.</li>
            <li><strong>Ownership &amp; Support:</strong> Serial numbers, service history, support correspondence.</li>
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
          <p>You have rights of Access, Correction, Erasure, Restriction, Portability, and Objection under UK GDPR.</p>
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
          <p>Contact: {company.email.privacy}</p>
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
            25. COMPLAINTS &amp; SUPERVISION (ICO)
          </h2>
          <p>You have the right to lodge a complaint with the UK Information Commissioner&apos;s Office (ICO).</p>
        </section>

        <section id="p-26" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            26. CONTACT
          </h2>
          <p>Privacy Enquiries: {company.email.privacy}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
