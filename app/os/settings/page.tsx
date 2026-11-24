"use client";

import { Card, PageHead } from "@/components/ui";
import { useOS } from "@/lib/store";

const INTEGRATIONS = [
  { name: "GitHub", role: "Source code and version history", status: "connected" },
  { name: "Vercel", role: "Hosting and deployment", status: "connected" },
  { name: "Supabase", role: "Database, login and file storage", status: "phase 2" },
  { name: "AI API", role: "Adds smart suggestions and drafting", status: "phase 2" },
  { name: "Analytics", role: "Post performance for the content plan", status: "later" },
];

export default function Settings() {
  const os = useOS();
  return (
    <>
      <PageHead kicker="Settings" title="Settings" />
      <div className="grid g-3" style={{ alignItems: "start" }}>
        <Card title="Integrations" className="span-2">
          <ul className="list">
            {INTEGRATIONS.map((i) => (
              <li key={i.name} className="row between">
                <span className="stack" style={{ gap: 2 }}><span>{i.name}</span><span className="muted" style={{ fontSize: 13 }}>{i.role}</span></span>
                <span className={`tag ${i.status === "connected" ? "signal" : ""}`}>{i.status}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Data">
          <p className="muted" style={{ marginTop: 0 }}>
            Changes are saved in this browser only. Reset to bring back the example content.
          </p>
          <button className="btn" onClick={() => os.reset()}>Reset example content</button>
        </Card>
      </div>
    </>
  );
}
