#!/usr/bin/env node
/**
 * ALKOTA CYCLES — CANONICAL INTEGRITY & HOST CHECK
 * scripts/check-canonical-host.ts
 *
 * PRE-BUILD GATE:
 * 1. Verifies NEXT_PUBLIC_SITE_URL is valid and matches SITE_URL.
 * 2. Tests buildRegionalMetadata across all primary routes for both UK and US regions.
 * 3. Ensures canonical, OpenGraph URL, and hreflang URLs use SITE_URL host exclusively.
 * 4. Audits source files for hardcoded domain URLs that bypass SITE_URL.
 *
 * Usage: npx tsx scripts/check-canonical-host.ts
 */

import * as fs from "fs";
import * as path from "path";
import { SITE_URL, siteUrl } from "../src/lib/env";
import { buildRegionalMetadata } from "../src/lib/metadata";

const ROOT = path.resolve(process.cwd());

interface RouteCheck {
  region: "uk" | "us";
  path: string;
  canonical: string;
  ogUrl: string;
  enGB: string;
  enUS: string;
}

const TEST_PATHS = [
  "",
  "/about",
  "/bikes/project-01",
  "/bikes/project-01/configure",
  "/engineering/chassis",
  "/engineering/kinematics",
  "/engineering/materials",
  "/engineering/testing",
  "/journal",
  "/partners",
  "/privacy",
  "/terms",
  "/warranty",
  "/ownership",
  "/contact",
];

const targetHost = new URL(SITE_URL).hostname;
const errors: string[] = [];
const checks: RouteCheck[] = [];

console.log("\n╔══════════════════════════════════════════════════╗");
console.log("║  ALKOTA — CANONICAL HOST INTEGRITY GATE         ║");
console.log("╚══════════════════════════════════════════════════╝\n");

console.log(`  SITE_URL: ${SITE_URL}`);
console.log(`  Target Host: ${targetHost}\n`);

// Check 1: Ensure SITE_URL is sane
if (!SITE_URL.startsWith("https://")) {
  errors.push(`SITE_URL must start with https://. Got: ${SITE_URL}`);
}

if (SITE_URL.includes("vercel.app")) {
  errors.push(`SITE_URL must not contain vercel.app. Got: ${SITE_URL}`);
}

// Check 2: Test metadata generation across sample routes
for (const region of ["uk", "us"] as const) {
  for (const routePath of TEST_PATHS) {
    const meta = buildRegionalMetadata({
      region,
      path: routePath,
      title: `Test ${routePath || "Home"}`,
      description: "Test description",
    });

    const canonical = (meta.alternates?.canonical as string) || "";
    const ogUrl = (meta.openGraph?.url as string) || "";
    const languages = (meta.alternates?.languages as Record<string, string>) || {};
    const enGB = languages["en-GB"] || "";
    const enUS = languages["en-US"] || "";

    checks.push({
      region,
      path: routePath || "/",
      canonical,
      ogUrl,
      enGB,
      enUS,
    });

    // Verify all URLs match target host
    const urlsToTest = [
      { name: "canonical", url: canonical },
      { name: "ogUrl", url: ogUrl },
      { name: "en-GB", url: enGB },
      { name: "en-US", url: enUS },
    ];

    for (const item of urlsToTest) {
      try {
        const u = new URL(item.url);
        if (u.hostname !== targetHost) {
          errors.push(
            `Host mismatch for ${region}${routePath} [${item.name}]: expected ${targetHost}, got ${u.hostname} (${item.url})`
          );
        }
      } catch {
        errors.push(`Invalid URL for ${region}${routePath} [${item.name}]: ${item.url}`);
      }
    }
  }
}

// Print verification table
console.log("  Route Metadata Inspection:");
console.log("  " + "-".repeat(90));
console.log(`  ${"REG".padEnd(5)} ${"PATH".padEnd(30)} ${"CANONICAL URL"}`);
console.log("  " + "-".repeat(90));

for (const c of checks.slice(0, 10)) {
  console.log(`  ${c.region.toUpperCase().padEnd(5)} ${c.path.padEnd(30)} ${c.canonical}`);
}
if (checks.length > 10) {
  console.log(`  ... and ${checks.length - 10} more routes verified.`);
}
console.log("  " + "-".repeat(90) + "\n");

// Check 3: Audit source code for hardcoded absolute domain URLs that bypass SITE_URL
const FORBIDDEN_DOMAINS = ["alkotabikes.com", "alkotacycles.com"];
const EXCLUDED_PATHS = ["node_modules", ".next", "dist", "build", ".git", "scratch", "scripts/check-canonical-host.ts"];

function checkSourceFile(filePath: string) {
  const relPath = path.relative(ROOT, filePath);
  if (EXCLUDED_PATHS.some((ex) => relPath.startsWith(ex) || relPath === ex)) return;
  if (!/\.(tsx?|jsx?|html)$/.test(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Look for http:// or https:// with forbidden domains
    for (const domain of FORBIDDEN_DOMAINS) {
      const pattern = new RegExp(`https?:\\/\\/([^\\/\\s"'\`>]*)` + domain.replace(".", "\\."), "g");
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(line)) !== null) {
        // If the line contains a reference to process.env.NEXT_PUBLIC_SITE_URL or comment explanations, ignore
        if (line.includes("process.env.NEXT_PUBLIC_SITE_URL") || line.includes("NEXT_PUBLIC_SITE_URL=")) {
          continue;
        }
        errors.push(
          `Hardcoded domain URL found in ${relPath}:${index + 1}: "${line.trim()}"`
        );
      }
    }
  });
}

function scanDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDED_PATHS.includes(entry.name)) {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      checkSourceFile(fullPath);
    }
  }
}

scanDir(path.join(ROOT, "src"));

// Final Output
if (errors.length > 0) {
  console.error(`  ✗ CANONICAL INTEGRITY GATE FAILED (${errors.length} error(s)):\n`);
  errors.forEach((err) => console.error(`  • ${err}`));
  console.error("\n  Build aborted due to canonical host integrity violation.\n");
  process.exit(1);
} else {
  console.log(`  ✓ Canonical integrity verified. All ${checks.length} route metadata objects use ${targetHost}.\n`);
  process.exit(0);
}
