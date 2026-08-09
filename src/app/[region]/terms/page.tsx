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
  const title = isUS ? "Terms & Conditions of Sale (US)" : "Terms & Conditions of Sale";
  const description = isUS
    ? "US Consumer Terms of Sale governing product purchases, contractual return policies, and US state law provisions."
    : "UK Consumer Terms of Sale governing purchases, statutory cancellation rights under Consumer Contracts Regulations, and order fulfilment.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${region}/terms`,
      languages: {
        "en-GB": `${siteUrl}/uk/terms`,
        "en-US": `${siteUrl}/us/terms`,
        "x-default": `${siteUrl}/us/terms`,
      },
    },
    openGraph: {
      title: `${title} | Alkota Cycles`,
      description,
      url: `${siteUrl}/${region}/terms`,
    },
  };
}

const UK_TOC = [
  { id: "s-1", title: "1. About These Terms" },
  { id: "s-2", title: "2. Contracting Entity" },
  { id: "s-3", title: "3. Definitions" },
  { id: "s-4", title: "4. Project 01 Pre-Production Status" },
  { id: "s-5", title: "5. Configurator & Fit Engine" },
  { id: "s-6", title: "6. Order Formation & Acceptance" },
  { id: "s-7", title: "7. Prices & VAT" },
  { id: "s-8", title: "8. Payment Staging" },
  { id: "s-9", title: "9. Delivery & Partner Handover" },
  { id: "s-10", title: "10. Statutory Distance Selling Rights (14-Day)" },
  { id: "s-11", title: "11. Faulty Goods & Consumer Rights Act 2015" },
  { id: "s-12", title: "12. Governing Law (England & Wales)" },
];

const US_TOC = [
  { id: "us-s-1", title: "1. About These Terms" },
  { id: "us-s-2", title: "2. US Contracting Entity" },
  { id: "us-s-3", title: "3. Definitions & Pre-Production Status" },
  { id: "us-s-4", title: "4. Order Formation & Acceptance" },
  { id: "us-s-5", title: "5. Prices & Sales Tax" },
  { id: "us-s-6", title: "6. Payment & Staging" },
  { id: "us-s-7", title: "7. Shipping & Risk of Loss" },
  { id: "us-s-8", title: "8. Voluntary Return Policy" },
  { id: "us-s-9", title: "9. Product Safety & Modifications" },
  { id: "us-s-10", title: "10. Disclaimers & Limitation of Liability" },
  { id: "us-s-11", title: "11. Arbitration & Class Action Waiver (Optional)" },
  { id: "us-s-12", title: "12. Governing Law" },
];

export default async function TermsPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("terms", regionCode);
  const company = getCompany(regionCode);

  if (isUS) {
    return (
      <LegalPageLayout
        document={doc}
        toc={US_TOC}
        eyebrow="TERMS & CONDITIONS OF SALE (US)"
      >
        <div className="space-y-10">
          <section id="us-s-1" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              01. ABOUT THESE TERMS
            </h2>
            <p>
              These Terms &amp; Conditions of Sale govern all product orders, reservations, and purchases made by US consumers through alkotacycles.com/us or authorized US channels.
            </p>
            <p className="text-xs text-black/70">
              Please read these terms carefully before submitting an order. Nothing in these terms excludes mandatory consumer protections under applicable US federal or state law.
            </p>
          </section>

          <section id="us-s-2" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              02. US CONTRACTING ENTITY
            </h2>
            <p>The seller and contracting entity for US orders is:</p>
            <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
              <div><span className="text-black/50">LEGAL ENTITY:</span> {company.legalEntityName}</div>
              <div><span className="text-black/50">ENTITY TYPE:</span> {"entityType" in company ? company.entityType : "US Entity"}</div>
              <div><span className="text-black/50">INCORPORATION:</span> {"stateOfIncorporation" in company ? company.stateOfIncorporation : "US State"}</div>
              <div><span className="text-black/50">PRINCIPAL PLACE OF BUSINESS:</span> {"principalPlaceOfBusiness" in company ? company.principalPlaceOfBusiness : "US Address"}</div>
              <div><span className="text-black/50">CUSTOMER SERVICE EMAIL:</span> {company.email.customerService}</div>
            </div>
          </section>

          <section id="us-s-3" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              03. DEFINITIONS &amp; PRE-PRODUCTION STATUS
            </h2>
            <p>
              Project 01 is currently an active mountain bike development programme. Specifications shown prior to Build Lock represent R00 pre-production engineering baselines.
            </p>
          </section>

          <section id="us-s-4" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              04. ORDER FORMATION &amp; ACCEPTANCE
            </h2>
            <p>
              Submitting an order constitutes an offer to purchase. A binding sales contract is formed only when Alkota issues an official Order Confirmation document.
            </p>
          </section>

          <section id="us-s-5" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              05. PRICES &amp; SALES TAX
            </h2>
            <p>
              US prices are displayed in USD ($) exclusive of state and local sales tax. Applicable sales tax is calculated and added at checkout based on the delivery destination ZIP code.
            </p>
          </section>

          <section id="us-s-6" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              06. PAYMENT &amp; STAGING
            </h2>
            <p>
              Payment methods accepted will be displayed during checkout. Payment processing is handled by secure PCI-DSS compliant third-party payment gateways.
            </p>
          </section>

          <section id="us-s-7" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              07. SHIPPING &amp; RISK OF LOSS
            </h2>
            <p>
              Risk of loss and title to products pass to the customer upon delivery to the specified shipping destination carrier or customer address in accordance with standard US commercial practices.
            </p>
          </section>

          <section id="us-s-8" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              08. VOLUNTARY RETURN POLICY
            </h2>
            <p>
              US sales are subject to Alkota&apos;s voluntary contractual returns policy. Unlike UK distance selling rules, US law does not provide a general 14-day statutory right of cancellation.
            </p>
            <p>
              Please see our <Link href="/us/returns" className="underline font-mono">US Returns Policy</Link> for details regarding eligible return conditions and restocking requirements.
            </p>
          </section>

          <section id="us-s-9" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              09. PRODUCT SAFETY &amp; MODIFICATIONS
            </h2>
            <p>
              Bicycles distributed in the US comply with mandatory Consumer Product Safety Commission standards (CPSC 16 CFR Part 1512). Unapproved structural modifications void safety certifications and warranty coverage.
            </p>
          </section>

          <section id="us-s-10" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              10. DISCLAIMERS &amp; LIMITATION OF LIABILITY
            </h2>
            <p>
              Except as expressly provided in our US Limited Warranty, products are provided without additional warranties. To the extent permitted by law, consequential or punitive damages are disclaimed.
            </p>
          </section>

          <section id="us-s-11" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              11. ARBITRATION &amp; CLASS ACTION WAIVER (OPTIONAL)
            </h2>
            <div className="p-4 bg-amber-50 border border-amber-300 font-mono text-xs space-y-2">
              <div className="font-bold text-amber-900 uppercase">
                OPTIONAL ARBITRATION &amp; CLASS ACTION WAIVER — PENDING COUNSEL REVIEW
              </div>
              <p className="text-amber-800 leading-relaxed">
                To the extent permitted by applicable state law, disputes arising out of or relating to these terms or US sales transactions shall be resolved by binding individual arbitration rather than in court, and you waive any right to participate in a class action lawsuit or class-wide arbitration. <em>(This clause is an optional block drafted for US legal counsel evaluation prior to commercial launch and MUST NEVER render in the UK legal set.)</em>
              </p>
            </div>
          </section>

          <section id="us-s-12" className="space-y-3">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
              12. GOVERNING LAW
            </h2>
            <p className="font-mono text-xs p-3 bg-alkota-snow border border-black/10">
              GOVERNING LAW: PLACEHOLDER — US State Governing Law
            </p>
            <p className="text-xs text-black/70">
              These terms are governed by and construed in accordance with US federal law and the laws of PLACEHOLDER — US State Governing Law.
            </p>
          </section>
        </div>
      </LegalPageLayout>
    );
  }

  // UK Terms of Sale
  return (
    <LegalPageLayout
      document={doc}
      toc={UK_TOC}
      eyebrow="TERMS & CONDITIONS OF SALE (UK)"
    >
      <div className="space-y-10">
        <section id="s-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. ABOUT THESE TERMS
          </h2>
          <p>
            These Terms &amp; Conditions of Sale explain the basis on which you may buy goods or services from Alkota Cycles in the United Kingdom through alkotacycles.com/uk.
          </p>
          <p>Nothing in these terms affects any statutory rights under UK consumer protection legislation.</p>
        </section>

        <section id="s-2" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. CONTRACTING ENTITY
          </h2>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs space-y-1">
            <div><span className="text-black/50">LEGAL ENTITY:</span> {company.legalEntityName ?? company.tradingName}</div>
            <div><span className="text-black/50">TRADING NAME:</span> {company.tradingName}</div>
            <div><span className="text-black/50">CUSTOMER SERVICE:</span> {company.email.customerService}</div>
            <div><span className="text-black/50">WEBSITE:</span> {company.websiteUrl}</div>
          </div>
        </section>

        <section id="s-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. DEFINITIONS
          </h2>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li><strong>&quot;Bike&quot;</strong> means an Alkota mountain bicycle.</li>
            <li><strong>&quot;Build Lock&quot;</strong> means the point at which production specification becomes fixed.</li>
            <li><strong>&quot;Project 01&quot;</strong> means Alkota&apos;s pre-production mountain bike development programme.</li>
          </ul>
        </section>

        <section id="s-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. PROJECT 01 PRE-PRODUCTION STATUS
          </h2>
          <p>Project 01 is currently in pre-production engineering baseline phase ahead of planned 2028 release.</p>
        </section>

        <section id="s-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. CONFIGURATOR &amp; FIT ENGINE
          </h2>
          <p>Configurator selections explore choices. Development builds do not reserve stock or lock final prices.</p>
        </section>

        <section id="s-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. ORDER FORMATION &amp; ACCEPTANCE
          </h2>
          <p>Orders submitted are offers to buy. Contracts form upon issuance of an Order Confirmation.</p>
        </section>

        <section id="s-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. PRICES &amp; VAT
          </h2>
          <p>UK consumer prices are displayed inclusive of VAT at the applicable rate (Price Marking Order 2004).</p>
        </section>

        <section id="s-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. PAYMENT STAGING
          </h2>
          <p>Payment options and staged deposit schedules are clearly detailed prior to contract formation.</p>
        </section>

        <section id="s-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. DELIVERY &amp; PARTNER HANDOVER
          </h2>
          <p>Delivery arrangements and optional Alkota Partner handover details are outlined before purchase.</p>
        </section>

        <section id="s-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. STATUTORY DISTANCE SELLING RIGHTS (14-DAY)
          </h2>
          <p>
            Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, UK consumers have a statutory right to cancel a distance contract within 14 days of receiving physical possession of goods without giving any reason.
          </p>
          <p>
            See our <Link href="/uk/returns" className="underline font-mono">UK Returns Policy</Link> for instructions on exercising your statutory 14-day cancellation right.
          </p>
        </section>

        <section id="s-11" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. FAULTY GOODS &amp; CONSUMER RIGHTS ACT 2015
          </h2>
          <p>
            Goods supplied to UK consumers must be of satisfactory quality, fit for purpose, and as described under the Consumer Rights Act 2015. Statutory remedies operate independently of commercial warranty guarantees.
          </p>
        </section>

        <section id="s-12" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. GOVERNING LAW (ENGLAND &amp; WALES)
          </h2>
          <p>
            These terms are governed by and construed in accordance with the law of England and Wales. Consumers resident in Scotland or Northern Ireland retain mandatory local court jurisdiction rights.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
