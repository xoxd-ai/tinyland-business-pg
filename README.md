# tinyland-business-pg

PostgreSQL table definitions for Tinyland business content and booking state.
All exported tables are tenant-scoped with `tenant_id uuid NOT NULL`; consuming
apps enforce tenant isolation through RLS and tenant-scoped queries.

This package is intentionally separate from `@tummycrypt/tinyland-auth-pg`.
Auth storage remains in the auth package. Business profile, services, hours,
practitioners, clients, bookings, blocks, overrides, and checkout reservations
live here so reusable scheduling adapters can depend on explicit business
schema authority without pulling in auth storage.

## Install

This package is distributed through Bazel only (RU6). It is not published to
npmjs or GitHub Packages. Add the module from the Tinyland registry
(`xoxd-ai/bazel-registry`):

```starlark
bazel_dep(name = "tummycrypt_tinyland_business_pg", version = "1.0.0")
```

`drizzle-orm` is a peer dependency (`>=0.39.3 <1.0.0`): the consuming app
provides its own `drizzle-orm`, so the tables and the app's queries share one
Drizzle instance.

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

Toolchain: TypeScript 7.0.2, Vite 8.3.3 and Vitest 5.0.3 (exact pins), pnpm
10.13.1, Node 22.

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test:unit
pnpm build
pnpm check:package
bazel build //:pkg
bazel test //:test
```
