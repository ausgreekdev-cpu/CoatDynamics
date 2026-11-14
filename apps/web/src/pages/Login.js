import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../lib/supabase';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const signIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setMsg(error ? error.message : 'Signed in');
    };
    const signUp = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        setMsg(error ? error.message : 'Check email');
    };
    return (_jsxs("div", { className: "p-6 max-w-md mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Login" }), _jsx("input", { className: "w-full border p-2 rounded mb-2", placeholder: "Email", value: email, onChange: e => setEmail(e.target.value) }), _jsx("input", { className: "w-full border p-2 rounded mb-2", type: "password", placeholder: "Password", value: password, onChange: e => setPassword(e.target.value) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", onClick: signIn, children: "Sign In" }), _jsx("button", { className: "border px-4 py-2 rounded", onClick: signUp, children: "Sign Up" })] }), msg && _jsx("p", { className: "mt-2 text-sm", children: msg })] }));
}
