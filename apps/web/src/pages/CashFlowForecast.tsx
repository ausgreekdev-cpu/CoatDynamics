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