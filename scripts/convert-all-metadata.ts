import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(process.cwd());
const REGION_APP_DIR = path.join(ROOT, "src", "app", "[region]");

function getCleanPathFromFilePath(filePath: string): string {
  const rel = path.relative(REGION_APP_DIR, filePath);
  let dir = path.dirname(rel);
  if (dir === ".") return "";
  return `/${dir}`;
}

function processPageFile(filePath: string): void {
  const relPath = path.relative(ROOT, filePath);
  let content = fs.readFileSync(filePath, "utf8");
  const cleanPath = getCleanPathFromFilePath(filePath);

  // Extract title and description from existing metadata if present
  let title = "";
  let description = "";
  let ogImage = "";

  // Title match
  const titleMatch = /title:\s*(?:isUS\s*\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']|["']([^"']+)["'])/.exec(content);
  if (titleMatch) {
    title = titleMatch[3] || titleMatch[1] || titleMatch[2] || "";
  }

  // Description match
  const descMatch = /description:\s*(?:isUS\s*\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']|["']([^"']+)["'])/.exec(content);
  if (descMatch) {
    description = descMatch[3] || descMatch[1] || descMatch[2] || "";
  }

  if (!title) {
    // Derive a clean fallback title from path name if missing
    if (cleanPath === "") title = "Alkota Cycles — Performance Engineering";
    else {
      const segs = cleanPath.split("/").filter(Boolean);
      const last = segs[segs.length - 1];
      title = last.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  if (!description) {
    description = "Alkota Cycles performance engineering mountain bikes built as complete integrated systems.";
  }

  // Remove existing static metadata object export (multiline string stripping)
  content = content.replace(/export\s+const\s+metadata(?::\s*Metadata)?\s*=\s*\{[\s\S]*?\n\};\n?/g, "\n");

  // Remove existing generateMetadata function implementation if any
  content = content.replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}\n?/g, "\n");

  // Remove unused siteUrl imports or Metadata imports if redundant
  content = content.replace(/import\s+siteUrl\b.*?;?\n?/g, "");
  content = content.replace(/import\s+\{\s*siteUrl\s*\}\s+from\s+["']@\/lib\/env["'];?\n?/g, "");

  // Ensure required imports exist
  if (!content.includes("buildRegionalMetadata")) {
    content = `import { buildRegionalMetadata } from "@/lib/metadata";\nimport type { RegionCode } from "@/lib/regions";\n` + content;
  }
  if (!content.includes("Metadata")) {
    content = `import { Metadata } from "next";\n` + content;
  }

  // Construct new generateMetadata function body
  let generateMetadataFn = "";

  if (cleanPath.includes("[")) {
    if (cleanPath.includes("[slug]")) {
      const baseRoute = cleanPath.replace("/[slug]", "");
      generateMetadataFn = `
export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; slug?: string }>;
}): Promise<Metadata> {
  const { region, slug } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const pageSlug = slug ?? "";
  const displayTitle = pageSlug ? \`${title} — \${pageSlug.replace(/-/g, " ").toUpperCase()}\` : "${title}";
  return buildRegionalMetadata({
    region: regionCode,
    path: \`${baseRoute}/\${pageSlug}\`,
    title: displayTitle,
    description: "${description.replace(/"/g, '\\"')}",
  });
}
`;
    } else if (cleanPath.includes("[artifact]")) {
      const baseRoute = cleanPath.replace("/[artifact]", "");
      generateMetadataFn = `
export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string; artifact?: string }>;
}): Promise<Metadata> {
  const { region, artifact } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  const art = artifact ?? "";
  return buildRegionalMetadata({
    region: regionCode,
    path: \`${baseRoute}/\${art}\`,
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
  });
}
`;
    }
  } else {
    generateMetadataFn = `
export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region } = await params;
  const regionCode = (region === "uk" ? "uk" : "us") as RegionCode;
  return buildRegionalMetadata({
    region: regionCode,
    path: "${cleanPath}",
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
  });
}
`;
  }

  // Place generateMetadata before default export or at top of file
  if (content.includes("export default")) {
    content = content.replace("export default", `${generateMetadataFn}\nexport default`);
  } else {
    content += `\n${generateMetadataFn}`;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Converted: ${relPath} -> path: "${cleanPath}"`);
}

function scanAndConvert(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanAndConvert(fullPath);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      processPageFile(fullPath);
    }
  }
}

scanAndConvert(REGION_APP_DIR);
console.log("Migration script complete.");
