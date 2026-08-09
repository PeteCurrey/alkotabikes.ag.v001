"use client";

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import siteUrl from "@/lib/env";
import { LEGAL_DOCUMENTS } from "@/config/legalDocuments";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { openCookieSettings } from "@/components/legal/CookieConsentManager";
import { Cookie, Lock, BarChart2, Megaphone, Settings } from "lucide-react";

const TOC = [
  { id: "ck-1", title: "1. What These Technologies Are" },
  { id: "ck-2", title: "2. Our Approach" },
  { id: "ck-3", title: "3. Strictly Necessary" },
  { id: "ck-4", title: "4. Preferences / Functional" },
  { id: "ck-5", title: "5. Analytics" },
  { id: "ck-6", title: "6. Marketing" },
  { id: "ck-7", title: "7. Our Commitments" },
  { id: "ck-8", title: "8. Third-Party Technology Register" },
  { id: "ck-9", title: "9. Your Choices" },
  { id: "ck-10", title: "10. Policy Changes" },
];

export default function CookiesPage() {
  const doc = LEGAL_DOCUMENTS.cookies;

  return (
    <LegalPageLayout document={doc} toc={TOC} eyebrow="COOKIE & PRIVACY TECHNOLOGY POLICY">
      <div className="space-y-10">
        <p className="text-base leading-relaxed">
          This Policy explains how Alkota uses cookies and similar technologies on alkotacycles.com.
        </p>

        <section id="ck-1" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            01. WHAT THESE TECHNOLOGIES ARE
          </h2>
          <p>
            Websites can store or access information on a visitor&apos;s browser or device. Cookies are one example.
            Similar technologies include local storage, session storage, pixels, tags, and other SDK-style browser tools.
          </p>
        </section>

        <section id="ck-2" className="space-y-4">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            02. OUR APPROACH
          </h2>
          <p>We separate all technologies into four categories:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-alkota-snow border border-black/10">
              <Lock className="w-4 h-4 text-alkota-signal shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-xs font-bold uppercase">STRICTLY NECESSARY</div>
                <div className="text-xs text-alkota-slate mt-1">Always active. Cannot be disabled.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-alkota-snow border border-black/10">
              <Settings className="w-4 h-4 text-alkota-slate shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-xs font-bold uppercase">PREFERENCES / FUNCTIONAL</div>
                <div className="text-xs text-alkota-slate mt-1">Default OFF — requires consent.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-alkota-snow border border-black/10">
              <BarChart2 className="w-4 h-4 text-alkota-slate shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-xs font-bold uppercase">ANALYTICS</div>
                <div className="text-xs text-alkota-slate mt-1">Default OFF — requires consent.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-alkota-snow border border-black/10">
              <Megaphone className="w-4 h-4 text-alkota-slate shrink-0 mt-0.5" />
              <div>
                <div className="font-mono text-xs font-bold uppercase">MARKETING</div>
                <div className="text-xs text-alkota-slate mt-1">Default OFF — requires explicit consent.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="ck-3" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            03. STRICTLY NECESSARY
          </h2>
          <p>
            These technologies support core site functions and services you have requested, including authentication,
            security, shopping cart state, reservation session state, and storing your privacy preferences. They cannot
            be disabled.
          </p>
        </section>

        <section id="ck-4" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            04. PREFERENCES / FUNCTIONAL
          </h2>
          <p>
            These remember non-essential choices such as saved configuration layouts or optional functionality. Kept OFF
            by default until you provide consent.
          </p>
        </section>

        <section id="ck-5" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            05. ANALYTICS
          </h2>
          <p>
            Analytics technologies help us understand how the site is used — which engineering content is read,
            how users navigate the Configurator, and aggregate traffic patterns.
          </p>
          <div className="p-4 bg-alkota-carbon/5 border-l-4 border-alkota-signal font-mono text-xs font-bold uppercase">
            ANALYTICS MUST BE OFF UNTIL THE USER ACTIVELY ACCEPTS ANALYTICS.
          </div>
          <p>
            No analytics tracking fires on first page load. This is a conservative, intentional approach applied globally
            rather than relying only on a UK statistical exception.
          </p>
        </section>

        <section id="ck-6" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            06. MARKETING
          </h2>
          <p>
            Marketing or advertising technologies may measure campaigns, link visits to advertising, build audiences, or
            support targeted advertising. These remain strictly OFF unless appropriate explicit consent has been given.
          </p>
        </section>

        <section id="ck-7" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            07. OUR COMMITMENTS
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Declining optional technologies does not prevent access to Alkota editorial content.</li>
            <li>Reject and Accept buttons have equal visual prominence.</li>
            <li>We do not use dark patterns to pressure consent.</li>
            <li>We do not repeatedly re-ask after a choice has been made.</li>
            <li>Withdrawing consent is as easy as granting it via Cookie Settings in the footer.</li>
          </ul>
        </section>

        <section id="ck-8" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            08. THIRD-PARTY TECHNOLOGY REGISTER
          </h2>
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono">
            COOKIE AUDIT IN PROGRESS — Full technology register to be published following production deployment audit.
            Technologies will only be listed if they are genuinely installed and classified.
            We do not publish placeholder cookie tables with standard Google entries if Google Analytics is not active.
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse border border-black/10">
              <thead>
                <tr className="bg-alkota-carbon text-alkota-white">
                  <th className="p-3 text-left border border-white/10 uppercase">Name</th>
                  <th className="p-3 text-left border border-white/10 uppercase">Provider</th>
                  <th className="p-3 text-left border border-white/10 uppercase">Category</th>
                  <th className="p-3 text-left border border-white/10 uppercase">Purpose</th>
                  <th className="p-3 text-left border border-white/10 uppercase">Duration</th>
                  <th className="p-3 text-left border border-white/10 uppercase">Consent Required</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-alkota-snow">
                  <td className="p-3 border border-black/10">alkota_cookie_consent_v1</td>
                  <td className="p-3 border border-black/10">Alkota Cycles</td>
                  <td className="p-3 border border-black/10">Strictly Necessary</td>
                  <td className="p-3 border border-black/10">Stores your cookie preference choices</td>
                  <td className="p-3 border border-black/10">1 year</td>
                  <td className="p-3 border border-black/10 font-bold">No</td>
                </tr>
                <tr className="even:bg-alkota-snow">
                  <td className="p-3 border border-black/10">sb-auth-token</td>
                  <td className="p-3 border border-black/10">Supabase / Alkota</td>
                  <td className="p-3 border border-black/10">Strictly Necessary</td>
                  <td className="p-3 border border-black/10">Authentication session token for My Alkota accounts</td>
                  <td className="p-3 border border-black/10">Session</td>
                  <td className="p-3 border border-black/10 font-bold">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-alkota-slate">
            Additional technologies will be added to this register following complete production infrastructure audit.
          </p>
        </section>

        <section id="ck-9" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            09. YOUR CHOICES
          </h2>
          <p>
            You can reopen cookie preferences at any time using the Cookie Settings control in the footer of every page.
          </p>
          <button
            type="button"
            onClick={openCookieSettings}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-alkota-carbon text-alkota-white hover:bg-alkota-black font-mono text-xs uppercase tracking-wider transition-colors"
            aria-label="Open cookie settings"
          >
            <Cookie className="w-4 h-4" />
            COOKIE SETTINGS
          </button>
        </section>

        <section id="ck-10" className="space-y-3">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-alkota-black border-b border-black/10 pb-2">
            10. CHANGES TO THIS POLICY
          </h2>
          <p>
            Where purposes or providers materially change, we will review whether existing consent remains valid and
            seek fresh consent if required rather than relying on outdated choices.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
