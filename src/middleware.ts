import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDIO_COOKIE = "alkota-studio-session";
const REGION_COOKIE = "alkota-region";

const ROLE_RESTRICTED_ROUTES: Record<string, string[]> = {
  "/studio/commercial": ["ALKOTA_COMMERCIAL", "ALKOTA_OWNER", "ALKOTA_ADMIN"],
  "/studio/production": ["ALKOTA_ENGINEERING", "ALKOTA_OWNER", "ALKOTA_ADMIN"],
  "/studio/project-01": ["ALKOTA_ENGINEERING", "ALKOTA_EDITOR", "ALKOTA_OWNER", "ALKOTA_ADMIN"],
  "/studio/partners": ["ALKOTA_COMMERCIAL", "ALKOTA_SUPPORT", "ALKOTA_OWNER", "ALKOTA_ADMIN"],
};

function parseSession(value: string): { valid: boolean; role: string } {
  try {
    const decoded = atob(value);
    const parts = decoded.split(":");
    if (parts[0] !== "alkota" || parts.length < 2) return { valid: false, role: "" };
    return { valid: true, role: parts[1] || "" };
  } catch {
    return { valid: false, role: "" };
  }
}

/**
 * Detect user region based on:
 * 1. alkota-region cookie
 * 2. x-vercel-ip-country header
 * 3. Default fallback ('us')
 */
function detectRegion(request: NextRequest): "uk" | "us" {
  const cookieRegion = request.cookies.get(REGION_COOKIE)?.value?.toLowerCase();
  if (cookieRegion === "uk" || cookieRegion === "us") {
    return cookieRegion as "uk" | "us";
  }

  const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
  if (country === "GB") return "uk";
  if (country === "US") return "us";

  return "us";
}

/**
 * Map legacy paths directly to regional targets in ONE hop (no chains)
 */
function mapLegacyPath(pathname: string, search: string): string {
  if (pathname === "/dealers") return `/partners`;
  if (pathname === "/dealers/find") return `/partners/find`;
  if (pathname === "/bikes") return `/bikes/project-01`;
  if (pathname === "/support" || pathname.startsWith("/support/")) {
    if (pathname === "/support/warranty") return `/warranty`;
    return `/ownership`;
  }
  if (pathname === "/journal/project-01") return `/journal?tag=project-01`;
  if (pathname === "/racing/dispatch") return `/journal?tag=racing`;

  return pathname + search;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isProductionHost = host === "alkotacycles.com" || host === "www.alkotacycles.com";

  // Bypass non-regional internal assets / endpoints
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/og-") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/brand") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    /\.(?:jpg|jpeg|png|webp|gif|svg|ico|avif)$/i.test(pathname)
  ) {
    const res = NextResponse.next();
    if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Handle Studio Auth Routes
  if (pathname.startsWith("/studio")) {
    if (pathname === "/studio/login" || pathname.startsWith("/api/studio/")) {
      const res = NextResponse.next();
      if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }

    const session = request.cookies.get(STUDIO_COOKIE);
    if (!session?.value) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const res = NextResponse.redirect(loginUrl);
      if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }

    const { valid, role } = parseSession(session.value);
    if (!valid) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(STUDIO_COOKIE);
      if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }

    let denied = false;
    for (const [route, allowedRoles] of Object.entries(ROLE_RESTRICTED_ROUTES)) {
      if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
        const res = NextResponse.redirect(new URL("/studio", request.url));
        res.headers.set("X-Alkota-Denied", "INSUFFICIENT_ROLE");
        if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    }

    const headers = new Headers(request.headers);
    headers.set("x-alkota-studio-role", role);
    const res = NextResponse.next({ request: { headers } });
    if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Region Routing Engine
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // 1. Explicit locale prefix (/uk/... or /us/...) -> ALWAYS serve directly, never redirect
  if (firstSegment === "uk" || firstSegment === "us") {
    const res = NextResponse.next();
    if (!isProductionHost) res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // 2. Unprefixed bare route or legacy route -> 302 Redirect to locale-prefixed target (ONE hop)
  const targetRegion = detectRegion(request);
  const mappedSubPath = mapLegacyPath(pathname, search);
  
  const targetUrl = new URL(`/${targetRegion}${mappedSubPath === "/" ? "" : mappedSubPath}`, request.url);
  
  // Create 302 Redirect
  const response = NextResponse.redirect(targetUrl, 302);

  // Set anti-cache and vary headers for regional redirects
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  response.headers.set("Vary", "Cookie, x-vercel-ip-country");

  if (!isProductionHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|brand/|.*\\.(?:jpg|jpeg|png|webp|gif|svg|ico|avif)).*)",
  ],
};
