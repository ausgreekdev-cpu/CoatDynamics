import { useTenantTable } from '../hooks/useTenantTable';

export default function Inventory() {
  const { rows, loading, add } = useTenantTable('inventory_items');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <AddItem onAdd={add} />
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">{rows.map((r: any) => (
          <li key={r.id} className="border rounded p-3">{r.name} — {r.qty} {r.unit}</li>
        ))}{rows.length === 0 && <li className="text-gray-500">No stock yet.</li>}</ul>
      )}
    </div>
  );
}
function AddItem({ onAdd }: { onAdd: (p: any) => Promise<void> }) {
  return <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={() => onAdd({ name: 'New item', qty: 1, unit: 'L' })}>Add stock</button>;
}
