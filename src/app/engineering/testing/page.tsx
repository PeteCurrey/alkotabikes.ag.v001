import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import TerrainBench from "@/components/sections/TerrainBench";
import TestRecord from "@/components/engineering/TestRecord";

export const metadata: Metadata = {
  title: "Validation & Testing Methodology — FEA, Fatigue & Field Telemetry | Alkota Cycles",
  description:
    "Engineering validation methodology for the Alkota Project 01: finite element analysis limits, ISO 4210 fatigue protocol, physical strain gauge instrumentation, and field telemetry logging. A claim is not a specification until the test data says so.",
  alternates: {
    canonical: `${siteUrl}/engineering/testing`,
  },
  openGraph: {
    title: "Validation & Testing Methodology — FEA, Fatigue & Field Telemetry | Alkota Cycles",
    description:
      "Engineering validation methodology for the Alkota Project 01: finite element analysis limits, ISO 4210 fatigue protocol, physical strain gauge instrumentation, and field telemetry logging. A claim is not a specification until the test data says so.",
    url: `${siteUrl}/engineering/testing`,
  },
};

export default function TestingEngineeringPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Engineering", path: "/engineering" },
    { name: "Validation & Testing", path: "/engineering/testing" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="ENGINEERING PILLAR 04" value="LAB & TERRAIN VALIDATION" variant="signal" />
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              PROVE IT<br />
              <span className="text-[#647789]">OUTSIDE THE SCREEN.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] font-light leading-relaxed">
              Simulation is a design tool. Testing is the engineering record.
              Finite element analysis guides material placement and identifies peak stress concentrations; it cannot account for manufacturing variability, impact damage accumulation,
              or the unpredictable load spectrum of real-world trail terrain.
              Physical validation — fatigue rigs, strain gauges, and sensor-equipped prototype testing — is the process that converts a development target into a production specification.
            </p>
          </div>

          {/* Diagram 4.1 — Validation Pipeline */}
          <div className="p-6 border border-white/15 bg-[#131313] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-[#647789]">
              <span className="text-alkota-signal font-bold uppercase">DIAGRAM 4.1 // VALIDATION PIPELINE — DESIGN TO SPECIFICATION</span>
              <span>PROCESS MODEL</span>
            </div>
            <div className="w-full overflow-hidden bg-black/60 p-4 border border-white/10">
              <svg viewBox="0 0 800 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid4)" />

                {/* Stage boxes */}
                {[
                  { x: 20, label: "PARAMETRIC\nDESIGN", sub: "Kinematics\nGeometry" },
                  { x: 185, label: "FEA\nSIMULATION", sub: "Load paths\nStress peaks" },
                  { x: 350, label: "PROTOTYPE\nFABRICATION", sub: "Pre-prod\nhardware" },
                  { x: 515, label: "LAB FATIGUE\nTESTING", sub: "ISO 4210\nRig cycles" },
                  { x: 620, label: "FIELD\nTELEMETRY", sub: "Sensor\nlogging" },
                ].map((stage, i) => (
                  <React.Fragment key={i}>
                    <rect x={stage.x} y={30} width={145} height={80} fill="rgba(20,20,20,0.9)" stroke={i === 0 ? "#647789" : i === 4 ? "#c8f902" : "#9ab0c4"} strokeWidth={i === 4 ? 2 : 1}/>
                    {stage.label.split("\n").map((line, j) => (
                      <text key={j} x={stage.x + 72} y={62 + j * 14} fill={i === 4 ? "#c8f902" : "#eef4f8"} fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{line}</text>
                    ))}
                    {stage.sub.split("\n").map((line, j) => (
                      <text key={j} x={stage.x + 72} y={98 + j * 12} fill="#647789" fontSize="10" fontFamily="monospace" textAnchor="middle">{line}</text>
                    ))}
                  </React.Fragment>
                ))}

                {/* Arrows between stages */}
                <defs>
                  <marker id="arrow4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8f902"/>
                  </marker>
                </defs>
                {[165, 330, 495].map((x, i) => (
                  <line key={i} x1={x} y1={70} x2={x + 20} y2={70} stroke="#c8f902" strokeWidth="2" markerEnd="url(#arrow4)"/>
                ))}

                {/* Feedback loop */}
                <path d="M 760 120 Q 760 160 400 160 Q 40 160 40 120" fill="none" stroke="#c8f902" strokeWidth="1.5" strokeDasharray="6 4"/>
                <line x1="40" y1="120" x2="40" y2="110" stroke="#c8f902" strokeWidth="1.5" markerEnd="url(#arrow4)"/>
                <text x="400" y="178" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="middle">FEEDBACK — MODEL REVISION ON DISCREPANCY</text>

                {/* SPECIFICATION label at far right */}
                <text x="775" y="66" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SPEC</text>
                <text x="775" y="78" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="middle">LOCKED</text>
              </svg>
            </div>
            <p className="font-mono text-[11px] text-[#647789] leading-relaxed">
              Figure 4.1 — Validation pipeline. Discrepancies between simulation predictions and physical test results trigger model revision and re-analysis before the specification is locked.
              No value moves from &ldquo;development target&rdquo; to &ldquo;production specification&rdquo; without passing through every stage.
            </p>
          </div>

          {/* Deep Content Body */}
          <div className="space-y-8 font-sans text-sm sm:text-base text-[#9ab0c4] leading-relaxed font-light">

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">1. FINITE ELEMENT ANALYSIS — WHAT FEA TELLS YOU, AND WHAT IT DOESN&apos;T</h2>
              <p>
                Finite element analysis divides a complex geometry into a mesh of discrete elements and solves the structural equilibrium equations for a defined set of load cases and
                boundary conditions. The output — principal stress distributions, deflection fields, and local strain peaks — tells the engineer where material is overloaded
                and where it is unnecessarily abundant.
              </p>
              <p>
                FEA guides ply schedule decisions, identifies geometric stress risers requiring fillet radius adjustment, and allows rapid comparison of design variants without
                manufacturing physical parts. A well-constructed FEA model reduces the number of physical prototype iterations required before the design converges.
              </p>
              <p>
                What FEA does not tell you: the actual material properties of your specific laminate (which depend on the lay-up process, cure cycle, and quality control of physical
                production), the effects of manufacturing defects such as voids and delaminations, or the response to impact damage. FEA is a linear approximation of a non-linear world.
                It is a necessary step, not a sufficient one.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">2. ISO 4210 FATIGUE PROTOCOL</h2>
              <p>
                ISO 4210 defines the standard test protocols for bicycle structural strength and fatigue:
              </p>
              <div className="space-y-3">
                <div className="p-4 border border-white/10 bg-[#131313] space-y-1">
                  <p className="font-mono text-xs text-alkota-signal uppercase font-bold">4210-6 — FRAME FATIGUE (HORIZONTAL FORCE)</p>
                  <p className="text-sm text-[#9ab0c4]">
                    A cyclic horizontal load is applied at the bottom bracket axis. For &ldquo;off-road&rdquo; bicycles, the test specifies a minimum of 100,000 cycles at a defined load amplitude.
                    The frame must survive without crack initiation or crack propagation beyond defined limits. This test simulates the combined pedalling and braking load cycle on the main frame structure.
                  </p>
                </div>
                <div className="p-4 border border-white/10 bg-[#131313] space-y-1">
                  <p className="font-mono text-xs text-alkota-signal uppercase font-bold">4210-6 — FRAME FATIGUE (VERTICAL FORCE)</p>
                  <p className="text-sm text-[#9ab0c4]">
                    A cyclic vertical load is applied through the seat tube. This test simulates the repetitive rider weight transfer and saddle-to-frame coupling forces under continuous riding.
                  </p>
                </div>
                <div className="p-4 border border-white/10 bg-[#131313] space-y-1">
                  <p className="font-mono text-xs text-alkota-signal uppercase font-bold">4210-9 — FORK CROWN IMPACT & FATIGUE</p>
                  <p className="text-sm text-[#9ab0c4]">
                    A drop weight test simulates a front wheel impact. Combined with cyclic fatigue testing, this protocol validates the fork crown, steer tube, and headtube junction
                    — the highest stress zone in the chassis under combined cornering and braking.
                  </p>
                </div>
              </div>
              <p>
                Test results are reported against the pass/fail criteria defined in the standard. A frame that passes ISO 4210 has met the minimum engineering baseline for structural integrity.
                It has not necessarily met the higher standard required for sustained high-impact off-road riding — additional protocol is required for that.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">3. STRAIN GAUGE INSTRUMENTATION</h2>
              <p>
                Strain gauges — resistive foil sensors bonded directly to the surface of a structure — measure localised micro-strain when current passes through them.
                As the surface deforms, the gauge resistance changes in proportion to strain. A Wheatstone bridge circuit converts this resistance change to a voltage,
                which is logged at sampling rates sufficient to capture transient impact events.
              </p>
              <p>
                A prototype chassis instrumented with strain gauges at predicted high-stress sites — headtube gusset junctions, bottom bracket shell, chainstay root, pivot flanges —
                can validate or refute the FEA model in real riding conditions. Rider-generated load spectra recorded on instrumented hardware are used to define a laboratory
                fatigue test programme that reproduces field-representative loading rather than arbitrary standard test conditions.
              </p>
              <p>
                Strain gauge data also detects asymmetric loading: a frame that carries significantly more strain on one side of the bottom bracket under pedalling is transmitting
                a torsional moment that simulation may have underestimated. The data closes the feedback loop between model and reality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">4. SHOCK DYNAMOMETER CALIBRATION</h2>
              <p>
                A shock dynamometer (shock dyno) subjects a rear shock absorber to controlled sinusoidal or ramp displacement profiles while measuring the force output across the range
                of shaft velocities. The force-velocity (F-V) curve describes the damper characteristic: how much force the shock generates at each shaft speed in compression and rebound.
              </p>
              <p>
                This measurement serves two purposes. First, it provides a baseline fingerprint of a specific shock unit before installation, allowing like-for-like comparison across
                multiple units of the same model and identification of outliers. Second, it enables suspension setup to be specified from known F-V curves rather than estimated from
                external clicker settings — the basis of suspension tuning done with engineering rigour rather than field intuition alone.
              </p>
              <p>
                Shock dyno data combined with the kinematic leverage curve allows calculation of wheel-rate at the chassis: the effective spring rate experienced by the rider, accounting
                for mechanical advantage. This integrated analysis is the foundation of suspension setup for different rider weights, terrain types, and performance objectives.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">5. FIELD TELEMETRY & ALPINE TERRAIN LOGGING</h2>
              <p>
                Laboratory tests validate structural integrity under defined, repeatable load cases. Field telemetry validates dynamic behaviour under real terrain conditions.
                A prototype fitted with IMU data loggers (accelerometers, gyroscopes), shock position sensors, and wheel-speed encoders records the chassis response to every
                input across a defined trail loop.
              </p>
              <p>
                Post-ride data processing extracts: peak g-loads at front and rear, suspension velocity histograms (how much time the shock spends at each shaft speed),
                suspension travel usage, and frame acceleration spectra at multiple measurement points. This data is compared against simulation predictions and against
                competitor benchmark data acquired on equivalent terrain.
              </p>
              <p>
                The alpine terrain environment — high altitude, extreme temperature variation, sharp limestone terrain — is selected specifically because it accelerates fatigue cycles
                and reveals chassis behaviours that flat-country riding cannot generate. A chassis proven on sustained technical alpine descents has been subjected to load conditions
                representative of the most demanding real-world service environments.
              </p>
            </section>
          </div>

          {/* Alpine terrain component */}
          <div className="space-y-4">
            <TerrainBench />
          </div>

          {/* Test records log */}
          <div className="space-y-4">
            <div className="p-4 border border-white/10 bg-[#131313]">
              <p className="font-mono text-[11px] text-[#647789] mb-4 uppercase">TEST LOG — PROJECT 01 R00</p>
              <TestRecord />
            </div>
          </div>

          {/* Related pillars */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/engineering/materials" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">← PILLAR 03</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Materials & Structures</p>
            </a>
            <a href="/engineering" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">↑ ALL PILLARS</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Engineering Index</p>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
