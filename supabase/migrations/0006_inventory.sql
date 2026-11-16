create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  sku text, name text not null, qty numeric not null default 0, unit text default 'L',
  created_at timestamptz not null default now()
);
create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  item_id uuid references inventory_items(id),
  delta numeric not null, note text, created_at timestamptz not null default now()
);
alter table inventory_items enable row level security;
alter table stock_movements enable row level security;
create policy "tenant read items" on inventory_items for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write items" on inventory_items for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant read movements" on stock_movements for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
create policy "tenant write movements" on stock_movements for insert with check (tenant_id=(auth.jwt()->>'tenant_id')::uuid);
