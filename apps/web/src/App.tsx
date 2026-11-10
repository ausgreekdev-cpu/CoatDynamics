import { useState } from 'react'
import SuperAdmin from './pages/SuperAdmin'
import Onboarding from './pages/Onboarding'
import Crm from './pages/Crm'
import Operations from './pages/Operations'
import './App.css'

function App() {
  const [view, setView] = useState<'admin' | 'onboard' | 'crm' | 'ops'>('admin');
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <button onClick={() => setView('admin')} className="text-blue-600">Super-Admin</button>
        <button onClick={() => setView('onboard')} className="text-blue-600">Onboarding</button>
        <button onClick={() => setView('crm')} className="text-blue-600">CRM</button>
        <button onClick={() => setView('ops')} className="text-blue-600">Operations</button>
      </nav>
      {view === 'admin' ? <SuperAdmin /> : view === 'onboard' ? <Onboarding /> : view === 'crm' ? <Crm /> : <Operations />}
    </div>
  );
}

export default App
