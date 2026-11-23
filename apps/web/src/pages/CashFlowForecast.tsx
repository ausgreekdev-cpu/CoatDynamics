import { useTenantTable } from '../hooks/useTenantTable';

export default function CashFlowForecast() {
  const invoices = useTenantTable('invoices');
  const costs = useTenantTable('job_costs');
  const incoming = invoices.rows.reduce((s: number, i: any) => s + Number(i.amount || 0), 0);
  const outgoing = costs.rows.reduce((s: number, c: any) => s + Number(c.amount || 0), 0);
  const net = incoming - outgoing;
  const max = Math.max(incoming, outgoing, 1);
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cash-Flow Forecast</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded p-4">Incoming: ${incoming.toFixed(2)}</div>
        <div className="border rounded p-4">Outgoing: ${outgoing.toFixed(2)}</div>
        <div className="border rounded p-4 font-bold">Net: ${net.toFixed(2)}</div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-sm mb-1">Incoming</div>
          <div className="h-6 bg-gray-200 rounded"><div className="h-6 bg-green-500 rounded" style={{ width: `${(incoming / max) * 100}%` }} /></div>
        </div>
        <div>
          <div className="text-sm mb-1">Outgoing</div>
          <div className="h-6 bg-gray-200 rounded"><div className="h-6 bg-red-500 rounded" style={{ width: `${(outgoing / max) * 100}%` }} /></div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">Based on all recorded invoices vs. job costs. Add due dates for 30/60/90-day projections.</p>
    </div>
  );
}
EOF
python3 - <<'PY'
p='src/App.tsx'
s=open(p).read()
if "import CashFlowForecast" not in s:
    s=s.replace("import SubcontractorScorecard from './pages/SubcontractorScorecard'","import SubcontractorScorecard from './pages/SubcontractorScorecard'\nimport CashFlowForecast from './pages/CashFlowForecast'")
if "['cashflow','Cash Flow']" not in s:
    s=s.replace("['scorecard','Scorecard'],","['scorecard','Scorecard'],['cashflow','Cash Flow'],")
if "view==='cashflow'" not in s:
    s=s.replace("{view==='scorecard'&&<SubcontractorScorecard/>}","{view==='scorecard'&&<SubcontractorScorecard/>}\n      {view==='cashflow'&&<CashFlowForecast/>}")
open(p,'w').write(s)
print('done')
PY
pnpm build 2>&1 | tail -3 && cd /home/aiuser/painter-saas && git add -A && git commit -m "feat: cash-flow forecast" 2>&1 | tail -2