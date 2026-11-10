export default function SuperAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Super-Admin Dashboard</h1>
      <p className="text-gray-600">Manage tenants, plans, and global revenue.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-lg">Tenants: 0</div>
        <div className="p-4 border rounded-lg">MRR: $0</div>
        <div className="p-4 border rounded-lg">Active Subs: 0</div>
      </div>
    </div>
  );
}
