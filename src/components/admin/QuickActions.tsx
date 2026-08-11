import React from "react";
import Link from "next/link";
import { Upload, ExternalLink, Activity, Users, Layers } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { label: "UPLOAD MEDIA", href: "/admin/media", icon: Upload },
    { label: "VIEW CRM LEADS", href: "/admin/leads", icon: Users },
    { label: "CONTENT SLOTS", href: "/admin/content", icon: Layers },
    { label: "RUN HEALTH CHECK", href: "/admin/health", icon: Activity },
    { label: "VIEW PUBLIC SITE", href: "/us", icon: ExternalLink, external: true },
  ];

  return (
    <section className="bg-alkota-black/60 border border-white/10 p-5 space-y-3">
      <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-alkota-slate">
        QUICK ACTIONS & SHORTCUTS
      </div>
      <div className="flex flex-wrap gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.label}
              href={act.href}
              target={act.external ? "_blank" : undefined}
              className="px-3.5 py-2 bg-white/5 border border-white/10 hover:border-alkota-signal hover:bg-alkota-signal/10 hover:text-alkota-signal text-alkota-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{act.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
