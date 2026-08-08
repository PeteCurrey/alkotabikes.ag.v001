/**
 * GET /api/partner/profile
 * Returns the authenticated partner's own organisation profile.
 * Never returns another dealer's data.
 */

import { NextRequest, NextResponse } from "next/server";
import { getPartnerById } from "@/lib/partner/store";

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

  const partner = getPartnerById(session.partnerId);
  if (!partner) return NextResponse.json({ error: "Partner not found." }, { status: 404 });

  // Strip internal-only fields before returning to portal
  const { internalNotes: _notes, ...publicPartnerData } = partner;
  return NextResponse.json({ partner: publicPartnerData });
}
