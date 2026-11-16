create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(), tenant_id uuid not null references tenants(id),
  title text not null, before_url text, after_url text, job_id uuid,
  created_at timestamptz not null default now()
);
alter table portfolio_items enable row level security;
create policy "tenant read portfolio" on portfolio_items for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write portfolio" on portfolio_items for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
