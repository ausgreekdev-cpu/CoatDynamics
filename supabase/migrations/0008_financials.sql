create table if not exists invoices (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  job_id uuid, client_id uuid, amount numeric not null default 0, status text default 'draft',
  created_at timestamptz not null default now()
);
create table if not exists quote_lines (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  job_id uuid, description text, qty numeric default 1, rate numeric default 0, created_at timestamptz not null default now()
);
create table if not exists job_costs (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  job_id uuid, label text, amount numeric default 0, created_at timestamptz not null default now()
);
alter table invoices enable row level security; alter table quote_lines enable row level security; alter table job_costs enable row level security;
create policy "tenant read invoices" on invoices for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write invoices" on invoices for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read quote_lines" on quote_lines for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write quote_lines" on quote_lines for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read job_costs" on job_costs for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write job_costs" on job_costs for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
