import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const COLS = ['Initial Contact', 'Quoted', 'Accepted', 'Scheduled'];
export default function Operations() {
    const [cols] = useState(COLS);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Operations" }), _jsx("div", { className: "grid grid-cols-4 gap-4", children: cols.map(c => (_jsxs("div", { className: "bg-gray-100 p-3 rounded min-h-[200px]", children: [_jsx("h3", { className: "font-semibold mb-2", children: c }), _jsx("div", { className: "text-sm text-gray-500", children: "No quotes" })] }, c))) }), _jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4", children: [_jsx("div", { className: "border rounded p-4", children: "Gantt Chart (placeholder)" }), _jsx("div", { className: "border rounded p-4", children: "Timesheets & Travel Tracker (placeholder)" })] })] }));
}
