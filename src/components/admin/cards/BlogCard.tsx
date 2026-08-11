import React from "react";
import { AdminCard } from "../AdminCard";
import { BookOpen } from "lucide-react";

export default async function BlogCard() {
  return (
    <AdminCard title="BLOG & JOURNAL" state="planned">
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-alkota-slate">
          <BookOpen className="w-4 h-4 text-alkota-slate/60" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-white">
            EDITORIAL ENGINE (PHASE 3)
          </span>
        </div>
        <p className="font-mono text-xs text-alkota-slate leading-relaxed font-light">
          Journal & editorial post CMS is currently serving static markdown content. Database post management, editorial workflow, and claim-guard checks for blog posts are planned for Phase 3.
        </p>
        <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-2 font-mono text-[10px] text-alkota-slate">
          <div>
            <span>POST TABLES:</span> <span className="text-white font-bold">PLANNED</span>
          </div>
          <div>
            <span>CLAIM GUARD:</span> <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
