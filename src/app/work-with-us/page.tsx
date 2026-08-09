import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import siteUrl from "@/lib/env";

export const metadata: Metadata = {
  title: "Work With Us | Alkota Cycles",
  description:
    "Opportunities to work with Alkota Cycles. We don't publish invented vacancies. Current openings only.",
  alternates: {
    canonical: `${siteUrl}/work-with-us`,
  },
  openGraph: {
    title: "Work With Us | Alkota Cycles",
    description:
      "Opportunities to work with Alkota Cycles. Current openings only.",
    url: `${siteUrl}/work-with-us`,
  },
};

// ── ROLE DATA ─────────────────────────────────────────────────────────────────
// Add genuine roles here when openings exist.
// Do NOT publish fictional roles to make the company look bigger.

type Role = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  brief: string;
};

const openRoles: Role[] = [
  // No roles added yet — uncomment and populate when genuinely open
  //
  // {
  //   id: "senior-frame-engineer",
  //   title: "Senior Frame Engineer",
  //   department: "Engineering",
  //   location: "Remote / UK",
  //   type: "Full-time",
  //   brief: "Drive structural analysis and layup development on Project 01.",
  // },
];

export default function WorkWithUsPage() {
  const hasRoles = openRoles.length > 0;

  return (
    <div className="w-full bg-alkota-white min-h-screen pt-28 pb-24 font-sans">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">
          CAREERS
        </div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-black leading-none mb-8">
          WORK WITH
          <br />
          <span className="text-alkota-slate">ALKOTA.</span>
        </h1>
        <p className="text-xl text-alkota-black max-w-3xl leading-relaxed font-light">
          Alkota is a small team building a high-precision machine. We do not hire to fill space
          or publish vacancies we are not genuinely recruiting for.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Philosophy */}
            <section className="space-y-6">
              <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">HOW WE WORK</div>
              <div className="space-y-4 text-alkota-black/80 leading-relaxed">
                <p>
                  Project 01 is being built with people who take precision seriously. That means careful use of materials,
                  honest communication of what is finished and what is not, and technical decisions made from evidence.
                </p>
                <p>
                  We value craft in the mechanical, structural and digital work Alkota does. We do not expect experience to
                  cancel out integrity. And we think a company capable of describing its own limitations clearly
                  is more interesting to work for than one that only publishes its best moments.
                </p>
              </div>
            </section>

            {/* Current openings */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">CURRENT OPENINGS</div>
                <div className="font-mono text-xs text-alkota-slate">
                  {hasRoles ? `${openRoles.length} ROLE${openRoles.length > 1 ? "S" : ""}` : "NO OPEN ROLES"}
                </div>
              </div>

              {hasRoles ? (
                <div className="space-y-3">
                  {openRoles.map((role) => (
                    <div
                      key={role.id}
                      className="p-6 border border-black/10 hover:border-alkota-signal transition-colors group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black group-hover:text-alkota-signal transition-colors">
                            {role.title}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <span className="font-mono text-xs text-alkota-slate uppercase">{role.department}</span>
                            <span className="font-mono text-xs text-alkota-slate">·</span>
                            <span className="font-mono text-xs text-alkota-slate uppercase">{role.location}</span>
                            <span className="font-mono text-xs text-alkota-slate">·</span>
                            <span className="font-mono text-xs text-alkota-slate uppercase">{role.type}</span>
                          </div>
                          <p className="text-sm text-alkota-slate leading-relaxed">{role.brief}</p>
                        </div>
                        <Link
                          href={`/contact?subject=role-${role.id}`}
                          className="shrink-0 px-5 py-2.5 border border-alkota-black text-alkota-black hover:bg-alkota-black hover:text-alkota-white font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
                        >
                          APPLY →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 border border-black/10 text-center space-y-4">
                  <div className="font-mono text-xs text-alkota-slate uppercase tracking-wider">NO CURRENT OPENINGS</div>
                  <p className="text-sm text-alkota-slate max-w-md mx-auto">
                    We are not currently recruiting publicly. Roles are published here when they are genuinely
                    open and not before.
                  </p>
                </div>
              )}
            </section>

            {/* Speculative applications */}
            <section className="space-y-4">
              <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">SPECULATIVE APPLICATIONS</div>
              <p className="text-alkota-black/80 leading-relaxed">
                If you work in frame engineering, suspension engineering, carbon manufacturing, precision machining,
                or digital product development and you think what Alkota is building is worth being part of, you can
                make a speculative application.
              </p>
              <p className="text-alkota-black/80 leading-relaxed">
                Tell us specifically what you do, what you have built or contributed to, and why you are interested in
                Alkota rather than a generic bicycle-company application. Generic CVs without context are unlikely to
                get a response.
              </p>
              <Link
                href="/contact?subject=speculative"
                className="inline-flex items-center gap-2 px-6 py-3 border border-alkota-black text-alkota-black hover:bg-alkota-black hover:text-alkota-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                SEND A SPECULATIVE APPLICATION →
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="p-6 bg-alkota-carbon text-alkota-snow space-y-4">
              <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider">OUR APPROACH</div>
              <div className="space-y-3 text-sm text-alkota-snow/80">
                <p>We do not post roles we cannot support.</p>
                <p>We will not contact you about a role that does not exist.</p>
                <p>We value precision in applications as we value it in engineering.</p>
                <p>We are not a large organisation. If you need stability of a large team environment, be clear-eyed about that.</p>
              </div>
            </div>
            <div className="p-6 bg-alkota-snow border border-black/10 space-y-4">
              <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider">WHAT WE BUILD</div>
              <div className="space-y-3 text-sm text-alkota-black/80">
                <p>High-precision mountain bikes with engineered suspension, carbon structure, and validated geometry.</p>
                <p>A digital product layer supporting the commercial, ownership and community sides of the brand.</p>
                <p>A long-term commercial development programme with a real race-validation layer planned for 2027.</p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-mono text-xs text-alkota-signal uppercase tracking-wider hover:underline"
              >
                ABOUT ALKOTA →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
