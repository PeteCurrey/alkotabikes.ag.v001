'use client';
import React from 'react';
import { PROJECT_01_SPECIFICATION } from '@/content/project01/specification';
export default function ContentClient() {
  const handleEdit = () => alert('Phase 02 — live editing requires database backend');
  return (
    <div className="p-8 min-h-screen bg-[#0f0f0f] text-white">
      <div className="space-y-1 mb-8">
        <div className="font-mono text-[9px] text-[#1a73e8] uppercase tracking-widest font-bold">ALKOTA STUDIO</div>
        <h1 className="font-display font-bold text-2xl text-white uppercase">Content Management</h1>
        <div className="font-mono text-[8px] text-[#647789] uppercase">Editable text content across the site.</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">GLOBAL DEVELOPMENT STATUS</h2>
          <div className="space-y-2 mb-4">
            <p className="font-mono text-[9px] text-[#647789]">Current Revision: <span className="text-white">{PROJECT_01_SPECIFICATION.currentRevision}</span></p>
            <p className="font-mono text-[9px] text-[#647789]">Current Phase: <span className="text-white">{PROJECT_01_SPECIFICATION.programmeStatus}</span></p>
            <p className="font-mono text-[9px] text-[#647789]">Race Year: <span className="text-white">{PROJECT_01_SPECIFICATION.raceProgramme.year}</span></p>
            <p className="font-mono text-[9px] text-[#647789]">Production Year: <span className="text-white">{PROJECT_01_SPECIFICATION.productionLaunch.year}</span></p>
          </div>
          <button onClick={handleEdit} className="text-[#1a73e8] font-mono text-[9px] hover:underline">EDIT</button>
        </div>
        
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">HOMEPAGE DEVELOPMENT MESSAGE</h2>
          <p className="font-mono text-[9px] text-white mb-4">"Alkota Cycles is currently in engineering development. The information presented here represents Phase 01 prototyping..."</p>
          <button onClick={handleEdit} className="text-[#1a73e8] font-mono text-[9px] hover:underline">EDIT</button>
        </div>
        
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">GLOBAL PROJECT 01 CTA</h2>
          <p className="font-mono text-[9px] text-white mb-4">"Follow the development programme."</p>
          <button onClick={handleEdit} className="text-[#1a73e8] font-mono text-[9px] hover:underline">EDIT</button>
        </div>
        
        <div className="bg-[#131313] border border-white/10 p-6">
          <h2 className="font-mono text-[10px] text-white mb-4">PROGRAMME DATES</h2>
          <p className="font-mono text-[9px] text-white mb-4">Dates for key milestones in the development journey.</p>
          <button onClick={handleEdit} className="text-[#1a73e8] font-mono text-[9px] hover:underline">EDIT</button>
        </div>
      </div>
    </div>
  );
}
