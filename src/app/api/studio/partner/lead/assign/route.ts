/**
 * POST /api/studio/partner/lead/assign
 * Studio-only. Assign a customer lead to a specific dealer.
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead, getPartnerById } from "@/lib/partner/store";

function getStudioSession(req: NextRequest) {
  const cookie = req.cookies.get("alkota-studio-session");
  if (!cookie) return null;
  try {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf-8");
    return decoded.startsWith("alkota:") ? { valid: true } : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const session = getStudioSession(req);
  if (!session) return NextResponse.json({ error: "Studio access required." }, { status: 401 });

  const { leadId, dealerId } = await req.json();
  if (!leadId || !dealerId) {
    return NextResponse.json({ error: "leadId and dealerId required." }, { status: 400 });
  }

  const lead = getLeadById(leadId);
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  const dealer = getPartnerById(dealerId);
  if (!dealer) return NextResponse.json({ error: "Dealer not found." }, { status: 404 });
  if (!dealer.leadEligibility) {
    return NextResponse.json(
      { error: "Dealer does not have lead eligibility enabled." },
      { status: 409 }
    );
  }

  const updated = updateLead(leadId, {
    assignedDealerId: dealerId,
    assignedAt: new Date().toISOString(),
    status: lead.status === "NEW" ? "NEW" : lead.status,
  });

  return NextResponse.json({ lead: updated });
}
