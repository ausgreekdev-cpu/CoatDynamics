import { useState } from 'react'
import SuperAdmin from './pages/SuperAdmin'
import Onboarding from './pages/Onboarding'
import './App.css'

function App() {
  const [view, setView] = useState<'admin' | 'onboard'>('admin');
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <button onClick={() => setView('admin')} className="text-blue-600">Super-Admin</button>
        <button onClick={() => setView('onboard')} className="text-blue-600">Onboarding</button>
      </nav>
      {view === 'admin' ? <SuperAdmin /> : <Onboarding />}
    </div>
  );
}

export default App
