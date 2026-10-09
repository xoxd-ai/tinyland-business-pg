# Changelog

## 1.0.0 (2026-10-09)

Major release for the estate stack uplift (RU1, RU10). The table definitions
and exports are unchanged.

### Breaking changes

- `drizzle-orm` moved from `dependencies` (exact 0.39.3) to
  `peerDependencies` (`>=0.39.3 <1.0.0`). Consuming apps must declare
  `drizzle-orm` themselves; the tables now bind to the app's Drizzle instance
  instead of a private copy.
- Distribution is Bazel only (RU6, RU8). The package is `private: true`, the
  publish workflow is removed, and no new versions go to npmjs or GitHub
  Packages. Earlier npm versions stay published.
- Toolchain: TypeScript 7.0.2 (native compiler), Vite 8.3.3 and Vitest 5.0.3,
  pinned exact (RU5). Node engine is `>=22.12.0`. Bazel uses `aspect_rules_ts`
  3.10.1 with the `typescript` extension reading the version from
  `package.json`, and Node 22.22.0.

### Migration

1. Replace the npm dependency with the Bazel module:

   ```starlark
   bazel_dep(name = "tummycrypt_tinyland_business_pg", version = "1.0.0")
   ```

2. Make sure the app depends on `drizzle-orm` directly (any version from
   0.39.3 up to, not including, 1.0.0). Apps that already list it, such as
   apps that run `drizzle-kit`, need no change.
3. Imports stay the same: `@tummycrypt/tinyland-business-pg`,
   `/content-schema` and `/booking-schema`.

## 0.1.1

- Tenant-scoped business content and booking tables.
