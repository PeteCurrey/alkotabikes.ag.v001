import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import { Metadata } from "next";
import { getLegalDocument } from "@/config/legalDocuments";
import { getCompany } from "@/lib/company";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Check } from "lucide-react";

const goals = [
  "Keyboard navigation throughout all interactive features and configurators",
  "Visible, high-contrast focus indicators on all interactive controls",
  "Semantic heading structure (H1 → H2 → H3) across all regional pages",
  "Sufficient colour contrast ratios meeting WCAG 2.2 AA standards",
  "Meaningful text alternatives (alt text) for informative imagery",
  "Captions or transcripts for technical media content where applicable",
  "Reduced motion support via prefers-reduced-motion CSS media queries",
  "Responsive text sizing respecting browser font zoom settings",
  "Accessible form controls with persistent labels and error messaging",
  "Screen-reader support utilizing ARIA landmark roles and live regions",
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
    path: "/accessibility",
    title: "Accessibility",
    description: "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.",
  });
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const resolvedParams = await params;
  const regionCode = (
    resolvedParams.region === "uk" ? "uk" : "us"
  ) as RegionCode;
  const isUS = regionCode === "us";
  const doc = getLegalDocument("accessibility", regionCode);
  const company = getCompany(regionCode);

  return (
    <LegalPageLayout document={doc} eyebrow={isUS ? "US ACCESSIBILITY (ADA & WCAG 2.2 AA)" : "SITE ACCESSIBILITY"}>
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="text-base leading-relaxed">
            Alkota Cycles uses technical photography, CAD schematics, and interactive product configurator tools. We design our digital experiences so that high visual fidelity enhances the platform without creating accessibility barriers.
          </p>

          {isUS ? (
            <div className="p-4 bg-alkota-carbon/5 border border-black/10 font-mono text-xs space-y-2">
              <div className="font-bold text-alkota-black uppercase">
                AMERICANS WITH DISABILITIES ACT (ADA TITLE III) &amp; WCAG 2.2 AA COMMITMENT
              </div>
              <p className="text-alkota-slate leading-relaxed">
                Alkota Cycles is committed to facilitating the accessibility and usability of alkotacycles.com/us for individuals with disabilities in accordance with Title III of the Americans with Disabilities Act (ADA) and the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-alkota-carbon/5 border border-black/10 font-mono text-xs text-alkota-slate leading-relaxed">
              We design alkotacycles.com/uk with World Wide Web Consortium (W3C) WCAG 2.2 Level AA guidelines in mind. This statement outlines our active accessibility commitments and implementation standards.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            ACCESSIBILITY IMPLEMENTATION STANDARDS
          </h2>
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li key={goal} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-alkota-signal shrink-0 mt-0.5" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            CONFIGURATOR &amp; 3D SHOWROOM ACCESSIBILITY
          </h2>
          <p>
            Interactive hotspots in our 3D showroom and component spec builder include accessible keyboard alternatives and structured text indices for screen-reader navigation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            REDUCED MOTION SUPPORT
          </h2>
          <p>
            Alkota respects the <code className="font-mono text-xs bg-black/5 px-1.5 py-0.5">prefers-reduced-motion</code> operating system setting. Users with reduced motion enabled will receive static transitions without motion-intensive animations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            REPORTING AN ACCESSIBILITY BARRIER
          </h2>
          <p>
            If you encounter an accessibility barrier or require assistance accessing any content on our website, please contact our support team:
          </p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            <div><span className="text-black/50">ACCESSIBILITY EMAIL:</span> {company.email.customerService}</div>
            <div><span className="text-black/50">RESPONSE TIMEFRAME:</span> Within 2 business days</div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
