"use client";

import { Card, PageHead } from "@/components/ui";
import { useOS } from "@/lib/store";

const LABEL = { "to-read": "To read", reading: "Reading", done: "Read" } as const;

export default function Research() {
  const os = useOS();
  return (
    <>
      <PageHead kicker="Workspace · Research library" title={<>Reading, <em>sorted.</em></>} lede="Articles, reports and books in progress. Save anything worth keeping to the Second Brain." />
      <div className="grid g-3" style={{ alignItems: "start" }}>
        {(["to-read", "reading", "done"] as const).map((status) => (
          <Card key={status} title={LABEL[status]} meta={`${os.research.filter((r) => r.status === status).length}`}>
            <ul className="list">
              {os.research.filter((r) => r.status === status).map((r) => (
                <li key={r.id} className="stack" style={{ gap: 8 }}>
                  <span>{r.title}</span>
                  <div className="row between wrap">
                    <span className="tag">{r.source}</span>
                    <span className="row" style={{ gap: 6 }}>
                      {status !== "done" && <button className="btn small" onClick={() => os.advanceResearch(r.id)}>{status === "to-read" ? "Start" : "Finish"}</button>}
                      {r.noteId ? <span className="tag signal">→ Brain</span> : <button className="btn small" onClick={() => os.saveResearchToBrain(r.id)}>Save to brain</button>}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
