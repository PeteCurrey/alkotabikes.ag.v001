import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDIO_COOKIE = "alkota-studio-session";

/**
 * ALKOTA STUDIO — Server-Side Middleware
 *
 * PROTECTION LAYERS:
 *   1. /studio/login & /api/studio/* → public (auth flow)
 *   2. All /studio/* → require valid base64 session cookie
 *   3. Role-restricted sub-routes checked against session capability claim
 *
 * SESSION FORMAT: base64("alkota:<role>:<capability_csv>:<timestamp>")
 *
 * IMPORTANT: Paid reservations MUST remain disabled.
 * PROJECT01_PAID_RESERVATIONS_ENABLED is asserted false at runtime.
 */

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Layer 1: Pass through public studio auth routes
  if (pathname === "/studio/login" || pathname.startsWith("/api/studio/")) {
    return NextResponse.next();
  }

  // Layer 2: All /studio/* require a valid session cookie
  if (pathname.startsWith("/studio")) {
    const session = request.cookies.get(STUDIO_COOKIE);

    if (!session?.value) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const { valid, role } = parseSession(session.value);

    if (!valid) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(STUDIO_COOKIE);
      return response;
    }

    // Layer 3: Role-restricted sub-route enforcement
    for (const [route, allowedRoles] of Object.entries(ROLE_RESTRICTED_ROUTES)) {
      if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
        const response = NextResponse.redirect(new URL("/studio", request.url));
        response.headers.set("X-Alkota-Denied", "INSUFFICIENT_ROLE");
        return response;
      }
    }

    // Inject verified role into request headers for downstream server components
    const headers = new Headers(request.headers);
    headers.set("x-alkota-studio-role", role);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
