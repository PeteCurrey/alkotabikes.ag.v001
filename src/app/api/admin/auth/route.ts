import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth/adminAuth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || process.env.STUDIO_DEV_PASSWORD || "alkota2028admin";

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { status: 401 }
      );
    }

    const sessionValue = btoa(`alkota-admin:owner:${Date.now()}`);
    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_COOKIE, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Auth error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
