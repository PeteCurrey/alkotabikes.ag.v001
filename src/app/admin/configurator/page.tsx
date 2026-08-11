import React from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { Sliders, Plus, Layers, ShieldCheck } from "lucide-react";

export default async function AdminConfiguratorModelsPage() {
  const { data: models } = await supabaseAdmin
    .from("configurator_models")
    .select("id, slug, name, subtitle, status, base_price_minor, markets, updated_at")
    .order("sort_position", { ascending: true });

  return (
    <div className="space-y-8 text-white max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-alkota-gold font-bold uppercase tracking-widest">
            MANAGED STUDIO ENGINE
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase mt-1">
            CONFIGURATOR MODELS & RULES ENGINE
          </h1>
          <p className="font-sans text-xs text-[#9ab0c4] mt-1">
            Author options, compatibility rules, pricing matrices, and publish snapshots.
          </p>
        </div>

        <Link
          href="/admin/configurator/new"
          className="flex items-center gap-2 px-4 py-2 bg-alkota-gold text-alkota-carbon rounded font-mono font-bold text-xs uppercase hover:bg-alkota-gold-bright transition w-fit"
        >
          <Plus className="w-4 h-4" />
          CREATE MODEL
        </Link>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models && models.length > 0 ? (
          models.map((model) => (
            <div
              key={model.id}
              className="border border-white/10 bg-alkota-carbon rounded-xl p-6 space-y-4 hover:border-white/20 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      model.status === "published"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/10 text-white/60 border border-white/10"
                    }`}
                  >
                    {model.status}
                  </span>
                  <span className="font-mono text-xs text-white/40">{model.slug}</span>
                </div>

                <h3 className="font-mono text-lg font-bold text-white uppercase">{model.name}</h3>
                {model.subtitle && <p className="font-sans text-xs text-[#9ab0c4]">{model.subtitle}</p>}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="font-mono text-xs text-[#9ab0c4]">
                  Base:{" "}
                  <span className="text-white font-bold">
                    {model.base_price_minor
                      ? `£${(model.base_price_minor / 100).toLocaleString("en-GB")}`
                      : "Unpriced"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/configurator/${model.slug}/simulate`}
                    className="p-2 border border-white/15 rounded text-white/70 hover:text-white hover:bg-white/5 transition"
                    title="Run Simulator"
                  >
                    <Sliders className="w-4 h-4 text-alkota-gold" />
                  </Link>
                  <Link
                    href={`/admin/configurator/${model.slug}`}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded font-mono font-bold text-xs uppercase text-white transition"
                  >
                    STUDIO →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full border border-dashed border-white/15 rounded-xl p-12 text-center space-y-3">
            <Layers className="w-8 h-8 text-white/30 mx-auto" />
            <div className="font-mono text-sm text-white/60">NO CONFIGURATOR MODELS AUTHORED YET</div>
            <p className="font-sans text-xs text-[#9ab0c4]">
              Create your first model platform to author option groups and compatibility rules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
