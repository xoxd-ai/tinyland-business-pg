# tinyland-business-pg

PostgreSQL table definitions for Tinyland business content and booking state.

This package is intentionally separate from `@tummycrypt/tinyland-auth-pg`.
Auth storage remains in the auth package. Business profile, services, hours,
practitioners, clients, bookings, blocks, overrides, and checkout reservations
live here so reusable scheduling adapters can depend on explicit business
schema authority without pulling in auth storage.

## Install

```bash
pnpm add @tummycrypt/tinyland-business-pg drizzle-orm
```

## Exports

```ts
import * as businessPg from '@tummycrypt/tinyland-business-pg';
import * as contentSchema from '@tummycrypt/tinyland-business-pg/content-schema';
import * as bookingSchema from '@tummycrypt/tinyland-business-pg/booking-schema';
```

## Scheduling Kit

`@tummycrypt/scheduling-kit` can consume this package through explicit schema
injection:

```ts
import { createHomegrownAdapter } from '@tummycrypt/scheduling-kit/adapters/homegrown';
import * as bookingSchema from '@tummycrypt/tinyland-business-pg/booking-schema';
import * as contentSchema from '@tummycrypt/tinyland-business-pg/content-schema';

const adapter = createHomegrownAdapter({
  databaseUrl: process.env.DATABASE_URL,
  schemas: {
    booking: bookingSchema,
    content: contentSchema,
  },
});
```

That is a package boundary, not Bazel remote execution. Bazel builds this
package artifact and makes it cacheable; remote execution remains a separate
infrastructure authority.

## Tables

Content tables:

- `business_profile`
- `services`
- `business_hours`
- `reviews`
- `practitioners`

Booking tables:

- `clients`
- `bookings`
- `time_blocks`
- `business_hours_overrides`
- `slot_reservations`

## Validation

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:unit
pnpm build
pnpm check:package
bazel build //:pkg
bazel test //:test
```
