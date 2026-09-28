create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Allow public insert"
on public.profiles
for insert
with check (true);

create policy "Allow public read"
on public.profiles
for select
using (true);
