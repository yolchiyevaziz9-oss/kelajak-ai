// Sodda admin auth — bitta parol va imzolangan cookie.
// Production'da: env ADMIN_PASSWORD va ADMIN_SECRET o'rnatiladi.

import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "kelajak_admin";
const COOKIE_DAYS = 7;

function getSecret(): string {
  return process.env.ADMIN_SECRET || "dev-only-secret-change-me-in-production";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

// Cookie: base64(payload).signature
function makeToken(): string {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + COOKIE_DAYS * 24 * 3600 * 1000 });
  const b64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${b64}.${sign(b64)}`;
}

function verifyToken(token: string): boolean {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  if (sign(b64) !== sig) return false;
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf8"));
    return payload.admin === true && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    // Dev rejim: agar parol o'rnatilmagan bo'lsa, "admin" parolini qabul qilamiz
    return input === "admin";
  }
  // Doimiy vaqt taqqoslash (timing-safe)
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_DAYS * 24 * 3600,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
