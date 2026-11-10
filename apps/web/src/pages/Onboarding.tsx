import { useState } from 'react';
export default function Onboarding() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Tenant Onboarding</h1>
      <form className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Business name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Slug" value={slug} onChange={e=>setSlug(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Create Tenant</button>
      </form>
    </div>
  );
}
