import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf-8");
const envVars: Record<string, string> = {};

envFile.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const parts = trimmed.split("=");
    const key = parts[0].trim();
    let val = parts.slice(1).join("=").trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    envVars[key] = val;
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Connecting to Supabase URL:", url);

if (!url || !key) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
  const tables = [
    "registrations",
    "project01_reservations",
    "project01_allocations",
    "partner_organisations",
    "customer_leads",
    "demo_units",
    "pdi_records",
    "warranty_claims",
    "service_records"
  ];

  console.log("\n--- SUPABASE TABLE HEALTH CHECK ---");
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (error) {
      console.log(`❌ Table '${table}': NOT FOUND or ERROR (${error.code}) - ${error.message}`);
    } else {
      console.log(`✅ Table '${table}': READY (query successful)`);
    }
  }
}

testConnection();
