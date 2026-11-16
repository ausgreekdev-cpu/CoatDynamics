import { useState } from 'react';
import { useTenantTable } from '../hooks/useTenantTable';

export default function MsdsViewer() {
  const { rows, loading } = useTenantTable('msds');
  const [q, setQ] = useState('');
  const filtered = rows.filter((m: any) => m.product.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">MSDS Viewer</h1>
      <input className="border p-2 rounded w-full max-w-md" placeholder="Search safety data sheets" value={q} onChange={e=>setQ(e.target.value)} />
      {loading ? <p>Loading...</p> : (
        <ul className="mt-4 space-y-2">
          {filtered.map((m: any) => (
            <li key={m.id} className="border rounded p-3 flex justify-between">
              <span>{m.product}</span>
              {m.file_url && <a href={m.file_url} target="_blank" rel="noreferrer" className="text-blue-600">Open PDF</a>}
            </li>
          ))}
          {filtered.length === 0 && <li className="text-gray-500">No MSDS found.</li>}
        </ul>
      )}
    </div>
  );
}
