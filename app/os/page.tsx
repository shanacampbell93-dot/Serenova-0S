"use client";

import Link from "next/link";
import { useState } from "react";
import { Bar, Card, Check, PageHead, PriorityTag, Stat } from "@/components/ui";
import { STAGES, projectProgress, shortDate, useOS } from "@/lib/store";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

export default function CommandCentre() {
  const os = useOS();
  const [capture, setCapture] = useState("");

  const open = os.tasks.filter((t) => !t.done);
  const priorities = [...open].sort((a, b) => ["high", "med", "low"].indexOf(a.priority) - ["high", "med", "low"].indexOf(b.priority)).slice(0, 5);
  const pipeline = os.content.filter((c) => c.stage !== "published").length;
  const active = os.projects.filter((p) => p.status === "active");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capture.trim()) return;
    os.addNote({ title: capture.trim(), body: "", tags: ["inbox"] });
    setCapture("");
  };

  return (
    <>
      <PageHead
        kicker="Home"
        title={<span suppressHydrationWarning>{greeting()}, Shana</span>}
        lede="Today’s priorities, active projects and content plan, in one place."
        aside={<span className="mono muted" suppressHydrationWarning>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>}
      />

      <form onSubmit={submit} className="card accent row wrap" style={{ marginBottom: 18 }}>
        <span className="kicker signal" style={{ whiteSpace: "nowrap" }}>Quick note</span>
        <input className="input" style={{ flex: 1, minWidth: 200, width: "auto" }} value={capture} onChange={(e) => setCapture(e.target.value)} placeholder="Jot down an idea… it’s saved straight to Ideas" />
        <button className="btn primary">Save</button>
      </form>

      <div className="grid g-3" style={{ marginBottom: 18 }}>
        <Stat label="Open tasks" value={open.length} note={`${open.filter((t) => t.priority === "high").length} high priority`} />
        <Stat label="Ideas saved" value={os.notes.length} note="in Ideas" />
        <Stat label="Content in progress" value={pipeline} note={`${os.content.filter((c) => c.stage === "scheduled").length} scheduled`} />
      </div>

      <div className="grid g-3">
        <Card title="Today’s priorities" meta={<Link href="/os/assistant">All tasks →</Link>} className="span-2">
          <ul className="list">
            {priorities.map((t) => (
              <li key={t.id} className="row between">
                <span className="row"><Check on={t.done} onClick={() => os.toggleTask(t.id)} label={t.title} /><span>{t.title}</span></span>
                <span className="row">{t.due && <span className="mono muted">{shortDate(t.due)}</span>}<PriorityTag p={t.priority} /></span>
              </li>
            ))}
            {!priorities.length && <li className="muted">Nothing open. A rare and beautiful thing.</li>}
          </ul>
        </Card>

        <Card title="Recent activity">
          <ul className="list feed">
            {os.activity.slice(0, 6).map((a) => (
              <li key={a.id}>
                <span className="mono muted">{shortDate(a.at)}</span>
                <div>
                  <div className="flow mono"><span>{a.from}</span><span className="arrow">→</span><span>{a.to}</span></div>
                  <div style={{ fontSize: 14 }}>{a.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Active projects" meta={<Link href="/os/projects">Projects →</Link>} className="span-2">
          <div className="grid g-2">
            {active.map((p) => {
              const pr = projectProgress(os.tasks, p.id);
              return (
                <div key={p.id} className="stack" style={{ gap: 8 }}>
                  <div className="row between"><strong style={{ fontWeight: 500 }}>{p.name}</strong><span className="mono muted">{pr.pct}%</span></div>
                  <Bar pct={pr.pct} />
                  <span className="mono muted">{pr.done} of {pr.total} tasks done</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Content plan" meta={<Link href="/os/marketing">Open →</Link>}>
          <ul className="list">
            {STAGES.map((s) => (
              <li key={s} className="row between">
                <span className="kicker">{s}</span>
                <span className="num" style={{ fontSize: 24 }}>{os.content.filter((c) => c.stage === s).length}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
