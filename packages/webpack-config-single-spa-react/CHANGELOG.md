# webpack-config-single-spa-react

## 2.2.4

### Patch Changes

- Updated dependencies [[`a380ce4`](https://github.com/single-spa/create-single-spa/commit/a380ce4d381c651d5df671aee4826bf0dcca9004)]:
  - webpack-config-single-spa@3.1.0

## 2.2.3

### Patch Changes

- Updated dependencies [[`0ca13bb`](https://github.com/single-spa/create-single-spa/commit/0ca13bb8de64b2329bae04f7bf92b1e9fcb5c47a)]:
  - webpack-config-single-spa@3.0.0

## 2.2.2

### Patch Changes

- [#282](https://github.com/single-spa/create-single-spa/pull/282) [`4c95b1b`](https://github.com/single-spa/create-single-spa/commit/4c95b1b97acd7ee42965ea853d1bd8dce239c017) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade webpack-config-single-spa's upstream dependencies

## 2.2.1

### Patch Changes

- Updated dependencies [[`337d8dd`](https://github.com/single-spa/create-single-spa/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21)]:
  - webpack-config-single-spa@2.2.1

## 2.2.0

### Minor Changes

- 905c0cc: - The create-single-spa project now uses pnpm workspaces and changesets instead of lerna.
  - Remove deprecated babel-eslint package in favor of new @babel/eslint-parser package.
  - Fix typescript problems in pnpm packages.
  - Add support for creation of pnpm packages. Resolves #211.
  - Add name field for utility packages.
  - No longer depend on beta versions of create-single-spa packages
  - Rename template package.jsons to avoid detection by monorepo tooling
  - Fix usage of @testing-library/jest-dom in yarn pnp and pnpm
  - Switch to Github actions instead of Travis - travis stopped reporting test results
  - prettierignore pnpm-lock.yaml files
  - Improve support for format and check-format commands on Windows

### Patch Changes

- Updated dependencies [905c0cc]
- Updated dependencies [6f2c13c]
  - webpack-config-single-spa@2.2.0
