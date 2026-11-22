create table if not exists travel_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  user_id uuid references auth.users(id),
  started_at timestamptz not null,
  ended_at timestamptz,
  distance_km numeric default 0,
  note text,
  created_at timestamptz not null default now()
);
alter table travel_entries enable row level security;
create policy "tenant read travel" on travel_entries for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write travel" on travel_entries for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant update travel" on travel_entries for update using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
