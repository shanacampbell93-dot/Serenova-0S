"use client";

import Link from "next/link";
import { useState } from "react";
import { Bar, Card, Check, PageHead, PriorityTag, Stat } from "@/components/ui";
import { STAGES, gbp, projectProgress, shortDate, useOS } from "@/lib/store";

export default function CommandCentre() {
  const os = useOS();
  const [capture, setCapture] = useState("");

  const open = os.tasks.filter((t) => !t.done);
  const priorities = [...open].sort((a, b) => ["high", "med", "low"].indexOf(a.priority) - ["high", "med", "low"].indexOf(b.priority)).slice(0, 5);
  const pipeline = os.content.filter((c) => c.stage !== "published").length;
  const net = os.txns.reduce((s, t) => s + t.amount, 0);
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
        kicker="00 · Command Centre"
        title={<>Everything in <em>motion</em>, in one place.</>}
        lede="What you are building, researching and prioritising right now, across all four systems."
        aside={<span className="mono muted" suppressHydrationWarning>{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>}
      />

      <form onSubmit={submit} className="card accent row wrap" style={{ marginBottom: 18 }}>
        <span className="kicker signal" style={{ whiteSpace: "nowrap" }}>Quick capture</span>
        <input className="input" style={{ flex: 1, minWidth: 200, width: "auto" }} value={capture} onChange={(e) => setCapture(e.target.value)} placeholder="An idea, a link, a thought… it goes straight to your Second Brain" />
        <button className="btn primary">Save</button>
      </form>

      <div className="grid g-4" style={{ marginBottom: 18 }}>
        <Stat label="Open tasks" value={open.length} note={`${open.filter((t) => t.priority === "high").length} high priority`} />
        <Stat label="In the brain" value={os.notes.length} note="notes and ideas" />
        <Stat label="Content pipeline" value={pipeline} note={`${os.content.filter((c) => c.stage === "scheduled").length} scheduled`} />
        <Stat label="Net this month" value={gbp(net)} note="sample figures" />
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

        <Card title="System activity" meta="live">
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
                  <span className="mono muted">{pr.done}/{pr.total} tasks · {p.system}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Pipeline" meta={<Link href="/os/marketing">Marketing →</Link>}>
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
