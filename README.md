# Shana Campbell: portfolio and Serenova OS

The front page (`/`) is Shana's portfolio: selected work, skills, ways to work together and a contact form.
The workspace app, Serenova OS, lives at `/os`.

**Contact form:** paste a form endpoint (for example `https://formsubmit.co/ajax/you@example.com`) into `CONTACT_ENDPOINT` in `lib/portfolio.ts`.

## Serenova OS

The digital workspace Shana Campbell built to run her work: ideas, to-dos, projects, content and money in one place.
Designed and built by Shana Campbell.

| System | What it does |
| --- | --- |
| **Home** (`/os`) | Today's priorities, projects, content plan and recent activity |
| **Ideas** (`/os/brain`) | Searchable notes and ideas, with tags |
| **To-do** (`/os/assistant`) | Tasks, decisions made, document templates |
| **Content plan** (`/os/marketing`) | Every post from idea to published, plus a calendar |
| More | Projects, Reading list, Money, Settings |

**The sections are connected.** In Ideas, *Add to content plan* puts an idea into the content plan and
*Turn into tasks* creates three to-dos. Reading-list items can be saved to Ideas. Finished tasks and
published posts show up in Home's recent activity.

The front page at `/` explains what it is in plain English, lists what Shana can be hired for, and shows her tools.

---

## Put it online (about 15 minutes)

### 1. GitHub
1. Sign in at github.com and create a new repository called `studio-os` (private or public; public makes a better portfolio piece).
2. Upload every file and folder from this project (or let Claude push it once GitHub is connected).

### 2. Vercel
1. Sign in at vercel.com **with your GitHub account**.
2. Click **Add New → Project**, choose the `studio-os` repository and click **Deploy**. Vercel detects Next.js by itself.
3. In a minute or two you get a live address like `studio-os.vercel.app`.

From then on, every change pushed to GitHub redeploys automatically.

### 3. Demo mode or private mode
- **Demo mode (default):** with no password set, `/os` is open to anyone with sample data. This is ideal for showing it off.
- **Private mode:** in Vercel go to **Project → Settings → Environment Variables** and add:
  - `OS_PASSWORD`: your password
  - `AUTH_SECRET`: any long random string

  Then redeploy. `/os` now asks for the password.

Tip: you can run both. Keep one Vercel project in demo mode for your portfolio and a second one, from the same repository, with a password for your real work.

### Rename it
Change `APP_NAME` in `lib/config.ts`. The name updates everywhere.

---

## Roadmap

- [x] GitHub repository
- [x] Next.js application
- [ ] Connect Vercel
- [x] Central dashboard
- [x] Second Brain
- [x] Executive Assistant
- [x] Marketing Agent
- [ ] **Phase 2:** connect Supabase and the AI API

### Phase 2: database and AI
V1 saves changes in the browser (localStorage), so it works with no database.
For phase 2:
1. Create a free project at supabase.com and run `supabase/schema.sql` in its SQL Editor.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel.
3. Replace the functions in `lib/store.tsx` with Supabase calls. The function names stay the same, so the pages don't change.
4. Add an AI key (for example `ANTHROPIC_API_KEY`) and an `/api/agent` route so each system can summarise, draft and suggest.

## Run it on your computer (optional)
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Tech
Next.js 14 (App Router) · TypeScript · plain CSS · Vercel · Supabase (phase 2)
