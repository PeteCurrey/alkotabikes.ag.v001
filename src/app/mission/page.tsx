import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import siteUrl from "@/lib/env";

export const metadata: Metadata = {
  title: "Mission & Values | Alkota Cycles",
  description:
    "Why Alkota exists, what we believe in, and the non-negotiables that govern how we build and communicate about Project 01.",
  alternates: {
    canonical: `${siteUrl}/mission`,
  },
  openGraph: {
    title: "Mission & Values | Alkota Cycles",
    description:
      "Why Alkota exists, what we believe in, and how those beliefs govern how we design and build.",
    url: `${siteUrl}/mission`,
  },
};

const pillars = [
  {
    n: "01",
    title: "PRECISION BEFORE MARKETING",
    body: "If something is not finished, we say so. If a number is a target and not a validated result, we will not present it as fact. Engineering claims must be earned.",
  },
  {
    n: "02",
    title: "TERRAIN DEFINES ENGINEERING",
    body: "Mountain bikes are designed by the mountains they are ridden on, the conditions they encounter, and the forces generated there. If we have not ridden it, we will not claim it.",
  },
  {
    n: "03",
    title: "THE PROCESS IS PART OF THE PRODUCT",
    body: "We show the work. The Design Archive, the Development Journal and the Engineering documentation are a record of the actual design process, not a retrospective story constructed after the Bike is finished.",
  },
  {
    n: "04",
    title: "MATERIAL HONESTY",
    body: "The materials in Project 01 are chosen for structural and mechanical reasons. We will explain those reasons. We will not use material specifications as marketing language without explaining what they actually mean.",
  },
  {
    n: "05",
    title: "LONG-TERM RELATIONSHIP",
    body: "A production Bike is not the end of the relationship between Alkota and the owner. Support, service, development information, and eventual future products are part of the commitment.",
  },
  {
    n: "06",
    title: "CONSUMER RIGHTS ARE NOT OBSTACLES",
    body: "The legal and consumer protection framework that governs how Alkota operates commercially exists for good reasons. We will meet it properly and explain it clearly — not treat it as a formality.",
  },
];

export default function MissionPage() {
  return (
    <div className="w-full bg-alkota-white min-h-screen font-sans">
      {/* Hero — full bleed */}
      <div className="w-full bg-alkota-carbon pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">MISSION + VALUES</div>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-[5.5rem] uppercase tracking-tight text-alkota-white leading-none">
            ENGINEERED
            <br />
            <span className="text-alkota-slate">FOR TRUTH.</span>
          </h1>
          <p className="text-xl text-alkota-snow/80 max-w-3xl leading-relaxed font-light">
            Alkota exists to build a genuinely better mountain bike. Not a better-marketed one.
            The difference is in how decisions are made and how those decisions are communicated.
          </p>
        </div>
      </div>

      {/* Mission statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-6">WHY WE EXIST</div>
            <p className="text-2xl font-light text-alkota-black leading-relaxed">
              Mountain bikes perform extraordinary things in the hands of capable riders. The engineering
              behind the best machines is genuinely sophisticated. Yet the industry often presents that
              sophistication through vocabulary rather than evidence.
            </p>
          </div>
          <div className="space-y-6 text-alkota-black/80 leading-relaxed">
            <p>
              Alkota is being built by people who think the gap between what a bicycle is claimed to do and what it
              can be demonstrated to do is too large. And that the process of closing that gap — the engineering,
              testing, development and iteration — is interesting enough to be worth showing.
            </p>
            <p>
              Project 01 is a development machine. Not a concept. The engineering work is real, the geometry is controlled,
              the kinematics are calculated. The race programme planned for 2027 is a development environment, not a
              marketing mechanism. The 2028 production target is a commercial milestone, not a launch date that can be
              moved freely without consequence.
            </p>
            <p>
              The website, the Design Archive, the Development Journal, the Configurator — these are all part of the
              same commitment: to show what we are building and why, rather than just how it looks.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">THE PILLARS</div>
        <h2 className="font-display font-bold text-4xl uppercase tracking-tight mb-16">
          WHAT WE OPERATE BY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10">
          {pillars.map(({ n, title, body }) => (
            <div
              key={n}
              className="p-8 border-r border-b border-black/10 hover:bg-alkota-snow transition-colors"
            >
              <div className="font-mono text-4xl font-bold text-alkota-black/10 mb-4">{n}</div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-black mb-3">
                {title}
              </div>
              <p className="text-sm text-alkota-black/80 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-6">
              WHAT THIS MEANS FOR YOU
            </div>
            <h2 className="font-display font-bold text-4xl uppercase tracking-tight leading-tight mb-8">
              THE COMMITMENT TO EVERYONE WATCHING THIS PROGRAMME.
            </h2>
            <div className="space-y-4 text-alkota-black/80 leading-relaxed">
              <p>
                If you join the Development Register, you will receive development information — not a sales sequence.
              </p>
              <p>
                If you pay a Reservation deposit, your rights will be explained clearly before you pay it.
              </p>
              <p>
                If you buy a production Bike, you will receive a consumer's legal warranty and a commercial one on top.
              </p>
              <p>
                If the programme is delayed, we will say so.
              </p>
              <p>
                If something we said previously was wrong or incomplete, we will correct it.
              </p>
            </div>
          </div>
          <div className="p-8 bg-alkota-carbon text-alkota-snow space-y-6">
            <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider">WHAT THIS MEANS INTERNALLY</div>
            <div className="space-y-4 text-sm text-alkota-snow/80 leading-relaxed">
              <p>
                Every piece of content on alkotacycles.com should be traceable to a real decision, real
                measurement, real person or genuinely planned event.
              </p>
              <p>
                No text is generated and published without review against those standards.
              </p>
              <p>
                Technical specifications carry revision identifiers and are controlled.
              </p>
              <p>
                Legal documents are versioned and dated. Placeholder content does not reach users.
              </p>
              <p>
                The engineering team and the people responsible for what is communicated are the same group.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Links out */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-6">
          <Link href="/about" className="px-6 py-3 border border-alkota-black text-alkota-black hover:bg-alkota-black hover:text-alkota-white font-mono text-xs uppercase tracking-wider transition-colors">
            ABOUT ALKOTA →
          </Link>
          <Link href="/engineering" className="px-6 py-3 border border-alkota-black text-alkota-black hover:bg-alkota-black hover:text-alkota-white font-mono text-xs uppercase tracking-wider transition-colors">
            ENGINEERING →
          </Link>
          <Link href="/work-with-us" className="px-6 py-3 border border-alkota-black text-alkota-black hover:bg-alkota-black hover:text-alkota-white font-mono text-xs uppercase tracking-wider transition-colors">
            WORK WITH US →
          </Link>
        </div>
      </div>
    </div>
  );
}
