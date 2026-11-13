import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: existing } = await supabase.from('tenants').select('id').eq('slug', slug).maybeSingle();
    if (existing) { setMsg('Slug already taken'); return; }
    const { data: t, error } = await supabase.from('tenants').insert({ name, slug }).select().single();
    if (error) { setMsg(error.message); return; }
    const { data: u } = await supabase.auth.getUser();
    if (u.user) await supabase.from('profiles').upsert({ id: u.user.id, tenant_id: t.id, role: 'tenant_owner', full_name: name });
    setMsg('Tenant created: ' + t.id);
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Tenant Onboarding</h1>
      <form className="space-y-4" onSubmit={submit}>
        <input className="w-full border p-2 rounded" placeholder="Business name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Slug" value={slug} onChange={e=>setSlug(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Create Tenant</button>
      </form>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}
