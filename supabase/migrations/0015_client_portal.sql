create table if not exists portal_tokens (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id),
  client_id uuid not null references clients(id),
  token uuid not null unique default gen_random_uuid(),
  expires_at timestamptz not null default (now() + interval '30 days'),
  created_at timestamptz not null default now()
);
alter table portal_tokens enable row level security;
create policy "tenant read portal tokens" on portal_tokens for select using (tenant_id=(auth.jwt()->>'tenant_id')::uuid);

create or replace function public.create_portal_token(p_client_id uuid)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_tenant uuid; v_token uuid;
begin
  select tenant_id into v_tenant from clients where id = p_client_id;
  if v_tenant is null or v_tenant <> (auth.jwt() ->> 'tenant_id')::uuid then
    raise exception 'client not found';
  end if;
  insert into portal_tokens(tenant_id, client_id) values (v_tenant, p_client_id) returning token into v_token;
  return v_token;
end; $$;
grant execute on function public.create_portal_token(uuid) to authenticated;

create or replace function public.get_portal_data(p_token uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_tenant uuid; v_client uuid; v_result jsonb;
begin
  select tenant_id, client_id into v_tenant, v_client
  from portal_tokens where token = p_token and expires_at > now();
  if v_tenant is null then return jsonb_build_object('error','invalid token'); end if;
  select jsonb_build_object(
    'client', (select jsonb_build_object('name', name, 'email', email) from clients where id = v_client),
    'jobs', (select coalesce(jsonb_agg(jsonb_build_object('title',title,'status',status)),'[]') from jobs where tenant_id=v_tenant),
    'invoices', (select coalesce(jsonb_agg(jsonb_build_object('amount',amount,'status',status)),'[]') from invoices where tenant_id=v_tenant)
  ) into v_result;
  return v_result;
end; $$;
grant execute on function public.get_portal_data(uuid) to anon, authenticated;

create or replace function public.approve_portal_quote(p_token uuid, p_job_id uuid)
returns boolean language plpgsql security definer set search_path=public as $$
declare v_tenant uuid;
begin
  select tenant_id into v_tenant from portal_tokens where token=p_token and expires_at > now();
  if v_tenant is null then return false; end if;
  update jobs set status='Accepted' where id=p_job_id and tenant_id=v_tenant;
  return true;
end; $$;
grant execute on function public.approve_portal_quote(uuid, uuid) to anon, authenticated;
