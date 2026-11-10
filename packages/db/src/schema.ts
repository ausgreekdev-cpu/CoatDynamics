import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  plan: text('plan').notNull().default('starter'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // matches auth.users.id
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id),
  role: text('role').notNull().default('employee'),
  fullName: text('full_name'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
