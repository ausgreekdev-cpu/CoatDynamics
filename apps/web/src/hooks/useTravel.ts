import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useTravel() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('travel_entries').select('*').order('started_at', { ascending: false });
    setEntries(data || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  const start = async () => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    const { data } = await supabase.from('travel_entries').insert({ tenant_id: prof!.tenant_id, user_id: u.user!.id, started_at: new Date().toISOString() }).select().single();
    return data;
  };
  const stop = async (id: string, distanceKm: number) => {
    await supabase.from('travel_entries').update({ ended_at: new Date().toISOString(), distance_km: distanceKm }).eq('id', id);
    await refresh();
  };
  return { entries, loading, start, stop, refresh };
}
