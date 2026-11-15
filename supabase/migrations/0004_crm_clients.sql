create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);
alter table clients enable row level security;
create policy "tenant read clients" on clients for select using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
create policy "tenant write clients" on clients for insert with check (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
create policy "tenant update clients" on clients for update using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
