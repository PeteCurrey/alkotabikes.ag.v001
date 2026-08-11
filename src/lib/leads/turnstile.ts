/**
 * ALKOTA CYCLES — CLOUDFLARE TURNSTILE SERVER-SIDE VERIFICATION
 * src/lib/leads/turnstile.ts
 */

export interface TurnstileResult {
  success: boolean;
  error?: string;
}

export async function verifyTurnstile(
  token?: string,
  remoteIp?: string
): Promise<TurnstileResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Development / fallback mode if secret key is not set
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[TURNSTILE WARNING] TURNSTILE_SECRET_KEY is missing in production.");
    }
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      error: "Security verification token is missing. Please complete the security check.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();
    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: "Security check failed. Please refresh and try again.",
    };
  } catch (err) {
    console.error("[TURNSTILE VERIFY ERROR]", err);
    return {
      success: false,
      error: "Could not verify security check. Please try again.",
    };
  }
}
