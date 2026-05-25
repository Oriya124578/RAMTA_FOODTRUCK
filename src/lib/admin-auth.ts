/**
 * Lightweight admin gate.
 * MVP: a single password stored server-side. On submit, server action sets
 * an httpOnly cookie. The admin layout checks the cookie.
 *
 * Production upgrade path:
 *   1. Switch to Firebase Auth + Google sign-in.
 *   2. Maintain an "admins" collection with allowed UIDs.
 *   3. Replace the cookie check with `auth.currentUser` + custom claim.
 */

export const ADMIN_COOKIE = "ramta_admin";

export function isAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  // Constant-time comparison
  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}
