/**
 * POST /api/partner/leads/[id]/accept
 * Dealer accepts a lead (assigns to their active queue).
 * Requires leadEligibility: true in session.
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead } from "@/lib/partner/store";

function getPartnerSession(req: NextRequest) {
  const cookie = req.cookies.get("alkota-partner-session");
  if (!cookie) return null;
  try {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf-8");
    return JSON.parse(decoded.replace("alkota-partner:", ""));
  } catch {
    return null;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!session.leadEligibility) {
    return NextResponse.json(
      { error: "Lead eligibility not enabled for your account." },
      { status: 403 }
    );
  }

  const lead = getLeadById(id);
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  if (lead.assignedDealerId !== session.partnerId) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 403 });
  }
  if (lead.status !== "NEW") {
    return NextResponse.json({ error: "Lead already actioned." }, { status: 409 });
  }

  const updated = updateLead(id, {
    status: "ACCEPTED",
    assignedAt: new Date().toISOString(),
  });
  return NextResponse.json({ lead: updated });
}
