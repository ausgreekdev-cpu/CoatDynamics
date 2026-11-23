import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useBlueprints() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('blueprint_annotations').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  const add = async (title: string, imageBase64: string, annotationBase64: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('blueprint_annotations').insert({ title, image_base64: imageBase64, annotation_base64: annotationBase64, tenant_id: prof!.tenant_id });
    await refresh();
  };
  return { rows, loading, add, refresh };
}
