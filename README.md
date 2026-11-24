# Studio OS

A personal digital operating system: one ecosystem, four specialist agents, shared knowledge.
Designed and built by Shana Campbell.

| System | What it does |
| --- | --- |
| **00 · Command Centre** (`/os`) | Dashboard: priorities, projects, pipeline, finances, live system activity |
| **01 · Second Brain** (`/os/brain`) | Searchable notes, ideas and research, with tags |
| **02 · Executive Assistant** (`/os/assistant`) | Tasks, decision log, document templates |
| **03 · Marketing Agent** (`/os/marketing`) | Content pipeline from idea to published, publishing calendar |
| Workspace | `/os/projects`, `/os/research`, `/os/finances`, `/os/settings` |

**The systems talk to each other.** In the Second Brain, *Flag for Marketing* sends a note into the Marketing
pipeline. *Make action plan* turns it into three tasks in the Executive Assistant. Research items can be saved
into the Brain. Finished tasks and published pieces show up in the Command Centre's activity feed.

The public page at `/` explains the architecture, so the project works as a portfolio piece.

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
