import { useState } from 'react'
import SuperAdmin from './pages/SuperAdmin'
import Onboarding from './pages/Onboarding'
import Crm from './pages/Crm'
import './App.css'

function App() {
  const [view, setView] = useState<'admin' | 'onboard' | 'crm'>('admin');
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <button onClick={() => setView('admin')} className="text-blue-600">Super-Admin</button>
        <button onClick={() => setView('onboard')} className="text-blue-600">Onboarding</button>
        <button onClick={() => setView('crm')} className="text-blue-600">CRM</button>
      </nav>
      {view === 'admin' ? <SuperAdmin /> : view === 'onboard' ? <Onboarding /> : <Crm />}
    </div>
  );
}

export default App
