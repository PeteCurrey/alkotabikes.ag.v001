'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, ArrowRight, AlertCircle, ShieldCheck, Building2, Wrench, 
  FileText, BarChart3, Package, Users, Mail, ChevronRight, Bike, 
  BookOpen, Flame, Clipboard, Settings, LogOut, CheckCircle2, Clock, Star 
} from 'lucide-react';
import TechnicalAnnotation from '@/components/ui/TechnicalAnnotation';

interface PartnerSession {
  partnerReference: string; // APN-XXXXXX
  email: string;
  businessName: string;
  types: string[];
  accountStatus: string;
  leadEligibility: boolean;
  allocationEligibility: boolean;
  serviceAuthorised: boolean;
  warrantyAuthorised: boolean;
  demoProgramme: boolean;
}

export default function PartnersClient() {
  const [session, setSession] = useState<PartnerSession | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [refInput, setRefInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('alkota_partner_session');
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput || !emailInput) return;
    
    setIsAuthenticating(true);
    
    setTimeout(() => {
      const mockSession: PartnerSession = {
        partnerReference: refInput.toUpperCase(),
        email: emailInput,
        businessName: 'Partner Organisation',
        types: ['RETAIL', 'SERVICE'],
        accountStatus: 'ACTIVE',
        leadEligibility: false,
        allocationEligibility: false,
        serviceAuthorised: false,
        warrantyAuthorised: false,
        demoProgramme: false,
      };
      
      sessionStorage.setItem('alkota_partner_session', JSON.stringify(mockSession));
      setSession(mockSession);
      setIsAuthenticating(false);
    }, 1200);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('alkota_partner_session');
    setSession(null);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-[#647789] font-sans flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-white uppercase mb-2">Partner Portal</h1>
            <p className="text-sm">Sign in to access the Alkota Partner Network.</p>
          </div>
          
          <form onSubmit={handleSignIn} className="bg-[#131313] border border-white/10 p-6 flex flex-col gap-4">
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#647789] mb-1.5">Partner Reference</label>
              <input 
                type="text" 
                placeholder="APN-XXXXXX"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#1a73e8]"
                required
              />
            </div>
            
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[#647789] mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="email@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-[#1a73e8]"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="mt-4 bg-[#1a73e8] hover:bg-[#1a73e8]/80 text-white font-mono text-xs uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isAuthenticating ? 'AUTHENTICATING...' : 'REQUEST PORTAL ACCESS'}
              {!isAuthenticating && <ArrowRight className="w-3 h-3" />}
            </button>
          </form>

          <div className="mt-6 bg-yellow-500/5 border border-yellow-500/20 p-4 flex gap-3 items-start">
            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-500/80 leading-relaxed">
              PORTAL IN DEVELOPMENT. Full authentication uses passwordless email links. Portal sections activate progressively as programme milestones are reached.
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs">
              Not yet a partner? <Link href="/dealers#apply" className="text-[#1a73e8] hover:underline">Apply here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const SectionCard = ({ 
    title, icon: Icon, available, lockedMessage, children, className = '' 
  }: { 
    title: string, icon: any, available: boolean, lockedMessage?: string, children: React.ReactNode, className?: string 
  }) => (
    <div className={`border p-5 flex flex-col h-full ${available ? 'bg-[#131313] border-white/10 hover:border-[#1a73e8]/30 transition-colors' : 'bg-[#0a0a0a] border-white/5 opacity-50'} ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-4 h-4 ${available ? 'text-[#1a73e8]' : 'text-[#647789]'}`} />
        <h2 className={`font-mono text-[10px] uppercase tracking-widest ${available ? 'text-white' : 'text-[#647789]'}`}>{title}</h2>
        {!available && <Lock className="w-3 h-3 ml-auto text-[#647789]" />}
      </div>
      
      {available ? (
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <Lock className="w-6 h-6 text-white/20 mb-3" />
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#647789]">{lockedMessage || 'PENDING APPROVAL'}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#647789] font-sans pb-20">
      {/* HEADER BAR */}
      <div className="bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest mb-1">ALKOTA PARTNER NETWORK</div>
            <div className="flex items-center gap-4">
              <h1 className="font-display font-bold text-2xl text-white uppercase">{session.businessName}</h1>
              <div className="flex gap-2 hidden sm:flex">
                {session.types.map(t => (
                  <span key={t} className="font-mono text-[8px] text-white/70 border border-white/15 px-2 py-0.5 uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-[#1a73e8] font-bold border border-[#1a73e8]/30 px-3 py-1 bg-[#1a73e8]/10">
              {session.partnerReference}
            </div>
            <button 
              onClick={handleSignOut}
              className="text-[#647789] hover:text-white transition-colors p-2"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. PROJECT 01 */}
          <SectionCard title="PROJECT 01" icon={Bike} available={true}>
            <div className="space-y-4 mb-6">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#647789] mb-1">CURRENT ENGINEERING REVISION</div>
                <div className="font-mono text-sm text-white">R00 / DEVELOPMENT BASELINE</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#647789] mb-1">PROGRAMME STATUS</div>
                <div className="font-mono text-sm text-white">PRE-PRODUCTION / 2028</div>
              </div>
            </div>
            <Link href="/bikes/project-01" className="mt-auto border border-white/10 hover:border-[#1a73e8] text-white font-mono text-[10px] uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors">
              VIEW PROJECT 01 <ArrowRight className="w-3 h-3" />
            </Link>
          </SectionCard>

          {/* 2. COMMERCIAL STATUS */}
          <SectionCard title="COMMERCIAL STATUS" icon={BarChart3} available={true}>
            <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 mb-4">
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-yellow-500 font-bold mb-1">COMMERCIAL TERMS PENDING APPROVAL</div>
                  <div className="font-mono text-[9px] text-[#647789] leading-relaxed">
                    Dealer pricing and commercial terms will be communicated when commercially approved. No values are confirmed at this stage.
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 3. CUSTOMER LEADS */}
          <SectionCard 
            title="CUSTOMER LEADS" 
            icon={Users} 
            available={session.leadEligibility}
            lockedMessage="Lead eligibility not yet activated for your account."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">LEAD REF</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">LOCATION</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">INTEREST</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STAGE</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">CONSENT</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="py-8 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO ACTIVE LEADS ASSIGNED
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto pt-4 flex items-start gap-2">
              <Lock className="w-3 h-3 text-[#647789] shrink-0 mt-0.5" />
              <div className="font-mono text-[9px] text-[#647789] leading-relaxed">
                Customer name and contact details are only shared after explicit customer consent.
              </div>
            </div>
          </SectionCard>

          {/* 4. ALLOCATIONS */}
          <SectionCard 
            title="ALLOCATIONS" 
            icon={Package} 
            available={session.allocationEligibility}
            lockedMessage="Allocation eligibility not yet activated for your account."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">ALLOCATION REF</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">SIZE</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">FINISH</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">BUILD WINDOW</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-8 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO PRODUCTION ALLOCATIONS YET
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* 5. DEMO FLEET */}
          <SectionCard 
            title="DEMO FLEET" 
            icon={Bike} 
            available={session.demoProgramme}
            lockedMessage="Demo programme not yet active for your account."
          >
            <div className="flex flex-col items-center justify-center py-8">
              <Bike className="w-6 h-6 text-[#647789]/30 mb-3" />
              <div className="font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                No demo units currently allocated.
              </div>
            </div>
          </SectionCard>

          {/* 6. SERVICE */}
          <SectionCard 
            title="SERVICE" 
            icon={Wrench} 
            available={session.serviceAuthorised}
            lockedMessage="Service authorisation pending."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">SERVICE REF</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">BIKE</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">TYPE</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">DATE</th>
                    <th className="py-2 font-mono text-[9px] text-[#647789] uppercase tracking-widest font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-8 text-center font-mono text-[10px] text-[#647789] uppercase tracking-widest">
                      NO SERVICE RECORDS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* 7. DOCUMENTS */}
          <SectionCard title="DOCUMENTS" icon={FileText} available={true}>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="w-6 h-6 text-[#647789]/30 mb-3" />
              <div className="text-sm text-[#647789] max-w-sm mb-4">
                No documents have been issued to the partner network yet.
              </div>
              <div className="font-mono text-[9px] text-[#647789] uppercase tracking-widest">
                Documents will be made available as the programme progresses.
              </div>
            </div>
          </SectionCard>

          {/* 8. TRAINING */}
          <SectionCard title="TRAINING" icon={BookOpen} available={true}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {['PROJECT 01', 'FIT', 'SUSPENSION SETUP', 'PDI', 'SERVICE', 'WARRANTY'].map(mod => (
                <div key={mod} className="bg-[#0a0a0a] border border-white/5 p-3 flex flex-col items-center text-center gap-2 aspect-square justify-center">
                  <Lock className="w-4 h-4 text-[#647789]/50" />
                  <div className="font-mono text-[9px] text-white uppercase tracking-widest">{mod}</div>
                  <div className="font-mono text-[8px] text-[#647789] uppercase tracking-widest mt-1">CONTENT IN DEVELOPMENT</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 9. WARRANTY */}
          <SectionCard 
            title="WARRANTY" 
            icon={ShieldCheck} 
            available={session.warrantyAuthorised}
            lockedMessage="Warranty authorisation required."
          >
            <div className="flex flex-col items-center justify-center py-8 flex-1">
              <ShieldCheck className="w-6 h-6 text-[#647789]/30 mb-3" />
              <div className="font-mono text-[10px] text-[#647789] uppercase tracking-widest mb-6">
                NO ACTIVE CLAIMS
              </div>
              <button disabled className="border border-white/10 text-[#647789] px-4 py-2 font-mono text-[9px] uppercase tracking-widest opacity-50 cursor-not-allowed">
                SUBMIT WARRANTY CLAIM
              </button>
            </div>
          </SectionCard>

          {/* 10. ACCOUNT */}
          <SectionCard title="ACCOUNT" icon={Settings} available={true}>
            <div className="space-y-4 mb-6 flex-1">
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#647789]">PARTNER REFERENCE</div>
                <div className="font-mono text-xs text-white">{session.partnerReference}</div>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#647789]">ACCOUNT STATUS</div>
                <div className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border border-[#1a73e8]/30 text-[#1a73e8] bg-[#1a73e8]/10">
                  {session.accountStatus}
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#647789]">CONTACT EMAIL</div>
                <div className="font-mono text-xs text-white">{session.email}</div>
              </div>
            </div>
            <div className="font-mono text-[9px] text-[#647789] leading-relaxed">
              To update your account details or staff, contact your Alkota partner representative.
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
