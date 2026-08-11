/**
 * ALKOTA CYCLES — EMAIL TRANSPORT ADAPTER
 * src/lib/email/transport.ts
 */

import { renderEmailTemplate } from "@/lib/email-templates";
import type { EmailRenderOptions, RenderedEmail } from "@/lib/email-templates";

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  rendered: RenderedEmail;
  error?: string;
}

export async function sendEmail(options: EmailRenderOptions): Promise<SendEmailResult> {
  const rendered = renderEmailTemplate(options);
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Log to console in development / mock mode
    console.log("[EMAIL TRANSPORT MOCK SENT]", {
      to: options.recipient.email,
      subject: rendered.subject,
      templateId: options.templateId,
    });
    return {
      success: true,
      messageId: `mock_${Date.now()}`,
      rendered,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${rendered.senderName} <${rendered.senderEmail}>`,
        to: [options.recipient.email],
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        headers: {
          "List-Unsubscribe": `<${rendered.unsubscribeUrl}>`,
        },
      }),
    });

    const data = await res.json();
    if (res.ok && data.id) {
      return {
        success: true,
        messageId: data.id,
        rendered,
      };
    }

    return {
      success: false,
      rendered,
      error: data.message || "Failed to deliver email via provider",
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Email transport error";
    console.error("[EMAIL TRANSPORT ERROR]", errorMessage);
    return {
      success: false,
      rendered,
      error: errorMessage,
    };
  }
}
