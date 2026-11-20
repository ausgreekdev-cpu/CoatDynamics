import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignaturePadPage() {
  const ref = useRef<SignatureCanvas>(null);
  const [img, setImg] = useState('');
  const clear = () => { ref.current?.clear(); setImg(''); };
  const save = () => { setImg(ref.current?.toDataURL() || ''); };
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Digital Signature Pad</h1>
      <div className="border rounded">
        <SignatureCanvas ref={ref} penColor="black" canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={clear} className="border px-4 py-2 rounded">Clear</button>
        <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
      {img && <img src={img} alt="signature" className="mt-4 border rounded" />}
    </div>
  );
}