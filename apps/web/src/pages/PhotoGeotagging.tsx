import { useRef, useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useJobPhotos } from '../hooks/useJobPhotos';

export default function PhotoGeotagging() {
  const { jobs } = useJobs();
  const [jobId, setJobId] = useState('');
  const { photos, loading, add } = useJobPhotos(jobId || undefined);
  const [preview, setPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  };

  const save = async () => {
    if (!jobId || !preview) return;
    let lat: number | undefined, lng: number | undefined;
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
      lat = pos.coords.latitude; lng = pos.coords.longitude;
    } catch { /* no location */ }
    await add(jobId, preview, lat, lng);
    setPreview('');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Photo Geotagging</h1>
      <select className="border p-2 rounded w-full mb-3" value={jobId} onChange={e=>setJobId(e.target.value)}>
        <option value="">Select job</option>
        {jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title}</option>)}
      </select>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="mb-3" />
      {preview && <img src={preview} alt="preview" className="w-full max-h-64 object-contain mb-3" />}
      <button onClick={save} disabled={!jobId || !preview} className="bg-blue-600 text-white px-4 py-2 rounded">Save photo</button>
      <h2 className="font-semibold mt-6">Photos</h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((p: any) => (
            <div key={p.id} className="border rounded p-2">
              {p.photo_base64 && <img src={p.photo_base64} alt="job" className="w-full h-32 object-cover" />}
              {p.latitude && <p className="text-xs text-gray-500 mt-1">{Number(p.latitude).toFixed(4)}, {Number(p.longitude).toFixed(4)}</p>}
            </div>
          ))}
          {photos.length === 0 && <p className="text-gray-500">No photos yet.</p>}
        </div>
      )}
    </div>
  );
}
