import Dexie, { type Table } from 'dexie';

export interface QueuedMutation {
  id?: number;
  entity: string;
  op: 'create' | 'update' | 'delete';
  payload: any;
  createdAt: number;
}

export class OfflineDB extends Dexie {
  mutations!: Table<QueuedMutation, number>;
  clients!: Table<any, string>;
  jobs!: Table<any, string>;
  constructor() {
    super('painter-saas-offline');
    this.version(1).stores({
      mutations: '++id, entity, createdAt',
      clients: 'id, tenant_id',
      jobs: 'id, tenant_id, status',
    });
  }
}

export const offlineDb = new OfflineDB();

export async function enqueueMutation(m: Omit<QueuedMutation, 'id' | 'createdAt'>) {
  await offlineDb.mutations.add({ ...m, createdAt: Date.now() });
}

export async function flushQueue(handler: (m: QueuedMutation) => Promise<void>) {
  const items = await offlineDb.mutations.orderBy('createdAt').toArray();
  for (const item of items) {
    try {
      await handler(item);
      await offlineDb.mutations.delete(item.id!);
    } catch {
      break;
    }
  }
}
EOF
# place in packages/core? keep in web src/offline
mkdir -p src/offline && mv /home/aiuser/painter-saas/apps/web/src/offline/db.ts /home/aiuser/painter-saas/apps/web/src/offline/db.ts 2>/dev/null
cp /home/aiuser/painter-saas/apps/web/src/offline/db.ts /tmp/scratchpad/db.ts 2>/dev/null
echo ok