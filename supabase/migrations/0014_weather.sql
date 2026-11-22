alter table jobs add column if not exists scheduled_date date;
alter table jobs add column if not exists latitude numeric;
alter table jobs add column if not exists longitude numeric;

create table if not exists weather_alerts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  job_id uuid references jobs(id),
  risk_level text not null,
  precipitation numeric default 0,
  temperature numeric,
  checked_at timestamptz not null default now()
);
alter table weather_alerts enable row level security;
create policy "tenant read weather" on weather_alerts for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write weather" on weather_alerts for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant delete weather" on weather_alerts for delete using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
