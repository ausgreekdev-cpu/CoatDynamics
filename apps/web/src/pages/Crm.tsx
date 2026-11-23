import { useState } from 'react';
import { useClients } from '../hooks/useClients';
import { supabase } from '../lib/supabase';

export default function Crm() {
  const { clients, loading, add } = useClients();
  const [name, setName] = useState('');
  const [links, setLinks] = useState<Record<string, string>>({});
  const createLink = async (clientId: string) => {
    const { data } = await supabase.rpc('create_portal_token', { p_client_id: clientId });
    if (data) setLinks({ ...links, [clientId]: `${window.location.origin}/portal/${data}` });
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CRM — Clients</h1>
      <form onSubmit={e => { e.preventDefault(); add(name); setName(''); }} className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Client name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {clients.map(c => (
            <li key={c.id} className="border rounded p-3">
              <div className="flex justify-between items-center">
                <span>{c.name} <span className="text-gray-500 text-sm">{c.email}</span></span>
                <button onClick={()=>createLink(c.id)} className="text-blue-600 text-sm">Create portal link</button>
              </div>
              {links[c.id] && <a href={links[c.id]} target="_blank" rel="noreferrer" className="text-xs break-all text-green-700">{links[c.id]}</a>}
            </li>
          ))}
          {clients.length === 0 && <li className="text-gray-500">No clients yet.</li>}
        </ul>
      )}
    </div>
  );
}
