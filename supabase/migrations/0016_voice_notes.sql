create table if not exists job_notes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  job_id uuid references jobs(id),
  note text,
  audio_base64 text,
  created_at timestamptz not null default now()
);
alter table job_notes enable row level security;
create policy "tenant read job notes" on job_notes for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write job notes" on job_notes for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
