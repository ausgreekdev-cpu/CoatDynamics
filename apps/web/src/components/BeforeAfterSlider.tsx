import { useState } from 'react';

export default function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title?: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative w-full overflow-hidden rounded border" style={{ aspectRatio: '16/9' }}>
      <img src={after} alt="after" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="before" className="w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))} className="absolute bottom-2 left-2 right-2 w-[calc(100%-1rem)]" />
      {title && <span className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">{title}</span>}
    </div>
  );
}