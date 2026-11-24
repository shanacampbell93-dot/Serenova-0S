import { Sidebar } from "@/components/Sidebar";
import { StoreProvider } from "@/lib/store";
import { isDemoMode } from "@/lib/config";

export const dynamic = "force-dynamic";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  const demo = isDemoMode();
  return (
    <StoreProvider>
      <div className="shell">
        <Sidebar demo={demo} />
        <main className="main">{children}</main>
      </div>
    </StoreProvider>
  );
}
