import React, { Suspense } from "react";
import Link from "next/link";
import { verifyAdminAuth } from "@/lib/auth/adminAuth";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import AttentionBar from "@/components/admin/AttentionBar";
import SystemStatusRow from "@/components/admin/SystemStatusRow";
import LeadsCard from "@/components/admin/cards/LeadsCard";
import ContentMediaCard from "@/components/admin/cards/ContentMediaCard";
import BlogCard from "@/components/admin/cards/BlogCard";
import NewsletterCard from "@/components/admin/cards/NewsletterCard";
import CommerceCard from "@/components/admin/cards/CommerceCard";
import SeoCard from "@/components/admin/cards/SeoCard";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";
import { CardSkeleton } from "@/components/admin/AdminCard";
import { RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOverviewPage() {
  await verifyAdminAuth();
  const loadedAt = new Date().toISOString();

  return (
    <div className="space-y-8 w-full">
      {/* Overview Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TechnicalAnnotation
              label="PLATFORM CONTROL"
              value="SYSTEM OVERVIEW"
              variant="signal"
            />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">
            PLATFORM OVERVIEW
          </h1>
          <p className="font-mono text-xs text-alkota-slate mt-1">
            Real-time status, live telemetry, and module readiness for Alkota Cycles.
          </p>
        </div>

        {/* Manual Refresh Indicator */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-alkota-slate">
          <span>LOADED: {loadedAt.slice(11, 19)} UTC</span>
          <Link
            href="/admin"
            className="px-2.5 py-1 border border-white/10 hover:border-alkota-signal text-alkota-slate hover:text-white transition-colors flex items-center gap-1.5 uppercase font-bold"
          >
            <RefreshCw className="w-3 h-3 text-alkota-signal" />
            <span>REFRESH</span>
          </Link>
        </div>
      </div>

      {/* 1. ATTENTION BAR (only renders when there is something in it) */}
      <Suspense fallback={null}>
        <AttentionBar />
      </Suspense>

      {/* 2. SYSTEM STATUS ROW */}
      <Suspense fallback={<div className="h-24 bg-white/5 animate-pulse border border-white/10" />}>
        <SystemStatusRow />
      </Suspense>

      {/* 3. MODULE CARDS (Grid 2 cols on md, 3 cols on xl) */}
      <div className="space-y-3">
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-alkota-slate border-b border-white/10 pb-2">
          OPERATIONAL MODULES & READINESS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<CardSkeleton title="LEADS & CRM" />}>
            <LeadsCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="CONTENT & MEDIA" />}>
            <ContentMediaCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="BLOG & JOURNAL" />}>
            <BlogCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="NEWSLETTER & EMAIL" />}>
            <NewsletterCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="COMMERCE & STORE" />}>
            <CommerceCard />
          </Suspense>

          <Suspense fallback={<CardSkeleton title="SEO & CRAWL GATE" />}>
            <SeoCard />
          </Suspense>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY */}
      <Suspense fallback={<div className="h-32 bg-white/5 animate-pulse border border-white/10" />}>
        <RecentActivity />
      </Suspense>

      {/* 5. QUICK ACTIONS */}
      <QuickActions />
    </div>
  );
}
