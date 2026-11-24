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
                <strong>You&apos;re looking at a live demo.</strong> This is the workspace {OWNER} built to run her work.
                The information is made up, so click around and try adding an idea. Changes only save in your browser.
              </span>
              <Link href="/#hire" className="btn small">Work with {OWNER.split(" ")[0]}</Link>
            </div>
          )}
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}
