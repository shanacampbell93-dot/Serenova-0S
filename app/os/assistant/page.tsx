"use client";

import { useState } from "react";
import { Card, Check, PageHead, PriorityTag } from "@/components/ui";
import { shortDate, useOS } from "@/lib/store";
import type { Priority } from "@/lib/types";

const DOCS = [
  { name: "Project brief", use: "Scope, goals, audience and deadline for any new project" },
  { name: "Client proposal", use: "Problem, approach, timeline and price" },
  { name: "Weekly review", use: "Wins, blockers, next week’s three priorities" },
  { name: "Decision record", use: "What was decided, why, and what it replaces" },
];

export default function Assistant() {
  const os = useOS();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("med");
  const [projectId, setProjectId] = useState("");
  const [filter, setFilter] = useState<"open" | "done" | "all">("open");

  const list = os.tasks.filter((t) => (filter === "all" ? true : filter === "done" ? t.done : !t.done));
  const projectName = (id?: string) => os.projects.find((p) => p.id === id)?.name;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    os.addTask({ title: title.trim(), priority, projectId: projectId || undefined });
    setTitle("");
  };

  return (
    <>
      <PageHead
        kicker="To-do"
        title="Your to-do list"
        lede="Every task in one place. Ideas you turn into tasks arrive here automatically."
      />

      <form onSubmit={add} className="card row wrap" style={{ marginBottom: 18 }}>
        <input className="input" style={{ flex: 2, minWidth: 220 }} placeholder="Add a task…" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="select" style={{ flex: 1, minWidth: 120 }} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="high">High</option><option value="med">Medium</option><option value="low">Low</option>
        </select>
        <select className="select" style={{ flex: 1, minWidth: 160 }} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">No project</option>
          {os.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button className="btn primary">Add</button>
      </form>

      <div className="grid g-3" style={{ alignItems: "start" }}>
        <Card title="Tasks" meta={
          <span className="row">
            {(["open", "done", "all"] as const).map((f) => (
              <button key={f} className={`tag ${filter === f ? "signal" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </span>
        } className="span-2">
          <ul className="list">
            {list.map((t) => (
              <li key={t.id} className="row between">
                <span className="row" style={{ minWidth: 0 }}>
                  <Check on={t.done} onClick={() => os.toggleTask(t.id)} label={t.title} />
                  <span className="stack" style={{ gap: 2 }}>
                    <span className={t.done ? "done-text" : ""}>{t.title}</span>
                    <span className="mono muted">
                      {projectName(t.projectId) ?? "Unassigned"}
                      {t.noteId && " · from Ideas"}
                    </span>
                  </span>
                </span>
                <span className="row">{t.due && <span className="mono muted">{shortDate(t.due)}</span>}<PriorityTag p={t.priority} /></span>
              </li>
            ))}
            {!list.length && <li className="muted">Nothing here.</li>}
          </ul>
        </Card>

        <div className="stack">
          <Card title="Decisions made" meta={`${os.decisions.length}`}>
            <ul className="list">
              {os.decisions.map((d) => (
                <li key={d.id}>
                  <div className="row between"><strong style={{ fontWeight: 500 }}>{d.title}</strong><span className="mono muted">{shortDate(d.date)}</span></div>
                  <div className="muted" style={{ fontSize: 14 }}>{d.outcome}</div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Document templates" meta="coming soon">
            <ul className="list">
              {DOCS.map((d) => (
                <li key={d.name}><div>{d.name}</div><div className="muted" style={{ fontSize: 13 }}>{d.use}</div></li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
