/**
 * Tinyland business content tables.
 *
 * These tables store public business metadata and service catalog content.
 */

import {
  boolean,
  integer,
  numeric,
  pgTable,
  smallint,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const businessProfile = pgTable('business_profile', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 32 }).notNull(),
  email: varchar('email', { length: 255 }),
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  suiteUnit: varchar('suite_unit', { length: 64 }),
  city: varchar('city', { length: 128 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
  country: varchar('country', { length: 2 }).notNull().default('US'),
  latitude: numeric('latitude', { precision: 12, scale: 8 }),
  longitude: numeric('longitude', { precision: 12, scale: 8 }),
  licenseNumber: varchar('license_number', { length: 32 }),
  description: text('description'),
  slogan: varchar('slogan', { length: 255 }),
  websiteUrl: varchar('website_url', { length: 512 }),
  googleMapsUrl: text('google_maps_url'),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  acuityId: varchar('acuity_id', { length: 64 }).unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 128 }),
  durationMinutes: integer('duration_minutes').notNull(),
  priceCents: integer('price_cents').notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  active: boolean('active').notNull().default(true),
  displayOrder: integer('display_order').notNull().default(0),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const businessHours = pgTable('business_hours', {
  id: uuid('id').primaryKey().defaultRandom(),
  dayOfWeek: smallint('day_of_week').notNull(),
  opens: time('opens').notNull(),
  closes: time('closes').notNull(),
  label: varchar('label', { length: 64 }),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  reviewerName: varchar('reviewer_name', { length: 255 }).notNull(),
  rating: smallint('rating').notNull(),
  text: text('text').notNull(),
  source: varchar('source', { length: 64 }).notNull().default('google'),
  tags: text('tags').array(),
  featured: boolean('featured').notNull().default(false),
  publishedAt: timestamp('published_at', { mode: 'string' }),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const practitioners = pgTable('practitioners', {
  id: uuid('id').primaryKey().defaultRandom(),
  handle: varchar('handle', { length: 64 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 128 }),
  bio: text('bio'),
  credentials: text('credentials').array(),
  specializations: text('specializations').array(),
  licenseNumber: varchar('license_number', { length: 32 }),
  photoUrl: varchar('photo_url', { length: 512 }),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
