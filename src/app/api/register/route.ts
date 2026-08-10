import { NextResponse } from "next/server";
import { saveRegistration, attachBuildToRegistration, getBuildByReference } from "@/lib/db/services";
import { renderEmailTemplate } from "@/lib/email-templates";
import { PARTNER_LEADS_ENABLED } from "@/lib/featureFlags";
import { resolvePartnerForLead } from "@/lib/partner/catchment";
import type { RegionCode } from "@/lib/regions";

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
      latitude,
      longitude,
      region,
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

    let buildData = null;
    if (savedBuildReference && result.reference) {
      await attachBuildToRegistration(savedBuildReference, result.reference);
      buildData = await getBuildByReference(savedBuildReference);
    }

    // Render region-compliant confirmation email
    const recipientRegion: RegionCode = (region || "uk").toLowerCase() === "us" ? "us" : "uk";
    const renderedEmail = renderEmailTemplate({
      templateId: "project01_registration",
      recipient: {
        email: email.toLowerCase().trim(),
        name: fullName,
        region: recipientRegion,
      },
      data: {
        registrationRef: result.reference,
        savedBuildRef: savedBuildReference || null,
        buildSummary: buildData
          ? `Size ${buildData.frame_size}, ${buildData.wheel_format}, Finish: ${buildData.finish}`
          : null,
      },
    });

    // Task 3: Partner catchment routing — strictly gated by PARTNER_LEADS_ENABLED flag
    if (PARTNER_LEADS_ENABLED && latitude && longitude) {
      try {
        await resolvePartnerForLead(result.reference, Number(latitude), Number(longitude));
      } catch (err) {
        console.error("Partner routing resolution error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      reference: result.reference,
      foundingNumber: result.foundingNumber,
      persisted: result.persisted,
      emailSubject: renderedEmail.subject,
      record: {
        registrationReference: result.reference,
        foundingNumber: result.foundingNumber,
        firstName,
        email,
        savedBuildReference: savedBuildReference || null,
        createdAt: new Date().toISOString(),
        status: "REGISTERED",
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to process registration";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
