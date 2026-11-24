import type { OSState } from "./types";

// Example content for the public demo. It shows how the workspace is used;
// it is not a record of real work or real figures.
export const SAMPLE: OSState = {
  projects: [
    { id: "p1", name: "Serenova OS", summary: "Design, build and launch this workspace app.", status: "active", system: "Home" },
    { id: "p2", name: "Example: AI workflow audit for a charity", summary: "Map where staff time goes and suggest three simple AI fixes.", status: "active", system: "To-do" },
    { id: "p3", name: "Human Cybersecurity, version 2", summary: "Add weekly summaries and tidy the check-in flow.", status: "active", system: "To-do" },
    { id: "p4", name: "AI basics workshop", summary: "A 90-minute session for non-technical teams.", status: "paused", system: "To-do" },
  ],
  tasks: [
    { id: "t1", title: "Push the first version to GitHub", done: true, priority: "high", projectId: "p1" },
    { id: "t2", title: "Deploy on Vercel and test every page", done: true, priority: "high", projectId: "p1" },
    { id: "t3", title: "Add a real database (Supabase)", done: false, priority: "med", projectId: "p1" },
    { id: "t4", title: "Interview two staff members about their weekly admin", done: false, priority: "high", projectId: "p2" },
    { id: "t5", title: "Write the audit summary in plain English", done: false, priority: "med", projectId: "p2" },
    { id: "t6", title: "Sketch the weekly summary screen", done: false, priority: "med", projectId: "p3" },
    { id: "t7", title: "Draft workshop slides", done: false, priority: "low", projectId: "p4" },
  ],
  notes: [
    { id: "n1", title: "Data first, then AI", body: "Most teams want AI before their information is organised. Tidy lists and folders come first, then automation actually works.", tags: ["ai", "consulting"], createdAt: "2026-11-18", contentId: "c2" },
    { id: "n2", title: "A weekly summary for Human Cybersecurity", body: "People want to see patterns, not single days. A short weekly recap could be the next feature.", tags: ["product", "ideas"], createdAt: "2026-11-20", planned: true },
    { id: "n3", title: "Plain-English AI glossary", body: "Twenty terms explained in one sentence each. Useful for workshops and as a free download.", tags: ["content", "training"], createdAt: "2026-11-21" },
    { id: "n4", title: "Build in public", body: "Share each stage of Serenova OS as short posts: idea, design, code, launch.", tags: ["content"], createdAt: "2026-11-22" },
  ],
  content: [
    { id: "c1", title: "How I built my own workspace app with AI", channel: "LinkedIn", stage: "drafting", date: "2026-12-02" },
    { id: "c2", title: "Data first, then AI", channel: "Blog", stage: "research", noteId: "n1" },
    { id: "c3", title: "Serenova OS launch post", channel: "Instagram", stage: "scheduled", date: "2026-12-05" },
    { id: "c4", title: "Three AI tools for small teams", channel: "YouTube", stage: "idea" },
    { id: "c5", title: "Why I check in with my own 'system' daily", channel: "Blog", stage: "published", date: "2026-11-10" },
  ],
  research: [
    { id: "r1", title: "How retrieval-augmented generation works", source: "Article", status: "reading" },
    { id: "r2", title: "Small business AI adoption in the UK", source: "Report", status: "to-read" },
    { id: "r3", title: "Designing for cognitive load", source: "Book", status: "done", noteId: "n1" },
  ],
  txns: [],
  decisions: [
    { id: "d1", date: "2026-11-24", title: "Build on my own code", outcome: "GitHub, Vercel and Next.js instead of paying for several separate tools." },
    { id: "d2", date: "2026-11-24", title: "Public demo, private real data", outcome: "Visitors see example content; my real workspace sits behind a password." },
  ],
  activity: [
    { id: "a1", at: "2026-11-20", from: "Ideas", to: "To-do", text: "“A weekly summary for Human Cybersecurity” turned into tasks" },
    { id: "a2", at: "2026-11-18", from: "Ideas", to: "Content plan", text: "“Data first, then AI” added to the content plan" },
    { id: "a3", at: "2026-11-17", from: "Reading list", to: "Ideas", text: "“Designing for cognitive load” saved as a note" },
  ],
};
