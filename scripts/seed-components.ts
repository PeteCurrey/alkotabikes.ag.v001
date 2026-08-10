/**
 * ALKOTA PROJECT 01 — COMPONENT SEED SCRIPT
 *
 * Migration path from versioned components.ts source of truth into operational
 * database tables (components, component_options).
 *
 * Conflict Policy:
 * components.ts is the versioned source of truth until studio editor goes live.
 * Seed updates overwrite operational database copy on conflict.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load environment variables from .env.local or .env if present
function loadEnv() {
  for (const envFile of [".env.local", ".env"]) {
    const fullPath = resolve(process.cwd(), envFile);
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          if (key && !process.env[key.trim()]) {
            process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
          }
        }
      }
    }
  }
}
loadEnv();

import { createClient } from "@supabase/supabase-js";
import { PROJECT01_COMPONENTS } from "../src/content/project01/components";
import { PROJECT_01_BUILD_MATRIX } from "../src/content/project01/buildMatrix";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Category to system_id mapping helper
function mapCategoryToSystemId(category: string): string {
  switch (category) {
    case "CHASSIS": return "chassis";
    case "FORK": return "fork";
    case "REAR_SHOCK": return "rear-shock";
    case "BRAKES": return "brakes-front";
    case "WHEELS": return "wheels";
    case "TYRES": return "tyres-front";
    case "DRIVETRAIN": return "drivetrain";
    case "HANDLEBAR":
    case "COCKPIT": return "cockpit";
    case "GRIPS": return "grips";
    default: return category.toLowerCase().replace(/_/g, "-");
  }
}

async function seedComponents() {
  console.log("==================================================");
  console.log("ALKOTA CYCLES — COMPONENT SEED & MIGRATION RUNNER");
  console.log("==================================================");
  console.log(`Source components.ts entry count: ${PROJECT01_COMPONENTS.length}`);

  let dbComponentCount = 0;
  let dbOptionCount = 0;

  for (let i = 0; i < PROJECT01_COMPONENTS.length; i++) {
    const comp = PROJECT01_COMPONENTS[i];
    const systemId = mapCategoryToSystemId(comp.category);

    // Find matrix item matching component
    const matrixItem = PROJECT_01_BUILD_MATRIX.find(
      (m) => m.selectableComponentIds.includes(comp.id) || m.defaultComponentId === comp.id
    );

    const isSelectable = matrixItem ? matrixItem.selectableComponentIds.includes(comp.id) : true;
    const isDefault = matrixItem ? matrixItem.defaultComponentId === comp.id : false;

    // 1. Upsert component
    const { data: compData, error: compErr } = await supabase
      .from("components")
      .upsert({
        id: comp.id,
        system_id: systemId,
        name: `${comp.manufacturer} ${comp.product}`,
        manufacturer: comp.manufacturer,
        model: comp.product,
        description: comp.description,
        engineering_status: comp.status,
        weight_grams: null, // No fabricated weights
        claim_id: null,
        is_selectable: isSelectable,
        sort_order: i + 1,
        image_ref: comp.officialImage,
        active: true,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (compErr) {
      console.error(`Error seeding component ${comp.id}:`, compErr.message);
    } else {
      dbComponentCount++;
    }

    // 2. Upsert component option linkage
    const { error: optErr } = await supabase
      .from("component_options")
      .upsert(
        {
          system_id: systemId,
          component_id: comp.id,
          is_default: isDefault,
          availability_status: comp.available ? "AVAILABLE" : "DEVELOPMENT_PHASE",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "system_id,component_id" }
      );

    if (optErr) {
      console.error(`Error seeding component option for ${comp.id}:`, optErr.message);
    } else {
      dbOptionCount++;
    }
  }

  // Verification report
  const { count: finalDbCount, error: countErr } = await supabase
    .from("components")
    .select("*", { count: "exact", head: true });

  console.log("--------------------------------------------------");
  console.log(`Components Seeded from File: ${PROJECT01_COMPONENTS.length}`);
  console.log(`Components in Database Table: ${finalDbCount !== null ? finalDbCount : dbComponentCount}`);
  console.log(`Component Options Created:   ${dbOptionCount}`);
  console.log("Conflict Policy: components.ts wins on conflict (Pre-Production Phase)");
  console.log("--------------------------------------------------");

  if (countErr) {
    console.error("Error querying database count:", countErr.message);
  } else if (finalDbCount === PROJECT01_COMPONENTS.length) {
    console.log("SUCCESS: Component count in DB matches components.ts exactly!");
  } else {
    console.warn(`WARNING: Database count (${finalDbCount}) differs from file count (${PROJECT01_COMPONENTS.length})`);
  }
}

seedComponents().catch((err) => {
  console.error("Fatal seed script error:", err);
  process.exit(1);
});
