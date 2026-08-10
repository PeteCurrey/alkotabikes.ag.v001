/**
 * ALKOTA CYCLES — REGIONAL EMAIL COMPLIANCE & TEMPLATE ENGINE
 * lib/email-templates.ts
 *
 * Sourced sender identity, physical postal address, and consent rules per recipient region:
 * - UK (PECR / UK GDPR): Explicit opt-in required; double opt-in verification.
 * - US (CAN-SPAM Act): Opt-out lawful; MUST contain a valid PHYSICAL POSTAL ADDRESS
 *   and clear, functioning unsubscribe mechanism (honoured within 10 business days).
 *
 * BUILD / RUNTIME GATE:
 * A US recipient email template rendered without a physical postal address block fails
 * template generation immediately.
 */

import type { RegionCode } from "./regions";
import { getCompany } from "./company";

export interface EmailRecipient {
  email: string;
  name?: string;
  region: RegionCode;
}

export interface EmailRenderOptions {
  templateId: "order_confirmation" | "project01_registration" | "newsletter_welcome" | "safety_bulletin" | "partner_application_ack";
  recipient: EmailRecipient;
  data: Record<string, unknown>;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  senderEmail: string;
  senderName: string;
  physicalPostalAddress: string;
  unsubscribeUrl: string;
  recipientRegion: RegionCode;
}

/**
 * Asserts that a rendered US email template includes a valid physical postal address block.
 * Throws a build/runtime error if missing.
 */
export function assertUSEmailCompliance(rendered: RenderedEmail): void {
  if (rendered.recipientRegion === "us") {
    if (!rendered.physicalPostalAddress || rendered.physicalPostalAddress.trim() === "") {
      throw new Error(
        `CAN-SPAM COMPLIANCE FAILURE: US email template "${rendered.subject}" rendered without a physical postal address.`
      );
    }
    if (!rendered.html.includes(rendered.physicalPostalAddress) && !rendered.html.includes("US Principal Place of Business")) {
      throw new Error(
        `CAN-SPAM COMPLIANCE FAILURE: Rendered HTML for US recipient does not include the physical postal address block.`
      );
    }
    if (!rendered.html.toLowerCase().includes("unsubscribe")) {
      throw new Error(
        `CAN-SPAM COMPLIANCE FAILURE: Rendered HTML for US recipient does not include an unsubscribe mechanism.`
      );
    }
  }
}

/**
 * Renders a region-compliant email template.
 */
export function renderEmailTemplate(options: EmailRenderOptions): RenderedEmail {
  const { templateId, recipient, data } = options;
  const region = recipient.region;
  const company = getCompany(region);

  const senderEmail = company.email.customerService ?? "support@alkotacycles.com";
  const senderName = company.tradingName;

  // Resolve physical postal address for email footer
  let physicalPostalAddress = "";
  if (region === "uk") {
    physicalPostalAddress = "registeredOffice" in company && company.registeredOffice
      ? company.registeredOffice
      : "Alkota Cycles UK Registered Office (Pending)";
  } else {
    physicalPostalAddress = "principalPlaceOfBusiness" in company
      ? company.principalPlaceOfBusiness
      : "PLACEHOLDER — US Principal Place of Business";
  }

  const unsubscribeUrl = `${company.websiteUrl}/unsubscribe?email=${encodeURIComponent(recipient.email)}`;

  let subject = "";
  let bodyHtml = "";

  switch (templateId) {
    case "order_confirmation":
      subject = `Order Confirmation — ${data.orderRef ?? "Alkota Cycles"}`;
      bodyHtml = `
        <h1>Thank you for your order</h1>
        <p>Order Reference: <strong>${data.orderRef ?? "N/A"}</strong></p>
        <p>Item: ${data.itemName ?? "Alkota Product"}</p>
      `;
      break;
    case "project01_registration":
      subject = `Project 01 Development Register Confirmation`;
      bodyHtml = `
        <h1>Welcome to Project 01 Development Register</h1>
        <p>Registration Ref: <strong>${data.registrationRef ?? "R00-PENDING"}</strong></p>
        <p>Thank you for expressing interest in the Project 01 mountain bike development programme.</p>
      `;
      break;
    case "newsletter_welcome":
      subject = `Field Notes — Welcome to Alkota Engineering Updates`;
      bodyHtml = `
        <h1>Welcome to Field Notes</h1>
        <p>You are now subscribed to engineering logs, test reports, and trail updates from Alkota Cycles.</p>
      `;
      break;
    case "safety_bulletin":
      subject = `CRITICAL PRODUCT SAFETY BULLETIN — ${data.bulletinId ?? "NOTICE"}`;
      bodyHtml = `
        <h1>Mandatory Product Safety Bulletin</h1>
        <p>Important safety information regarding your Alkota chassis / components.</p>
      `;
      break;
    case "partner_application_ack":
      subject = `Alkota Partner Network Application Acknowledgement — ${data.applicationRef ?? "APN"}`;
      bodyHtml = `
        <h1>Alkota Partner Network Application Received</h1>
        <p>Dear ${data.contactName ?? "Partner Candidate"},</p>
        <p>Thank you for submitting an application to join the Alkota Partner Network on behalf of <strong>${data.shopName ?? "your shop"}</strong>.</p>
        <p>Application Reference: <strong>${data.applicationRef ?? "APN-PENDING"}</strong></p>
        <div style="padding: 15px; background: #f4f4f4; border-left: 3px solid #000; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">DECISION SLA NOTICE</p>
          <p style="margin: 5px 0 0 0;">Our commercial team reviews every application against our APN-01..04 selection criteria. You will receive a formal response regarding your application status within <strong>10 working days</strong>.</p>
        </div>
        <p>If you have any urgent questions in the interim, please contact our legal and partner team at ${company.email.legal ?? "legal@alkotacycles.com"}.</p>
      `;
      break;
  }

  // Build Footer
  const footerHtml = `
    <hr style="margin-top: 30px; border: none; border-top: 1px solid #eaeaea;" />
    <div style="font-family: monospace; font-size: 11px; color: #666; margin-top: 15px;">
      <p style="margin: 0 0 5px 0;"><strong>${senderName}</strong></p>
      <p style="margin: 0 0 5px 0;">Physical Postal Address: ${physicalPostalAddress}</p>
      <p style="margin: 0 0 5px 0;">Region: ${region.toUpperCase()}</p>
      <p style="margin: 10px 0 0 0;">
        <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">Unsubscribe / Email Preferences</a>
      </p>
    </div>
  `;

  const footerText = `
---
${senderName}
Physical Postal Address: ${physicalPostalAddress}
Region: ${region.toUpperCase()}
Unsubscribe: ${unsubscribeUrl}
  `;

  const html = `<!DOCTYPE html><html><body>${bodyHtml}${footerHtml}</body></html>`;
  const text = `${subject}\n\nPhysical Address: ${physicalPostalAddress}\n\nUnsubscribe: ${unsubscribeUrl}`;

  const result: RenderedEmail = {
    subject,
    html,
    text,
    senderEmail,
    senderName,
    physicalPostalAddress,
    unsubscribeUrl,
    recipientRegion: region,
  };

  assertUSEmailCompliance(result);

  return result;
}
