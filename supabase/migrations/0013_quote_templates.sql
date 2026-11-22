create table if not exists quote_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  name text not null,
  line_items jsonb not null default '[]',
  created_at timestamptz not null default now()
);
alter table quote_templates enable row level security;
create policy "tenant read templates" on quote_templates for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write templates" on quote_templates for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
