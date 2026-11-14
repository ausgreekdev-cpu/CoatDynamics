import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const TYPES = ['Clients', 'Builders', 'Employees', 'Subcontractors', 'Accountants', 'Suppliers'];
export default function Crm() {
    const [tab, setTab] = useState(TYPES[0]);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "CRM & Stakeholders" }), _jsx("div", { className: "flex gap-2 flex-wrap mb-4", children: TYPES.map(t => (_jsx("button", { onClick: () => setTab(t), className: `px-3 py-1 rounded border ${tab === t ? 'bg-blue-600 text-white' : 'bg-white'}`, children: t }, t))) }), _jsxs("p", { className: "text-gray-600", children: ["Managing: ", tab] }), _jsx("div", { className: "mt-4 p-4 border rounded", children: "No records yet." })] }));
}
