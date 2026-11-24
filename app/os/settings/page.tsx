"use client";

import { Card, PageHead } from "@/components/ui";
import { useOS } from "@/lib/store";

const INTEGRATIONS = [
  { name: "GitHub", role: "Source code and version history", status: "connected" },
  { name: "Vercel", role: "Hosting and deployment", status: "connected" },
  { name: "Supabase", role: "Database, login and file storage", status: "phase 2" },
  { name: "AI API", role: "Powers the four specialist agents", status: "phase 2" },
  { name: "Analytics", role: "Channel performance for the Marketing Agent", status: "later" },
];

export default function Settings() {
  const os = useOS();
  return (
    <>
      <PageHead kicker="Workspace · Settings" title={<>Integrations and <em>preferences.</em></>} />
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
            In V1 your changes are saved in this browser only. Reset to bring back the sample data, for example before a demo.
          </p>
          <button className="btn" onClick={() => os.reset()}>Reset to sample data</button>
        </Card>
      </div>
    </>
  );
}
