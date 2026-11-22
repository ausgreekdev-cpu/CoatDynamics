import { useTenantTable } from '../hooks/useTenantTable';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function PublicHub() {
  const { rows, loading } = useTenantTable('portfolio_items');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Public Hub — Portfolio</h1>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-2 gap-4">
          {rows.map((p: any) => (
            <div key={p.id} className="border rounded p-4">
              <h3 className="font-semibold">{p.title}</h3>
              {p.before_url && p.after_url ? (
                <div className="mt-2"><BeforeAfterSlider before={p.before_url} after={p.after_url} title={p.title} /></div>
              ) : (
                <>
                  {p.before_url && <img src={p.before_url} alt="before" className="h-32 object-cover mt-2" />}
                  {p.after_url && <img src={p.after_url} alt="after" className="h-32 object-cover mt-2" />}
                </>
              )}
            </div>
          ))}
          {rows.length === 0 && <p className="text-gray-500">No portfolio items yet.</p>}
        </div>
      )}
    </div>
  );
}
