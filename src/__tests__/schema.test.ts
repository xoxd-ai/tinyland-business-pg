import { getTableName } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';

import {
  bookings,
  businessHoursOverrides,
  clients,
  slotReservations,
  timeBlocks,
} from '../booking-schema.js';
import {
  businessHours,
  businessProfile,
  practitioners,
  reviews,
  services,
} from '../content-schema.js';
import * as packageExports from '../index.js';

describe('business PG schemas', () => {
  it('exports content table definitions', () => {
    expect(getTableName(businessProfile)).toBe('business_profile');
    expect(getTableName(services)).toBe('services');
    expect(getTableName(businessHours)).toBe('business_hours');
    expect(getTableName(reviews)).toBe('reviews');
    expect(getTableName(practitioners)).toBe('practitioners');
  });

  it('exports booking table definitions', () => {
    expect(getTableName(clients)).toBe('clients');
    expect(getTableName(bookings)).toBe('bookings');
    expect(getTableName(timeBlocks)).toBe('time_blocks');
    expect(getTableName(businessHoursOverrides)).toBe('business_hours_overrides');
    expect(getTableName(slotReservations)).toBe('slot_reservations');
  });

  it('preserves tenant columns on content tables', () => {
    expect(businessProfile.tenantId.name).toBe('tenant_id');
    expect(services.tenantId.name).toBe('tenant_id');
    expect(businessHours.tenantId.name).toBe('tenant_id');
    expect(reviews.tenantId.name).toBe('tenant_id');
    expect(practitioners.tenantId.name).toBe('tenant_id');
  });

  it('preserves tenant columns on booking tables', () => {
    expect(clients.tenantId.name).toBe('tenant_id');
    expect(bookings.tenantId.name).toBe('tenant_id');
    expect(timeBlocks.tenantId.name).toBe('tenant_id');
    expect(businessHoursOverrides.tenantId.name).toBe('tenant_id');
    expect(slotReservations.tenantId.name).toBe('tenant_id');
  });

  it('keeps namespace exports available for schema injection', () => {
    expect(packageExports.contentSchema.services).toBe(services);
    expect(packageExports.bookingSchema.bookings).toBe(bookings);
  });
});
