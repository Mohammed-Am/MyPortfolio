-- Run once in the Supabase SQL editor. Only your Next.js server can access these tables.
create table if not exists public.portfolio_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  revision integer not null default 1,
  updated_at timestamptz not null default now()
);
create table if not exists public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 120),
  email text not null check (length(email) <= 254),
  message text not null check (length(message) between 10 and 5000),
  status text not null default 'unread' check (status in ('unread', 'read', 'archived')),
  created_at timestamptz not null default now()
);
create index if not exists portfolio_messages_created on public.portfolio_messages (created_at desc);
create table if not exists public.portfolio_rate_buckets (
  key text primary key, hits integer not null, resets_at timestamptz not null
);
alter table public.portfolio_content enable row level security;
alter table public.portfolio_messages enable row level security;
alter table public.portfolio_rate_buckets enable row level security;
revoke all on public.portfolio_content, public.portfolio_messages, public.portfolio_rate_buckets from public, anon, authenticated;
grant all on public.portfolio_content, public.portfolio_messages, public.portfolio_rate_buckets to service_role;

create or replace function public.portfolio_rate_limit(bucket_key text, max_hits integer, window_seconds integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare current_hits integer;
begin
  delete from public.portfolio_rate_buckets where resets_at < now() - interval '1 day';
  insert into public.portfolio_rate_buckets as b (key, hits, resets_at)
    values (bucket_key, 1, now() + make_interval(secs => window_seconds))
  on conflict (key) do update set
    hits = case when b.resets_at < now() then 1 else b.hits + 1 end,
    resets_at = case when b.resets_at < now() then now() + make_interval(secs => window_seconds) else b.resets_at end
  returning hits into current_hits;
  return current_hits <= max_hits;
end; $$;

create or replace function public.save_portfolio_content(expected_revision integer, new_content jsonb)
returns integer language plpgsql security invoker set search_path = '' as $$
declare next_revision integer;
begin
  if expected_revision = 0 then
    insert into public.portfolio_content (id, content, revision) values ('main', new_content, 1)
      on conflict do nothing returning revision into next_revision;
  else
    update public.portfolio_content set content = new_content, revision = revision + 1, updated_at = now()
      where id = 'main' and revision = expected_revision returning revision into next_revision;
  end if;
  return coalesce(next_revision, -1);
end; $$;
revoke all on function public.portfolio_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.save_portfolio_content(integer, jsonb) from public, anon, authenticated;
grant execute on function public.portfolio_rate_limit(text, integer, integer) to service_role;
grant execute on function public.save_portfolio_content(integer, jsonb) to service_role;

-- Public showcase assets; uploads remain server/admin-only (no browser write policy).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 26214400,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'])
on conflict (id) do update set public = true, file_size_limit = 26214400,
  allowed_mime_types = excluded.allowed_mime_types;
