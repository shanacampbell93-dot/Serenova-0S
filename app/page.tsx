import Link from "next/link";
import { APP_NAME, OWNER, OWNER_FIRST } from "@/lib/config";
import { LINKS, SERVICES, TOOLS } from "@/lib/portfolio";

const FEATURES = [
  { icon: "🏠", name: "Home", body: "One screen that shows today's priorities, active projects and what's coming up." },
  { icon: "💡", name: "Ideas", body: "Write down ideas the moment they come. Search and tag them so nothing gets lost." },
  { icon: "✅", name: "To-do", body: "Every task in one list, sorted by priority and linked to the project it belongs to." },
  { icon: "📣", name: "Content plan", body: "Track every post, blog and newsletter from first idea to published." },
  { icon: "📁", name: "Projects", body: "See how far along each project is, worked out from its tasks." },
  { icon: "💷", name: "Money", body: "Income and costs at a glance, so you know where the business stands." },
];

const STEPS = [
  ["Write it down", "An idea pops up. Type it into the quick note box on the Home screen and it's saved in Ideas."],
  ["Turn it into action", "One click turns an idea into a short to-do list, or adds it to your content plan as a post."],
  ["Watch it get done", "Tick off tasks and move posts along. Home shows your progress in one place."],
];

function Preview() {
  // A small illustration of the workspace, built in HTML so it stays sharp.
  return (
    <div className="hero-shot" aria-hidden>
      <div className="row between" style={{ marginBottom: 12 }}>
        <span className="h2">Good afternoon, {OWNER_FIRST}</span>
        <span className="tag signal">Live demo</span>
      </div>
      <div className="grid g-2" style={{ gap: 12 }}>
        <div className="card" style={{ padding: 14 }}>
          <div className="kicker">Today</div>
          {["Finish SEN Meeting Prep", "Shortlist interview subjects", "Deploy the new version"].map((t, i) => (
            <div key={t} className="row" style={{ marginTop: 10, fontSize: 14 }}>
              <span className={`check ${i === 2 ? "on" : ""}`} style={{ width: 16, height: 16 }} />
              <span className={i === 2 ? "done-text" : ""}>{t}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div className="kicker">Content plan</div>
          {[["Newsletter", "2 Dec"], ["Instagram", "5 Dec"], ["Blog", "Draft"]].map(([c, d]) => (
            <div key={c} className="row between" style={{ marginTop: 10, fontSize: 14 }}><span>{c}</span><span className="muted">{d}</span></div>
          ))}
        </div>
        <div className="card span-2" style={{ padding: 14 }}>
          <div className="row between"><span className="kicker">Calm-tech tool suite</span><span className="muted" style={{ fontSize: 13 }}>90%</span></div>
          <div className="bar" style={{ marginTop: 10 }}><span style={{ width: "90%" }} /></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const live = TOOLS.filter((t) => t.status === "live").length;
  return (
    <main className="public">
      <header className="topbar">
        <Link href="/" className="brand-name">Serenova <em>OS</em></Link>
        <nav className="topnav">
          <a href="#what">What it does</a>
          <a href="#hire">Hire me</a>
          <a href="#tools">My tools</a>
          <a href="#about">About</a>
          <Link href="/os" className="btn primary">Try the live demo</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <div className="kicker signal">A digital workspace by {OWNER}</div>
          <h1 className="display" style={{ marginTop: 14 }}>
            My whole working life, <em>in one place.</em>
          </h1>
          <p className="lede">
            {APP_NAME} is the online workspace I designed and built to run my work. My ideas, to-do list,
            projects, content plan and money all live together, instead of being scattered across apps
            and notebooks.
          </p>
          <p className="lede" style={{ marginTop: 12 }}>
            <strong style={{ color: "var(--paper)" }}>I can build one like it for you or your team.</strong>
          </p>
          <div className="row wrap" style={{ marginTop: 28, gap: 12 }}>
            <Link href="/os" className="btn primary big">Try the live demo</Link>
            <a href="#hire" className="btn big">What I can do for you</a>
          </div>
        </div>
        <Preview />
      </section>

      <section className="section" id="what">
        <div className="section-head">
          <div className="kicker signal">What it does</div>
          <h2 className="h1">Six simple sections, all connected.</h2>
          <p className="lede">Each part does one job. Because they share the same information, an idea can become a plan and then a finished project without being copied anywhere.</p>
        </div>
        <div className="grid g-3">
          {FEATURES.map((f) => (
            <div key={f.name} className="card feature">
              <span className="icon">{f.icon}</span>
              <h3 className="h2">{f.name}</h3>
              <p className="muted" style={{ margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="h2" style={{ fontSize: 22, marginBottom: 20 }}>How it works</h3>
          <div className="steps">
            {STEPS.map(([t, b], i) => (
              <div key={t} className="stack" style={{ gap: 10 }}>
                <span className="step-num">{i + 1}</span>
                <h4 className="h2" style={{ margin: 0 }}>{t}</h4>
                <p className="muted" style={{ margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href="/os" className="btn primary">See it working →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="hire">
        <div className="section-head">
          <div className="kicker signal">Hire me</div>
          <h2 className="h1">What I can do for you</h2>
          <p className="lede">I help small businesses, charities, schools and families use technology calmly and well. These are the things people hire me for.</p>
        </div>
        <div className="grid g-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="card feature">
              <span className="icon">{s.icon}</span>
              <h3 className="h2">{s.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="cta" style={{ marginTop: 32 }}>
          <div>
            <h3 className="h1" style={{ margin: 0 }}>Have something in mind?</h3>
            <p className="muted" style={{ margin: "6px 0 0" }}>Tell me what's getting in the way and I'll suggest a simple fix.</p>
          </div>
          <a href={LINKS.contact} className="btn primary big" target="_blank" rel="noreferrer">Get in touch</a>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="section-head">
          <div className="kicker signal">My tools</div>
          <h2 className="h1">Ten tools I've made. {live} are live.</h2>
          <p className="lede">Free, calm tools for children, families and neurodivergent people. No accounts, no ads, no tracking.</p>
        </div>
        <div className="grid g-3">
          {TOOLS.map((t) => (
            <article key={t.name} className="card stack" style={{ gap: 8 }}>
              <div className="row between">
                <span className="kicker">{t.group}</span>
                <span className={`tag ${t.status === "live" ? "signal" : ""}`}>{t.status === "live" ? "Live" : "Coming soon"}</span>
              </div>
              <h3 className="h2">{t.name}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 15, flex: 1 }}>{t.desc}</p>
              {t.url && <a style={{ color: "var(--signal)", fontWeight: 600, fontSize: 15 }} href={t.url} target="_blank" rel="noreferrer">Try it →</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="grid g-2" style={{ alignItems: "start", gap: 40 }}>
          <div>
            <div className="kicker signal">About</div>
            <h2 className="h1">Hi, I&apos;m {OWNER_FIRST}.</h2>
          </div>
          <div>
            <p className="lede" style={{ marginTop: 0 }}>
              I&apos;m a former teacher and the founder of a small digital practice, with Level 3 training in coding,
              SEN, psychology and wellbeing. I build technology that feels calm and makes sense the first time you use it.
            </p>
            <p className="lede">
              I built {APP_NAME} myself, from design to code to going live, to run my own work. It&apos;s also a working
              example of what I can build for clients.
            </p>
            <div className="row wrap" style={{ marginTop: 20, gap: 10 }}>
              <a className="btn primary" href={LINKS.contact} target="_blank" rel="noreferrer">Get in touch</a>
              <a className="btn" href={LINKS.portfolio} target="_blank" rel="noreferrer">My portfolio</a>
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="row between wrap" style={{ paddingTop: 28, borderTop: "1px solid var(--rule)" }}>
        <span className="muted" style={{ fontSize: 14 }}>© {new Date().getFullYear()} {OWNER}. Designed and built by {OWNER}.</span>
        <Link href="/os" style={{ color: "var(--signal)", fontWeight: 600, fontSize: 14 }}>Try the live demo →</Link>
      </footer>
    </main>
  );
}
