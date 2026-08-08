/**
 * GET /api/partner/demo
 * Returns demo units allocated to the authenticated dealer ONLY.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDemoUnitsByDealerId } from "@/lib/partner/store";

function getPartnerSession(req: NextRequest) {
  const cookie = req.cookies.get("alkota-partner-session");
  if (!cookie) return null;
  try {
    return JSON.parse(
      Buffer.from(cookie.value, "base64").toString("utf-8").replace("alkota-partner:", "")
    );
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  if (!session.demoProgramme) {
    return NextResponse.json(
      { error: "Demo programme not active for your account." },
      { status: 403 }
    );
  }

  const units = getDemoUnitsByDealerId(session.partnerId);
  return NextResponse.json({ units });
}
