import { NextResponse } from "next/server";
import { saveRegistration } from "@/lib/db/services";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      country,
      ridingStyle,
      frameIntent,
      savedBuildReference,
      marketingConsent,
      developmentAcknowledgement,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Required fields check
    if (!firstName || !email || !country || !developmentAcknowledgement) {
      return NextResponse.json(
        { error: "Missing required fields or pre-production acknowledgement" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();

    const result = await saveRegistration({
      fullName,
      email,
      country,
      ridingDiscipline: ridingStyle,
      frameIntent,
      savedBuildReference,
      consentMarketing: Boolean(marketingConsent),
      utmSource,
      utmMedium,
      utmCampaign,
    });

    return NextResponse.json({
      success: true,
      reference: result.reference,
      foundingNumber: result.foundingNumber,
      persisted: result.persisted,
      record: {
        registrationReference: result.reference,
        foundingNumber: result.foundingNumber,
        firstName,
        email,
        createdAt: new Date().toISOString(),
        status: "REGISTERED",
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to process registration";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
