"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MAIN = [
  { href: "/os", n: "🏠", label: "Home" },
  { href: "/os/brain", n: "💡", label: "Ideas" },
  { href: "/os/assistant", n: "✅", label: "To-do" },
  { href: "/os/marketing", n: "📣", label: "Content plan" },
];
const MORE = [
  { href: "/os/projects", n: "📁", label: "Projects" },
  { href: "/os/research", n: "📚", label: "Reading list" },
  { href: "/os/finances", n: "💷", label: "Money" },
  { href: "/os/settings", n: "⚙️", label: "Settings" },
];

export function Sidebar({ demo }: { demo: boolean }) {
  const path = usePathname();
  const link = (l: { href: string; n: string; label: string }) => (
    <Link key={l.href} href={l.href} className={`nav-link ${path === l.href ? "active" : ""}`}>
      <span className="nav-num" aria-hidden>{l.n}</span>
      <span>{l.label}</span>
    </Link>
  );

  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-name">Serenova <em>OS</em></span>
        <span className="muted" style={{ fontSize: 12 }}>My workspace</span>
      </Link>
      <nav className="nav-group">{MAIN.map(link)}</nav>
      <nav className="nav-group"><span className="kicker">More</span>{MORE.map(link)}</nav>
      <div className="sidebar-foot">
        <Link href="/" className="muted">← About Serenova OS</Link>
        {demo ? (
          <span className="muted"><span className="pulse" />Demo · sample data</span>
        ) : (
          <form action="/api/logout" method="post"><button className="btn ghost small">Sign out</button></form>
        )}
      </div>
    </aside>
  );
}
