import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useJobs } from './useJobs';

export function useWeather() {
  const { jobs } = useJobs();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const { data } = await supabase.from('weather_alerts').select('*');
    setAlerts(data || []);
    setLoading(false);
  };
  // eslint-disable-next-line react/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { refresh(); }, []);

  const checkWeather = async () => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    const results: any[] = [];
    for (const job of jobs) {
      if (!job.scheduled_date || job.latitude == null || job.longitude == null) continue;
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${job.latitude}&longitude=${job.longitude}&daily=precipitation_probability_max,temperature_2m_max&start_date=${job.scheduled_date}&end_date=${job.scheduled_date}&timezone=auto`;
        const res = await fetch(url);
        const json: any = await res.json();
        const precip = json.daily?.precipitation_probability_max?.[0] ?? 0;
        const temp = json.daily?.temperature_2m_max?.[0] ?? null;
        const risk = precip > 60 ? 'high' : precip > 30 ? 'medium' : 'low';
        results.push({ job_id: job.id, risk_level: risk, precipitation: precip, temperature: temp });
      } catch { /* skip failed lookups */ }
    }
    await supabase.from('weather_alerts').delete().eq('tenant_id', prof!.tenant_id);
    if (results.length) {
      await supabase.from('weather_alerts').insert(results.map(r => ({ ...r, tenant_id: prof!.tenant_id })));
    }
    await refresh();
  };

  return { jobs, alerts, loading, checkWeather, refresh };
}
