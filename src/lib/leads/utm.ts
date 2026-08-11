/**
 * ALKOTA CYCLES — UTM PARAMETER CAPTURE ENGINE
 * src/lib/leads/utm.ts
 *
 * Captures utm_* search params into a first-party cookie (30-day expiry, SameSite=Lax).
 * First-touch attribution is preserved for utm_source if already set.
 */

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

const UTM_COOKIE_NAME = "alkota-utm";

export function captureUtmOnLanding(): void {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmTerm = urlParams.get("utm_term");
  const utmContent = urlParams.get("utm_content");

  // Read existing cookie if any
  let existing: UtmData = {};
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${UTM_COOKIE_NAME}=`));
    if (match) {
      existing = JSON.parse(decodeURIComponent(match.split("=")[1]));
    }
  } catch {}

  const hasNewUtm = utmSource || utmMedium || utmCampaign || utmTerm || utmContent;

  if (hasNewUtm) {
    const updated: UtmData = {
      // First-touch attribution for source
      utm_source: existing.utm_source || utmSource || undefined,
      utm_medium: utmMedium || existing.utm_medium || undefined,
      utm_campaign: utmCampaign || existing.utm_campaign || undefined,
      utm_term: utmTerm || existing.utm_term || undefined,
      utm_content: utmContent || existing.utm_content || undefined,
      referrer: document.referrer || existing.referrer || undefined,
    };

    const cookieValue = encodeURIComponent(JSON.stringify(updated));
    const maxAge = 30 * 24 * 60 * 60; // 30 days
    document.cookie = `${UTM_COOKIE_NAME}=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
}

export function readUtmFromCookieString(cookieHeader?: string | null): UtmData {
  if (!cookieHeader) return {};
  try {
    const match = cookieHeader
      .split("; ")
      .find((row) => row.startsWith(`${UTM_COOKIE_NAME}=`));
    if (match) {
      return JSON.parse(decodeURIComponent(match.split("=")[1]));
    }
  } catch {}
  return {};
}
