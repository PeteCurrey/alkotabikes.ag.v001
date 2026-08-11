import { cookies } from "next/headers";

export const ADMIN_COOKIE = "alkota-admin-session";

export async function verifyAdminAuth(): Promise<boolean> {
  const reqCookies = await cookies();
  const session = reqCookies.get(ADMIN_COOKIE)?.value;
  if (!session) return false;
  return session.startsWith("alkota-admin:");
}
