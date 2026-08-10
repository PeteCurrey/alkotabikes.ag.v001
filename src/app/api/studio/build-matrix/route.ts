import { NextResponse } from "next/server";
import { PROJECT_01_BUILD_MATRIX, BuildMatrixItem } from "@/content/project01/buildMatrix";

let MEMORY_MATRIX: BuildMatrixItem[] = [...PROJECT_01_BUILD_MATRIX];
let MEMORY_RULES: { id: string; condition: string; constraint: string; active: boolean }[] = [
  {
    id: "rule-01",
    condition: "wheelFormat === '29/29'",
    constraint: "Requires 29\" Front & Rear tyres (Maxxis Assegai / Minion DHR II)",
    active: true,
  },
  {
    id: "rule-02",
    condition: "wheelFormat === 'MX'",
    constraint: "Requires 29\" Front / 27.5\" Rear tyre casing",
    active: true,
  },
  {
    id: "rule-03",
    condition: "frameSize === 'S'",
    constraint: "Recommended maximum dropper stroke 175mm",
    active: true,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    matrix: MEMORY_MATRIX,
    compatibilityRules: MEMORY_RULES,
    immutabilityNote: "Saved builds store static JSONB snapshots of component choices. Modifying the build matrix updates active configurator options only and never retroactively alters existing saved builds.",
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { systemId, isConfigurable, defaultComponentId, selectableComponentIds, rules } = body;

    if (systemId) {
      const idx = MEMORY_MATRIX.findIndex((m) => m.systemId === systemId);
      if (idx !== -1) {
        MEMORY_MATRIX[idx] = {
          ...MEMORY_MATRIX[idx],
          ...(isConfigurable !== undefined && { isConfigurable }),
          ...(defaultComponentId && { defaultComponentId }),
          ...(selectableComponentIds && { selectableComponentIds }),
        };
      }
    }

    if (rules && Array.isArray(rules)) {
      MEMORY_RULES = rules;
    }

    return NextResponse.json({
      success: true,
      matrix: MEMORY_MATRIX,
      compatibilityRules: MEMORY_RULES,
      message: "Build matrix updated successfully. Saved build snapshots remain unchanged.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update build matrix" }, { status: 500 });
  }
}
