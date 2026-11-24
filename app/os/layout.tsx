import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { StoreProvider } from "@/lib/store";
import { OWNER, isDemoMode } from "@/lib/config";

export const dynamic = "force-dynamic";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  const demo = isDemoMode();
  return (
    <StoreProvider>
      <div className="shell">
        <Sidebar demo={demo} />
        <main className="main">
          {demo && (
            <div className="explainer">
              <span>
                <strong>This is a live demo of Serenova OS</strong>, a workspace app built by {OWNER}. Everything here is
                example content. Try typing an idea into the quick note box, then open Ideas.
              </span>
              <Link href="/" className="btn small">Back to Shana&apos;s portfolio</Link>
            </div>
          )}
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}
