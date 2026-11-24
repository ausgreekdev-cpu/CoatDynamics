import { useRef, useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useJobNotes } from '../hooks/useJobNotes';

export default function VoiceNotes() {
  const { jobs } = useJobs();
  const [jobId, setJobId] = useState('');
  const { notes, loading, add } = useJobNotes(jobId || undefined);
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState('');
  const [note, setNote] = useState('');
  const mr = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const r = new MediaRecorder(stream);
    chunks.current = [];
    r.ondataavailable = (e) => chunks.current.push(e.data);
    r.onstop = async () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => setAudio(reader.result as string);
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(t => t.stop());
    };
    r.start();
    mr.current = r;
    setRecording(true);
  };
  const stop = () => { mr.current?.stop(); setRecording(false); };

  const save = async () => { await add(note, audio); setNote(''); setAudio(''); };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Voice Notes on Jobs</h1>
      <select className="border p-2 rounded w-full mb-3" value={jobId} onChange={e=>setJobId(e.target.value)}>
        <option value="">All jobs</option>
        {jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title}</option>)}
      </select>
      <div className="flex gap-2 mb-3">
        {!recording ? <button onClick={start} className="bg-green-600 text-white px-4 py-2 rounded">Record</button>
          : <button onClick={stop} className="bg-red-600 text-white px-4 py-2 rounded">Stop</button>}
      </div>
      {audio && <audio controls src={audio} className="w-full mb-3" />}
      <textarea className="border p-2 rounded w-full mb-2" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
      <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save note</button>
      <h2 className="font-semibold mt-6">Notes</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {notes.map((n: any) => (
            <li key={n.id} className="border rounded p-3">
              {n.note && <p>{n.note}</p>}
              {n.audio_base64 && <audio controls src={n.audio_base64} className="w-full mt-2" />}
            </li>
          ))}
          {notes.length === 0 && <li className="text-gray-500">No notes yet.</li>}
        </ul>
      )}
    </div>
  );
}
