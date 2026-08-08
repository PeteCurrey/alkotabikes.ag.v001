/**
 * PATCH /api/partner/leads/[id]/update
 * Update lead status and notes for the authenticated dealer.
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeadById, updateLead } from "@/lib/partner/store";
import type { LeadStatus } from "@/lib/partner/leadTypes";

const VALID_STATUSES: LeadStatus[] = [
  "ACCEPTED", "CONTACTED", "APPOINTMENT", "DEMO", "RESERVATION", "CONVERTED", "LOST",
];

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const lead = getLeadById(id);
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  if (lead.assignedDealerId !== session.partnerId) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 403 });
  }

  const { status } = await req.json();
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = updateLead(id, { status });
  return NextResponse.json({ lead: updated });
}
