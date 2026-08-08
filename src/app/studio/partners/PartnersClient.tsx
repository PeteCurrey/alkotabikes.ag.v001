'use client';

import React, { useState } from 'react';
import { 
  Building2, Users, Package, Bike, FileText, Globe, 
  Wrench, ShieldCheck, AlertTriangle, Plus, Eye, Check, X, ChevronDown, Star, BookOpen 
} from 'lucide-react';

const TABS = [
  'APPLICATIONS',
  'ORGANISATIONS',
  'COMMERCIAL PROFILES',
  'STAFF',
  'TERRITORIES',
  'LEADS',
  'DEMO FLEET',
  'DOCUMENTS'
];

export default function StudioPartnersClient() {
  const [activeTab, setActiveTab] = useState('APPLICATIONS');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'APPLICATIONS':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] text-white uppercase tracking-widest">
                TOTAL COUNT: 0
              </div>
              <button disabled className="bg-white/5 text-white/50 border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 cursor-not-allowed">
                <Plus className="w-3 h-3" /> REVIEW APPLICATION
              </button>
            </div>
            
            <div className="flex gap-2">
              {['ALL', 'APPLIED', 'UNDER REVIEW', 'APPROVED', 'REJECTED'].map(f => (
                <button key={f} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-white/10 text-[#647789] hover:text-white bg-[#0a0a0a]">
                  {f}
                </button>
              ))}
            </div>

            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">BUSINESS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CONTACT</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">COUNTRY</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">SPECIALISMS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">APPLIED</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO APPLICATIONS RECEIVED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest mt-2">
              Applications arrive from /dealers public form. No database connected — Phase 01 notice.
            </div>
          </div>
        );

      case 'ORGANISATIONS':
        return (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="bg-[#1a73e8] text-white px-4 py-2 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#1a73e8]/80 transition-colors">
                <Plus className="w-3 h-3" /> ONBOARD PARTNER
              </button>
            </div>
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PARTNER REF</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">BUSINESS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">COUNTRY</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">REGION</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TYPES</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TIER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO PARTNERS ONBOARDED YET
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'COMMERCIAL PROFILES':
        return (
          <div className="space-y-4">
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 mb-4">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-500/90 leading-relaxed font-mono tracking-wide uppercase">
                  All commercial fields must be approved before population.
                </div>
              </div>
            </div>
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PARTNER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TIER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">COST PROFILE</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">DEMO</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">LEADS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">ALLOCATIONS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">SERVICE AUTH</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">WARRANTY AUTH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO PARTNERS ONBOARDED YET
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'STAFF':
        return (
          <div className="bg-[#131313] border border-white/10 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0a0a0a]">
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PARTNER</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">NAME</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">EMAIL</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">ROLE</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TRAINING</th>
                  <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                    NO STAFF RECORDS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case 'TERRITORIES':
        return (
          <div className="space-y-4">
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PARTNER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">REGION</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TERRITORY</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CURRENCY</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">NOTES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO TERRITORIES ASSIGNED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
              Territory assignment requires commercial and legal review.
            </div>
          </div>
        );

      case 'LEADS':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              {['ALL', 'NEW', 'ACCEPTED', 'CONTACTED', 'CONVERTED', 'LOST'].map(f => (
                <button key={f} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-white/10 text-[#647789] hover:text-white bg-[#0a0a0a]">
                  {f}
                </button>
              ))}
            </div>
            
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">LEAD REF</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CUSTOMER LOCATION</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">INTEREST</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CONSENT</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">ASSIGNED DEALER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO LEADS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex gap-2 items-center text-yellow-500/80">
              <AlertTriangle className="w-3 h-3" />
              <span className="font-mono text-[9px] uppercase tracking-widest">
                Identifiable customer information is only shared with dealers after explicit customer consent. consentGiven must be true before sharing name/email.
              </span>
            </div>
          </div>
        );

      case 'DEMO FLEET':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {['ALL', 'AVAILABLE', 'BOOKED', 'SERVICE', 'IN TRANSIT'].map(f => (
                  <button key={f} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-white/10 text-[#647789] hover:text-white bg-[#0a0a0a]">
                    {f}
                  </button>
                ))}
              </div>
              <button disabled className="bg-white/5 text-white/50 border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 cursor-not-allowed">
                <Plus className="w-3 h-3" /> ALLOCATE DEMO UNIT
              </button>
            </div>
            
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">DEMO REF</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">SIZE</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">FINISH</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">DEALER</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">REGION</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">LAST SERVICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO DEMO UNITS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
              No demo bikes exist yet. Demo programme planned 2027.
            </div>
          </div>
        );

      case 'DOCUMENTS':
        return (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button disabled className="bg-white/5 text-white/50 border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2 cursor-not-allowed">
                <Plus className="w-3 h-3" /> UPLOAD DOCUMENT
              </button>
            </div>
            
            <div className="bg-[#131313] border border-white/10 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0a0a0a]">
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">DOC REF</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TITLE</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CATEGORY</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">REVISION</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PARTNER TYPES</th>
                    <th className="px-4 py-3 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">PUBLISHED</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO DOCUMENTS ISSUED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
              No documents have been approved for partner distribution. Upload and approve documents before they appear in the partner portal.
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#647789] font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div>
          <h1 className="font-display text-2xl text-white uppercase font-bold tracking-wider mb-2">Partner Network Studio</h1>
          <p className="text-sm">Manage partner applications, onboarding, and commercial terms.</p>
        </div>

        {/* COMMERCIAL NOTICE */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 p-3 flex gap-2 items-start">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-xs text-yellow-500/90 font-mono uppercase tracking-wide leading-relaxed">
            DEALER COST PROFILES ARE NOT YET APPROVED. ALL COMMERCIAL TERMS AND PRICING FIELDS ARE TBC. Do not populate or communicate commercial values until commercially approved by Alkota.
          </div>
        </div>

        {/* TAB BAR */}
        <div className="border-b border-white/10 flex gap-6 overflow-x-auto pb-[1px]">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-mono text-[9px] uppercase tracking-widest pb-3 whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab 
                  ? 'text-[#1a73e8] border-[#1a73e8]' 
                  : 'text-[#647789] border-transparent hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="pt-2">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}
