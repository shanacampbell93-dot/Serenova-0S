import type { OSState } from "./types";

// Sample data for the demo. Everything here is illustrative, not real figures.
export const SAMPLE: OSState = {
  projects: [
    { id: "p1", name: "Studio OS V1", summary: "Build and ship the operating system itself.", status: "active", system: "Command Centre" },
    { id: "p2", name: "Culture magazine, Issue 002", summary: "Second issue: interviews, listings and a city guide.", status: "active", system: "Marketing Agent" },
    { id: "p3", name: "Ebook launch", summary: "Write, format and launch a short guide on Gumroad and KDP.", status: "active", system: "Executive Assistant" },
    { id: "p5", name: "Calm-tech tool suite", summary: "Ten tools for children, families and neurodivergent adults: nine live, one in development.", status: "active", system: "Command Centre" },
    { id: "p4", name: "Workflow audit offer", summary: "A fixed-price automation audit for small teams.", status: "paused", system: "Executive Assistant" },
  ],
  tasks: [
    { id: "t1", title: "Create the GitHub repository", done: true, priority: "high", projectId: "p1" },
    { id: "t2", title: "Deploy the first version on Vercel", done: false, priority: "high", projectId: "p1", due: "2026-11-28" },
    { id: "t3", title: "Shortlist three interview subjects", done: false, priority: "high", projectId: "p2", due: "2026-11-30" },
    { id: "t4", title: "Draft chapter two of the ebook", done: false, priority: "med", projectId: "p3", due: "2026-12-04" },
    { id: "t5", title: "Design the ebook cover", done: false, priority: "low", projectId: "p3" },
    { id: "t6", title: "Write the audit offer one-pager", done: false, priority: "med", projectId: "p4" },
    { id: "t8", title: "Finish SEN Meeting Prep and release it", done: false, priority: "high", projectId: "p5", due: "2026-12-10" },
    { id: "t9", title: "Release First–Then Board, Homework Time and seven more tools", done: true, priority: "med", projectId: "p5" },
    { id: "t7", title: "Set up Supabase project", done: false, priority: "med", projectId: "p1" },
  ],
  notes: [
    { id: "n1", title: "Calm interfaces reduce drop-off", body: "Fewer choices per screen, plain words and one clear next step. Worth a long-form piece.", tags: ["design", "research"], createdAt: "2026-11-18", contentId: "c2" },
    { id: "n2", title: "Agents that share one memory", body: "Separate tools lose context. One knowledge base that every agent reads is the real advantage.", tags: ["ai", "systems"], createdAt: "2026-11-20", planned: true },
    { id: "n3", title: "Local venues lack listings pages", body: "Three venues I spoke to have no simple events page. A listings partnership for the magazine?", tags: ["magazine", "opportunity"], createdAt: "2026-11-21" },
    { id: "n4", title: "Prompt packs as lead magnets", body: "Short, practical prompt collections convert better than long guides.", tags: ["marketing", "products"], createdAt: "2026-11-22" },
  ],
  content: [
    { id: "c1", title: "Why I built my own operating system", channel: "Newsletter", stage: "drafting", date: "2026-12-02" },
    { id: "c2", title: "Calm interfaces, explained", channel: "Blog", stage: "research", noteId: "n1" },
    { id: "c3", title: "Issue 002 cover reveal", channel: "Instagram", stage: "scheduled", date: "2026-12-05" },
    { id: "c4", title: "Five automations for small teams", channel: "LinkedIn", stage: "idea" },
    { id: "c5", title: "Issue 001 roundup", channel: "Substack", stage: "published", date: "2026-11-10" },
  ],
  research: [
    { id: "r1", title: "Retrieval-augmented generation, a practical overview", source: "Article", status: "reading" },
    { id: "r2", title: "UK small business digital adoption figures", source: "Report", status: "to-read" },
    { id: "r3", title: "Designing for cognitive load", source: "Book", status: "done", noteId: "n1" },
  ],
  txns: [
    { id: "x1", date: "2026-11-03", label: "Consulting: workflow session", amount: 450, category: "Services" },
    { id: "x2", date: "2026-11-07", label: "Ebook sales", amount: 86, category: "Products" },
    { id: "x3", date: "2026-11-09", label: "Domain and hosting", amount: -24, category: "Tools" },
    { id: "x4", date: "2026-11-14", label: "Newsletter sponsorship", amount: 120, category: "Publishing" },
    { id: "x5", date: "2026-11-18", label: "Design software", amount: -19, category: "Tools" },
    { id: "x6", date: "2026-11-20", label: "Print run, magazine", amount: -140, category: "Publishing" },
  ],
  decisions: [
    { id: "d1", date: "2026-11-24", title: "Build on own stack", outcome: "GitHub + Vercel + Next.js rather than four separate AI subscriptions." },
    { id: "d2", date: "2026-11-24", title: "Private by default", outcome: "Workspace behind a login; public site shows the architecture." },
  ],
  activity: [
    { id: "a1", at: "2026-11-20", from: "Second Brain", to: "Executive Assistant", text: "“Agents that share one memory” became an action plan" },
    { id: "a2", at: "2026-11-18", from: "Second Brain", to: "Marketing Agent", text: "“Calm interfaces reduce drop-off” flagged for a blog post" },
    { id: "a3", at: "2026-11-17", from: "Research", to: "Second Brain", text: "“Designing for cognitive load” saved as a note" },
  ],
};
