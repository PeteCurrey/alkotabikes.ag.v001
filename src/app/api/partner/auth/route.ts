/**
 * POST /api/partner/auth
 * Partner portal sign-in — reference + email.
 * Returns a session cookie on success.
 *
 * Pattern: Same as my-alkota and studio auth.
 * Production: Replace with magic-link email auth.
 */

import { NextRequest, NextResponse } from "next/server";
import { getPartnerByEmailAndRef } from "@/lib/partner/store";

export async function POST(req: NextRequest) {
  try {
    const { partnerReference, email } = await req.json();

    if (!partnerReference || !email) {
      return NextResponse.json(
        { error: "Partner reference and email are required." },
        { status: 400 }
      );
    }

    const partner = getPartnerByEmailAndRef(email.trim(), partnerReference.trim().toUpperCase());

    if (!partner) {
      return NextResponse.json(
        { error: "Partner record not found. Check your reference and email." },
        { status: 404 }
      );
    }

    if (partner.accountStatus === "SUSPENDED") {
      return NextResponse.json(
        { error: "Your partner account has been suspended. Contact Alkota." },
        { status: 403 }
      );
    }

    if (partner.accountStatus === "TERMINATED") {
      return NextResponse.json(
        { error: "Your partner account is no longer active." },
        { status: 403 }
      );
    }

    // Build session payload
    const sessionPayload = {
      partnerId: partner.id,
      partnerReference: partner.partnerReference,
      email: partner.contactEmail,
      businessName: partner.businessName,
      types: partner.types,
      accountStatus: partner.accountStatus,
      leadEligibility: partner.leadEligibility,
      allocationEligibility: partner.allocationEligibility,
      serviceAuthorised: partner.serviceAuthorised,
      warrantyAuthorised: partner.warrantyAuthorised,
      demoProgramme: partner.demoProgramme,
    };

    const sessionValue = Buffer.from(
      `alkota-partner:${JSON.stringify(sessionPayload)}`
    ).toString("base64");

    const response = NextResponse.json({ success: true, partner: sessionPayload });

    response.cookies.set("alkota-partner-session", sessionValue, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 }
    );
  }
}
