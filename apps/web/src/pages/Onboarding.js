import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../lib/supabase';
export default function Onboarding() {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [msg, setMsg] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        const { data: existing } = await supabase.from('tenants').select('id').eq('slug', slug).maybeSingle();
        if (existing) {
            setMsg('Slug already taken');
            return;
        }
        const { data: t, error } = await supabase.from('tenants').insert({ name, slug }).select().single();
        if (error) {
            setMsg(error.message);
            return;
        }
        const { data: u } = await supabase.auth.getUser();
        if (u.user)
            await supabase.from('profiles').upsert({ id: u.user.id, tenant_id: t.id, role: 'tenant_owner', full_name: name });
        setMsg('Tenant created: ' + t.id);
    };
    return (_jsxs("div", { className: "p-6 max-w-md mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "New Tenant Onboarding" }), _jsxs("form", { className: "space-y-4", onSubmit: submit, children: [_jsx("input", { className: "w-full border p-2 rounded", placeholder: "Business name", value: name, onChange: e => setName(e.target.value) }), _jsx("input", { className: "w-full border p-2 rounded", placeholder: "Slug", value: slug, onChange: e => setSlug(e.target.value) }), _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", type: "submit", children: "Create Tenant" })] }), msg && _jsx("p", { className: "mt-2 text-sm", children: msg })] }));
}
