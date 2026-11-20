create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  job_id uuid references jobs(id),
  sender_id uuid references auth.users(id),
  body text not null,
  created_at timestamptz not null default now()
);
alter table chat_messages enable row level security;
create policy "tenant read chat" on chat_messages for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write chat" on chat_messages for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
