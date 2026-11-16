import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  const add = async (title: string, status = 'Initial Contact') => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('jobs').insert({ title, status, tenant_id: prof!.tenant_id });
    await refresh();
  };
  const move = async (id: string, status: string) => {
    await supabase.from('jobs').update({ status }).eq('id', id);
    await refresh();
  };
  return { jobs, loading, add, move, refresh };
}
