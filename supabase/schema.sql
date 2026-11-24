-- Studio OS · Phase 2 database schema for Supabase (Postgres).
-- Paste into Supabase → SQL Editor → Run. Every table has an owner column and
-- row-level security, so the same database can later hold collaborators or subscribers
-- without anyone seeing anyone else's data.

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  summary text default '',
  status text not null default 'active' check (status in ('active','paused','done')),
  system text default 'Command Centre',
  created_at timestamptz not null default now()
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  body text default '',
  tags text[] not null default '{}',
  planned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists content (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  channel text not null,
  stage text not null default 'idea' check (stage in ('idea','research','drafting','scheduled','published')),
  publish_on date,
  note_id uuid references notes(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  priority text not null default 'med' check (priority in ('high','med','low')),
  due date,
  project_id uuid references projects(id) on delete set null,
  note_id uuid references notes(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists research (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  source text default 'Article',
  url text,
  status text not null default 'to-read' check (status in ('to-read','reading','done')),
  note_id uuid references notes(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  occurred_on date not null default current_date,
  label text not null,
  amount numeric(12,2) not null,
  category text default 'Other'
);

create table if not exists decisions (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  decided_on date not null default current_date,
  title text not null,
  outcome text default ''
);

create table if not exists activity (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  at timestamptz not null default now(),
  from_system text not null,
  to_system text not null,
  text text not null
);

-- Row-level security: each person sees only their own rows.
do $$
declare t text;
begin
  foreach t in array array['projects','notes','content','tasks','research','transactions','decisions','activity'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "own rows" on %I', t);
    execute format('create policy "own rows" on %I for all using (owner = auth.uid()) with check (owner = auth.uid())', t);
  end loop;
end $$;
