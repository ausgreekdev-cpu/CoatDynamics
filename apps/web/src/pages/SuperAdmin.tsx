import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '@painter/ui';
import { formatCurrency } from '@painter/core';

export default function SuperAdmin() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  useEffect(() => {
    supabase.from('tenants').select('*').then(({ data, error }) => {
      if (error) setErr(error.message);
      else setTenants(data || []);
      setLoading(false);
    });
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Super-Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {err && <p className="text-red-600">{err}</p>}
      {!loading && tenants.length === 0 && <p className="text-gray-500">No tenants yet.</p>}
      <ul className="space-y-2">
        {tenants.map(t => (
          <li key={t.id} className="border rounded p-3">{t.name} <span className="text-gray-500 text-sm">({t.slug}) — {t.plan}</span></li>
        ))}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>Tenants: {tenants.length}</Card>
        <Card>MRR: {formatCurrency(0)}</Card>
        <Card>Active Subs: 0</Card>
      </div>
    </div>
  );
}
