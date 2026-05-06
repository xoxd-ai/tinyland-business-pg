/**
 * Tinyland booking tables.
 *
 * These tables store homegrown scheduling state and reference content tables.
 * Every table carries `tenant_id uuid NOT NULL`; tenant isolation is enforced
 * by consuming apps through RLS and tenant-scoped queries.
 */

import {
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

import { practitioners, services } from './content-schema.js';

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 32 }),
  notes: text('notes'),
  customFields: jsonb('custom_fields').$type<Record<string, string>>().default({}),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex('clients_tenant_email_unique').on(table.tenantId, table.email),
  index('clients_tenant_idx').on(table.tenantId),
]);

export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id').notNull(),
    confirmationCode: varchar('confirmation_code', { length: 16 }).notNull(),
    serviceId: uuid('service_id')
      .references(() => services.id)
      .notNull(),
    practitionerId: uuid('practitioner_id').references(() => practitioners.id),
    clientId: uuid('client_id')
      .references(() => clients.id)
      .notNull(),
    datetime: timestamp('datetime', { mode: 'string', withTimezone: true }).notNull(),
    endTime: timestamp('end_time', { mode: 'string', withTimezone: true }).notNull(),
    duration: integer('duration').notNull(),
    status: varchar('status', { length: 32 }).notNull().default('confirmed'),
    paymentStatus: varchar('payment_status', { length: 32 }).notNull().default('pending'),
    paymentMethod: varchar('payment_method', { length: 32 }),
    paymentRef: varchar('payment_ref', { length: 255 }),
    amountCents: integer('amount_cents').notNull(),
    notes: text('notes'),
    idempotencyKey: varchar('idempotency_key', { length: 255 }),
    cancelledAt: timestamp('cancelled_at', { mode: 'string', withTimezone: true }),
    cancelReason: text('cancel_reason'),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('bookings_tenant_confirmation_code_unique').on(
      table.tenantId,
      table.confirmationCode,
    ),
    uniqueIndex('bookings_tenant_idempotency_key_unique').on(
      table.tenantId,
      table.idempotencyKey,
    ),
    index('idx_bookings_schedule').on(table.practitionerId, table.datetime),
    index('idx_bookings_client').on(table.clientId),
    index('idx_bookings_datetime').on(table.datetime),
    index('bookings_tenant_idx').on(table.tenantId),
  ],
);

export const timeBlocks = pgTable(
  'time_blocks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id').notNull(),
    practitionerId: uuid('practitioner_id')
      .references(() => practitioners.id)
      .notNull(),
    startTime: timestamp('start_time', { mode: 'string', withTimezone: true }).notNull(),
    endTime: timestamp('end_time', { mode: 'string', withTimezone: true }).notNull(),
    blockType: varchar('block_type', { length: 32 }).notNull(),
    title: varchar('title', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_time_blocks_schedule').on(table.practitionerId, table.startTime),
    index('time_blocks_tenant_idx').on(table.tenantId),
  ],
);

export const businessHoursOverrides = pgTable(
  'business_hours_overrides',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id').notNull(),
    date: date('date').notNull(),
    opens: time('opens'),
    closes: time('closes'),
    reason: varchar('reason', { length: 255 }),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('business_hours_overrides_tenant_date_unique').on(table.tenantId, table.date),
    index('business_hours_overrides_tenant_idx').on(table.tenantId),
  ],
);

export const slotReservations = pgTable(
  'slot_reservations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id').notNull(),
    practitionerId: uuid('practitioner_id').references(() => practitioners.id),
    datetime: timestamp('datetime', { mode: 'string', withTimezone: true }).notNull(),
    duration: integer('duration').notNull(),
    expiresAt: timestamp('expires_at', { mode: 'string', withTimezone: true }).notNull(),
    releasedAt: timestamp('released_at', { mode: 'string', withTimezone: true }),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('idx_reservations_datetime').on(table.datetime),
    index('idx_reservations_expires').on(table.expiresAt),
    index('slot_reservations_tenant_idx').on(table.tenantId),
  ],
);
