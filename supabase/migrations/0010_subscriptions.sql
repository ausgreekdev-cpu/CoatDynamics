create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenants(id),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text default 'inactive',
  plan text default 'starter',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table subscriptions enable row level security;
create policy "tenant read subscription" on subscriptions
  for select using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
