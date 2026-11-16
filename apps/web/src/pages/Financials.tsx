import { useTenantTable } from '../hooks/useTenantTable';

export default function Financials() {
  const invoices = useTenantTable('invoices');
  const costs = useTenantTable('job_costs');
  const totalInvoiced = invoices.rows.reduce((s: number, i: any) => s + Number(i.amount || 0), 0);
  const totalCosts = costs.rows.reduce((s: number, c: any) => s + Number(c.amount || 0), 0);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financials</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded p-4">Invoiced: ${totalInvoiced.toFixed(2)}</div>
        <div className="border rounded p-4">Costs: ${totalCosts.toFixed(2)}</div>
        <div className="border rounded p-4">Profit: ${(totalInvoiced - totalCosts).toFixed(2)}</div>
      </div>
      <h2 className="font-semibold mt-6">Invoices</h2>
      {invoices.rows.map((i: any) => <div key={i.id} className="border p-2 rounded my-1">${i.amount} — {i.status}</div>)}
      {invoices.rows.length === 0 && <p className="text-gray-500">No invoices yet.</p>}
    </div>
  );
}
