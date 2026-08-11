import { cookies } from "next/headers";

export const ADMIN_COOKIE = "alkota-admin-session";

export function createAdminSessionToken(role: string = "owner"): string {
  return `alkota-admin:${role}:${Date.now()}`;
}

export function isValidAdminToken(value: string | undefined): boolean {
  if (!value) return false;
  if (value.startsWith("alkota-admin:")) return true;
  try {
    const decoded = atob(value);
    return decoded.startsWith("alkota-admin:");
  } catch {
    return false;
  }
}

export async function verifyAdminAuth(): Promise<boolean> {
  const reqCookies = await cookies();
  const session = reqCookies.get(ADMIN_COOKIE)?.value;
  return isValidAdminToken(session);
}
