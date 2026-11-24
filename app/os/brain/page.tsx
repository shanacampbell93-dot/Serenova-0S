"use client";

import { useMemo, useState } from "react";
import { Card, PageHead } from "@/components/ui";
import { shortDate, useOS } from "@/lib/store";

export default function SecondBrain() {
  const os = useOS();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const allTags = useMemo(() => Array.from(new Set(os.notes.flatMap((n) => n.tags))).sort(), [os.notes]);
  const results = os.notes.filter((n) => {
    const hay = `${n.title} ${n.body} ${n.tags.join(" ")}`.toLowerCase();
    return (!q || hay.includes(q.toLowerCase())) && (!tag || n.tags.includes(tag));
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    os.addNote({ title: title.trim(), body: body.trim(), tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean) });
    setTitle(""); setBody(""); setTags("");
  };

  return (
    <>
      <PageHead
        kicker="Ideas"
        title="Your ideas"
        lede="Write ideas down as they come. With one click, turn any idea into a to-do list or add it to your content plan."
      />

      <div className="grid g-3" style={{ alignItems: "start" }}>
        <div className="stack span-2">
          <div className="row wrap">
            <input className="input" style={{ flex: 1, minWidth: 220 }} placeholder="Search notes, tags, ideas…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="row wrap">
            <button className={`tag ${tag === null ? "signal" : ""}`} onClick={() => setTag(null)}>all</button>
            {allTags.map((t) => (
              <button key={t} className={`tag ${tag === t ? "signal" : ""}`} onClick={() => setTag(tag === t ? null : t)}>#{t}</button>
            ))}
          </div>

          {results.map((n) => (
            <article key={n.id} className="card">
              <div className="row between" style={{ alignItems: "flex-start" }}>
                <h2 className="h2">{n.title}</h2>
                <span className="mono muted">{shortDate(n.createdAt)}</span>
              </div>
              {n.body && <p className="muted" style={{ margin: "8px 0 0" }}>{n.body}</p>}
              <div className="row between wrap" style={{ marginTop: 14 }}>
                <div className="row wrap">{n.tags.map((t) => <span key={t} className="tag">#{t}</span>)}</div>
                <div className="row wrap">
                  {n.contentId
                    ? <span className="tag signal">✓ In content plan</span>
                    : <button className="btn small" onClick={() => os.flagForContent(n.id)}>Add to content plan</button>}
                  {n.planned
                    ? <span className="tag signal">✓ Tasks created</span>
                    : <button className="btn small" onClick={() => os.makeActionPlan(n.id)}>Turn into tasks</button>}
                </div>
              </div>
            </article>
          ))}
          {!results.length && <p className="muted">No notes match that yet.</p>}
        </div>

        <Card title="New idea" meta={`${os.notes.length} saved`}>
          <form onSubmit={save} className="stack">
            <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="textarea" placeholder="What did you notice? Why does it matter?" value={body} onChange={(e) => setBody(e.target.value)} />
            <input className="input" placeholder="Tags, separated by commas" value={tags} onChange={(e) => setTags(e.target.value)} />
            <button className="btn primary">Save idea</button>
          </form>
        </Card>
      </div>
    </>
  );
}
