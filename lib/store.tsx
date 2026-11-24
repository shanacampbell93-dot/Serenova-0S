"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SAMPLE } from "./sample-data";
import type { ContentItem, Note, OSState, Priority, Stage, Task } from "./types";

// V1 keeps everything in the browser (localStorage) so the whole system works
// with no database. Phase 2 swaps these functions for Supabase calls.
const KEY = "studio-os:v1";
export const STAGES: Stage[] = ["idea", "research", "drafting", "scheduled", "published"];

const uid = (p: string) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const today = () => new Date().toISOString().slice(0, 10);

interface Actions {
  addNote: (n: { title: string; body: string; tags: string[] }) => void;
  flagForContent: (noteId: string, channel?: string) => void;
  makeActionPlan: (noteId: string) => void;
  addTask: (t: { title: string; priority: Priority; projectId?: string; due?: string }) => void;
  toggleTask: (id: string) => void;
  moveContent: (id: string, dir: 1 | -1) => void;
  addContent: (c: { title: string; channel: string }) => void;
  advanceResearch: (id: string) => void;
  saveResearchToBrain: (id: string) => void;
  reset: () => void;
}

const Ctx = createContext<(OSState & Actions & { ready: boolean }) | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OSState>(SAMPLE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...SAMPLE, ...JSON.parse(raw) });
    } catch { /* storage unavailable: keep sample data */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state, ready]);

  const log = (s: OSState, from: string, to: string, text: string): OSState => ({
    ...s,
    activity: [{ id: uid("a"), at: today(), from, to, text }, ...s.activity].slice(0, 40),
  });

  const addNote: Actions["addNote"] = useCallback((n) => {
    setState((s) => {
      const note: Note = { id: uid("n"), createdAt: today(), ...n };
      return log({ ...s, notes: [note, ...s.notes] }, "Capture", "Second Brain", `“${n.title}” saved`);
    });
  }, []);

  const flagForContent: Actions["flagForContent"] = useCallback((noteId, channel = "Blog") => {
    setState((s) => {
      const note = s.notes.find((n) => n.id === noteId);
      if (!note || note.contentId) return s;
      const item: ContentItem = { id: uid("c"), title: note.title, channel, stage: "idea", noteId };
      return log(
        { ...s, content: [item, ...s.content], notes: s.notes.map((n) => (n.id === noteId ? { ...n, contentId: item.id } : n)) },
        "Second Brain", "Marketing Agent", `“${note.title}” flagged for ${channel}`,
      );
    });
  }, []);

  const makeActionPlan: Actions["makeActionPlan"] = useCallback((noteId) => {
    setState((s) => {
      const note = s.notes.find((n) => n.id === noteId);
      if (!note || note.planned) return s;
      const steps: [string, Priority][] = [
        [`Research: ${note.title}`, "high"],
        [`Outline next steps for “${note.title}”`, "med"],
        [`Decide where “${note.title}” lives (project, product or post)`, "low"],
      ];
      const tasks: Task[] = steps.map(([title, priority]) => ({ id: uid("t"), title, priority, done: false, noteId }));
      return log(
        { ...s, tasks: [...tasks, ...s.tasks], notes: s.notes.map((n) => (n.id === noteId ? { ...n, planned: true } : n)) },
        "Second Brain", "Executive Assistant", `“${note.title}” became a 3-step action plan`,
      );
    });
  }, []);

  const addTask: Actions["addTask"] = useCallback((t) => {
    setState((s) => ({ ...s, tasks: [{ id: uid("t"), done: false, ...t }, ...s.tasks] }));
  }, []);

  const toggleTask: Actions["toggleTask"] = useCallback((id) => {
    setState((s) => {
      const task = s.tasks.find((t) => t.id === id);
      const next = { ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) };
      return task && !task.done ? log(next, "Executive Assistant", "Command Centre", `Done: ${task.title}`) : next;
    });
  }, []);

  const moveContent: Actions["moveContent"] = useCallback((id, dir) => {
    setState((s) => {
      const item = s.content.find((c) => c.id === id);
      if (!item) return s;
      const i = Math.min(STAGES.length - 1, Math.max(0, STAGES.indexOf(item.stage) + dir));
      const stage = STAGES[i];
      if (stage === item.stage) return s;
      const next = { ...s, content: s.content.map((c) => (c.id === id ? { ...c, stage, date: stage === "published" ? today() : c.date } : c)) };
      return stage === "published" ? log(next, "Marketing Agent", "Command Centre", `Published: ${item.title}`) : next;
    });
  }, []);

  const addContent: Actions["addContent"] = useCallback((c) => {
    setState((s) => ({ ...s, content: [{ id: uid("c"), stage: "idea", ...c }, ...s.content] }));
  }, []);

  const advanceResearch: Actions["advanceResearch"] = useCallback((id) => {
    const order = ["to-read", "reading", "done"] as const;
    setState((s) => ({
      ...s,
      research: s.research.map((r) => (r.id === id ? { ...r, status: order[Math.min(2, order.indexOf(r.status) + 1)] } : r)),
    }));
  }, []);

  const saveResearchToBrain: Actions["saveResearchToBrain"] = useCallback((id) => {
    setState((s) => {
      const r = s.research.find((x) => x.id === id);
      if (!r || r.noteId) return s;
      const note: Note = { id: uid("n"), title: r.title, body: `Saved from research (${r.source}).`, tags: ["research"], createdAt: today() };
      return log(
        { ...s, notes: [note, ...s.notes], research: s.research.map((x) => (x.id === id ? { ...x, noteId: note.id } : x)) },
        "Research", "Second Brain", `“${r.title}” saved as a note`,
      );
    });
  }, []);

  const reset = useCallback(() => setState(SAMPLE), []);

  const value = useMemo(
    () => ({ ...state, ready, addNote, flagForContent, makeActionPlan, addTask, toggleTask, moveContent, addContent, advanceResearch, saveResearchToBrain, reset }),
    [state, ready, addNote, flagForContent, makeActionPlan, addTask, toggleTask, moveContent, addContent, advanceResearch, saveResearchToBrain, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOS() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOS must be used inside <StoreProvider>");
  return v;
}

// Derived helpers
export function projectProgress(tasks: Task[], projectId: string) {
  const list = tasks.filter((t) => t.projectId === projectId);
  if (!list.length) return { done: 0, total: 0, pct: 0 };
  const done = list.filter((t) => t.done).length;
  return { done, total: list.length, pct: Math.round((done / list.length) * 100) };
}

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export const shortDate = (iso?: string) =>
  iso ? new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "";
