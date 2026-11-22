import { useState } from 'react';

export default function PaintMixingCalculator() {
  const [base, setBase] = useState(10);
  const [tints, setTints] = useState([{ name: 'Red', pct: 5 }, { name: 'Blue', pct: 2 }]);
  const [total, setTotal] = useState(12);

  const tintTotal = tints.reduce((s, t) => s + t.pct, 0);
  const baseNeeded = (base / (base + tintTotal)) * total;
  const tintNeeded = (tintTotal / (base + tintTotal)) * total;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paint Mixing Calculator</h1>
      <label className="block mb-2">Base ratio<input type="number" className="border p-1 w-full" value={base} onChange={e=>setBase(+e.target.value)} /></label>
      <label className="block mb-2">Total volume (L)<input type="number" className="border p-1 w-full" value={total} onChange={e=>setTotal(+e.target.value)} /></label>
      <h2 className="font-semibold mt-3">Tints</h2>
      {tints.map((t, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input className="border p-1 flex-1" value={t.name} onChange={e=>{const c=[...tints];c[i].name=e.target.value;setTints(c);}} />
          <input type="number" className="border p-1 w-20" value={t.pct} onChange={e=>{const c=[...tints];c[i].pct=+e.target.value;setTints(c);}} />
        </div>
      ))}
      <button className="text-blue-600 text-sm" onClick={()=>setTints([...tints,{name:'Tint',pct:1}])}>+ Add tint</button>
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <p>Base: {baseNeeded.toFixed(2)} L</p>
        <p>Tints: {tintNeeded.toFixed(2)} L</p>
        <p className="font-bold">Total: {total.toFixed(2)} L</p>
      </div>
    </div>
  );
}
