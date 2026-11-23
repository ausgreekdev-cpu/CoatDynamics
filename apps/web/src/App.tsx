import { useState } from 'react'
import { supabase } from './lib/supabase'
import { useTranslation } from 'react-i18next'
import { useAuth, RoleGuard } from './auth/AuthProvider'
import Login from './pages/Login'
import SuperAdmin from './pages/SuperAdmin'
import Onboarding from './pages/Onboarding'
import Crm from './pages/Crm'
import Operations from './pages/Operations'
import Inventory from './pages/Inventory'
import Compliance from './pages/Compliance'
import Financials from './pages/Financials'
import PublicHub from './pages/PublicHub'
import SurfaceEstimator from './pages/SurfaceEstimator'
import CrewChat from './pages/CrewChat'
import SignaturePadPage from './pages/SignaturePad'
import TravelTracker from './pages/TravelTracker'
import PaintMixingCalculator from './pages/PaintMixingCalculator'
import QuoteTemplates from './pages/QuoteTemplates'
import WeatherScheduling from './pages/WeatherScheduling'
import VoiceNotes from './pages/VoiceNotes'
import PhotoGeotagging from './pages/PhotoGeotagging'
import EquipmentMaintenance from './pages/EquipmentMaintenance'
import SubcontractorScorecard from './pages/SubcontractorScorecard'
import CashFlowForecast from './pages/CashFlowForecast'
import BarcodeScanner from './pages/BarcodeScanner'
import MsdsViewer from './pages/MsdsViewer'
import PortalPage from './pages/PortalPage'
import './App.css'

function App() {
  const { session, loading, role } = useAuth();
  const { i18n } = useTranslation();
  const [view, setView] = useState('admin');
  const portalMatch = window.location.pathname.match(/^\/portal\/([^/]+)/);
  if (portalMatch) return <PortalPage token={portalMatch[1]} />;
  if (loading) return <div className="p-6">Loading...</div>;
  if (!session) return <Login />;
  const tabs = [
    ['admin','Super-Admin'],['onboard','Onboarding'],['crm','CRM'],['ops','Operations'],
    ['inv','Inventory'],['comp','Compliance'],['fin','Financials'],['hub','Public Hub'],['est','Estimator'],['chat','Crew Chat'],['sig','Signature'],['travel','Travel'],['mix','Paint Mix'],['templates','Templates'],['weather','Weather'],['voice','Voice Notes'],['photos','Photos'],['equip','Equipment'],['scorecard','Scorecard'],['cashflow','Cash Flow'],['scan','Barcode'],['msds','MSDS'],
  ];
  return (
    <div>
      <nav className="flex gap-2 p-4 border-b flex-wrap items-center">
        {tabs.map(([k,l]) => (
          <button key={k} onClick={() => setView(k)} className={`px-3 py-1 rounded border ${view===k?'bg-blue-600 text-white':'bg-white'}`}>{l}</button>
        ))}
        <span className="text-sm text-gray-500">Role: {role}</span>
        <select value={i18n.language} onChange={e=>{i18n.changeLanguage(e.target.value);localStorage.setItem('lang',e.target.value);}} className="border rounded px-2 py-1 text-sm">
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <button onClick={() => supabase.auth.signOut()} className="ml-auto text-red-600">Sign out</button>
      </nav>
      {view==='admin'&&<RoleGuard allow={['super_admin','tenant_owner','admin']}><SuperAdmin/></RoleGuard>}
      {view==='onboard'&&<Onboarding/>}
      {view==='crm'&&<Crm/>}
      {view==='ops'&&<Operations/>}
      {view==='inv'&&<Inventory/>}
      {view==='comp'&&<Compliance/>}
      {view==='fin'&&<RoleGuard allow={['super_admin','tenant_owner','admin','accountant']}><Financials/></RoleGuard>}
      {view==='hub'&&<PublicHub/>}
      {view==='est'&&<SurfaceEstimator/>}
      {view==='chat'&&<CrewChat/>}
      {view==='sig'&&<SignaturePadPage/>}
      {view==='travel'&&<TravelTracker/>}
      {view==='mix'&&<PaintMixingCalculator/>}
      {view==='templates'&&<QuoteTemplates/>}
      {view==='weather'&&<WeatherScheduling/>}
      {view==='voice'&&<VoiceNotes/>}
      {view==='photos'&&<PhotoGeotagging/>}
      {view==='equip'&&<EquipmentMaintenance/>}
      {view==='scorecard'&&<SubcontractorScorecard/>}
      {view==='cashflow'&&<CashFlowForecast/>}
      {view==='scan'&&<BarcodeScanner/>}
      {view==='msds'&&<MsdsViewer/>}
    </div>
  );
}

export default App
