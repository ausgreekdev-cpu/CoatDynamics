import { useState } from 'react';

export function calcPaint(area: number, coverage: number, coats: number) {
  return (area * coats) / coverage;
}

export default function SurfaceEstimator() {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.4);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(12);

  const wallArea = 2 * (length + width) * height;
  const ceilingArea = length * width;
  const deductions = doors * 2 + windows * 1.5;
  const total = wallArea + ceilingArea - deductions;
  const litres = calcPaint(total, coverage, coats);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Surface Area Estimator</h1>
      <div className="grid grid-cols-2 gap-3">
        <label>Length (m)<input type="number" className="border p-1 w-full" value={length} onChange={e=>setLength(+e.target.value)} /></label>
        <label>Width (m)<input type="number" className="border p-1 w-full" value={width} onChange={e=>setWidth(+e.target.value)} /></label>
        <label>Height (m)<input type="number" className="border p-1 w-full" value={height} onChange={e=>setHeight(+e.target.value)} /></label>
        <label>Doors<input type="number" className="border p-1 w-full" value={doors} onChange={e=>setDoors(+e.target.value)} /></label>
        <label>Windows<input type="number" className="border p-1 w-full" value={windows} onChange={e=>setWindows(+e.target.value)} /></label>
        <label>Coats<input type="number" className="border p-1 w-full" value={coats} onChange={e=>setCoats(+e.target.value)} /></label>
        <label>Coverage (m²/L)<input type="number" className="border p-1 w-full" value={coverage} onChange={e=>setCoverage(+e.target.value)} /></label>
      </div>
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <p>Total surface area: {total.toFixed(2)} m²</p>
        <p className="font-bold">Paint required: {litres.toFixed(2)} L</p>
      </div>
    </div>
  );
}