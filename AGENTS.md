# tinyland-business-pg Agent Notes

`@tummycrypt/tinyland-business-pg` owns reusable PostgreSQL table definitions
for Tinyland business content and booking state.

Keep these boundaries firm:

- own business profile, service, practitioner, hours, review, client, booking,
  time block, hours override, and checkout slot reservation table definitions
- do not own auth user/session/identity tables
- do not import `@tummycrypt/tinyland-auth-pg`
- do not add site-specific deployment, runner, or infrastructure assumptions
- keep `package.json`, `MODULE.bazel`, and `BUILD.bazel` versions in sync

This package is a package and schema authority surface. Its Bazel build proves
cache-backed artifact construction, not Bazel remote execution.
