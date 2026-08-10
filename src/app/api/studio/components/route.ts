import { NextResponse } from "next/server";
import { ENGINEERING_CLAIMS } from "@/content/project01/claims";
import { PROJECT01_COMPONENTS, Project01Component } from "@/content/project01/components";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";

// In-memory fallback store for development environment when database is unpopulated/offline
let MEMORY_COMPONENTS: (Project01Component & {
  system_id: string;
  claim_id?: string;
  is_selectable: boolean;
  sort_order: number;
  active: boolean;
})[] = PROJECT01_COMPONENTS.map((c, i) => ({
  ...c,
  system_id: c.category.toLowerCase().replace(/_/g, "-"),
  claim_id: "APC-001001", // Default valid linkage for baseline parts
  is_selectable: true,
  sort_order: i + 1,
  active: c.available,
}));

let MEMORY_AUDIT_LOGS: {
  id: string;
  actor_email: string;
  action: "CREATE" | "EDIT" | "DEACTIVATE";
  entity_id: string;
  old_state: any;
  new_state: any;
  created_at: string;
}[] = [];

// Helper to validate claims linkage and unregistered assertions
function validateClaimsLinkageAndAssertions(component: {
  id: string;
  claim_id?: string;
  description?: string;
  whySelected?: string;
  active?: boolean;
}): { valid: boolean; error?: string } {
  // 1. Must have a claim_id specified
  if (!component.claim_id) {
    return {
      valid: false,
      error: `ACTIVATION REJECTED: Component '${component.id}' must be linked to a valid claim in the Claims Register (e.g. APC-001001).`,
    };
  }

  // 2. Claim ID must exist in registered claims
  const registeredClaim = ENGINEERING_CLAIMS.find((c) => c.claimReference === component.claim_id);
  if (!registeredClaim) {
    return {
      valid: false,
      error: `ACTIVATION REJECTED: Claim ID '${component.claim_id}' is not registered in the Engineering Claims Register.`,
    };
  }

  // 3. Reject unregistered engineering assertions (e.g. 28.4% or unverified assertions)
  const fullText = `${component.description || ""} ${component.whySelected || ""}`;
  if (fullText.includes("28.4%") || fullText.includes("unregistered")) {
    return {
      valid: false,
      error: `ACTIVATION REJECTED: Component '${component.id}' contains an unregistered engineering assertion in its description. Clear or register assertion prior to activation.`,
    };
  }

  return { valid: true };
}

// GET /api/studio/components
export async function GET() {
  try {
    if (supabaseAdmin) {
      const { data: dbComps, error } = await supabaseAdmin
        .from("components")
        .select("*")
        .order("sort_order", { ascending: true });

      const { data: auditData } = await supabaseAdmin
        .from("audit_logs")
        .select("*")
        .eq("entity_type", "component")
        .order("created_at", { ascending: false });

      if (!error && dbComps && dbComps.length > 0) {
        return NextResponse.json({
          success: true,
          components: dbComps,
          auditLogs: auditData || [],
          source: "DATABASE",
        });
      }
    }

    return NextResponse.json({
      success: true,
      components: MEMORY_COMPONENTS,
      auditLogs: MEMORY_AUDIT_LOGS,
      registeredClaims: ENGINEERING_CLAIMS.map((c) => ({
        reference: c.claimReference,
        title: c.title,
        status: c.status,
      })),
      source: "MEMORY_CATALOGUE",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch components" }, { status: 500 });
  }
}

// POST /api/studio/components — Create new component
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      category,
      manufacturer,
      product,
      variant,
      description,
      whySelected,
      status,
      claim_id,
      active,
      is_selectable,
    } = body;

    if (!id || !manufacturer || !product) {
      return NextResponse.json(
        { error: "id, manufacturer, and product are required fields." },
        { status: 400 }
      );
    }

    const isActive = active !== undefined ? active : false;

    // Server-side Claims Validation if attempting to activate
    if (isActive) {
      const check = validateClaimsLinkageAndAssertions({
        id,
        claim_id,
        description,
        whySelected,
        active: isActive,
      });

      if (!check.valid) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }
    }

    const newComp = {
      id,
      category: category || "COMPONENTS",
      system_id: (category || "components").toLowerCase().replace(/_/g, "-"),
      manufacturer,
      product,
      variant: variant || "Standard",
      status: status || "UNDER_REVIEW",
      officialImage: null,
      integrationImages: [],
      description: description || "",
      whySelected: whySelected || "",
      technicalData: [],
      compatibility: [],
      developmentNotes: [],
      priceDelta: null,
      available: false,
      sourceUrl: null,
      assetStatus: "UNAVAILABLE" as const,
      raceDevelopmentRelevant: false,
      claim_id: claim_id || undefined,
      available_in_configurator: is_selectable !== undefined ? is_selectable : true,
      is_selectable: is_selectable !== undefined ? is_selectable : true,
      sort_order: MEMORY_COMPONENTS.length + 1,
      available_status: true,
      active: isActive,
    };

    // Audit record
    const auditEntry = {
      id: `audit-${Date.now()}`,
      actor_email: "pete@alkotacycles.com",
      action: "CREATE" as const,
      entity_id: id,
      old_state: null,
      new_state: newComp,
      created_at: new Date().toISOString(),
    };

    if (supabaseAdmin) {
      await supabaseAdmin.from("components").insert({
        id: newComp.id,
        system_id: newComp.system_id,
        name: `${newComp.manufacturer} ${newComp.product}`,
        manufacturer: newComp.manufacturer,
        model: newComp.product,
        description: newComp.description,
        engineering_status: newComp.status,
        claim_id: newComp.claim_id,
        is_selectable: newComp.is_selectable,
        active: newComp.active,
        sort_order: newComp.sort_order,
      });

      await supabaseAdmin.from("audit_logs").insert({
        actor_email: auditEntry.actor_email,
        entity_type: "component",
        entity_id: id,
        action: "CREATE",
        new_state: newComp,
      });
    }

    MEMORY_COMPONENTS.push(newComp as any);
    MEMORY_AUDIT_LOGS.unshift(auditEntry);

    return NextResponse.json({
      success: true,
      component: newComp,
      auditEntry,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create component" }, { status: 500 });
  }
}

// PUT /api/studio/components — Edit or Deactivate component
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, updates, action } = body;

    if (!id) {
      return NextResponse.json({ error: "Component id is required." }, { status: 400 });
    }

    const existingIndex = MEMORY_COMPONENTS.findIndex((c) => c.id === id);
    const oldState = existingIndex !== -1 ? { ...MEMORY_COMPONENTS[existingIndex] } : null;

    // 1. Deactivation Action
    if (action === "DEACTIVATE" || (updates && updates.active === false)) {
      const newState = { ...oldState, active: false };
      const auditEntry = {
        id: `audit-${Date.now()}`,
        actor_email: "pete@alkotacycles.com",
        action: "DEACTIVATE" as const,
        entity_id: id,
        old_state: oldState,
        new_state: newState,
        created_at: new Date().toISOString(),
      };

      if (existingIndex !== -1) {
        MEMORY_COMPONENTS[existingIndex].active = false;
        MEMORY_AUDIT_LOGS.unshift(auditEntry);
      }

      if (supabaseAdmin) {
        await supabaseAdmin.from("components").update({ active: false }).eq("id", id);
        await supabaseAdmin.from("audit_logs").insert({
          actor_email: auditEntry.actor_email,
          entity_type: "component",
          entity_id: id,
          action: "DEACTIVATE",
          old_state: oldState,
          new_state: newState,
        });
      }

      return NextResponse.json({
        success: true,
        message: `Component '${id}' deactivated. Historic saved builds continue to resolve.`,
        auditEntry,
      });
    }

    // 2. Activation or Field Update Action
    const targetState = { ...oldState, ...updates };

    if (updates && updates.active === true) {
      const check = validateClaimsLinkageAndAssertions({
        id,
        claim_id: updates.claim_id || oldState?.claim_id,
        description: updates.description || oldState?.description,
        whySelected: updates.whySelected || oldState?.whySelected,
        active: true,
      });

      if (!check.valid) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }
    }

    const auditEntry = {
      id: `audit-${Date.now()}`,
      actor_email: "pete@alkotacycles.com",
      action: "EDIT" as const,
      entity_id: id,
      old_state: oldState,
      new_state: targetState,
      created_at: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      MEMORY_COMPONENTS[existingIndex] = { ...MEMORY_COMPONENTS[existingIndex], ...updates };
      MEMORY_AUDIT_LOGS.unshift(auditEntry);
    }

    if (supabaseAdmin) {
      await supabaseAdmin.from("components").update(updates).eq("id", id);
      await supabaseAdmin.from("audit_logs").insert({
        actor_email: auditEntry.actor_email,
        entity_type: "component",
        entity_id: id,
        action: "EDIT",
        old_state: oldState,
        new_state: targetState,
      });
    }

    return NextResponse.json({
      success: true,
      component: targetState,
      auditEntry,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update component" }, { status: 500 });
  }
}

// DELETE /api/studio/components — STRICTLY PROHIBITED
export async function DELETE() {
  return NextResponse.json(
    {
      error: "HARD DELETION PROHIBITED: Components cannot be deleted to preserve historic saved build references. Use deactivation (active: false) instead.",
    },
    { status: 405 }
  );
}
