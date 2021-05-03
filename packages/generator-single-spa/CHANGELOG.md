# generator-single-spa

## 2.3.2

### Patch Changes

- [#290](https://github.com/single-spa/create-single-spa/pull/290) [`d2c09ec`](https://github.com/single-spa/create-single-spa/commit/d2c09ec255997f91fa969806d7d8dad82bcfd9d5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix semver check when checking for updates

## 2.3.1

### Patch Changes

- [#281](https://github.com/single-spa/create-single-spa/pull/281) [`77d9e53`](https://github.com/single-spa/create-single-spa/commit/77d9e538d3f1be8565ef0545aa20056c913ab3e5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix start instructions for pnpm

## 2.3.0

### Minor Changes

- [#280](https://github.com/single-spa/create-single-spa/pull/280) [`2e79c7f`](https://github.com/single-spa/create-single-spa/commit/2e79c7f7ef842336a886af472ac001d71dfe23c5) Thanks [@joeldenning](https://github.com/joeldenning)! - Use single-spa-layout by default in root configs

### Patch Changes

- [#279](https://github.com/single-spa/create-single-spa/pull/279) [`2793ffd`](https://github.com/single-spa/create-single-spa/commit/2793ffd2cda5709d03f6aaf7b17244175fe03ce3) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix issue with typescript declarations for file loading

* [#276](https://github.com/single-spa/create-single-spa/pull/276) [`337d8dd`](https://github.com/single-spa/create-single-spa/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21) Thanks [@PieterBoeren](https://github.com/PieterBoeren)! - Added support for images in the webpack config

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
- 6f2c13c: Move layout definition to microfrontends-layout.html file.

### Patch Changes

- bf039d0: Use ts-important-stuff in eslintrc for typescript root-configs
