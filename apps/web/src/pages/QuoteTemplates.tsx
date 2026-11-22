import { useState } from 'react';
import { useQuoteTemplates } from '../hooks/useQuoteTemplates';

export default function QuoteTemplates() {
  const { rows, loading, add } = useQuoteTemplates();
  const [name, setName] = useState('');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Smart Quote Templates</h1>
      <form onSubmit={e => { e.preventDefault(); add({ name, line_items: [{ description: 'Labour', qty: 1, rate: 50 }] }); setName(''); }} className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Template name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {rows.map((t: any) => (
            <li key={t.id} className="border rounded p-3">
              <span className="font-semibold">{t.name}</span>
              <pre className="text-xs mt-1 text-gray-500">{JSON.stringify(t.line_items)}</pre>
            </li>
          ))}
          {rows.length === 0 && <li className="text-gray-500">No templates yet.</li>}
        </ul>
      )}
    </div>
  );
}
