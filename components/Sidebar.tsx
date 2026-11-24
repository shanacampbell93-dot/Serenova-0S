"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, VERSION } from "@/lib/config";

const SYSTEMS = [
  { href: "/os", n: "00", label: "Command Centre" },
  { href: "/os/brain", n: "01", label: "Second Brain" },
  { href: "/os/assistant", n: "02", label: "Executive Assistant" },
  { href: "/os/marketing", n: "03", label: "Marketing Agent" },
];
const WORKSPACE = [
  { href: "/os/projects", n: "·", label: "Projects" },
  { href: "/os/research", n: "·", label: "Research library" },
  { href: "/os/finances", n: "·", label: "Finances" },
  { href: "/os/settings", n: "·", label: "Settings" },
];

export function Sidebar({ demo }: { demo: boolean }) {
  const path = usePathname();
  const [first, ...rest] = APP_NAME.split(" ");
  const link = (l: { href: string; n: string; label: string }) => (
    <Link key={l.href} href={l.href} className={`nav-link ${path === l.href ? "active" : ""}`}>
      <span className="nav-num">{l.n}</span>
      <span>{l.label}</span>
    </Link>
  );

  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-name">{first} <em>{rest.join(" ")}</em></span>
        <span className="kicker">{VERSION} · Workspace</span>
      </Link>
      <nav className="nav-group"><span className="kicker">Systems</span>{SYSTEMS.map(link)}</nav>
      <nav className="nav-group"><span className="kicker">Workspace</span>{WORKSPACE.map(link)}</nav>
      <div className="sidebar-foot">
        <span className="mono muted"><span className="pulse" />All systems online</span>
        {demo ? (
          <span className="mono muted">Demo mode · sample data</span>
        ) : (
          <form action="/api/logout" method="post"><button className="btn ghost small">Sign out</button></form>
        )}
      </div>
    </aside>
  );
}
