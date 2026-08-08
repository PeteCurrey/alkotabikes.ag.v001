/**
 * GET /api/partner/leads
 * Returns leads assigned to the authenticated dealer ONLY.
 * CONSENT PRINCIPLE: customerName and customerEmail are only returned
 * when lead.consentGiven === true.
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeadsByDealerId } from "@/lib/partner/store";
import type { CustomerLead } from "@/lib/partner/leadTypes";

function getPartnerSession(req: NextRequest) {
  const cookie = req.cookies.get("alkota-partner-session");
  if (!cookie) return null;
  try {
    const decoded = Buffer.from(cookie.value, "base64").toString("utf-8");
    const payload = decoded.replace("alkota-partner:", "");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

/** Strip PII from leads where consent has not been given */
function sanitiseLead(lead: CustomerLead) {
  if (lead.consentGiven) return lead;
  return {
    ...lead,
    customerName: null,
    customerEmail: null,
    customerPhone: null,
    // Location is non-identifying (city/region) — safe to return
  };
}

export async function GET(req: NextRequest) {
  const session = getPartnerSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const leads = getLeadsByDealerId(session.partnerId);
  return NextResponse.json({ leads: leads.map(sanitiseLead) });
}
