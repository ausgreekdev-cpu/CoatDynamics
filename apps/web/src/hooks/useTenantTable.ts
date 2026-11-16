import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useTenantTable<T = any>(table: string, orderCol = 'created_at') {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from(table).select('*').order(orderCol, { ascending: false });
    setRows((data as T[]) || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, [table]);
  const add = async (payload: Record<string, any>) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from(table).insert({ ...payload, tenant_id: prof!.tenant_id });
    await refresh();
  };
  return { rows, loading, add, refresh };
}
