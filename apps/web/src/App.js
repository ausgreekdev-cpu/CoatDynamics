import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from './lib/supabase';
import { useAuth } from './auth/AuthProvider';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import Onboarding from './pages/Onboarding';
import Crm from './pages/Crm';
import Operations from './pages/Operations';
import Inventory from './pages/Inventory';
import Compliance from './pages/Compliance';
import Financials from './pages/Financials';
import PublicHub from './pages/PublicHub';
import './App.css';
function App() {
    const { session, loading } = useAuth();
    const [view, setView] = useState('admin');
    if (loading)
        return _jsx("div", { className: "p-6", children: "Loading..." });
    if (!session)
        return _jsx(Login, {});
    const tabs = [
        ['admin', 'Super-Admin'], ['onboard', 'Onboarding'], ['crm', 'CRM'], ['ops', 'Operations'],
        ['inv', 'Inventory'], ['comp', 'Compliance'], ['fin', 'Financials'], ['hub', 'Public Hub'],
    ];
    return (_jsxs("div", { children: [_jsxs("nav", { className: "flex gap-2 p-4 border-b flex-wrap items-center", children: [tabs.map(([k, l]) => (_jsx("button", { onClick: () => setView(k), className: `px-3 py-1 rounded border ${view === k ? 'bg-blue-600 text-white' : 'bg-white'}`, children: l }, k))), _jsx("button", { onClick: () => supabase.auth.signOut(), className: "ml-auto text-red-600", children: "Sign out" })] }), view === 'admin' && _jsx(SuperAdmin, {}), view === 'onboard' && _jsx(Onboarding, {}), view === 'crm' && _jsx(Crm, {}), view === 'ops' && _jsx(Operations, {}), view === 'inv' && _jsx(Inventory, {}), view === 'comp' && _jsx(Compliance, {}), view === 'fin' && _jsx(Financials, {}), view === 'hub' && _jsx(PublicHub, {})] }));
}
export default App;
