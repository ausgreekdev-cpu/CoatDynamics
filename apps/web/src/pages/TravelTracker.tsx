import { useEffect, useRef, useState } from 'react';
import { useTravel } from '../hooks/useTravel';
import { haversine } from '../utils/distance';

export default function TravelTracker() {
  const { entries, loading, start, stop } = useTravel();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const lastPos = useRef<{ lat: number; lng: number } | null>(null);
  const watchId = useRef<number | null>(null);

  const startTracking = async () => {
    const row = await start();
    setActiveId(row.id);
    setDistance(0);
    lastPos.current = null;
    watchId.current = navigator.geolocation.watchPosition((pos) => {
      const cur = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (lastPos.current) setDistance(d => d + haversine(lastPos.current!, cur));
      lastPos.current = cur;
    }, (err) => console.error(err), { enableHighAccuracy: true });
  };

  const stopTracking = async () => {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    if (activeId) await stop(activeId, distance);
    setActiveId(null);
  };

  useEffect(() => () => { if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current); }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">One-Tap Travel Tracker</h1>
      {activeId ? (
        <div className="text-center">
          <p className="text-lg">Tracking… {distance.toFixed(2)} km</p>
          <button onClick={stopTracking} className="mt-3 bg-red-600 text-white px-6 py-3 rounded-full">Stop</button>
        </div>
      ) : (
        <button onClick={startTracking} className="bg-green-600 text-white px-6 py-3 rounded-full">Start Travel</button>
      )}
      <h2 className="font-semibold mt-6">Recent trips</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {entries.map((e: any) => (
            <li key={e.id} className="border rounded p-3 text-sm">
              {new Date(e.started_at).toLocaleString()} — {Number(e.distance_km).toFixed(2)} km
            </li>
          ))}
          {entries.length === 0 && <li className="text-gray-500">No trips yet.</li>}
        </ul>
      )}
    </div>
  );
}