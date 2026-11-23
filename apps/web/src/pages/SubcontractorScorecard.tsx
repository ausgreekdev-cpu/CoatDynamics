import { useState } from 'react';
import { useScorecards } from '../hooks/useScorecards';

export default function SubcontractorScorecard() {
  const { rows, loading, add, update } = useScorecards();
  const [name, setName] = useState('');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subcontractor Scorecard</h1>
      <form onSubmit={e => { e.preventDefault(); add(name); setName(''); }} className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Subcontractor name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <table className="w-full border text-sm">
          <thead><tr className="bg-gray-100"><th className="p-2 text-left">Name</th><th>Jobs</th><th>On-time</th><th>Rework</th><th>Score</th><th></th></tr></thead>
          <tbody>
            {rows.map((r: any) => {
              const score = r.jobs_completed ? Math.round((r.on_time / r.jobs_completed) * 100) : 0;
              return (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{r.name}</td>
                  <td className="text-center">{r.jobs_completed}</td>
                  <td className="text-center">{r.on_time}</td>
                  <td className="text-center">{r.rework}</td>
                  <td className="text-center font-bold">{score}%</td>
                  <td className="p-2 flex gap-1">
                    <button onClick={()=>update(r.id,{jobs_completed:r.jobs_completed+1})} className="text-xs text-blue-600">+job</button>
                    <button onClick={()=>update(r.id,{on_time:r.on_time+1})} className="text-xs text-green-600">+on-time</button>
                    <button onClick={()=>update(r.id,{rework:r.rework+1})} className="text-xs text-red-600">+rework</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {rows.length === 0 && <p className="text-gray-500 mt-4">No subcontractors yet.</p>}
    </div>
  );
}
