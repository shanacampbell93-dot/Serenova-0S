// Real tools built by the owner. Shown on the public page as proof of work.
export interface Tool {
  name: string;
  desc: string;
  url?: string;
  status: "live" | "in development";
  group: string;
}

const BASE = "https://maveserenova.netlify.app/tools";

export const TOOLS: Tool[] = [
  { group: "Children", name: "First–Then Board", desc: "A visual sequence board for children, with a calm timer.", url: `${BASE}/first-then/`, status: "live" },
  { group: "Children", name: "Homework Time", desc: "Short, single-task practice for times tables, spellings and reading, ages 5–11.", url: `${BASE}/homework/`, status: "live" },
  { group: "Children", name: "Stim Studio", desc: "Playful on-screen objects for stimming: gooey strings, spider webs and more.", url: `${BASE}/stim-studio/`, status: "live" },
  { group: "Families", name: "My Day", desc: "Routine, feelings, a diary and a prayer journal on one page for families.", url: `${BASE}/my-day/`, status: "live" },
  { group: "Parents & carers", name: "Calm Before the Call", desc: "A five-minute calming routine before a school or council call.", url: `${BASE}/calm-call/`, status: "live" },
  { group: "Parents & carers", name: "SEN Meeting Prep", desc: "Turns a parent's thoughts into one clear page before an EHCP meeting.", status: "in development" },
  { group: "Neurodivergent teens & adults", name: "Can We Relate?", desc: "Flip cards on neurodivergent experiences like stimming and masking, plus a game.", url: `${BASE}/can-we-relate/`, status: "live" },
  { group: "Neurodivergent teens & adults", name: "Human Cybersecurity", desc: "A short daily check-in for neurodivergent teens and adults.", url: "https://human-system-daily-c-we0i.bolt.host/", status: "live" },
  { group: "Safety & recovery", name: "See the Pattern", desc: "Explains abusive behaviours in plain language, with a quick exit.", url: `${BASE}/see-the-pattern/`, status: "live" },
  { group: "Safety & recovery", name: "Reboot", desc: "The 12 steps retold through technology, with an urge timer.", url: `${BASE}/reboot/`, status: "live" },
];

export const LINKS = {
  portfolio: "https://maveserenova.netlify.app/",
  github: "https://github.com/shanacampbell93-dot",
  source: "https://github.com/shanacampbell93-dot/studio-os",
};
