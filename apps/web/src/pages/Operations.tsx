import { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
const COLS = ['Initial Contact','Quoted','Accepted','Scheduled'];

export default function Operations() {
  const { jobs, loading, add, move } = useJobs();
  const [title, setTitle] = useState('');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Operations — Job Pipeline</h1>
      <form onSubmit={e => { e.preventDefault(); add(title); setTitle(''); }} className="flex gap-2 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="New job title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-4 gap-4">
          {COLS.map(c => (
            <div key={c} className="bg-gray-100 p-3 rounded min-h-[200px]">
              <h3 className="font-semibold mb-2">{c}</h3>
              {jobs.filter(j=>j.status===c).map(j => (
                <div key={j.id} className="bg-white p-2 rounded mb-2 shadow text-sm">
                  {j.title}
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {COLS.filter(x=>x!==c).map(s => (
                      <button key={s} onClick={()=>move(j.id,s)} className="text-xs text-blue-600">{s}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
