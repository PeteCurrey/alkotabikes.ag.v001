import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDIO_COOKIE = "alkota-studio-session";

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
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isProductionHost = host === "alkotacycles.com" || host === "www.alkotacycles.com";

  // Default pass-through; branches below override as needed
  let response: NextResponse = NextResponse.next();

  // Layer 1: Pass through public studio auth routes
  if (pathname === "/studio/login" || pathname.startsWith("/api/studio/")) {
    response = NextResponse.next();
  } else if (pathname.startsWith("/studio")) {
    // Layer 2: All /studio/* require a valid session cookie
    const session = request.cookies.get(STUDIO_COOKIE);

    if (!session?.value) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      response = NextResponse.redirect(loginUrl);
    } else {
      const { valid, role } = parseSession(session.value);

      if (!valid) {
        const loginUrl = new URL("/studio/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        response = NextResponse.redirect(loginUrl);
        response.cookies.delete(STUDIO_COOKIE);
      } else {
        // Layer 3: Role-restricted sub-route enforcement
        let denied = false;
        for (const [route, allowedRoles] of Object.entries(ROLE_RESTRICTED_ROUTES)) {
          if (pathname.startsWith(route) && !allowedRoles.includes(role)) {
            response = NextResponse.redirect(new URL("/studio", request.url));
            response.headers.set("X-Alkota-Denied", "INSUFFICIENT_ROLE");
            denied = true;
            break;
          }
        }

        if (!denied) {
          const headers = new Headers(request.headers);
          headers.set("x-alkota-studio-role", role);
          response = NextResponse.next({ request: { headers } });
        }
      }
    }
  } else {
    response = NextResponse.next();
  }

  // TASK 2: NOINDEX BACKSTOP
  // If host is not production, set X-Robots-Tag: noindex, nofollow
  if (!isProductionHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
