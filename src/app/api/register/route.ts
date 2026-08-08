import { NextResponse } from "next/server";

// Mock / In-memory storage abstraction for development registrations
// Compatible with Supabase project01_registrations schema
const registrationsStore: Record<string, any>[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      postcode,
      heightCm,
      weightKg,
      ridingStyle,
      terrain,
      currentBike,
      currentSize,
      yearsRiding,
      preferredFinish,
      expectedSize,
      productInterest,
      purchaseIntent,
      region,
      customerNotes,
      developmentAcknowledgement,
      marketingConsent,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Required fields check
    if (!firstName || !lastName || !email || !country || !developmentAcknowledgement) {
      return NextResponse.json(
        { error: "Missing required fields or pre-production acknowledgement" },
        { status: 400 }
      );
    }

    // Generate non-commercial registration reference number
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const registrationReference = `P01-REG-${randomDigits}`;

    const registrationRecord = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      registration_reference: registrationReference,
      created_at: new Date().toISOString(),
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      country,
      postcode: postcode || null,
      height_cm: heightCm || null,
      weight_kg: weightKg || null,
      riding_style: ridingStyle || null,
      terrain: terrain || null,
      current_bike: currentBike || null,
      current_size: currentSize || null,
      years_riding: yearsRiding || null,
      preferred_finish: preferredFinish || "Undecided",
      expected_size: expectedSize || "Unsure",
      product_interest: productInterest || "Undecided",
      purchase_intent: purchaseIntent || "Following the development",
      region: region || country,
      customer_notes: customerNotes || null,
      development_acknowledgement: Boolean(developmentAcknowledgement),
      marketing_consent: Boolean(marketingConsent),
      status: "REGISTERED",
      source: "web_register",
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
    };

    registrationsStore.push(registrationRecord);

    return NextResponse.json({
      success: true,
      reference: registrationReference,
      record: {
        registrationReference,
        firstName,
        email,
        createdAt: registrationRecord.created_at,
        status: registrationRecord.status,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save registration" }, { status: 500 });
  }
}
