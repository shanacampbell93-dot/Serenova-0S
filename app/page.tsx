import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { LINKS, OFFERS, PROCESS, ROLES, SKILLS } from "@/lib/portfolio";
import "./site.css";

// Seren means "star" in Welsh. The four-point star is the site's mark.
function Star({ size = 22, color = "var(--star)" }: { size?: number; color?: string }) {
  return (
    <svg className="star" width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" fill={color} />
    </svg>
  );
}

function Browser({ src, url, alt }: { src: string; url: string; alt: string }) {
  return (
    <div className="browser">
      <div className="browser-bar"><i /><i /><i /><span className="browser-url">{url}</span></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1600} height={1000} />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="site">
      <header className="s-header">
        <div className="wrap-w">
          <Link href="/" className="s-logo"><Star size={20} />Shana Campbell</Link>
          <nav className="s-nav" aria-label="Main">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#work-with-me">Work with me</a>
            <a href="#contact" className="s-btn s-btn-primary s-btn-sm">Get in touch</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="s-hero">
          <div className="wrap-w">
            <div>
              <p className="s-hello"><Star size={16} />Hi, I&apos;m Shana Campbell</p>
              <h1>I build apps, automations and AI agents that get real work done.</h1>
              <p className="lead">
                I turn messy processes into simple systems, using AI, APIs and the same platforms
                developers use every day: GitHub, Vercel and Linux.
              </p>
              <div className="s-status">
                <span><i className="dot" />Open to AI, automation and junior developer roles</span>
                <span><i className="dot" />Taking on small build projects</span>
              </div>
              <div className="s-actions">
                <a href="#work" className="s-btn s-btn-primary">See my work</a>
                <a href="#contact" className="s-btn">Get in touch</a>
              </div>
            </div>
            <div className="hero-art">
              <span className="star-big"><Star size={56} /></span>
              <Browser src="/work/serenova-os.jpg" url="Serenova OS: Home" alt="The Home screen of Serenova OS, a workspace app Shana built, showing today's priorities, projects and a content plan." />
            </div>
          </div>
        </section>

        <section className="s-section alt" id="work">
          <div className="wrap-w">
            <div className="s-head">
              <h2>Selected work</h2>
              <p>Three projects that show how I plan, build and ship: an app, a company-wide systems plan, and a product with content around it.</p>
            </div>

            <article className="case">
              <div className="case-art">
                <Browser src="/work/serenova-ideas.jpg" url="Serenova OS: Ideas" alt="The Ideas screen of Serenova OS, where each idea can be turned into tasks or added to a content plan." />
              </div>
              <div>
                <p className="case-kind">Web app built with AI</p>
                <h3>Serenova OS</h3>
                <p className="summary">A workspace app where ideas, to-dos, projects and a content plan are connected, so one idea can become a plan in a click.</p>
                <ul>
                  <li>Planned the structure and wrote the brief, then built it section by section with AI as my coding partner.</li>
                  <li>Version-controlled on GitHub and deployed on Vercel, so every change goes live automatically.</li>
                  <li>Added a password-protected private mode, with a public demo for visitors.</li>
                </ul>
                <div className="chips">{["Next.js", "React", "TypeScript", "GitHub", "Vercel", "AI-assisted"].map((c) => <span key={c} className="chip">{c}</span>)}</div>
                <div className="case-links">
                  <Link href="/os" className="s-btn s-btn-primary s-btn-sm">Try the live demo</Link>
                  <a href={LINKS.source} className="s-btn s-btn-sm" target="_blank" rel="noreferrer">View the code</a>
                </div>
              </div>
            </article>

            <article className="case flip">
              <div className="case-art">
                <div className="roadmap" role="img" aria-label="A five-phase Microsoft 365 roadmap, from organising data to adding AI agents.">
                  <div className="roadmap-title">Microsoft 365 roadmap</div>
                  <div className="roadmap-sub">Organise the data first. Add AI last.</div>
                  <div className="phases">
                    {[
                      ["Organise", "SharePoint and Microsoft Lists"],
                      ["Automate", "Power Automate flows"],
                      ["Build tools", "Power Apps for daily tasks"],
                      ["Share", "Power Pages for outside users"],
                      ["Add AI", "Copilot and AI agents"],
                    ].map(([t, s], i) => (
                      <div key={t} className="phase"><b>{i + 1}</b><div><strong>{t}</strong><span>{s}</span></div></div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="case-kind">Systems and automation, in-house</p>
                <h3>Microsoft 365 transformation plan</h3>
                <p className="summary">A five-phase plan to move a busy UK events company from scattered emails and spreadsheets to connected systems.</p>
                <ul>
                  <li>Built and presented the roadmap to leadership, from SharePoint and Lists through to Copilot and AI agents.</li>
                  <li>Set up an enquiries workflow system and trained staff with a 13-slide guide and a quick-start web page.</li>
                  <li>Made the case that structured data has to come before AI automation, so the AI has something reliable to work with.</li>
                </ul>
                <div className="chips">{["SharePoint", "Microsoft Lists", "Power Automate", "Power Apps", "Copilot"].map((c) => <span key={c} className="chip">{c}</span>)}</div>
              </div>
            </article>

            <article className="case">
              <div className="case-art">
                <div className="hc" role="img" aria-label="How Human Cybersecurity fits together: the app, blog posts, a 7-day challenge and a sign-up form.">
                  <div className="roadmap-title" style={{ color: "var(--night)" }}>How it fits together</div>
                  <div className="hc-flow">
                    <div className="hc-node main"><strong>Human Cybersecurity app</strong><span>A short daily check-in</span></div>
                    <div className="hc-node"><strong>Blog posts</strong><span>Explain the idea</span></div>
                    <div className="hc-node"><strong>7-day reset</strong><span>A challenge to try it</span></div>
                    <div className="hc-node" style={{ gridColumn: "span 2" }}><strong>Sign-up form</strong><span>Tally form that brings people in</span></div>
                  </div>
                </div>
              </div>
              <div>
                <p className="case-kind">Product and content</p>
                <h3>Human Cybersecurity</h3>
                <p className="summary">A daily self check-in app that uses ideas from cybersecurity to help people look after their own wellbeing.</p>
                <ul>
                  <li>Designed and built the app, and launched it on its own web address.</li>
                  <li>Wrote blog posts and a 7-day reset challenge to give people a reason to use it.</li>
                  <li>Connected sign-ups through a Tally form, so new users arrive without manual work.</li>
                </ul>
                <div className="chips">{["Bolt", "AI-assisted", "Tally", "Content"].map((c) => <span key={c} className="chip">{c}</span>)}</div>
                <div className="case-links">
                  <a href={LINKS.humanCyber} className="s-btn s-btn-primary s-btn-sm" target="_blank" rel="noreferrer">Open the app</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="s-section" id="skills">
          <div className="wrap-w">
            <div className="s-head">
              <h2>What I can do</h2>
              <p>I&apos;m an AI-assisted builder. I plan what&apos;s needed, direct AI tools to build it, test it properly and ship it on real infrastructure.</p>
            </div>
            <div className="skills">
              {SKILLS.map((s) => (
                <div key={s.group} className="skill">
                  <h3>{s.group}</h3>
                  <p>{s.intro}</p>
                  <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>

            <div className="process" aria-label="How I take a project from idea to live">
              {PROCESS.map((p, i) => (
                <div key={p.title} className="proc">
                  <span className="proc-n">{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s-section alt" id="work-with-me">
          <div className="wrap-w">
            <div className="s-head"><h2>Work with me</h2></div>
            <div className="two">
              <div className="roles">
                <h3>Hiring?</h3>
                <p>I&apos;m looking for a team where I can build, automate and keep learning.</p>
                <ul>{ROLES.map((r) => <li key={r}><Star size={16} />{r}</li>)}</ul>
                <a href="#contact" className="s-btn s-btn-sm" style={{ marginTop: 26, background: "#fff" }}>Talk to me about a role</a>
              </div>
              <div className="offers">
                <h3>Need something built?</h3>
                {OFFERS.map((o) => <div key={o.title} className="offer"><strong>{o.title}</strong><p>{o.body}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="s-section" id="contact">
          <div className="wrap-w contact">
            <div className="s-head" style={{ marginBottom: 0 }}>
              <h2>Get in touch</h2>
              <p>Tell me about the role or the project. I reply to every message within two working days.</p>
              <p style={{ marginTop: 18 }}><a href={LINKS.github} target="_blank" rel="noreferrer" style={{ color: "var(--night)", fontWeight: 600 }}>See my code on GitHub</a></p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="s-footer">
        <div className="wrap-w">
          <span>© {new Date().getFullYear()} Shana Campbell. Designed and built by me, with AI.</span>
          <a href={LINKS.source} target="_blank" rel="noreferrer">How this site was built</a>
        </div>
      </footer>
    </div>
  );
}
