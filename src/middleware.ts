import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDIO_COOKIE = "alkota-studio-session";

/**
 * ALKOTA STUDIO — Middleware
 *
 * Protects all /studio/* routes server-side.
 * Any request to /studio/* without a valid session cookie
 * is redirected to /studio/login.
 *
 * /studio/login and /api/studio/* are public (necessary for auth flow).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API through
  if (
    pathname === "/studio/login" ||
    pathname.startsWith("/api/studio/")
  ) {
    return NextResponse.next();
  }

  // Protect all /studio/* routes
  if (pathname.startsWith("/studio")) {
    const session = request.cookies.get(STUDIO_COOKIE);

    if (!session?.value) {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Additional validation: session must be non-empty and base64 parseable
    try {
      const decoded = atob(session.value);
      if (!decoded.startsWith("alkota:")) {
        throw new Error("Invalid session format");
      }
    } catch {
      const loginUrl = new URL("/studio/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(STUDIO_COOKIE);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
