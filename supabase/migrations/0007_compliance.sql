create table if not exists msds (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  product text not null, file_url text, created_at timestamptz not null default now()
);
create table if not exists swms (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  title text not null, body text, created_at timestamptz not null default now()
);
create table if not exists licenses (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  name text not null, expires_on date not null, created_at timestamptz not null default now()
);
alter table msds enable row level security; alter table swms enable row level security; alter table licenses enable row level security;
create policy "tenant read msds" on msds for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write msds" on msds for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read swms" on swms for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write swms" on swms for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read licenses" on licenses for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write licenses" on licenses for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
