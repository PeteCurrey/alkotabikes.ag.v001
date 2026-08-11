import React from "react";
import { fetchSystemStatus } from "@/lib/admin/dashboardData";
import TechnicalAnnotation from "@/components/ui/TechnicalAnnotation";
import { Server, Database, HardDrive, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export default async function SystemStatusRow() {
  const result = await fetchSystemStatus();

  if (!result.ok) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 p-3 font-mono text-xs text-red-400">
        System Status Check Failed: {result.error}
      </div>
    );
  }

  const {
    gitSha,
    environment,
    allowIndexing,
    indexingEnvVar,
    siteUrl,
    dbStatus,
    dbLatencyMs,
    storageStatus,
    totalStorageAssets,
    integrations,
  } = result.data;

  return (
    <section className="bg-alkota-black/80 border border-white/10 p-4 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-3">
        {/* Left: Deployment info */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <TechnicalAnnotation label="ENV" value={environment} variant="signal" />
          <TechnicalAnnotation label="SHA" value={gitSha} />
          <div
            title={`Source: process.env.${indexingEnvVar}`}
            className="flex items-center gap-1.5 cursor-help"
          >
            <span className="text-alkota-slate text-[10px]">CRAWL GATE:</span>
            {allowIndexing ? (
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                INDEXABLE
              </span>
            ) : (
              <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                NOINDEX
              </span>
            )}
          </div>
        </div>

        {/* Right: DB & Storage quick metrics */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-alkota-slate">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-alkota-signal" />
            <span>DB:</span>
            <span className="text-white font-bold">
              {dbStatus === "healthy" ? `${dbLatencyMs}ms` : "OFFLINE"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-alkota-signal" />
            <span>STORAGE:</span>
            <span className="text-white font-bold uppercase">{storageStatus}</span>
          </div>
        </div>
      </div>

      {/* Integration Live Connectivity Strip */}
      <div className="space-y-1.5">
        <div className="font-mono text-[9px] text-alkota-slate uppercase tracking-widest flex items-center justify-between">
          <span>SERVER-SIDE LIVE INTEGRATION CONNECTIVITY (60S CACHE)</span>
          <span>REAL-TIME PING ON LOAD</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 font-mono text-[10px]">
          {integrations.map((integ) => {
            const isOk = integ.status === "healthy";
            const isUnconfigured = integ.status === "not_configured";

            return (
              <div
                key={integ.name}
                className={`p-2 border flex flex-col justify-between ${
                  isOk
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : isUnconfigured
                    ? "bg-white/5 border-white/10 text-alkota-slate"
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase">{integ.name}</span>
                  {isOk ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isUnconfigured ? (
                    <HelpCircle className="w-3 h-3 text-alkota-slate" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-400" />
                  )}
                </div>
                <div className="text-[9px] uppercase tracking-wider mt-1 opacity-80">
                  {isUnconfigured
                    ? "NOT CONFIGURED"
                    : isOk
                    ? integ.note || "HEALTHY"
                    : "UNAVAILABLE"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
