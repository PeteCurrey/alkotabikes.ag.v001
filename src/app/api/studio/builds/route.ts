import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

// Fallback seed builds for studio demonstration when DB has no records
const FALLBACK_BUILDS = [
  {
    id: "build-001",
    build_reference: "A01-L-29-48213",
    region: "uk",
    frame_size: "L",
    wheel_format: "29/29",
    finish: "CARBON",
    selections: {
      fork: "fork-fox38-factory",
      shock: "shock-fox-floatx2-factory",
      brakesFront: "brake-front-hope-evov6ti",
      brakesRear: "brake-rear-hope-tr4",
      wheels: "wheels-dt-swiss-exc1200",
      drivetrain: "drivetrain-sram-xx-eagle-axs",
    },
    fit_inputs: { heightCm: 182, insetLegCm: 84 },
    email: "rider.one@alkota.co.uk",
    registration_reference: "REG-UK-1002",
    source: "CONFIGURATOR",
    created_at: "2026-08-10T14:32:00Z",
  },
  {
    id: "build-002",
    build_reference: "A01-M-29-19482",
    region: "us",
    frame_size: "M",
    wheel_format: "29/29",
    finish: "GLACIER",
    selections: {
      fork: "fork-fox38-factory",
      shock: "shock-fox-floatx2-factory",
      brakesFront: "brake-front-hope-evov6ti",
      brakesRear: "brake-rear-hope-tr4",
      wheels: "wheels-dt-swiss-exc1200",
      drivetrain: "drivetrain-sram-xx-eagle-axs",
    },
    fit_inputs: { heightCm: 175, insetLegCm: 80 },
    email: "rider.two@alkota.com",
    registration_reference: null,
    source: "CONFIGURATOR",
    created_at: "2026-08-10T16:15:00Z",
  },
  {
    id: "build-003",
    build_reference: "A01-XL-MX-88321",
    region: "uk",
    frame_size: "XL",
    wheel_format: "MX",
    finish: "CARBON",
    selections: {
      fork: "fork-rockshox-zeb-ultimate",
      shock: "shock-fox-dhx2-factory",
      brakesFront: "brake-front-hope-evov6ti",
      brakesRear: "brake-rear-hope-tr4",
      wheels: "wheels-dt-swiss-exc1200",
      drivetrain: "drivetrain-sram-xx-eagle-axs",
    },
    fit_inputs: { heightCm: 191, insetLegCm: 90 },
    email: "alpine.racer@alkota.co.uk",
    registration_reference: "REG-UK-1008",
    source: "CONFIGURATOR",
    created_at: "2026-08-10T18:45:00Z",
  },
  {
    id: "build-004",
    build_reference: "A01-S-29-33104",
    region: "us",
    frame_size: "S",
    wheel_format: "29/29",
    finish: "GLACIER",
    selections: {
      fork: "fork-fox38-factory",
      shock: "shock-fox-floatx2-factory",
      brakesFront: "brake-front-hope-evov6ti",
      brakesRear: "brake-rear-hope-tr4",
      wheels: "wheels-dt-swiss-exc1200",
      drivetrain: "drivetrain-sram-xx-eagle-axs",
    },
    fit_inputs: { heightCm: 164, insetLegCm: 75 },
    email: "trail.rider@alkotacycles.com",
    registration_reference: null,
    source: "CONFIGURATOR",
    created_at: "2026-08-10T20:10:00Z",
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");
    const frameSize = searchParams.get("frameSize");
    const wheelFormat = searchParams.get("wheelFormat");
    const finish = searchParams.get("finish");
    const isAttached = searchParams.get("attached");
    const search = searchParams.get("search")?.toLowerCase();

    let builds: any[] = [];

    if (supabaseAdmin) {
      const { data: dbBuilds } = await supabaseAdmin
        .from("saved_builds")
        .select(`
          *,
          registrations (
            registration_reference,
            full_name,
            email,
            country
          )
        `)
        .order("created_at", { ascending: false });

      if (dbBuilds && dbBuilds.length > 0) {
        builds = dbBuilds;
      }
    }

    if (builds.length === 0) {
      builds = FALLBACK_BUILDS;
    }

    // Apply filters
    let filtered = [...builds];

    if (region && region !== "ALL") {
      filtered = filtered.filter((b) => b.region?.toLowerCase() === region.toLowerCase());
    }
    if (frameSize && frameSize !== "ALL") {
      filtered = filtered.filter((b) => b.frame_size === frameSize);
    }
    if (wheelFormat && wheelFormat !== "ALL") {
      filtered = filtered.filter((b) => b.wheel_format === wheelFormat);
    }
    if (finish && finish !== "ALL") {
      filtered = filtered.filter((b) => b.finish === finish);
    }
    if (isAttached !== null && isAttached !== undefined && isAttached !== "ALL") {
      const wantAttached = isAttached === "true";
      filtered = filtered.filter((b) => (wantAttached ? !!b.registration_reference : !b.registration_reference));
    }
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.build_reference?.toLowerCase().includes(search) ||
          b.email?.toLowerCase().includes(search) ||
          b.registration_reference?.toLowerCase().includes(search)
      );
    }

    // Calculate aggregated demand metrics
    const totalCount = filtered.length;
    const finishCounts: Record<string, number> = {};
    const sizeCounts: Record<string, number> = {};
    const wheelCounts: Record<string, number> = {};
    let attachedCount = 0;

    filtered.forEach((b) => {
      finishCounts[b.finish] = (finishCounts[b.finish] || 0) + 1;
      sizeCounts[b.frame_size] = (sizeCounts[b.frame_size] || 0) + 1;
      wheelCounts[b.wheel_format] = (wheelCounts[b.wheel_format] || 0) + 1;
      if (b.registration_reference) attachedCount++;
    });

    const analytics = {
      totalBuilds: totalCount,
      attachedToRegistrations: attachedCount,
      attachmentRatePct: totalCount > 0 ? Math.round((attachedCount / totalCount) * 100) : 0,
      finishDistribution: {
        GLACIER: { count: finishCounts["GLACIER"] || 0, pct: totalCount > 0 ? Math.round(((finishCounts["GLACIER"] || 0) / totalCount) * 100) : 0 },
        CARBON: { count: finishCounts["CARBON"] || 0, pct: totalCount > 0 ? Math.round(((finishCounts["CARBON"] || 0) / totalCount) * 100) : 0 },
      },
      sizeDistribution: {
        S: { count: sizeCounts["S"] || 0, pct: totalCount > 0 ? Math.round(((sizeCounts["S"] || 0) / totalCount) * 100) : 0 },
        M: { count: sizeCounts["M"] || 0, pct: totalCount > 0 ? Math.round(((sizeCounts["M"] || 0) / totalCount) * 100) : 0 },
        L: { count: sizeCounts["L"] || 0, pct: totalCount > 0 ? Math.round(((sizeCounts["L"] || 0) / totalCount) * 100) : 0 },
        XL: { count: sizeCounts["XL"] || 0, pct: totalCount > 0 ? Math.round(((sizeCounts["XL"] || 0) / totalCount) * 100) : 0 },
      },
      wheelFormatDistribution: {
        "29/29": { count: wheelCounts["29/29"] || 0, pct: totalCount > 0 ? Math.round(((wheelCounts["29/29"] || 0) / totalCount) * 100) : 0 },
        MX: { count: wheelCounts["MX"] || 0, pct: totalCount > 0 ? Math.round(((wheelCounts["MX"] || 0) / totalCount) * 100) : 0 },
      },
    };

    return NextResponse.json({
      success: true,
      builds: filtered,
      analytics,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch builds" }, { status: 500 });
  }
}
