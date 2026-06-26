-- BioBuilder SABIO-RK cache schema.
--
-- Run this in the Supabase SQL editor (or `supabase db push`). It is shared by
-- two clients:
--   * the kinetics editor frontend (anon key) — reads counts, enqueues unknowns
--   * the biobuilder-db-helper worker (service role key) — drains the queue
--
-- Sentinel convention surfaced to the UI: a protein the cache has never seen
-- has reaction_count = -1 ("not searched yet"); the frontend treats a missing
-- row the same way and enqueues it.

create table if not exists public.proteins (
	uniprot_id         text primary key,
	reaction_count     integer,                    -- null until known; >= 0 when done
	status             text not null default 'pending'
		check (status in ('pending', 'processing', 'done', 'error')),
	attempts           integer not null default 0,
	request_count      integer not null default 1, -- popularity: how many times asked
	first_requested_at timestamptz not null default now(),
	last_requested_at  timestamptz not null default now(),
	updated_at         timestamptz not null default now()
);

create index if not exists proteins_status_idx
	on public.proteins (status, request_count desc, last_requested_at asc);

alter table public.proteins enable row level security;

-- Clients (anon) may READ counts. They may NOT write directly — all writes go
-- through the SECURITY DEFINER functions below, so a client can never forge a
-- reaction_count or mark something done.
drop policy if exists "anon read proteins" on public.proteins;
create policy "anon read proteins"
	on public.proteins for select
	to anon
	using (true);

-- Enqueue / "I want to know about these proteins". Safe upsert: creates pending
-- rows or bumps popularity; re-requesting an errored protein resets it to retry.
create or replace function public.request_proteins(ids text[])
returns void
language sql
security definer
set search_path = public
as $$
	insert into public.proteins (uniprot_id)
	select distinct unnest(ids)
	on conflict (uniprot_id) do update
		set request_count     = public.proteins.request_count + 1,
		    last_requested_at = now(),
		    status   = case when public.proteins.status = 'error'
		                    then 'pending' else public.proteins.status end,
		    attempts = case when public.proteins.status = 'error'
		                    then 0 else public.proteins.attempts end;
$$;

grant execute on function public.request_proteins(text[]) to anon;

-- Worker claims a batch atomically (service role only — no anon grant). Flips
-- the rows to 'processing' so overlapping cron runs don't collide.
create or replace function public.claim_proteins(batch integer)
returns setof public.proteins
language plpgsql
security definer
set search_path = public
as $$
begin
	return query
	update public.proteins p
	set status = 'processing', updated_at = now()
	where p.uniprot_id in (
		select uniprot_id from public.proteins
		where status = 'pending'
		order by request_count desc, last_requested_at asc
		limit batch
		for update skip locked
	)
	returning p.*;
end;
$$;
