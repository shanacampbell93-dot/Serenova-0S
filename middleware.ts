import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionToken } from "@/lib/auth";

// Protects everything under /os once OS_PASSWORD is set.
// With no password set the workspace runs in demo mode.
export async function middleware(req: NextRequest) {
  const password = process.env.OS_PASSWORD;
  if (!password) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token && token === (await sessionToken(password))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(req.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/os", "/os/:path*"] };
