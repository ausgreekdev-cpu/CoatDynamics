import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PortalPage({ token }: { token: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const load = async () => {
    const { data, error } = await supabase.rpc('get_portal_data', { p_token: token });
    if (error) setError(error.message);
    else if (data?.error) setError(data.error);
    else setData(data);
  };
  useEffect(() => { load(); }, [token]);
  const approve = async (jobId: string) => {
    await supabase.rpc('approve_portal_quote', { p_token: token, p_job_id: jobId });
    await load();
  };
  if (error) return <div className="p-6 text-red-600">Portal error: {error}</div>;
  if (!data) return <div className="p-6">Loading portal...</div>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Client Portal</h1>
      <p className="text-gray-600 mb-6">Welcome, {data.client?.name}</p>
      <h2 className="font-semibold">Jobs</h2>
      <ul className="space-y-2 mb-6">
        {(data.jobs || []).map((j: any, i: number) => (
          <li key={i} className="border rounded p-3 flex justify-between items-center">
            <span>{j.title} — <em>{j.status}</em></span>
            {j.status === 'Quoted' && <button onClick={()=>approve(j.id)} className="text-blue-600 text-sm">Approve</button>}
          </li>
        ))}
        {(!data.jobs || data.jobs.length === 0) && <li className="text-gray-500">No jobs.</li>}
      </ul>
      <h2 className="font-semibold">Invoices</h2>
      <ul>
        {(data.invoices || []).map((i: any, n: number) => <li key={n} className="border-b py-2">${i.amount} — {i.status}</li>)}
        {(!data.invoices || data.invoices.length === 0) && <li className="text-gray-500">No invoices.</li>}
      </ul>
    </div>
  );
}
