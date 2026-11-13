import { useState } from 'react'
import { supabase } from './lib/supabase'
import { useAuth } from './auth/AuthProvider'
import Login from './pages/Login'
import SuperAdmin from './pages/SuperAdmin'
import Onboarding from './pages/Onboarding'
import Crm from './pages/Crm'
import Operations from './pages/Operations'
import Inventory from './pages/Inventory'
import Compliance from './pages/Compliance'
import Financials from './pages/Financials'
import PublicHub from './pages/PublicHub'
import './App.css'

function App() {
  const { session, loading } = useAuth();
  const [view, setView] = useState('admin');
  if (loading) return <div className="p-6">Loading...</div>;
  if (!session) return <Login />;
  const tabs = [
    ['admin','Super-Admin'],['onboard','Onboarding'],['crm','CRM'],['ops','Operations'],
    ['inv','Inventory'],['comp','Compliance'],['fin','Financials'],['hub','Public Hub'],
  ];
  return (
    <div>
      <nav className="flex gap-2 p-4 border-b flex-wrap items-center">
        {tabs.map(([k,l]) => (
          <button key={k} onClick={() => setView(k)} className={`px-3 py-1 rounded border ${view===k?'bg-blue-600 text-white':'bg-white'}`}>{l}</button>
        ))}
        <button onClick={() => supabase.auth.signOut()} className="ml-auto text-red-600">Sign out</button>
      </nav>
      {view==='admin'&&<SuperAdmin/>}
      {view==='onboard'&&<Onboarding/>}
      {view==='crm'&&<Crm/>}
      {view==='ops'&&<Operations/>}
      {view==='inv'&&<Inventory/>}
      {view==='comp'&&<Compliance/>}
      {view==='fin'&&<Financials/>}
      {view==='hub'&&<PublicHub/>}
    </div>
  );
}

export default App
