import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useJobNotes(jobId?: string) {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    let q = supabase.from('job_notes').select('*').order('created_at', { ascending: false });
    if (jobId) q = q.eq('job_id', jobId);
    const { data } = await q;
    setNotes(data || []);
    setLoading(false);
  };
  // eslint-disable-next-line react/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { refresh(); }, [jobId]);
  const add = async (note: string, audioBase64?: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('job_notes').insert({ note, audio_base64: audioBase64, job_id: jobId || null, tenant_id: prof!.tenant_id });
    await refresh();
  };
  return { notes, loading, add, refresh };
}
