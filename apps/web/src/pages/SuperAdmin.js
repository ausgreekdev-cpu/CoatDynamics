import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
export default function SuperAdmin() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    useEffect(() => {
        supabase.from('tenants').select('*').then(({ data, error }) => {
            if (error)
                setErr(error.message);
            else
                setTenants(data || []);
            setLoading(false);
        });
    }, []);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Super-Admin Dashboard" }), loading && _jsx("p", { children: "Loading..." }), err && _jsx("p", { className: "text-red-600", children: err }), !loading && tenants.length === 0 && _jsx("p", { className: "text-gray-500", children: "No tenants yet." }), _jsx("ul", { className: "space-y-2", children: tenants.map(t => (_jsxs("li", { className: "border rounded p-3", children: [t.name, " ", _jsxs("span", { className: "text-gray-500 text-sm", children: ["(", t.slug, ") \u2014 ", t.plan] })] }, t.id))) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-6", children: [_jsxs("div", { className: "p-4 border rounded-lg", children: ["Tenants: ", tenants.length] }), _jsx("div", { className: "p-4 border rounded-lg", children: "MRR: $0" }), _jsx("div", { className: "p-4 border rounded-lg", children: "Active Subs: 0" })] })] }));
}
