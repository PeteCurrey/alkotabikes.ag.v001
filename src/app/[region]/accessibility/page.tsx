import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Check, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Alkota's commitment to WCAG 2.2 AA accessibility, keyboard navigation, reduced motion support, and how to report issues.",
  alternates: {
    canonical: `${siteUrl}/accessibility`,
  },
  openGraph: {
    title: "Accessibility Statement",
    description:
      "Alkota's WCAG 2.2 AA accessibility commitment, keyboard navigation, reduced motion support, and how to report issues.",
    url: `${siteUrl}/accessibility`,
  },
};

const goals = [
  "Keyboard navigation throughout all interactive features",
  "Visible, high-contrast focus states on all interactive elements",
  "Semantic heading structure (H1 → H2 → H3) throughout all pages",
  "Sufficient colour contrast ratios on all text and interactive elements",
  "Meaningful alternative text for all informative images",
  "Captions or transcripts for video content where applicable",
  "Reduced motion support via prefers-reduced-motion media query",
  "Responsive text sizing that respects browser zoom preferences",
  "Visible form labels and clear error messaging",
  "Screen-reader-friendly controls and ARIA attributes where required",
  "Alternatives to hover-only interaction patterns",
];

export default function AccessibilityPage() {
  const doc = LEGAL_DOCUMENTS.accessibility;

  return (
    <LegalPageLayout document={doc} eyebrow="SITE ACCESSIBILITY">
      <div className="space-y-10">
        {/* Standard commitment */}
        <section className="space-y-4">
          <p className="text-base leading-relaxed">
            Alkota uses photography, technical diagrams, motion and interactive product experiences extensively.
            Those things should enhance the site, not make it inaccessible.
          </p>
          <p>
            We aim to design alkotacycles.com with WCAG 2.2 Level AA principles in mind.
          </p>
          <div className="p-4 bg-alkota-carbon/5 border border-black/10 font-mono text-xs text-alkota-slate">
            Until an independent accessibility audit has confirmed full conformance, we do not claim that the entire
            site is certified or fully compliant with WCAG 2.2 AA. This statement reflects our active commitment and
            design intent.
          </div>
        </section>

        {/* What we work toward */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            WE WORK TOWARD
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

        {/* Configurator */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            CONFIGURATOR
          </h2>
          <p>
            Interactive visual hotspots in the Configurator and component exploder must also have an accessible indexed
            list alternative for keyboard and screen-reader users.
          </p>
        </section>

        {/* Design Archive */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            DESIGN ARCHIVE
          </h2>
          <p>
            Technical and engineering imagery in the Design Archive should include meaningful captions and descriptive
            alternative text where possible.
          </p>
        </section>

        {/* Motion */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            MOTION & ANIMATION
          </h2>
          <p>
            Alkota respects <code className="font-mono text-xs bg-black/5 px-1.5 py-0.5">prefers-reduced-motion</code>.
            Users who have requested reduced motion will not experience large scroll-driven animations or
            motion-intensive transitions.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            REPORTING AN ACCESSIBILITY ISSUE
          </h2>
          <p>
            If part of the site prevents you from accessing information or completing a task, contact customer support.
          </p>
          <p>Tell us:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>The page or feature where the issue occurs</li>
            <li>A description of the problem</li>
            <li>The assistive technology or browser you are using</li>
            <li>The information or action you are trying to access</li>
          </ul>
          <p>
            We will try to provide a practical alternative while the underlying issue is investigated and resolved.
          </p>
          <div className="p-4 bg-alkota-snow border border-black/10 font-mono text-xs">
            <span className="text-black/50">ACCESSIBILITY CONTACT:</span> support@alkotacycles.com
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
