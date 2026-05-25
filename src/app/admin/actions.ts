"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

// In-memory rate limiter: 5 attempts per 15 minutes per IP.
// (For production behind multiple Vercel instances, swap to Upstash Redis or similar.)
const ATTEMPTS = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const entry = ATTEMPTS.get(ip);
  const now = Date.now();
  if (!entry || entry.resetAt < now) {
    ATTEMPTS.set(ip, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string): void {
  const entry = ATTEMPTS.get(ip) ?? { count: 0, resetAt: Date.now() + WINDOW_MS };
  entry.count += 1;
  ATTEMPTS.set(ip, entry);
}

export async function setAdminCookieAction(idToken: string) {
  const ip = await getClientIp();

  if (isRateLimited(ip)) {
    return { success: false, error: "יותר מדי ניסיונות. המתן 15 דקות." };
  }

  try {
    // Validate the ID token against Google Identity Toolkit
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return { success: false, error: "Firebase לא מוגדר בשרת." };
    }

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });

    const data = await res.json();
    if (!data.users || data.users.length === 0) {
      recordFailure(ip);
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, error: "אסימון שגוי." };
    }

    // Success — clear attempts for this IP
    ATTEMPTS.delete(ip);

    const jar = await cookies();
    jar.set(ADMIN_COOKIE, "1", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    
  } catch (err) {
    console.error(err);
    recordFailure(ip);
    return { success: false, error: "שגיאת אימות." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function notifyOrderReadyAction(customerPhone: string, customerName: string, shortId: string) {
  // Validate admin token before sending
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE);
  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  // Import the backend notification infrastructure
  const { notifyOrderReady } = await import("@/lib/notifications");
  
  try {
    await notifyOrderReady(customerPhone, customerName, shortId);
    return { success: true };
  } catch (error) {
    console.error("Failed to notify order ready via action:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
