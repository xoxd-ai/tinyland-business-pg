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

Delivery is Bzlmod-only through `tinyland-inc/bazel-registry`. The JavaScript
import name and package/lock metadata are Bazel build inputs, not an npmjs or
GitHub Packages delivery lane. Do not restore publishing workflows, lifecycle
hooks or package-token permissions.

CI uses a finite schema-3 `.github/lanes.json` and the immutable shared
`spoke-ci-v4.yml` contract. The organization owns GF admission and provider
authority. No custom runner, local/hosted fallback or baked endpoint belongs
here. Exact-source qualified execution and native PostgreSQL acceptance are
separate from source publication. Agent validation never runs on Neo: no
tests, builds, Bazel/Bazelisk, Nix, containers or dev servers.
