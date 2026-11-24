"use client";

import { Bar, PageHead } from "@/components/ui";
import { projectProgress, useOS } from "@/lib/store";

export default function Projects() {
  const os = useOS();
  return (
    <>
      <PageHead kicker="Projects" title="Your projects" lede="How far along each project is, worked out from its tasks in your to-do list." />
      <div className="grid g-2">
        {os.projects.map((p) => {
          const pr = projectProgress(os.tasks, p.id);
          const next = os.tasks.find((t) => t.projectId === p.id && !t.done);
          return (
            <section key={p.id} className="card stack">
              <div className="row between">
                <span className="kicker">Project</span>
                <span className={`tag ${p.status === "active" ? "signal" : ""}`}>{p.status}</span>
              </div>
              <h2 className="h2">{p.name}</h2>
              <p className="muted" style={{ margin: 0 }}>{p.summary}</p>
              <Bar pct={pr.pct} />
              <div className="row between">
                <span className="mono muted">{pr.done}/{pr.total} tasks · {pr.pct}%</span>
                {next && <span className="mono">Next: {next.title}</span>}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
