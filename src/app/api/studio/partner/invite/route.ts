/**
 * POST /api/studio/partner/invite
 * Studio-only. Generate credentials for a new partner.
 * Creates a PartnerOrganisation from an approved application.
 */

import { NextRequest, NextResponse } from "next/server";
import { createPartner, getApplicationById, updateApplication } from "@/lib/partner/store";
import { randomUUID } from "crypto";

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

  const body = await req.json();
  const { applicationId, types, region, territory, currency, dealerTier } = body;

  if (!applicationId) {
    return NextResponse.json({ error: "applicationId required." }, { status: 400 });
  }

  const application = getApplicationById(applicationId);
  if (!application) {
    return NextResponse.json({ error: "Application not found." }, { status: 404 });
  }

  const now = new Date().toISOString();
  const partnerId = randomUUID();

  // Generate partner reference from application reference
  const partnerReference = application.applicationReference;

  createPartner({
    id: partnerId,
    partnerReference,
    businessName: application.shopName,
    contactName: application.contactName,
    contactEmail: application.contactEmail,
    website: application.website,
    location: application.location,
    country: application.country,
    region: region ?? "EUROPE",
    specialisms: application.specialisms,
    whyAlkota: application.whyAlkota,
    types: types ?? [],
    accountStatus: "APPROVED",
    dealerTier: dealerTier ?? "TBC",
    territory: territory ?? null,
    currency: currency ?? "GBP",
    dealerCostProfile: null,
    demoProgramme: false,
    allocationEligibility: false,
    leadEligibility: false,
    serviceAuthorised: false,
    warrantyAuthorised: false,
    paymentTerms: null,
    taxReference: null,
    internalNotes: null,
    appliedAt: application.submittedAt,
    approvedAt: now,
    activatedAt: null,
    updatedAt: now,
  });

  updateApplication(applicationId, {
    status: "APPROVED",
    reviewedAt: now,
  });

  return NextResponse.json({
    success: true,
    partnerId,
    partnerReference,
  });
}
