import { useState } from 'react';
const TYPES = ['Clients','Builders','Employees','Subcontractors','Accountants','Suppliers'];
export default function Crm() {
  const [tab, setTab] = useState(TYPES[0]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CRM & Stakeholders</h1>
      <div className="flex gap-2 flex-wrap mb-4">
        {TYPES.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1 rounded border ${tab===t?'bg-blue-600 text-white':'bg-white'}`}>{t}</button>
        ))}
      </div>
      <p className="text-gray-600">Managing: {tab}</p>
      <div className="mt-4 p-4 border rounded">No records yet.</div>
    </div>
  );
}
