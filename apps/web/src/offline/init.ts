import { flushQueue } from './db';

export function initOfflineSync(handler: (m: any) => Promise<void>) {
  const run = () => flushQueue(handler);
  window.addEventListener('online', run);
  if (navigator.onLine) run();
}