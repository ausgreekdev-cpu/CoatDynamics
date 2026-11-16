import { useTenantTable } from '../hooks/useTenantTable';

function expiryColor(date: string) {
  const days = (new Date(date).getTime() - Date.now()) / 86400000;
  if (days <= 30) return 'bg-red-200';
  if (days <= 60) return 'bg-yellow-200';
  return 'bg-green-200';
}

export default function Compliance() {
  const msds = useTenantTable('msds');
  const licenses = useTenantTable('licenses');
  const swms = useTenantTable('swms');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compliance</h1>
      <section className="mb-6">
        <h2 className="font-semibold">MSDS Library</h2>
        {msds.rows.map((m: any) => <div key={m.id} className="border p-2 rounded my-1">{m.product}</div>)}
        {msds.rows.length === 0 && <p className="text-gray-500">No MSDS yet.</p>}
      </section>
      <section className="mb-6">
        <h2 className="font-semibold">SWMS</h2>
        {swms.rows.map((s: any) => <div key={s.id} className="border p-2 rounded my-1">{s.title}</div>)}
        {swms.rows.length === 0 && <p className="text-gray-500">No SWMS yet.</p>}
      </section>
      <section>
        <h2 className="font-semibold">License Expiry</h2>
        {licenses.rows.map((l: any) => (
          <div key={l.id} className={`p-2 rounded my-1 ${expiryColor(l.expires_on)}`}>{l.name} — {l.expires_on}</div>
        ))}
        {licenses.rows.length === 0 && <p className="text-gray-500">No licenses yet.</p>}
      </section>
    </div>
  );
}
