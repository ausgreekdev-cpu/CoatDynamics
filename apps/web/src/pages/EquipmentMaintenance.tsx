import { useState } from 'react';
import { useEquipment } from '../hooks/useEquipment';

export default function EquipmentMaintenance() {
  const { items, logs, loading, addEquipment, logService, addHours } = useEquipment();
  const [name, setName] = useState('');
  const [note] = useState('');
  const [hrs] = useState(1);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Equipment Maintenance Log</h1>
      <form onSubmit={e => { e.preventDefault(); addEquipment(name); setName(''); }} className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Equipment name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <>
          <ul className="space-y-2 mb-6">
            {items.map((it: any) => {
              const due = Number(it.hours_used) >= Number(it.service_interval_hours);
              return (
                <li key={it.id} className={`border rounded p-3 ${due ? 'bg-red-100' : ''}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{it.name}</span>
                    <span className="text-sm">{it.hours_used}/{it.service_interval_hours} hrs {due && '· SERVICE DUE'}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>addHours(it.id, hrs)} className="text-xs text-blue-600">+{hrs}h use</button>
                    <button onClick={()=>logService(it.id, note || 'Serviced')} className="text-xs text-green-600">Log service</button>
                  </div>
                </li>
              );
            })}
            {items.length === 0 && <li className="text-gray-500">No equipment yet.</li>}
          </ul>
          <h2 className="font-semibold">Recent maintenance</h2>
          <ul className="space-y-1">
            {logs.map((l: any) => <li key={l.id} className="text-sm border-b py-1">{l.serviced_on} — {l.note}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
