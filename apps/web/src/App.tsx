import { useState } from 'react'
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
  const [view, setView] = useState<'admin' | 'onboard' | 'crm' | 'ops' | 'inv' | 'comp' | 'fin' | 'hub'>('admin');
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <button onClick={() => setView('admin')} className="text-blue-600">Super-Admin</button>
        <button onClick={() => setView('onboard')} className="text-blue-600">Onboarding</button>
        <button onClick={() => setView('crm')} className="text-blue-600">CRM</button>
        <button onClick={() => setView('ops')} className="text-blue-600">Operations</button>
        <button onClick={() => setView('inv')} className="text-blue-600">Inventory</button>
        <button onClick={() => setView('comp')} className="text-blue-600">Compliance</button>
        <button onClick={() => setView('fin')} className="text-blue-600">Financials</button>
        <button onClick={() => setView('hub')} className="text-blue-600">Public Hub</button>
      </nav>
      {view === 'admin' ? <SuperAdmin /> : view === 'onboard' ? <Onboarding /> : view === 'crm' ? <Crm /> : view === 'ops' ? <Operations /> : view === 'inv' ? <Inventory /> : view === 'comp' ? <Compliance /> : view === 'fin' ? <Financials /> : <PublicHub />}
    </div>
  );
}

export default App
