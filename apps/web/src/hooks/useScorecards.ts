import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useScorecards() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('subcontractor_scorecards').select('*').order('name');
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  const add = async (name: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('subcontractor_scorecards').insert({ name, tenant_id: prof!.tenant_id });
    await refresh();
  };
  const update = async (id: string, patch: Record<string, any>) => {
    await supabase.from('subcontractor_scorecards').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id);
    await refresh();
  };
  return { rows, loading, add, update, refresh };
}
