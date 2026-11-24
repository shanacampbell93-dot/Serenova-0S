import { APP_NAME } from "@/lib/config";
import { safeNext } from "@/lib/auth";

export const metadata = { title: "Sign in" };

export default function Login({ searchParams }: { searchParams: { next?: string; error?: string } }) {
  const next = safeNext(searchParams.next);
  return (
    <main className="login-wrap">
      <form className="login card" method="post" action="/api/login">
        <div className="kicker signal">Private workspace</div>
        <h1 className="h1" style={{ marginBottom: 18 }}>{APP_NAME}</h1>
        <input type="hidden" name="next" value={next} />
        <label className="kicker" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="input" style={{ marginTop: 8 }} autoFocus required />
        {searchParams.error && <p className="mono" style={{ color: "var(--warm)" }}>That password didn&apos;t match.</p>}
        <button className="btn primary" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>Enter →</button>
      </form>
    </main>
  );
}
