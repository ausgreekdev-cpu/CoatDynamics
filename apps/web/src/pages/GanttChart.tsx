import { useJobs } from '../hooks/useJobs';

export default function GanttChart() {
  const { jobs, loading } = useJobs();
  const scheduled = jobs.filter((j: any) => j.scheduled_date);
  const minDate = scheduled.length ? new Date(Math.min(...scheduled.map((j: any) => new Date(j.scheduled_date).getTime()))) : new Date();
  const days = 14;
  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Job Gantt Chart</h1>
      {loading ? <p>Loading...</p> : (
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[160px_repeat(14,1fr)] text-xs text-gray-500 border-b">
            <div className="p-1">Job</div>
            {Array.from({ length: days }).map((_, i) => {
              const d = new Date(minDate); d.setDate(d.getDate() + i);
              return <div key={i} className="p-1 text-center">{d.getDate()}</div>;
            })}
          </div>
          {scheduled.map((j: any) => {
            const start = Math.round((new Date(j.scheduled_date).getTime() - minDate.getTime()) / 86400000);
            const end = j.end_date ? Math.round((new Date(j.end_date).getTime() - minDate.getTime()) / 86400000) + 1 : start + 1;
            return (
              <div key={j.id} className="grid grid-cols-[160px_repeat(14,1fr)] items-center border-b py-1">
                <div className="text-sm truncate pr-2">{j.title}</div>
                {Array.from({ length: days }).map((_, i) => (
                  <div key={i} className="h-6">
                    {i >= start && i < end && <div className="h-4 bg-blue-500 rounded mx-0.5" />}
                  </div>
                ))}
              </div>
            );
          })}
          {scheduled.length === 0 && <p className="text-gray-500 mt-4">No scheduled jobs. Set dates in Weather scheduling.</p>}
        </div>
      )}
    </div>
  );
}
