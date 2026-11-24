import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useJobPhotos(jobId?: string) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    let q = supabase.from('job_photos').select('*').order('created_at', { ascending: false });
    if (jobId) q = q.eq('job_id', jobId);
    const { data } = await q;
    setPhotos(data || []);
    setLoading(false);
  };
  // eslint-disable-next-line react/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { refresh(); }, [jobId]);
  const add = async (jobId: string, photoBase64: string, lat?: number, lng?: number) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('job_photos').insert({ job_id: jobId, photo_base64: photoBase64, latitude: lat, longitude: lng, tenant_id: prof!.tenant_id });
    await refresh();
  };
  return { photos, loading, add, refresh };
}
