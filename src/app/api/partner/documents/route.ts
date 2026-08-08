/**
 * GET /api/partner/documents
 * Returns partner document manifest filtered by the authenticated partner's types.
 * No actual file downloads — returns metadata + filePath (null until approved/uploaded).
 */

import { NextRequest, NextResponse } from "next/server";
import { PARTNER_DOCUMENT_MANIFEST } from "@/lib/partner/documentLibrary";
import type { PartnerType } from "@/lib/partner/types";

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

  const partnerTypes: PartnerType[] = session.types ?? [];

  const documents = PARTNER_DOCUMENT_MANIFEST.filter((doc) => {
    // SUPERSEDED and RETIRED docs are visible but clearly marked
    // DRAFT docs are not visible to partners
    if (doc.status === "DRAFT") return false;
    // If doc has no type restriction, all partners can see it
    if (doc.partnerTypes.length === 0) return true;
    return partnerTypes.some((t) => doc.partnerTypes.includes(t));
  });

  return NextResponse.json({ documents });
}
