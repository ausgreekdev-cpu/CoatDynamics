import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useWeather } from '../hooks/useWeather';

export default function WeatherScheduling() {
  const { jobs, alerts, loading, checkWeather, refresh } = useWeather();
  const [sel, setSel] = useState('');
  const [date, setDate] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!sel) return;
    await supabase.from('jobs').update({
      scheduled_date: date || null,
      latitude: lat ? Number(lat) : null,
      longitude: lng ? Number(lng) : null,
    }).eq('id', sel);
    setSel(''); setDate(''); setLat(''); setLng('');
    await refresh();
  };

  const run = async () => { setBusy(true); await checkWeather(); setBusy(false); };
  const riskColor = (r: string) => r === 'high' ? 'bg-red-200' : r === 'medium' ? 'bg-yellow-200' : 'bg-green-200';

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weather-Aware Scheduling</h1>
      <div className="border rounded p-4 mb-6">
        <h2 className="font-semibold mb-2">Set job date & location</h2>
        <div className="flex flex-wrap gap-2">
          <select className="border p-2 rounded" value={sel} onChange={e=>setSel(e.target.value)}>
            <option value="">Select job</option>
            {jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
          <input type="date" className="border p-2 rounded" value={date} onChange={e=>setDate(e.target.value)} />
          <input placeholder="Lat" className="border p-2 rounded w-24" value={lat} onChange={e=>setLat(e.target.value)} />
          <input placeholder="Lng" className="border p-2 rounded w-24" value={lng} onChange={e=>setLng(e.target.value)} />
          <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button onClick={run} disabled={busy} className="bg-green-600 text-white px-4 py-2 rounded">{busy ? 'Checking...' : 'Check Weather'}</button>
        </div>
      </div>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {alerts.map((a: any) => {
            const job = jobs.find((j: any) => j.id === a.job_id);
            return (
              <li key={a.id} className={`border rounded p-3 ${riskColor(a.risk_level)}`}>
                <strong>{job?.title || 'Job'}</strong> — {a.risk_level.toUpperCase()} risk
                <span className="text-sm"> · {a.precipitation}% rain · {a.temperature}°C</span>
                {a.risk_level === 'high' && <span className="ml-2 text-sm font-semibold">Reschedule suggested</span>}
              </li>
            );
          })}
          {alerts.length === 0 && <li className="text-gray-500">No weather checks yet. Set a job date/location and run Check Weather.</li>}
        </ul>
      )}
    </div>
  );
}
