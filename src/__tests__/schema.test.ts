import { getTableName } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';

import { bookings, clients, slotReservations } from '../booking-schema.js';
import { businessHours, practitioners, services } from '../content-schema.js';
import * as packageExports from '../index.js';

describe('business PG schemas', () => {
  it('exports content table definitions', () => {
    expect(getTableName(services)).toBe('services');
    expect(getTableName(businessHours)).toBe('business_hours');
    expect(getTableName(practitioners)).toBe('practitioners');
  });

  it('exports booking table definitions', () => {
    expect(getTableName(clients)).toBe('clients');
    expect(getTableName(bookings)).toBe('bookings');
    expect(getTableName(slotReservations)).toBe('slot_reservations');
  });

  it('keeps namespace exports available for schema injection', () => {
    expect(packageExports.contentSchema.services).toBe(services);
    expect(packageExports.bookingSchema.bookings).toBe(bookings);
  });
});
