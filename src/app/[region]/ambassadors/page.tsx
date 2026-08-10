import { buildRegionalMetadata } from "@/lib/metadata";
import type { RegionCode } from "@/lib/regions";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/env";
import { Mountain, Video, Wrench, Users, Mic2, ShoppingBag } from "lucide-react";



const formats = [
  {
    icon: Mountain,
    title: "TRAIL DEVELOPMENT",
    desc: "Ride alongside the development programme. Provide feedback from genuine terrain across a defined ride programme.",
  },
  {
    icon: Wrench,
    title: "TECHNICAL CONTRIBUTION",
    desc: "Participate in structured test events and validation rides. Your feedback shapes decisions, not just content.",
  },
  {
    icon: Video,
    title: "CONTENT",
    desc: "Create honest content — ride footage, impressions, development journal entries. Not scripted promotional material.",
  },
  {
    icon: Mic2,
    title: "MEDIA & INDUSTRY",
    desc: "Work with Alkota on editorial, event, or media engagement where your audience and our development story genuinely intersect.",
  },
  {
    icon: Users,
    title: "COMMUNITY",
    desc: "Help build local riding communities around the places and events Alkota invests in.",
  },
  {
    icon: ShoppingBag,
    title: "SUPPLY AFFILIATE",
    desc: "Represent Alkota Supply with a genuine connection to the workshop and mountain environment.",
  },
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
    path: "/ambassadors",
    title: "Ambassadors",
    description: "Alkota works with riders who are authentic, capable, and willing to genuinely test Project 01. Find out how to apply.",
  });
}

export default function AmbassadorsPage() {
  return (
    <div className="w-full bg-alkota-white min-h-screen pt-28 pb-24 font-sans">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">
          ALKOTA AMBASSADOR PROGRAMME
        </div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-alkota-black leading-none mb-8">
          WE WORK WITH
          <br />
          <span className="text-alkota-slate">REAL RIDERS.</span>
        </h1>
        <p className="text-xl text-alkota-black max-w-3xl leading-relaxed font-light">
          The Alkota Ambassador Programme is not a collection of social-media contracts. It is a mechanism to put
          Project 01 in the hands of capable riders and get honest feedback back.
        </p>
      </div>

      {/* Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">OUR STANDARDS</div>
            <h2 className="font-display font-bold text-3xl uppercase tracking-tight leading-tight">
              WHAT THIS IS NOT
            </h2>
            <div className="space-y-4 text-alkota-black/80">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-signal mt-2 shrink-0" />
                <p>
                  It is not a gifting programme. We do not send free product to anyone who sends a large follower count.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-signal mt-2 shrink-0" />
                <p>
                  It is not a scripted promotional arrangement. Ambassador relationships require honest,
                  independently formed assessments.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-signal mt-2 shrink-0" />
                <p>
                  Ambassador agreements are not concluded in public. The terms are agreed privately, clearly,
                  and in writing.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-signal mt-2 shrink-0" />
                <p>
                  We will not publish a list of ambassadors unless they have genuinely agreed to be identified publicly
                  in that context.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal">WHAT WE LOOK FOR</div>
            <h2 className="font-display font-bold text-3xl uppercase tracking-tight leading-tight">
              THE REAL CRITERIA
            </h2>
            <div className="space-y-4 text-alkota-black/80">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-black mt-2 shrink-0" />
                <p>
                  You ride the terrain Project 01 is designed for. Mountain descents, technical trails, real conditions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-black mt-2 shrink-0" />
                <p>
                  You can form and communicate a technical opinion about a bike. Subjective impressions backed by
                  specific observations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-black mt-2 shrink-0" />
                <p>
                  You operate without fabricating content, claiming experiences you have not had, or misrepresenting
                  product that is still in development as a finished product.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-alkota-black mt-2 shrink-0" />
                <p>
                  Follower count is a consideration, not the primary criterion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-black/10">
        <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">FORMATS</div>
        <h2 className="font-display font-bold text-3xl uppercase tracking-tight mb-12">HOW THE PROGRAMME WORKS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 border border-black/10 hover:border-alkota-signal transition-colors group space-y-4">
              <Icon className="w-5 h-5 text-alkota-signal" />
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-black group-hover:text-alkota-signal transition-colors">
                {title}
              </div>
              <p className="text-sm text-alkota-slate leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Applications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl space-y-8">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-alkota-signal mb-4">APPLICATIONS</div>
            <h2 className="font-display font-bold text-4xl uppercase tracking-tight leading-tight mb-6">
              OPEN WHEN IT
              <br />MAKES SENSE.
            </h2>
            <p className="text-alkota-black/80 leading-relaxed">
              Applications are open based on development programme milestones — not always. We will not recruit
              an ambassador network before we have anything meaningful for them to contribute to.
            </p>
          </div>
          <div className="p-6 bg-alkota-carbon text-alkota-white space-y-4">
            <div className="font-mono text-xs text-alkota-signal uppercase tracking-wider">CURRENT STATUS</div>
            <div className="font-display font-bold text-2xl uppercase">EXPRESSIONS OF INTEREST OPEN</div>
            <p className="text-sm text-alkota-snow/70">
              Submit an expression of interest and we will contact you when a relevant programme opens.
              There is no commitment on either side at that point.
            </p>
          </div>
          <Link
            href="/contact?subject=ambassador"
            className="inline-flex items-center gap-2 px-8 py-4 bg-alkota-signal text-alkota-white hover:bg-alkota-black font-mono text-sm uppercase tracking-wider transition-colors"
          >
            SUBMIT EXPRESSION OF INTEREST
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="text-xs text-alkota-slate">
            Submissions are reviewed by the Alkota team. We do not promise a response timeline.
            We do not promise to respond to every submission, particularly at scale.
          </p>
        </div>
      </div>
    </div>
  );
}
