// Everything shown on the portfolio page lives here, so it can be edited in one place.

export const LINKS = {
  github: "https://github.com/shanacampbell93-dot",
  source: "https://github.com/shanacampbell93-dot/studio-os",
  humanCyber: "https://human-system-daily-c-we0i.bolt.host/",
};

// Paste a form endpoint here to switch the contact form on,
// e.g. "https://formsubmit.co/ajax/you@example.com" or a Formspree URL.
export const CONTACT_ENDPOINT = "";

export const ROLES = [
  "AI operations or automation roles",
  "Junior developer roles using AI tools",
  "AI training and data annotation",
];

export const SKILLS = [
  {
    group: "Build",
    intro: "Web apps and sites, built with AI and shipped on real infrastructure.",
    items: ["Web apps with Next.js and React, built with AI", "GitHub for code and version control", "Deploying on Vercel, Netlify and Bolt", "Working in the Linux command line"],
  },
  {
    group: "Automate",
    intro: "Joining tools together so admin happens without anyone chasing it.",
    items: ["Workflow automation", "APIs and webhooks", "CRM workflows", "Power Automate and Tally forms"],
  },
  {
    group: "AI",
    intro: "Making AI useful for a specific job, and checking that it's right.",
    items: ["Custom AI agents and chatbots", "Prompt design and AI workflows", "AI data annotation and evaluation, including Labelbox", "Writing clear briefs for AI coding tools"],
  },
  {
    group: "Organise",
    intro: "The groundwork that makes everything else work.",
    items: ["Microsoft 365, SharePoint and Lists", "Admin systems and processes", "Training guides and documentation", "Plain-English writing for non-technical teams"],
  },
];

export const PROCESS = [
  { title: "Plan", body: "Work out who it's for, what it must do and what can wait. Write a clear brief." },
  { title: "Build with AI", body: "Direct AI coding tools section by section, then read, run and test what they produce." },
  { title: "Track in GitHub", body: "Every change is saved with a message, so nothing is lost and anything can be undone." },
  { title: "Ship on Vercel", body: "Push to GitHub and the live site updates by itself within a minute or two." },
];

export const OFFERS = [
  { title: "A small web app or tool", body: "A booking page, an internal dashboard, a calculator or a simple tool your customers use." },
  { title: "An automation or AI agent", body: "One clear job automated end to end, set up and handed over with a written guide." },
  { title: "An AI workflow audit", body: "I look at how your team works and recommend three practical places AI can save time." },
  { title: "An AI basics workshop", body: "A friendly session that gets non-technical teams confident with everyday AI tools." },
];
