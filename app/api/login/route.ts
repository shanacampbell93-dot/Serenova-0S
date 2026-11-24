import { NextResponse } from "next/server";
import { SESSION_COOKIE, safeNext, sessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? ""));
  const expected = process.env.OS_PASSWORD;
  const base = new URL(req.url);

  if (!expected || password !== expected) {
    return NextResponse.redirect(new URL(`/login?error=1&next=${encodeURIComponent(next)}`, base), 303);
  }

  const res = NextResponse.redirect(new URL(next, base), 303);
  res.cookies.set(SESSION_COOKIE, await sessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
