create table if not exists job_photos (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  job_id uuid references jobs(id),
  photo_base64 text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz not null default now()
);
alter table job_photos enable row level security;
create policy "tenant read job photos" on job_photos for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write job photos" on job_photos for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
