// Dexie-based offline cache stub
export const OFFLINE_DB_NAME = 'painter-saas-offline';
export interface SyncQueueItem { id: string; entity: string; op: 'create'|'update'|'delete'; payload: unknown; createdAt: number; }
export const syncQueue: SyncQueueItem[] = [];
