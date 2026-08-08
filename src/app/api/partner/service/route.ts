/**
 * GET /api/partner/service
 * Returns service records for bikes in the authenticated dealer's scope.
 *
 * POST /api/partner/service
 * Create a service record for a customer's bike.
 * Requires the bike to be associated with this dealer or customer to have
 * presented with owner authorisation. No unrestricted serial browsing.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServiceRecordsByDealerId, createServiceRecord } from "@/lib/partner/store";
import { generateServiceReference } from "@/lib/partner/referenceGenerator";
import { randomUUID } from "crypto";

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
  if (!session.serviceAuthorised) {
    return NextResponse.json({ error: "Service authorisation required." }, { status: 403 });
  }

  const records = getServiceRecordsByDealerId(session.partnerId);
  return NextResponse.json({ records });
}

export async function POST(req: NextRequest) {
  const session = getPartnerSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!session.serviceAuthorised) {
    return NextResponse.json({ error: "Service authorisation required." }, { status: 403 });
  }

  const body = await req.json();
  const { customerId, bikeSerial, allocationId, serviceType, description } = body;

  if (!customerId || !serviceType || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  createServiceRecord({
    id: randomUUID(),
    serviceReference: generateServiceReference(),
    customerId,
    bikeSerial: bikeSerial ?? null,
    allocationId: allocationId ?? null,
    dealerId: session.partnerId,
    serviceType,
    description,
    partsUsed: body.partsUsed ?? null,
    technicianNotes: body.technicianNotes ?? null,
    servicedAt: new Date().toISOString(),
    nextServiceDue: body.nextServiceDue ?? null,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
