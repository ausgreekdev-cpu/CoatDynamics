create table if not exists equipment (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  name text not null,
  hours_used numeric default 0,
  service_interval_hours numeric default 100,
  last_service date,
  created_at timestamptz not null default now()
);
create table if not exists maintenance_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  equipment_id uuid references equipment(id),
  note text,
  serviced_on date not null default current_date,
  created_at timestamptz not null default now()
);
alter table equipment enable row level security;
alter table maintenance_logs enable row level security;
create policy "tenant read equipment" on equipment for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write equipment" on equipment for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant update equipment" on equipment for update using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read maintenance" on maintenance_logs for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write maintenance" on maintenance_logs for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
