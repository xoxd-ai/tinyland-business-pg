# Bounded delivery-lane retirement

Authority: Jess's explicit fan-out, ship and legacy-lane retirement requests;
R-HOOK-CONVERGENCE-20261004 and R-N13. Original source owner retained. This
isolated branch starts at main e4ed48a28c76414cf2111b29c7aec0a9982ef4df;
the original checkout and its index/branch remain untouched.

Replace legacy js-bazel-package CI with immutable shared spoke-ci-v4 at
ae836d8400d5784d74af4fecc020f225d1c2d08e (published ci-templates v5.1.1).
The exact source workflow and complete schema-3 contract were inspected.
Declare only existing build //:pkg and test //:test, Linux abstract REAPI
capability and explicit status-only disposition. No new target, executor,
runner, endpoint, enrollment row, secrets inheritance or provider fallback.

Remove the obsolete release/manual publish workflow, package-write/token
wiring, publishConfig and prepublishOnly. Correct README installation and
validation guidance, keeping runtime import metadata, lockfile, dependencies,
schema, migrations and all module/package versions unchanged. The registered
0.1.1 remains a separate immutable artifact, not this development branch.

The old v2.14.1 consumer already disabled its actual npm publisher and left
the GitHub package name empty, gating that publisher off too. This retirement
does not allege an observed registry publication. It removes remaining
hosted-resolver/npm-pack/archive machinery and false delivery affordances.

Post-merge main CI37398839248 failed at package/resolve-runner; validate was
skipped. That diagnostic is not a demonstrated code/test failure. Canonical
v4 source availability does not establish consumer admission or execution,
and this migration is not asserted to fix the unknown startup cause.

Acceptance still requires exact-source GF admission, actual build/test
receipts and independently the restricted-role canonical-PG scheduling
lifecycle. No validation executed on Neo. No account/credential mutation,
production activation, infrastructure takeover, upstream PR or main push.
