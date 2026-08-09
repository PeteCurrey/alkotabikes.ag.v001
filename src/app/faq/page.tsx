"use client";

import React, { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

// ── FAQ DATA ─────────────────────────────────────────────────────────────────

const chapters = [
  {
    id: "project01",
    label: "PROJECT 01",
    faqs: [
      {
        q: "WHAT IS PROJECT 01?",
        a: "Project 01 is Alkota's first mountain-bike development programme. It is being engineered as a complete system rather than beginning with a generic frame and building a component list around it. It remains pre-production.",
      },
      {
        q: "WHEN DOES PROJECT 01 LAUNCH?",
        a: "Production is currently planned for 2028. That remains subject to completion of the engineering, prototype and validation programme.",
      },
      {
        q: "CAN I BUY ONE TODAY?",
        a: "Not yet as a final production Bike. You can join the Project 01 Development Register and follow the programme. Paid reservations remain closed until Alkota formally releases the commercial and legal programme.",
      },
      {
        q: "WHAT DOES JOINING PROJECT 01 MEAN?",
        a: "It records your interest, riding information and product preferences and allows you to receive relevant development information if you choose. It is not a purchase.",
      },
      {
        q: "DO I HAVE TO PAY TO REGISTER?",
        a: "No. The Development Register is separate from a future paid Reservation.",
      },
      {
        q: "IS THE CURRENT BIKE FINAL?",
        a: "No. Project 01 remains a development machine. The current controlled engineering revision is displayed on relevant pages.",
      },
    ],
  },
  {
    id: "development",
    label: "DEVELOPMENT",
    faqs: [
      {
        q: "CAN THE GEOMETRY CHANGE?",
        a: "Yes. Until geometry reaches the relevant release state, development can result in changes. That is one reason the Design Archive and Development Journal exist.",
      },
      {
        q: "CAN COMPONENTS CHANGE?",
        a: "Yes. A development-baseline component can be approved, changed, superseded or retained. Production-order customers will receive a controlled production specification before Build Lock.",
      },
      {
        q: "WHY SHOW THE BIKE BEFORE IT IS FINISHED?",
        a: "Because the process matters. We would rather show what changed and why than construct a fictional story after the Bike is finished.",
      },
      {
        q: "WHAT IS R00?",
        a: "R00 is a revision identifier used within the Project 01 development programme. A revision is not automatically a production release.",
      },
      {
        q: "WHAT IS THE DESIGN ARCHIVE?",
        a: "It is the record of design artifacts behind Project 01: sketches, geometry, packaging, suspension studies, carbon work, component integration and controlled revisions.",
      },
      {
        q: "WHAT IS THE PROTOTYPE REGISTRY?",
        a: "It is where actual physical development bikes will be recorded when they exist. We do not populate it with fictional completed prototypes.",
      },
      {
        q: "WHEN DOES THE FIRST PROTOTYPE ARRIVE?",
        a: "We will publish a date when it is genuinely controlled and appropriate to announce.",
      },
    ],
  },
  {
    id: "racing",
    label: "RACING",
    faqs: [
      {
        q: "WHY DOES ALKOTA PLAN TO RACE?",
        a: "The planned 2027 race programme is intended to become part of the development environment. The objective is not simply to put a logo between race tape. It is to create another demanding source of feedback before production.",
      },
      {
        q: "IS ALKOTA RACING ALREADY COMPETING?",
        a: "No. The programme is planned for 2027 and will only show genuine riders, events and results when they exist.",
      },
    ],
  },
  {
    id: "ordering",
    label: "ORDERING",
    faqs: [
      {
        q: "HOW MUCH WILL PROJECT 01 COST?",
        a: "Final public production pricing has not yet been released. Any development or indicative price must be labelled accordingly.",
      },
      {
        q: "WILL THERE BE A DEPOSIT?",
        a: "The final Reservation deposit and its terms will be published before paid Reservations open.",
      },
      {
        q: "WILL THE DEPOSIT BE REFUNDABLE?",
        a: "That commercial and legal policy will be stated clearly before anyone is asked to pay. We will not hide the answer after checkout.",
      },
      {
        q: "DOES A RESERVATION GUARANTEE A BIKE?",
        a: "The rights associated with a future Reservation will be stated in the versioned Reservation Terms and Reservation Summary. Do not infer a guaranteed allocation until that policy is formally released.",
      },
      {
        q: "WHAT HAPPENS IF PROJECT 01 CHANGES AFTER I RESERVE?",
        a: "Material changes affecting a reserved customer's intended Build will be explained. The applicable Reservation Terms will define the customer's rights and options.",
      },
      {
        q: "WHAT IS BUILD LOCK?",
        a: "Build Lock is the future stage at which the production configuration for an individual Bike is confirmed. Before Build Lock, a saved Development Build is not the same as a final production order.",
      },
    ],
  },
  {
    id: "fit",
    label: "FIT + CONFIGURATION",
    faqs: [
      {
        q: "WHAT IS THE CONFIGURATOR?",
        a: "The Configurator is a way to explore Project 01 as a system and build a development configuration. Until production options are released, not every choice is guaranteed to be commercially available.",
      },
      {
        q: "DOES THE CONFIGURATOR SHOW FAKE COMPONENTS?",
        a: "It should not. Where a real branded component is shown, Alkota's policy is to use an approved real component asset rather than an AI imitation.",
      },
      {
        q: "WHAT IS THE FIT ENGINE?",
        a: "The Fit Engine combines rider measurements and riding preferences with controlled Project 01 geometry. During development it provides a fit direction rather than pretending every production size has already been validated.",
      },
      {
        q: "WHY DO YOU ASK FOR HEIGHT AND INSIDE LEG?",
        a: "Those measurements help us interpret rider fit. They also give Alkota useful aggregated insight into the riders interested in Project 01. Their use is explained in the Privacy Policy.",
      },
      {
        q: "DO I HAVE TO PROVIDE MY WEIGHT?",
        a: "If weight is optional, it is clearly marked. We do not force optional Fit Engine data without reason.",
      },
      {
        q: "SHOULD I ENTER MEDICAL INFORMATION INTO FIT ENGINE?",
        a: "No. The ordinary Fit Engine is not designed to collect medical or health information.",
      },
    ],
  },
  {
    id: "ownership",
    label: "OWNERSHIP + SUPPORT",
    faqs: [
      {
        q: "CAN I DELETE MY ALKOTA DATA?",
        a: "Privacy rights depend on the relevant processing and applicable law. You can contact the Privacy team to exercise applicable rights. Some contractual, accounting, safety or legal records may need to be retained.",
      },
      {
        q: "WHAT IS MY ALKOTA?",
        a: "My Alkota is intended to become the digital relationship between the customer and their Bike — registration, fit, saved Builds, future Reservation information, and after production, an owner record.",
      },
      {
        q: "WILL MY BIKE HAVE A DIGITAL RECORD?",
        a: "That is the intention. Production Bikes are intended to link to their controlled Build, documentation, service and ownership information.",
      },
      {
        q: "WHAT IS THE WARRANTY?",
        a: "The final production Project 01 warranty has not yet been published. It will be available before production orders open. A commercial warranty is additional to statutory consumer rights.",
      },
      {
        q: "WILL THERE BE CRASH REPLACEMENT?",
        a: "The programme is under consideration. Do not present it as available until policy and pricing have been approved.",
      },
    ],
  },
  {
    id: "dealers",
    label: "DEALERS",
    faqs: [
      {
        q: "WILL THERE BE DEALERS?",
        a: "Alkota is developing a selective Partner Network. The objective is not simply maximum doors — it is to establish appropriate sales, setup, demo and service capability.",
      },
      {
        q: "CAN MY BIKE BE DELIVERED THROUGH A DEALER?",
        a: "The system is being designed to support authorised Partner handover where available. Final regional routes will be confirmed before production ordering.",
      },
      {
        q: "CAN I APPLY TO BECOME A DEALER?",
        a: "Yes. Visit the Dealers page to submit a Partner application.",
      },
      {
        q: "WILL THERE BE DEMO BIKES?",
        a: "A future demo programme is planned as part of the Partner architecture. It will not open publicly until real bikes and participating Partners exist.",
      },
    ],
  },
  {
    id: "supply",
    label: "ALKOTA SUPPLY",
    faqs: [
      {
        q: "WHAT IS ALKOTA SUPPLY?",
        a: "Alkota Supply is the apparel and accessory side of the brand. It contains equipment and products connected to the workshop, mountain, development and racing world around Alkota.",
      },
      {
        q: "DO YOU SHIP INTERNATIONALLY?",
        a: "Market availability will be released region by region. Not every store product or production Bike ships worldwide.",
      },
    ],
  },
  {
    id: "privacy",
    label: "PRIVACY",
    faqs: [
      {
        q: "CAN I BECOME AN AMBASSADOR?",
        a: "You can register interest through the Ambassadors page when applications are open.",
      },
      {
        q: "ARE YOU HIRING?",
        a: "Current opportunities appear on Work With Us. We do not publish invented vacancies to make the company look larger.",
      },
      {
        q: "WHERE IS PROJECT 01 MADE?",
        a: "Alkota will publish manufacturing information when supplier selection, agreements and production controls are sufficiently mature to do so accurately.",
      },
    ],
  },
];

// ── FAQ ITEM COMPONENT ───────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <span className="font-mono text-sm font-bold uppercase tracking-wide text-alkota-black group-hover:text-alkota-signal transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-alkota-slate shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8 text-sm text-alkota-black/80 leading-relaxed font-sans">
          {a}
        </div>
      )}
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeChapter, setActiveChapter] = useState("project01");
  const [search, setSearch] = useState("");

  const currentChapter = chapters.find((c) => c.id === activeChapter)!;
  const filteredFAQs = search.trim()
    ? chapters.flatMap((c) =>
        c.faqs.filter(
          (f) =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase())
        )
      )
    : currentChapter.faqs;

  return (
    <div className="w-full bg-alkota-white min-h-screen pt-28 pb-24 font-sans">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">INFORMATION CENTRE</div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-black leading-none mb-6">
          QUESTIONS
          <br />
          <span className="text-alkota-slate">WE&apos;D ASK TOO.</span>
        </h1>
        <p className="text-lg text-alkota-slate max-w-2xl leading-relaxed">
          Project 01 is being developed in public. Some answers are final. Some are still being engineered.
          We will tell you which is which.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Search bar */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-alkota-slate pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all questions…"
            className="w-full pl-10 pr-4 py-3 bg-alkota-snow border border-black/10 font-mono text-sm focus:outline-none focus:border-alkota-signal text-alkota-black placeholder:text-alkota-slate"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Chapter Nav */}
          {!search && (
            <nav className="lg:col-span-3 space-y-1 font-mono text-xs">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full text-left px-4 py-3 uppercase tracking-wider transition-colors ${
                    activeChapter === ch.id
                      ? "bg-alkota-black text-alkota-white font-bold"
                      : "text-alkota-slate hover:text-alkota-black hover:bg-alkota-snow"
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </nav>
          )}

          {/* FAQ List */}
          <div className={`${!search ? "lg:col-span-9" : "lg:col-span-12"} space-y-0`}>
            {search && (
              <div className="font-mono text-xs text-alkota-slate mb-6 uppercase tracking-wider">
                {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </div>
            )}
            {filteredFAQs.length === 0 ? (
              <div className="py-16 text-center text-alkota-slate font-mono text-sm">
                No questions match your search. Try different terms or browse by chapter.
              </div>
            ) : (
              filteredFAQs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-12 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider mb-2">STILL HAVE QUESTIONS?</div>
            <p className="text-sm text-alkota-slate">We read every enquiry. Reach out directly.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-alkota-black text-alkota-white hover:bg-alkota-signal font-mono text-xs uppercase tracking-wider transition-colors"
          >
            CONTACT ALKOTA →
          </Link>
        </div>
      </div>
    </div>
  );
}
