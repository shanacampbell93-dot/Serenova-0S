import Link from "next/link";
import { APP_NAME, OWNER, TAGLINE, VERSION } from "@/lib/config";

const SYSTEMS = [
  { n: "00", name: "Command Centre", body: "Projects, priorities, finances and progress, in one view." },
  { n: "01", name: "Second Brain", body: "A searchable library of ideas, research, notes and the connections between them." },
  { n: "02", name: "Executive Assistant", body: "Tasks, planning, decisions and documents. Ideas become action plans." },
  { n: "03", name: "Marketing Agent", body: "Content pipeline, publishing calendar, campaigns and performance." },
];

const FLOW = [
  ["Discover", "A topic turns up during research."],
  ["Capture", "The Second Brain saves it, tagged and searchable."],
  ["Spot", "The Marketing Agent flags its publishing potential."],
  ["Plan", "The Executive Assistant turns it into an action plan."],
  ["Track", "The Command Centre follows it through to done."],
];

const STACK = [
  ["Next.js", "The application framework"],
  ["GitHub", "Source code and version history"],
  ["Vercel", "Hosting and deployment"],
  ["Supabase", "Database, login and storage (phase 2)"],
  ["AI API", "The specialist agents (phase 2)"],
];

export default function Home() {
  return (
    <main className="public">
      <header className="topbar">
        <div className="brand-name">{APP_NAME.split(" ")[0]} <em>{APP_NAME.split(" ").slice(1).join(" ")}</em></div>
        <div className="row">
          <span className="kicker">System architecture · {VERSION}</span>
          <Link href="/os" className="btn primary">Enter the workspace →</Link>
        </div>
      </header>

      <section className="hero">
        <div className="kicker signal">Independent digital practice</div>
        <h1 className="display" style={{ marginTop: 18 }}>
          One ecosystem.<br />Four specialist <em>agents.</em><br />Shared knowledge.
        </h1>
        <p className="lede">
          {TAGLINE} {APP_NAME} is a personal operating system for research, thinking, organising,
          making products and running digital work. It is designed and built by {OWNER}.
        </p>
      </section>

      <section className="systems">
        {SYSTEMS.map((s) => (
          <div className="system" key={s.n}>
            <div className="num">{s.n}</div>
            <h2 className="h2" style={{ marginTop: 14 }}>{s.name}</h2>
            <p className="muted" style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="kicker">How the systems talk to each other</div>
        <h2 className="h1">From a passing idea to a <em>finished</em> project.</h2>
        <div className="steps">
          {FLOW.map(([t, b], i) => (
            <div className="step" key={t}>
              <div className="mono muted">0{i + 1}</div>
              <div className="h2" style={{ marginTop: 6 }}>{t}</div>
              <p className="muted" style={{ fontSize: 14 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid g-2" style={{ alignItems: "start" }}>
          <div>
            <div className="kicker">Built on</div>
            <h2 className="h1">Owned, not <em>rented.</em></h2>
            <p className="lede">
              The system runs on its own code and its own domain. There are no four separate subscriptions
              and no lock-in to somebody else&apos;s platform.
            </p>
          </div>
          <ul className="list">
            {STACK.map(([t, b]) => (
              <li key={t} className="row between"><span className="h2">{t}</span><span className="muted">{b}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="row between wrap" style={{ paddingTop: 28 }}>
        <span className="kicker">© {new Date().getFullYear()} {OWNER}</span>
        <Link href="/os" className="kicker signal">Open the live demo →</Link>
      </footer>
    </main>
  );
}
