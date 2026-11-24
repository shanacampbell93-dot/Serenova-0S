// Works in both the Edge runtime (middleware) and Node (route handlers).
export const SESSION_COOKIE = "os_session";

export async function sessionToken(password: string): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "serenova-os-default-secret";
  const data = new TextEncoder().encode(`${password}:${secret}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function safeNext(path: string | null | undefined): string {
  if (path && path.startsWith("/os") && !path.startsWith("//")) return path;
  return "/os";
}
