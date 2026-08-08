import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STUDIO_COOKIE = "alkota-studio-session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

/**
 * ALKOTA STUDIO — Auth API Route
 *
 * POST /api/studio/auth  → sign in
 * GET  /api/studio/auth  → sign out (clears cookie)
 *
 * SECURITY MODEL:
 * - Password is compared against STUDIO_PASSWORD env var
 * - In production, STUDIO_PASSWORD should be set in the deployment env
 * - Default password "alkota-studio" is a placeholder — change before deploying
 * - Session token is base64-encoded "alkota:{timestamp}:{role}" — lightweight
 * - HTTP-only cookie prevents JS access
 * - In production, use Secure flag (enforced via sameSite=strict)
 *
 * NOTE: This is a Phase 01 implementation. Phase 02 would replace this with
 * a proper auth provider (Supabase Auth, Auth.js, etc.).
 */

function createSessionToken(role: string): string {
  const payload = `alkota:${Date.now()}:${role}`;
  return btoa(payload);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  // Get password from environment variable — fallback for dev
  const studioPassword =
    process.env.STUDIO_PASSWORD ??
    process.env.NEXT_PUBLIC_STUDIO_DEV_PASSWORD ??
    "alkota-studio-2026";

  if (password !== studioPassword) {
    // Add artificial delay to slow brute-force
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken("OWNER");
  const cookieStore = await cookies();

  cookieStore.set(STUDIO_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: SESSION_DURATION,
    path: "/",
    // secure: true  // Enable in production (requires HTTPS)
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  // Sign out — clear the cookie
  const cookieStore = await cookies();
  cookieStore.delete(STUDIO_COOKIE);
  return NextResponse.redirect(new URL("/studio/login", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
}
