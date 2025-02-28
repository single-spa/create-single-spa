# webpack-config-single-spa-react-ts

## 6.0.2

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@7.0.2
  - webpack-config-single-spa-ts@6.0.2

## 6.0.1

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@7.0.1
  - webpack-config-single-spa-ts@6.0.1

## 6.0.0

### Major Changes

- [#431](https://github.com/single-spa/create-single-spa/pull/431) [`f3fcb82`](https://github.com/single-spa/create-single-spa/commit/f3fcb8223ee42ba6912e5211ba4dd44e959244fb) Thanks [@joeldenning](https://github.com/joeldenning)! - Disable standalone mode unless explicitly set

### Patch Changes

- Updated dependencies [[`f3fcb82`](https://github.com/single-spa/create-single-spa/commit/f3fcb8223ee42ba6912e5211ba4dd44e959244fb)]:
  - webpack-config-single-spa-ts@6.0.0
  - webpack-config-single-spa-react@7.0.0

## 5.0.4

### Patch Changes

- Updated dependencies [[`317a5c5`](https://github.com/single-spa/create-single-spa/commit/317a5c5b1c25d6edb6269a05618563895fe7d2b8)]:
  - webpack-config-single-spa-react@6.0.0

## 5.0.3

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@5.0.3
  - webpack-config-single-spa-ts@5.0.3

## 5.0.2

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@5.0.2
  - webpack-config-single-spa-ts@5.0.2

## 5.0.1

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@5.0.1
  - webpack-config-single-spa-ts@5.0.1

## 5.0.0

### Major Changes

- [#412](https://github.com/single-spa/create-single-spa/pull/412) [`f9edeef`](https://github.com/single-spa/create-single-spa/commit/f9edeef57e5230df78efe7deaea2dec159db89a3) Thanks [@joeldenning](https://github.com/joeldenning)! - Output to native ES modules by default. Add new outputSystemJS option.

#### Upgrading

To upgrade without switching to native ES modules, add the `outputSystemJS` option to your webpack.config.js:

```js
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "org",
    projectName: "project",
    webpackConfigEnv,
    argv,

    // This is the new option that preserves backwards compatibility
    outputSystemJS: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
```

The single-spa core team plans to release a full SystemJS -> ESM migration guide on single-spa.js.org.

### Patch Changes

- Updated dependencies [[`f9edeef`](https://github.com/single-spa/create-single-spa/commit/f9edeef57e5230df78efe7deaea2dec159db89a3)]:
  - webpack-config-single-spa-react@5.0.0
  - webpack-config-single-spa-ts@5.0.0

## 4.0.5

### Patch Changes

- Updated dependencies [[`181da9a`](https://github.com/single-spa/create-single-spa/commit/181da9a5aecd7a9b8fc99dbb965d106d7b74b3de)]:
  - webpack-config-single-spa-ts@4.1.4
  - webpack-config-single-spa-react@4.0.5

## 4.0.4

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@4.0.4
  - webpack-config-single-spa-ts@4.1.3

## 4.0.3

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@4.0.3
  - webpack-config-single-spa-ts@4.1.2

## 4.0.2

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@4.0.2
  - webpack-config-single-spa-ts@4.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [[`5c31d36`](https://github.com/single-spa/create-single-spa/commit/5c31d3639e8663be97e435366615f7553341d453)]:
  - webpack-config-single-spa-ts@4.1.0
  - webpack-config-single-spa-react@4.0.1

## 4.0.0

### Major Changes

- [#315](https://github.com/single-spa/create-single-spa/pull/315) [`729c6b1`](https://github.com/single-spa/create-single-spa/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to standalone-single-spa-webpack-plugin@3. For the majority of users, you can safely upgrade webpack-config-single-spa (-ts, -react, -react-ts) without any code changes.

  See https://github.com/single-spa/standalone-single-spa-webpack-plugin/releases/tag/v3.0.0 for details about what was changed. It only impacts running projects in standalone mode.

### Patch Changes

- Updated dependencies [[`729c6b1`](https://github.com/single-spa/create-single-spa/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84)]:
  - webpack-config-single-spa-react@4.0.0
  - webpack-config-single-spa-ts@4.0.0

## 3.0.0

### Major Changes

- [#310](https://github.com/single-spa/create-single-spa/pull/310) [`5dc82a6`](https://github.com/single-spa/create-single-spa/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9) Thanks [@alexristich](https://github.com/alexristich)! - Upgrade to latest config from webpack-dev-server v4.0.0-rc.0

  The [release candidate](https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-rc.0) introduced some breaking changes which prevented the local server from running in new applications created with `create-single-spa`.

  This also simplfies the configuration to take advantage of new default values.

### Patch Changes

- Updated dependencies [[`5dc82a6`](https://github.com/single-spa/create-single-spa/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9)]:
  - webpack-config-single-spa-react@3.0.0
  - webpack-config-single-spa-ts@3.0.0

## 2.2.4

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@2.2.4
  - webpack-config-single-spa-ts@2.2.4

## 2.2.3

### Patch Changes

- Updated dependencies [[`0ca13bb`](https://github.com/single-spa/create-single-spa/commit/0ca13bb8de64b2329bae04f7bf92b1e9fcb5c47a)]:
  - webpack-config-single-spa-ts@2.2.3
  - webpack-config-single-spa-react@2.2.3

## 2.2.2

### Patch Changes

- [#282](https://github.com/single-spa/create-single-spa/pull/282) [`4c95b1b`](https://github.com/single-spa/create-single-spa/commit/4c95b1b97acd7ee42965ea853d1bd8dce239c017) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade webpack-config-single-spa's upstream dependencies

- Updated dependencies [[`4c95b1b`](https://github.com/single-spa/create-single-spa/commit/4c95b1b97acd7ee42965ea853d1bd8dce239c017)]:
  - webpack-config-single-spa-react@2.2.2
  - webpack-config-single-spa-ts@2.2.2

## 2.2.1

### Patch Changes

- Updated dependencies []:
  - webpack-config-single-spa-react@2.2.1
  - webpack-config-single-spa-ts@2.2.1

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
  - webpack-config-single-spa-react@2.2.0
  - webpack-config-single-spa-ts@2.2.0
