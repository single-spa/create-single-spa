# create-single-spa

## 2.2.2

### Patch Changes

- Updated dependencies [[`77d9e53`](https://github.com/single-spa/create-single-spa/commit/77d9e538d3f1be8565ef0545aa20056c913ab3e5)]:
  - generator-single-spa@2.3.1

## 2.2.1

### Patch Changes

- Updated dependencies [[`2793ffd`](https://github.com/single-spa/create-single-spa/commit/2793ffd2cda5709d03f6aaf7b17244175fe03ce3), [`337d8dd`](https://github.com/single-spa/create-single-spa/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21), [`2e79c7f`](https://github.com/single-spa/create-single-spa/commit/2e79c7f7ef842336a886af472ac001d71dfe23c5)]:
  - generator-single-spa@2.3.0

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
- Updated dependencies [bf039d0]
  - generator-single-spa@2.2.0
