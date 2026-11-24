import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    setClients(data || []);
    setLoading(false);
  };
  // eslint-disable-next-line react/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { refresh(); }, []);
  const add = async (name: string, email?: string, phone?: string) => {
    const { data: u } = await supabase.auth.getUser();
    // tenant_id from profile; fetch
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('clients').insert({ name, email, phone, tenant_id: prof!.tenant_id });
    await refresh();
  };
  return { clients, loading, add, refresh };
}
