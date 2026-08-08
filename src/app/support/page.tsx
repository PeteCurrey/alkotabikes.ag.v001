import React from "react";
import Link from "next/link";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { ArrowRight, BookOpen, ShieldCheck, Wrench } from "lucide-react";

export default function SupportHubPage() {
  const sections = [
    { title: "OWNER DOCUMENTATION", href: "/support/owners", desc: "User manuals, torque specs, and setup guides.", icon: BookOpen },
    { title: "TECHNICAL GUIDES", href: "/support/technical", desc: "Kinematics tuning, cable routing, and pivot maintenance.", icon: Wrench },
    { title: "WARRANTY POLICY", href: "/support/warranty", desc: "Chassis warranty coverage and crash replacement program.", icon: ShieldCheck },
  ];

  return (
    <div className="w-full bg-alkota-white text-alkota-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 space-y-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-black/10 pb-8 space-y-3">
          <TechnicalAnnotation label="SUPPORT PORTAL" value="DOCUMENTATION" variant="slate" />
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl uppercase tracking-tight text-alkota-black leading-[0.9]">
            OWNERSHIP SUPPORT.
          </h1>
          <p className="font-sans text-base text-alkota-graphite max-w-2xl font-light leading-relaxed">
            Technical resources, torque specifications, setup guides, and warranty support for ALKOTA rider owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.title}
                href={sec.href}
                className="group p-8 bg-alkota-snow border border-black/10 hover:border-alkota-black hover:bg-white transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <Icon className="w-8 h-8 text-alkota-black group-hover:text-alkota-slate transition-colors" />
                  <h2 className="font-display text-xl font-bold text-alkota-black uppercase tracking-tight">
                    {sec.title}
                  </h2>
                  <p className="font-sans text-xs text-alkota-graphite font-light leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="border-t border-black/10 pt-3 flex items-center justify-between font-mono text-[10px] text-alkota-slate">
                  <span>ACCESS DOCUMENTATION</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-black group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
