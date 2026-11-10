import { useState } from 'react';
const COLS = ['Initial Contact','Quoted','Accepted','Scheduled'];
export default function Operations() {
  const [cols] = useState(COLS);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Operations</h1>
      <div className="grid grid-cols-4 gap-4">
        {cols.map(c => (
          <div key={c} className="bg-gray-100 p-3 rounded min-h-[200px]">
            <h3 className="font-semibold mb-2">{c}</h3>
            <div className="text-sm text-gray-500">No quotes</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="border rounded p-4">Gantt Chart (placeholder)</div>
        <div className="border rounded p-4">Timesheets & Travel Tracker (placeholder)</div>
      </div>
    </div>
  );
}
