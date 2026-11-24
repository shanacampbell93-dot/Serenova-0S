"use client";

import { useState } from "react";
import { Card, PageHead, Stat } from "@/components/ui";
import { STAGES, shortDate, useOS } from "@/lib/store";

const CHANNELS = ["Newsletter", "Blog", "Substack", "Instagram", "LinkedIn", "Threads", "YouTube"];

export default function Marketing() {
  const os = useOS();
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState(CHANNELS[0]);

  const scheduled = os.content.filter((c) => c.stage === "scheduled" && c.date).sort((a, b) => (a.date! < b.date! ? -1 : 1));
  const fromBrain = os.content.filter((c) => c.noteId).length;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    os.addContent({ title: title.trim(), channel });
    setTitle("");
  };

  return (
    <>
      <PageHead
        kicker="Content plan"
        title="Your content plan"
        lede="Every post, blog and newsletter, from first idea to published. Use the arrows to move a piece along."
      />

      <div className="grid g-4" style={{ marginBottom: 18 }}>
        <Stat label="In progress" value={os.content.filter((c) => c.stage !== "published").length} />
        <Stat label="Scheduled" value={scheduled.length} />
        <Stat label="Published" value={os.content.filter((c) => c.stage === "published").length} />
        <Stat label="From Ideas" value={fromBrain} note="sent from Ideas" />
      </div>

      <form onSubmit={add} className="card row wrap" style={{ marginBottom: 18 }}>
        <input className="input" style={{ flex: 2, minWidth: 220 }} placeholder="New content idea…" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="select" style={{ flex: 1, minWidth: 140 }} value={channel} onChange={(e) => setChannel(e.target.value)}>
          {CHANNELS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="btn primary">Add idea</button>
      </form>

      <div className="kanban" style={{ marginBottom: 18 }}>
        {STAGES.map((stage, i) => {
          const items = os.content.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="column">
              <div className="row between"><span className="kicker">{stage}</span><span className="mono muted">{items.length}</span></div>
              {items.map((c) => (
                <div key={c.id} className="kcard">
                  <div style={{ fontSize: 14 }}>{c.title}</div>
                  <div className="row between wrap" style={{ marginTop: 10, gap: 8 }}>
                    <span className="row" style={{ gap: 6 }}>
                      <span className="tag">{c.channel}</span>
                      {c.noteId && <span className="tag signal" title="Came from Ideas">from Ideas</span>}
                    </span>
                    <span className="row" style={{ gap: 4 }}>
                      <button className="btn small ghost" disabled={i === 0} onClick={() => os.moveContent(c.id, -1)} aria-label="Move back">←</button>
                      <button className="btn small ghost" disabled={i === STAGES.length - 1} onClick={() => os.moveContent(c.id, 1)} aria-label="Move forward">→</button>
                    </span>
                  </div>
                  {c.date && <div className="mono muted" style={{ marginTop: 8 }}>{shortDate(c.date)}</div>}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="grid g-2">
        <Card title="Publishing calendar" meta="scheduled">
          <ul className="list">
            {scheduled.map((c) => (
              <li key={c.id} className="row between"><span>{c.title}</span><span className="row"><span className="tag">{c.channel}</span><span className="mono muted">{shortDate(c.date)}</span></span></li>
            ))}
            {!scheduled.length && <li className="muted">Nothing scheduled yet.</li>}
          </ul>
        </Card>
        <Card title="Performance" meta="coming soon">
          <p className="muted" style={{ marginTop: 0 }}>
            Once your analytics are connected, this will show how each post performed and suggest what to make next.
          </p>
        </Card>
      </div>
    </>
  );
}
