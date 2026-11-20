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
EOF
# wire tab
python3 - <<'PY'
p='src/App.tsx'
s=open(p).read()
if "import SignaturePadPage" not in s:
    s=s.replace("import CrewChat from './pages/CrewChat'","import CrewChat from './pages/CrewChat'\nimport SignaturePadPage from './pages/SignaturePad'")
if "['sig','Signature']" not in s:
    s=s.replace("['chat','Crew Chat'],","['chat','Crew Chat'],['sig','Signature'],")
if "view==='sig'" not in s:
    s=s.replace("{view==='chat'&&<CrewChat/>}","{view==='chat'&&<CrewChat/>}\n      {view==='sig'&&<SignaturePadPage/>}")
open(p,'w').write(s)
print('done')
PY
pnpm build 2>&1 | tail -3