import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useEquipment() {
  const [items, setItems] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    const [{ data: e }, { data: l }] = await Promise.all([
      supabase.from('equipment').select('*').order('name'),
      supabase.from('maintenance_logs').select('*').order('serviced_on', { ascending: false }),
    ]);
    setItems(e || []);
    setLogs(l || []);
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);
  const addEquipment = async (name: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('equipment').insert({ name, tenant_id: prof!.tenant_id });
    await refresh();
  };
  const logService = async (equipmentId: string, note: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('maintenance_logs').insert({ equipment_id: equipmentId, note, tenant_id: prof!.tenant_id });
    await supabase.from('equipment').update({ last_service: new Date().toISOString().slice(0, 10) }).eq('id', equipmentId);
    await refresh();
  };
  const addHours = async (equipmentId: string, hours: number) => {
    const item = items.find(i => i.id === equipmentId);
    if (!item) return;
    await supabase.from('equipment').update({ hours_used: Number(item.hours_used) + hours }).eq('id', equipmentId);
    await refresh();
  };
  return { items, logs, loading, addEquipment, logService, addHours, refresh };
}
