-- Write policies for tenants and profiles
create policy "tenant owners insert tenant" on tenants
  for insert with check (true);
create policy "tenant owners update tenant" on tenants
  for update using (id = (auth.jwt() ->> 'tenant_id')::uuid);
create policy "users update own profile" on profiles
  for update using (id = auth.uid());
create policy "tenant admins insert profiles" on profiles
  for insert with check (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
