/**
 * Build Guard: Admin Layout Isolation Check
 * Verifies that src/app/admin/ files do not import public marketing layout components,
 * public site providers, or animation libraries like GSAP or Lenis.
 */

import fs from "fs";
import path from "path";

const ADMIN_DIR = path.join(process.cwd(), "src", "app", "admin");

const FORBIDDEN_PATTERNS = [
  { pattern: /@\/components\/layout\/Header/, description: "Public Header component" },
  { pattern: /@\/components\/layout\/Footer/, description: "Public Footer component" },
  { pattern: /@\/components\/legal\/CookieConsentManager/, description: "Public Cookie Consent Manager" },
  { pattern: /@\/components\/store\/CartDrawer/, description: "Public Cart Drawer" },
  { pattern: /@\/lib\/store\/cartContext/, description: "Public Cart Provider" },
  { pattern: /@\/components\/analytics\/UtmCapture/, description: "Public UTM Capture component" },
  { pattern: /@\/components\/schema\/OrganizationSchema/, description: "Public Organization Schema" },
  { pattern: /@\/components\/layout\/MegaMenuNav/, description: "Public Mega Menu Navigation" },
  { pattern: /@\/components\/region\/RegionSwitcher/, description: "Public Region Switcher" },
  { pattern: /@\/components\/region\/RegionBanner/, description: "Public Region Banner" },
  { pattern: /import.*['"]gsap['"]/, description: "GSAP animation library" },
  { pattern: /import.*['"]lenis['"]/, description: "Lenis smooth scroll library" },
  { pattern: /import.*['"]@studio-freight\/lenis['"]/, description: "Lenis smooth scroll library" },
];

function scanDirectory(dir: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(scanDirectory(fullPath));
    } else if (entry.isFile() && /\.(tsx|ts|js|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function runCheck() {
  console.log("==========================================");
  console.log("RUNNING BUILD GUARD: ADMIN ISOLATION CHECK");
  console.log("==========================================");

  if (!fs.existsSync(ADMIN_DIR)) {
    console.error(`ERROR: Admin directory not found at ${ADMIN_DIR}`);
    process.exit(1);
  }

  const files = scanDirectory(ADMIN_DIR);
  let violationCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, lineIndex) => {
      for (const forbidden of FORBIDDEN_PATTERNS) {
        if (forbidden.pattern.test(line)) {
          console.error(
            `[VIOLATION] ${relativePath}:${lineIndex + 1} - Found forbidden import: ${forbidden.description}`
          );
          console.error(`  Line ${lineIndex + 1}: ${line.trim()}`);
          violationCount++;
        }
      }
    });
  }

  if (violationCount > 0) {
    console.error(
      `\nFAILED: Found ${violationCount} admin layout isolation violation(s).`
    );
    console.error("Admin interface must not import public marketing layout elements or heavy public animation libraries.");
    process.exit(1);
  }

  console.log(`✓ Passed isolation check across ${files.length} admin file(s).`);
  console.log("✓ SUCCESS: Admin interface (src/app/admin) is completely isolated from public site components.");
  console.log("==========================================\n");
}

runCheck();
