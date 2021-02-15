---
"create-single-spa": minor
"generator-single-spa": minor
"single-spa-web-server-utils": minor
"single-spa-welcome": minor
"webpack-config-single-spa": minor
"webpack-config-single-spa-react": minor
"webpack-config-single-spa-react-ts": minor
"webpack-config-single-spa-ts": minor
---

- The create-single-spa project now uses pnpm workspaces and changesets instead of lerna.
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
