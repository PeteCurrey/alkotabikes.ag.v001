import React from "react";
import { Metadata } from "next";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import { renderCleanLegalText, CUSTOMER_SERVICE_EMAIL } from "@/config/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & Intended Use | Alkota Cycles",
  description:
    "Pre-ride checks, helmet requirements, carbon inspection, torque guidance, and modification warnings for Project 01.",
  alternates: {
    canonical: `${siteUrl}/safety`,
  },
  openGraph: {
    title: "Safety & Intended Use | Alkota Cycles",
    description:
      "Pre-ride checks, helmet requirements, carbon inspection, torque guidance, and modification warnings for Project 01.",
    url: `${siteUrl}/safety`,
  },
};

const TOC = [
  { id: "safe-docs", title: "1. Read the Documentation" },
  { id: "safe-use", title: "2. Intended Use" },
  { id: "safe-helmet", title: "3. Helmet & Protection" },
  { id: "safe-preride", title: "4. Pre-Ride Check" },
  { id: "safe-torque", title: "5. Torque Values" },
  { id: "safe-suspension", title: "6. Suspension Limits" },
  { id: "safe-wheels", title: "7. Wheels & Tyres" },
  { id: "safe-brakes", title: "8. Brakes" },
  { id: "safe-carbon", title: "9. Carbon Inspection" },
  { id: "safe-crash", title: "10. Post-Crash Inspection" },
  { id: "safe-mod", title: "11. Structural Modification" },
  { id: "safe-maint", title: "12. Maintenance" },
  { id: "safe-pro", title: "13. Professional Support" },
  { id: "safe-bulletins", title: "14. Safety Bulletins" },
  { id: "safe-children", title: "15. Young Riders" },
  { id: "safe-liability", title: "16. Liability Notice" },
];

export default function SafetyPage() {
  const doc = LEGAL_DOCUMENTS.safety;
  const supportEmail = renderCleanLegalText(CUSTOMER_SERVICE_EMAIL);

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="PRODUCT SAFETY & INTENDED USE">
      <div className="space-y-10">
        {/* Safety callout */}
        <div className="p-5 bg-amber-50 border-l-4 border-amber-500 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            Mountain biking involves speed, changing terrain, impacts and the possibility of serious injury.
            No bicycle removes those risks. Good engineering, correct setup, maintenance, judgement and protective
            equipment all matter.
          </p>
        </div>

        <section id="safe-docs" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. READ THE PRODUCT-SPECIFIC DOCUMENTATION
          </h2>
          <p>
            The final owner manual and technical information supplied with a production Bike take priority over general
            editorial material on this Site. Do not use marketing copy as a workshop guide.
          </p>
        </section>

        <section id="safe-use" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. USE THE BIKE WITHIN ITS PUBLISHED INTENDED USE
          </h2>
          <p>
            Project 01&apos;s final production intended-use classification (including ASTM/EN category) will be published
            before delivery. Do not create or infer a category claim from pre-production information.
          </p>
        </section>

        <section id="safe-helmet" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. HELMET AND PROTECTIVE EQUIPMENT
          </h2>
          <p>
            Always wear an appropriate, correctly fitted cycling helmet. Wear protective equipment suited to the terrain
            and riding activity — full-face, armour, knee/elbow protection where appropriate.
          </p>
        </section>

        <section id="safe-preride" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. PRE-RIDE CHECK
          </h2>
          <p>Before each ride, check:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Brakes — lever feel, pad contact, rotor condition</li>
            <li>Wheels — axle security, spoke tension, rim condition</li>
            <li>Tyres — pressure, casing integrity, tread</li>
            <li>Cockpit — bar, stem, and headset tightness</li>
            <li>Suspension — air pressures, sag settings, pivot fasteners</li>
            <li>Drivetrain — chain, cassette, derailleur alignment</li>
            <li>Frame — no visible cracks, impact marks or unusual sounds</li>
          </ul>
        </section>

        <section id="safe-torque" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. TORQUE VALUES
          </h2>
          <p className="font-medium">
            Always use product-specific torque specifications from the owner manual or component documentation.
          </p>
          <p>
            Never apply a generic torque value from a glossary, article or online guide to a safety-critical fastener.
            Incorrect torque can cause component failure.
          </p>
        </section>

        <section id="safe-suspension" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. SUSPENSION — CONFIGURATION LIMITS
          </h2>
          <p>
            Only use approved shock stroke/eye-to-eye dimensions, fork travel, and air volume configurations for the
            specific Bike model. Changing suspension dimensions can affect geometry, bearing loads, clearances, handling
            and safety.
          </p>
        </section>

        <section id="safe-wheels" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. WHEELS AND TYRES
          </h2>
          <p>
            Use compatible wheel, rim and tyre combinations. Verify clearance is adequate under real riding conditions
            including mud loading and system flex.
          </p>
        </section>

        <section id="safe-brakes" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. BRAKES
          </h2>
          <p>
            Brake systems are safety critical. Installation, bleeding, rotor sizing, pad bedding and pad condition must
            follow applicable manufacturer and Alkota-specific instructions.
          </p>
        </section>

        <section id="safe-carbon" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. CARBON COMPONENTS — INSPECTION
          </h2>
          <p>
            Inspect carbon components carefully following any significant impact or suspected damage. Carbon damage may
            not present as visible deformation — unlike metal, it may fail without prior warning deformation.
          </p>
          <p className="font-medium">If in any doubt, stop riding and obtain competent professional inspection.</p>
        </section>

        <section id="safe-crash" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. POST-CRASH INSPECTION
          </h2>
          <p>
            After any significant crash, inspect the Bike thoroughly before continued use. If structural damage is
            suspected, do not continue riding. Contact an authorised Alkota Partner or qualified bicycle technician.
          </p>
        </section>

        <section id="safe-mod" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            11. STRUCTURAL MODIFICATION
          </h2>
          <p>
            Do not drill, cut, bond or structurally alter a frame unless specifically authorised in writing by Alkota.
            Unauthorised modifications void applicable warranty for damage caused by or related to the modification.
          </p>
        </section>

        <section id="safe-maint" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            12. MAINTENANCE
          </h2>
          <p>
            A high-performance bicycle requires regular maintenance. Service intervals depend on use intensity, riding
            conditions and component manufacturer guidance. Refer to the production-specific owner manual.
          </p>
        </section>

        <section id="safe-pro" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            13. PROFESSIONAL SUPPORT
          </h2>
          <p>
            If you are not competent to perform a safety-critical service task, use an appropriately qualified bicycle
            technician or authorised Alkota Partner.
          </p>
        </section>

        <section id="safe-bulletins" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            14. TECHNICAL BULLETINS & RECALLS
          </h2>
          <p>
            Where a safety-related technical bulletin affects an individual Bike, Alkota may contact the registered owner
            and display information through My Alkota. Ensure your ownership registration is current.
          </p>
        </section>

        <section id="safe-children" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            15. YOUNG RIDERS
          </h2>
          <p>
            A parent or guardian is responsible for evaluating whether a bicycle, trail and riding environment are
            appropriate for a young rider.
          </p>
        </section>

        <section id="safe-liability" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            16. LIABILITY
          </h2>
          <p>
            Nothing on this page is intended to exclude Alkota&apos;s liability for an unsafe, defective or non-conforming
            product, or any other mandatory legal liability. Rider responsibility for appropriate use coexists with
            Alkota&apos;s obligations under product safety and consumer law.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
