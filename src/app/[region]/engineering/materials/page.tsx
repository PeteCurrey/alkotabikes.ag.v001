import React from "react";
import { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import MaterialSwatches from "@/components/engineering/MaterialSwatches";

export const metadata: Metadata = {
  title: "Materials & Structures — Carbon Fibre, Aluminium Alloy & Titanium",
  description:
    "A technical analysis of mountain bike material selection: unidirectional carbon fibre layup schedules, resin systems, AL7075-T6 alloy, Grade 5 titanium fasteners, and the engineering rationale for each application.",
  alternates: {
    canonical: `${siteUrl}/engineering/materials`,
  },
  openGraph: {
    title: "Materials & Structures — Carbon Fibre, Aluminium Alloy & Titanium",
    description:
      "A technical analysis of mountain bike material selection: unidirectional carbon fibre layup schedules, resin systems, AL7075-T6 alloy, Grade 5 titanium fasteners, and the engineering rationale for each application.",
    url: `${siteUrl}/engineering/materials`,
  },
};

export default function MaterialsEngineeringPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Engineering", path: "/engineering" },
    { name: "Materials & Structures", path: "/engineering/materials" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="w-full bg-[#0a0a0a] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 tech-grid-dark space-y-16 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Header Block */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <TechnicalAnnotation label="ENGINEERING PILLAR 03" value="MATERIALS & STRUCTURES" variant="signal" />
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              MATERIAL<br />
              <span className="text-[#647789]">WHERE IT MATTERS.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#9ab0c4] font-light leading-relaxed">
              Every gram of material in a high-performance chassis is a deliberate engineering decision.
              Carbon fibre delivers outstanding stiffness-to-weight in primary structural members.
              Aluminium alloy provides precision-machined bearing interfaces and threaded inserts.
              Grade 5 titanium fasteners resist corrosion and fatigue without adding mass.
              The question is never which material is &ldquo;best&rdquo; — it is which material is right for this load case, at this location, under these service conditions.
            </p>
          </div>

          {/* Diagram 3.1 — Ply Orientation Schematic */}
          <div className="p-6 border border-white/15 bg-[#131313] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-[#647789]">
              <span className="text-alkota-signal font-bold uppercase">DIAGRAM 3.1 // CARBON FIBRE PLY ANGLE ORIENTATION — LOAD RESPONSE</span>
              <span>GENERIC STRUCTURAL MODEL</span>
            </div>
            <div className="w-full overflow-hidden bg-black/60 p-4 border border-white/10">
              <svg viewBox="0 0 800 360" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid3)" />

                {/* Tube cross-section at left */}
                <ellipse cx="130" cy="180" rx="55" ry="80" fill="none" stroke="#647789" strokeWidth="2"/>
                <ellipse cx="130" cy="180" rx="40" ry="65" fill="rgba(10,10,10,0.8)" stroke="#9ab0c4" strokeWidth="1.5"/>
                <text x="130" y="290" fill="#647789" fontSize="10" fontFamily="monospace" textAnchor="middle">CROSS-SECTION</text>

                {/* 0° UD fibres — axial bending resistance */}
                <line x1="200" y1="100" x2="700" y2="100" stroke="#c8f902" strokeWidth="2.5"/>
                <line x1="200" y1="113" x2="700" y2="113" stroke="#c8f902" strokeWidth="2.5"/>
                <line x1="200" y1="260" x2="700" y2="260" stroke="#c8f902" strokeWidth="2.5"/>
                <line x1="200" y1="273" x2="700" y2="273" stroke="#c8f902" strokeWidth="2.5"/>
                <text x="710" y="104" fill="#c8f902" fontSize="10" fontFamily="monospace">0° UD — AXIAL BENDING</text>

                {/* ±45° fibres — torsion resistance */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <React.Fragment key={i}>
                    <line x1={220 + i * 56} y1={130} x2={248 + i * 56} y2={248} stroke="#eef4f8" strokeWidth="1.5" opacity="0.7"/>
                    <line x1={248 + i * 56} y1={130} x2={220 + i * 56} y2={248} stroke="#9ab0c4" strokeWidth="1.5" opacity="0.5"/>
                  </React.Fragment>
                ))}
                <text x="710" y="145" fill="#eef4f8" fontSize="10" fontFamily="monospace">+45° TORSION</text>
                <text x="710" y="158" fill="#9ab0c4" fontSize="10" fontFamily="monospace">−45° TORSION</text>

                {/* 90° hoop plies — crush resistance */}
                {[0, 1, 2, 3].map((i) => (
                  <ellipse key={i} cx={300 + i * 120} cy={190} rx={10} ry={65} fill="none" stroke="rgba(200,249,2,0.35)" strokeWidth="2"/>
                ))}
                <text x="710" y="195" fill="rgba(200,249,2,0.7)" fontSize="10" fontFamily="monospace">90° HOOP — CRUSH</text>

                {/* Load arrow */}
                <defs>
                  <marker id="arrow3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#c8f902"/>
                  </marker>
                </defs>
                <line x1="450" y1="50" x2="450" y2="90" stroke="#c8f902" strokeWidth="2" markerEnd="url(#arrow3)"/>
                <text x="450" y="42" fill="#c8f902" fontSize="10" fontFamily="monospace" textAnchor="middle">IMPACT LOAD</text>
              </svg>
            </div>
            <p className="font-mono text-[11px] text-[#647789] leading-relaxed">
              Figure 3.1 — Schematic ply orientation layup. 0° UD fibres resist axial bending along the tube length. ±45° plies resist torsional twisting.
              90° hoop wraps prevent localised shell crushing under impact loads. The specific ply schedule and stacking sequence are engineering design details subject to validation.
            </p>
          </div>

          {/* Deep Content Body */}
          <div className="space-y-8 font-sans text-sm sm:text-base text-[#9ab0c4] leading-relaxed font-light">

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">1. UNIDIRECTIONAL CARBON FIBRE — ANISOTROPY AS AN ENGINEERING TOOL</h2>
              <p>
                Carbon fibre reinforced polymer (CFRP) is anisotropic: its mechanical properties differ dramatically depending on the direction of loading relative to the fibre orientation.
                Along the fibre axis, UD carbon exhibits tensile modulus values in the range of 230–640 GPa (depending on grade) — substantially exceeding steel, aluminium alloy, and titanium.
                Perpendicular to the fibre, the matrix resin carries the load, producing modulus values an order of magnitude lower.
              </p>
              <p>
                This anisotropy is not a weakness — it is the primary design tool. By specifying the orientation of each ply in the laminate schedule, a structural engineer can direct
                stiffness precisely where load paths demand it, and reduce material where it is unnecessary.
                A typical structural chassis laminate contains multiple ply angles: 0° plies aligned with primary bending load vectors, ±45° plies providing torsional resistance,
                and 90° hoop wraps preventing localised wall crushing under concentrated impact loads.
              </p>
              <p>
                The stacking sequence within the laminate — not just the ply count — determines coupling effects. Symmetric and balanced laminates decouple bending from twisting;
                asymmetric or unbalanced schedules can introduce unwanted warp or twist under thermal cycling and mechanical loading.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">2. CARBON FIBRE GRADES & RESIN SYSTEMS</h2>
              <p>
                Carbon fibre is commercially available in multiple grades differentiated primarily by tensile modulus and tensile strength:
              </p>
              {/* Material grade table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-[#647789] uppercase">Grade</th>
                      <th className="text-left py-2 pr-4 text-[#647789] uppercase">Tensile Modulus</th>
                      <th className="text-left py-2 pr-4 text-[#647789] uppercase">Tensile Strength</th>
                      <th className="text-left py-2 text-[#647789] uppercase">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#9ab0c4]">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 text-white">Standard (T300)</td>
                      <td className="py-2 pr-4">230 GPa</td>
                      <td className="py-2 pr-4">3,530 MPa</td>
                      <td className="py-2">General structural plies</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 text-white">Intermediate (T800)</td>
                      <td className="py-2 pr-4">294 GPa</td>
                      <td className="py-2 pr-4">5,490 MPa</td>
                      <td className="py-2">Primary load paths</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 text-white">High Modulus (M46J)</td>
                      <td className="py-2 pr-4">436 GPa</td>
                      <td className="py-2 pr-4">4,210 MPa</td>
                      <td className="py-2">Stiffness-critical zones</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-white">Ultra High Mod (M55J)</td>
                      <td className="py-2 pr-4">540 GPa</td>
                      <td className="py-2 pr-4">3,920 MPa</td>
                      <td className="py-2">Race / extreme stiffness</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Resin system selection is equally critical. Epoxy thermoset resins cured at elevated temperature (120–180°C autoclave cure) produce void contents below 0.5% —
                superior mechanical properties and fatigue resistance compared to wet-lay or infusion processes. Toughened epoxy formulations incorporate elastomeric micro-particles
                that arrest crack propagation at impact sites without significant stiffness penalty.
              </p>
            </section>

            {/* Interactive material swatches — client component */}
            <div className="p-4 border border-white/10 bg-[#131313]">
              <p className="font-mono text-[11px] text-[#647789] mb-4 uppercase">MATERIAL COMPARISON — INTERACTIVE EXPLORER</p>
              <MaterialSwatches />
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">3. ALUMINIUM ALLOY — MACHINED INTERFACES & STRUCTURAL INSERTS</h2>
              <p>
                Pure carbon fibre laminate cannot reliably carry thread engagement loads or bearing interference fits. Localised contact pressures from pivot bearings and threaded
                interfaces induce crushing failure in composite layups without load-spreading inserts.
                Machined aluminium alloy inserts — co-cured or bonded into the laminate during manufacture — distribute these point loads across a larger surface area,
                providing a reliable metallic interface for serviceable connections.
              </p>
              <p>
                AL7075-T6 is the preferred alloy for load-critical inserts: its yield strength of approximately 503 MPa and ultimate tensile strength of approximately 572 MPa
                provide a generous safety margin against bearing preload and impact forces, while its density of 2.81 g/cm³ keeps parasitic mass low relative to steel.
                T6 temper (solution heat treated and artificially aged) provides maximum precipitation hardening, yielding better fatigue performance than T4 (natural ageing) under
                cyclic suspension loads.
              </p>
              <p>
                For non-structural components — linkage plates, dropout hardware, cable guides — AL6061-T6 provides adequate strength at lower cost and with superior anodising
                characteristics for corrosion protection.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">4. GRADE 5 TITANIUM — FASTENER SPECIFICATION</h2>
              <p>
                Grade 5 titanium (Ti-6Al-4V) fasteners offer a specific set of properties that make them appropriate for pivot hardware and primary structural connections:
                a yield strength of approximately 880 MPa in the annealed condition, a density of 4.43 g/cm³ (approximately 57% of steel), and outstanding corrosion resistance
                in the wet and aggressive environments typical of trail riding.
              </p>
              <p>
                Unlike stainless steel, Grade 5 titanium does not gall in aluminium alloy threaded bores under preload — a critical property for pivots where service intervals
                may extend to hundreds of hours of operation. Unlike carbon steel, it requires no surface treatment to resist corrosion in high-humidity environments.
                The modulus of elasticity (approximately 114 GPa) is lower than steel, providing a small but useful compliance buffer in bolted joints under fatigue loading.
              </p>
              <p>
                Grade 5 titanium is not appropriate for applications requiring extreme hardness or wear resistance — bearing journals and hardened contact surfaces require steel.
                The material selection matrix assigns each fastener specification on the basis of its specific load environment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight">5. FORGED VS BILLET ALUMINIUM — THE GRAIN FLOW ARGUMENT</h2>
              <p>
                For high-strength aluminium structural components such as linkage arms and dropout plates, two manufacturing routes are available: billet machining from solid
                extruded or rolled stock, and closed-die drop forging. The material properties differ in one critical respect: grain structure.
              </p>
              <p>
                Extruded and rolled aluminium exhibits elongated grain structure approximately aligned with the extrusion direction. Machining a complex linkage shape from billet
                stock interrupts these grain flow lines at every machined surface — reducing effective fatigue resistance at stress-concentration features such as fillet radii
                and cross-drilled holes.
              </p>
              <p>
                Closed-die forging compresses and shapes the alloy such that grain flow follows the net shape of the finished part. The result is superior fatigue resistance
                in the directions that service loads demand — typically 20–30% improvement in fatigue life at the same nominal alloy specification and wall thickness.
                For suspension pivot links — components experiencing millions of load cycles over a bicycle&apos;s service life — this performance difference is meaningful.
              </p>
            </section>
          </div>

          {/* Related pillars */}
          <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/engineering/kinematics" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">← PILLAR 02</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Suspension Kinematics</p>
            </a>
            <a href="/engineering/testing" className="p-4 border border-white/10 hover:border-alkota-signal/50 transition-colors group">
              <p className="font-mono text-[10px] text-[#647789] uppercase mb-1">PILLAR 04 →</p>
              <p className="font-display text-sm text-white uppercase tracking-wide group-hover:text-alkota-signal transition-colors">Validation & Testing</p>
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
