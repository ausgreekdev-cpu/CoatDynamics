-- Enable RLS
alter table tenants enable row level security;
alter table profiles enable row level security;

-- Tenants: only members of tenant can read; super-admin via service role
create policy "tenant members read tenant" on tenants
  for select using (
    id = (auth.jwt() ->> 'tenant_id')::uuid
  );

-- Profiles: users read own profile and tenant peers
create policy "users read own profile" on profiles
  for select using (id = auth.uid());
create policy "tenant peers read profiles" on profiles
  for select using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
