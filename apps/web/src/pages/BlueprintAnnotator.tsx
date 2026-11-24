import { useRef, useState } from 'react';
import { useBlueprints } from '../hooks/useBlueprints';

export default function BlueprintAnnotator() {
  const { rows, loading, add } = useBlueprints();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [title, setTitle] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [imageData, setImageData] = useState('');

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onloadend = () => {
      setImageData(r.result as string);
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current!;
        c.width = img.width; c.height = img.height;
        const ctx = c.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
      };
      img.src = r.result as string;
    };
    r.readAsDataURL(f);
  };

  const start = (e: React.MouseEvent) => { setDrawing(true); draw(e); };
  const end = () => setDrawing(false);
  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;
    const c = canvasRef.current!;
    const ctx = c.getContext('2d')!;
    const rect = c.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (c.width / rect.width);
    const y = (e.clientY - rect.top) * (c.height / rect.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const save = async () => {
    if (!title || !canvasRef.current) return;
    const annotation = canvasRef.current.toDataURL();
    await add(title, imageData, annotation);
    setTitle('');
    setImageData('');
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blueprint & Floorplan Annotator</h1>
      <input type="file" accept="image/*" onChange={onFile} className="mb-3" />
      <input className="border p-2 rounded w-full mb-3" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <canvas ref={canvasRef} onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end} className="border rounded max-w-full cursor-crosshair" />
      <div className="mt-3"><button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save annotation</button></div>
      <h2 className="font-semibold mt-6">Saved</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {rows.map((r: any) => (
            <li key={r.id} className="border rounded p-3">
              <span className="font-semibold">{r.title}</span>
              {r.annotation_base64 && <img src={r.annotation_base64} alt="annotated" className="mt-2 max-h-40" />}
            </li>
          ))}
          {rows.length === 0 && <li className="text-gray-500">No blueprints yet.</li>}
        </ul>
      )}
    </div>
  );
}
