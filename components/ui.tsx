import type { Priority } from "@/lib/types";

export function PageHead({ kicker, title, lede, aside }: { kicker: string; title: React.ReactNode; lede?: string; aside?: React.ReactNode }) {
  return (
    <header className="page-head">
      <div>
        <div className="kicker signal">{kicker}</div>
        <h1 className="h1">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {aside}
    </header>
  );
}

export function Card({ title, meta, children, className = "" }: { title?: string; meta?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`card ${className}`}>
      {(title || meta) && (
        <div className="card-head">
          {title && <h2 className="h2">{title}</h2>}
          {meta && <span className="kicker">{meta}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="card">
      <div className="kicker">{label}</div>
      <div className="num" style={{ marginTop: 12 }}>{value}</div>
      {note && <div className="mono muted" style={{ marginTop: 8 }}>{note}</div>}
    </div>
  );
}

export function PriorityTag({ p }: { p: Priority }) {
  const cls = p === "high" ? "warm" : p === "med" ? "cool" : "";
  return <span className={`tag ${cls}`}>{p === "med" ? "medium" : p}</span>;
}

export function Bar({ pct }: { pct: number }) {
  return <div className="bar"><span style={{ width: `${pct}%` }} /></div>;
}

export function Check({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" className={`check ${on ? "on" : ""}`} onClick={onClick} aria-pressed={on} aria-label={label}>
      {on && <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden><path d="M2 6.5 5 9.5 10 3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
    </button>
  );
}
