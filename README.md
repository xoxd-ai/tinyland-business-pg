# tinyland-business-pg

PostgreSQL table definitions for Tinyland business content and booking state.
All exported tables are tenant-scoped with `tenant_id uuid NOT NULL`; consuming
apps enforce tenant isolation through RLS and tenant-scoped queries.

This package is intentionally separate from `@tummycrypt/tinyland-auth-pg`.
Auth storage remains in the auth package. Business profile, services, hours,
practitioners, clients, bookings, blocks, overrides, and checkout reservations
live here so reusable scheduling adapters can depend on explicit business
schema authority without pulling in auth storage.

## Bazel module consumption

Package delivery is Bzlmod-only through `tinyland-inc/bazel-registry`.
The existing registry lists `0.1.1`; changes on development branches are not
implicitly included in that immutable release.

```starlark
bazel_dep(name = "tummycrypt_tinyland_business_pg", version = "0.1.1")
```

Consume its public `@tummycrypt_tinyland_business_pg//:pkg` target through
your existing Bazel JavaScript composition. The `@tummycrypt/...` imports
below are runtime namespaces, not npmjs or GitHub Packages coordinates.
`package.json`, the lockfile and Bazel's `npm_package` rule remain build
inputs; they do not authorize package-registry publication.

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

This example shows schema injection only, not accepted tenant isolation or
an end-to-end lifecycle. Consumers must bind the trusted tenant consistently
across scoped reads and transactions, use restricted database roles/policies,
and prove durable readback and cross-tenant rejection on qualified GF.

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

The finite `.github/lanes.json` declares the existing `//:pkg` build and
`//:test` test. CI calls the immutable shared GF v4 workflow, with explicit
status-only results and no publisher, hosted fallback or inherited secrets.
The organization supplies admission and execution authority, not this repo.

Agent validation is GF-only. Do not run tests, builds, Bazel/Bazelisk, Nix,
containers or dev servers on Neo. A reviewed plan or signed source commit is
not enrollment, execution, native PostgreSQL lifecycle or runtime acceptance.
