create table if not exists blueprint_annotations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  title text not null,
  image_base64 text,
  annotation_base64 text,
  created_at timestamptz not null default now()
);
alter table blueprint_annotations enable row level security;
create policy "tenant read blueprints" on blueprint_annotations for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write blueprints" on blueprint_annotations for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
