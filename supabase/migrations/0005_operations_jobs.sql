create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  title text not null,
  status text not null default 'Initial Contact',
  created_at timestamptz not null default now()
);
alter table jobs enable row level security;
create policy "tenant read jobs" on jobs for select using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
create policy "tenant write jobs" on jobs for insert with check (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
create policy "tenant update jobs" on jobs for update using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
