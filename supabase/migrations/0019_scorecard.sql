create table if not exists subcontractor_scorecards (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  name text not null,
  jobs_completed int default 0,
  on_time int default 0,
  rework int default 0,
  updated_at timestamptz not null default now()
);
alter table subcontractor_scorecards enable row level security;
create policy "tenant read scorecard" on subcontractor_scorecards for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write scorecard" on subcontractor_scorecards for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant update scorecard" on subcontractor_scorecards for update using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
