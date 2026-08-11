"use server";

import { z } from "zod";
import * as crypto from "crypto";
import { headers, cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/db/supabaseAdmin";
import { checkRateLimit } from "@/lib/leads/ratelimit";
import { verifyTurnstile } from "@/lib/leads/turnstile";
import { readUtmFromCookieString } from "@/lib/leads/utm";
import { sendEmail } from "@/lib/email/transport";
import { SITE_URL } from "@/lib/env";

export type LeadType =
  | "newsletter"
  | "waitlist"
  | "dealer_enquiry"
  | "press"
  | "general_contact"
  | "warranty"
  | "preorder_interest";

export interface LeadInput {
  email: string;
  full_name?: string;
  phone?: string;
  lead_type: LeadType;
  message?: string;
  marketing_consent?: boolean;
  consent_text?: string;
  source_page?: string;
  locale?: string;
  country_code?: string;
  metadata?: Record<string, unknown>;
  _hp?: string; // Honeypot
  _t?: number;  // Render timestamp (ms)
  turnstile_token?: string;
}

export interface LeadResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  requiresConfirmation?: boolean;
  leadId?: string;
}

const LeadInputSchema = z.object({
  email: z.string().email("Please provide a valid email address").transform((val) => val.toLowerCase().trim()),
  full_name: z.string().optional().transform((val) => val?.trim() || undefined),
  phone: z.string().optional().transform((val) => val?.trim() || undefined),
  lead_type: z.enum([
    "newsletter",
    "waitlist",
    "dealer_enquiry",
    "press",
    "general_contact",
    "warranty",
    "preorder_interest",
  ]),
  message: z.string().optional().transform((val) => val?.trim() || undefined),
  marketing_consent: z.boolean().default(false),
  consent_text: z.string().optional(),
  source_page: z.string().optional(),
  locale: z.string().optional(),
  country_code: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  _hp: z.string().optional(),
  _t: z.number().optional(),
  turnstile_token: z.string().optional(),
});

export async function captureLead(rawInput: LeadInput): Promise<LeadResult> {
  try {
    const reqHeaders = await headers();
    const reqCookies = await cookies();

    // 1. Honeypot check
    if (rawInput._hp && rawInput._hp.trim() !== "") {
      console.warn("[BOT DETECTED — HONEYPOT]", { email: rawInput.email });
      return { success: true }; // Fake success
    }

    // 2. Time-to-submit check (< 2000ms = bot)
    if (rawInput._t && Date.now() - rawInput._t < 2000) {
      console.warn("[BOT DETECTED — SUBMIT TOO FAST]", { elapsed: Date.now() - rawInput._t });
      return { success: true }; // Fake success
    }

    // 3. Turnstile check
    const clientIp = reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const turnstileRes = await verifyTurnstile(rawInput.turnstile_token, clientIp);
    if (!turnstileRes.success) {
      return {
        success: false,
        error: turnstileRes.error || "Security check failed. Please refresh and try again.",
      };
    }

    // Hash IP address
    const salt = process.env.IP_HASH_SALT || "alkota_ip_salt_2028";
    const ipHash = crypto.createHash("sha256").update(`${clientIp}:${salt}`).digest("hex");

    // 4. Rate limit check (Fail CLOSED)
    const rateLimitRes = await checkRateLimit(ipHash, rawInput.email || "anon");
    if (!rateLimitRes.allowed) {
      return {
        success: false,
        error: rateLimitRes.reason || "Too many submissions. Please wait before trying again.",
      };
    }

    // 5. Zod validation
    const parseResult = LeadInputSchema.safeParse(rawInput);
    if (!parseResult.success) {
      const flattened = parseResult.error.flatten().fieldErrors;
      return {
        success: false,
        error: "Please check your information and try again.",
        fieldErrors: flattened as Record<string, string[]>,
      };
    }

    const data = parseResult.data;

    // 6. Consent gate validation for newsletter/waitlist
    const isMarketingType = data.lead_type === "newsletter" || data.lead_type === "waitlist";
    if (isMarketingType && !data.marketing_consent) {
      return {
        success: false,
        error: "Marketing consent is required to subscribe to updates.",
        fieldErrors: { marketing_consent: ["Consent checkbox must be selected."] },
      };
    }

    // Extract UTM parameters from cookie
    const utmCookie = reqCookies.get("alkota-utm")?.value;
    const utmData = readUtmFromCookieString(utmCookie ? `alkota-utm=${utmCookie}` : null);

    // Extract geolocation & locale context
    const countryCode = data.country_code || reqHeaders.get("x-vercel-ip-country") || "GB";
    const userLocale = data.locale || (countryCode.toUpperCase() === "US" ? "en-US" : "en-GB");
    const refererHeader = reqHeaders.get("referer") || undefined;

    // Consent timestamp calculation
    const now = new Date().toISOString();
    const consentAt = data.marketing_consent ? now : null;
    const consentText = data.marketing_consent ? data.consent_text || "Explicit marketing consent provided" : null;

    // Check for existing lead to preserve earliest consent timestamp
    const { data: existingLead } = await supabaseAdmin
      .from("leads")
      .select("id, consent_at, marketing_consent, double_optin_at, status")
      .eq("email", data.email)
      .eq("lead_type", data.lead_type)
      .maybeSingle();

    const finalConsentAt = existingLead?.consent_at || consentAt;
    const finalMarketingConsent = existingLead?.marketing_consent || data.marketing_consent;

    // Single-use double opt-in token for marketing leads
    const requiresDoubleOptIn = isMarketingType && !existingLead?.double_optin_at;
    const optinToken = requiresDoubleOptIn ? crypto.randomUUID() : undefined;
    const optinExpiresAt = requiresDoubleOptIn
      ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      : undefined;

    // Determine status
    let status = existingLead?.status || "new";
    if (status === "unsubscribed" || status === "bounced") {
      status = "new"; // Reset status on fresh resubmission
    }

    // 7. UPSERT on (email, lead_type)
    const { data: upsertedLead, error: dbErr } = await supabaseAdmin
      .from("leads")
      .upsert(
        {
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          lead_type: data.lead_type,
          status,
          source_page: data.source_page,
          utm_source: utmData.utm_source,
          utm_medium: utmData.utm_medium,
          utm_campaign: utmData.utm_campaign,
          utm_term: utmData.utm_term,
          utm_content: utmData.utm_content,
          referrer: refererHeader || utmData.referrer,
          locale: userLocale,
          country_code: countryCode,
          message: data.message,
          marketing_consent: finalMarketingConsent,
          consent_text: consentText,
          consent_at: finalConsentAt,
          consent_ip_hash: ipHash,
          optin_token: optinToken,
          optin_token_expires_at: optinExpiresAt,
          metadata: data.metadata || {},
          updated_at: now,
        },
        { onConflict: "email,lead_type" }
      )
      .select("id")
      .single();

    if (dbErr || !upsertedLead) {
      console.error("[LEAD CAPTURE DB ERROR]", dbErr);
      return {
        success: false,
        error: "Unable to process your request at this time. Please try again.",
      };
    }

    // 8. Insert lead_event
    await supabaseAdmin.from("lead_events").insert({
      lead_id: upsertedLead.id,
      event_type: "form_submitted",
      payload: {
        lead_type: data.lead_type,
        source_page: data.source_page,
        upserted: Boolean(existingLead),
      },
    });

    // 9. Send Double Opt-in or Transactional Email
    const siteBaseUrl = SITE_URL;

    if (requiresDoubleOptIn && optinToken) {
      const confirmUrl = `${siteBaseUrl}/api/leads/confirm?token=${optinToken}`;
      sendEmail({
        templateId: "newsletter_welcome",
        recipient: {
          email: data.email,
          name: data.full_name,
          region: userLocale.toLowerCase().includes("us") ? "us" : "uk",
        },
        data: {
          confirmUrl,
          leadType: data.lead_type,
        },
      }).catch((err) => console.error("[OPTIN EMAIL ERROR]", err));
    } else {
      sendEmail({
        templateId: "project01_registration",
        recipient: {
          email: data.email,
          name: data.full_name,
          region: userLocale.toLowerCase().includes("us") ? "us" : "uk",
        },
        data: {
          registrationRef: `LEAD-${upsertedLead.id.slice(0, 8).toUpperCase()}`,
        },
      }).catch((err) => console.error("[TRANSACTIONAL EMAIL ERROR]", err));
    }

    // 10. Fire notification email to Ops address (non-blocking)
    const opsEmail = process.env.OPS_NOTIFICATION_EMAIL;
    if (opsEmail) {
      sendEmail({
        templateId: "partner_application_ack",
        recipient: {
          email: opsEmail,
          name: "Alkota Ops Team",
          region: "uk",
        },
        data: {
          contactName: data.full_name || data.email,
          shopName: `New Lead: ${data.lead_type.toUpperCase()}`,
          applicationRef: upsertedLead.id,
        },
      }).catch((err) => console.error("[OPS NOTIFICATION ERROR]", err));
    }

    return {
      success: true,
      requiresConfirmation: requiresDoubleOptIn,
      leadId: upsertedLead.id,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[CAPTURE LEAD SYSTEM ERROR]", errorMessage);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
