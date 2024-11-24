# webpack-config-single-spa-ts

## 5.0.3

### Patch Changes

- Updated dependencies [[`b600a88`](https://github.com/single-spa/create-single-spa/commit/b600a88039d0f3ad0fbafc727751d81ce2b7c694)]:
  - webpack-config-single-spa@6.0.3

## 5.0.2

### Patch Changes

- Updated dependencies [[`1cb1a10`](https://github.com/single-spa/create-single-spa/commit/1cb1a10e0f9ade39caaf868fea16dbcf8cd9dc66)]:
  - webpack-config-single-spa@6.0.2

## 5.0.1

### Patch Changes

- Updated dependencies [[`4ad86d6`](https://github.com/single-spa/create-single-spa/commit/4ad86d642ac659c65d983e9cd62df82f6075774b)]:
  - webpack-config-single-spa@6.0.1

## 5.0.0

### Major Changes

- [#412](https://github.com/single-spa/create-single-spa/pull/412) [`f9edeef`](https://github.com/single-spa/create-single-spa/commit/f9edeef57e5230df78efe7deaea2dec159db89a3) Thanks [@joeldenning](https://github.com/joeldenning)! - Output to native ES modules by default. Add new outputSystemJS option.

  #### Upgrading

  To upgrade without switching to native ES modules, add the `outputSystemJS` option to your webpack.config.js:

  ```js
  const { merge } = require("webpack-merge");
  const singleSpaDefaults = require("webpack-config-single-spa-ts");

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

- Updated dependencies [[`f9edeef`](https://github.com/single-spa/create-single-spa/commit/f9edeef57e5230df78efe7deaea2dec159db89a3), [`5e19bc1`](https://github.com/single-spa/create-single-spa/commit/5e19bc1b9dd069de995b249e99d19a241b7c8f8c)]:
  - webpack-config-single-spa@6.0.0

## 4.1.4

### Patch Changes

- [#393](https://github.com/single-spa/create-single-spa/pull/393) [`181da9a`](https://github.com/single-spa/create-single-spa/commit/181da9a5aecd7a9b8fc99dbb965d106d7b74b3de) Thanks [@ibacher](https://github.com/ibacher)! - Bump dependency versions to compatible versions without vulnerabilities

- Updated dependencies [[`181da9a`](https://github.com/single-spa/create-single-spa/commit/181da9a5aecd7a9b8fc99dbb965d106d7b74b3de)]:
  - webpack-config-single-spa@5.3.1

## 4.1.3

### Patch Changes

- Updated dependencies [[`a34fad7`](https://github.com/single-spa/create-single-spa/commit/a34fad7766002fc81100ba8e818f732d3c94404f), [`a287602`](https://github.com/single-spa/create-single-spa/commit/a287602d59cd6227ea8216d8e44872d650ebd1c6)]:
  - webpack-config-single-spa@5.3.0

## 4.1.2

### Patch Changes

- Updated dependencies [[`76d5857`](https://github.com/single-spa/create-single-spa/commit/76d585768b7625161d55c63663276845a7e9b1bb)]:
  - webpack-config-single-spa@5.2.0

## 4.1.1

### Patch Changes

- Updated dependencies [[`22c8fb9`](https://github.com/single-spa/create-single-spa/commit/22c8fb9f5a7056f1a24cc2c178897fefc7819843)]:
  - webpack-config-single-spa@5.1.1

## 4.1.0

### Minor Changes

- [#327](https://github.com/single-spa/create-single-spa/pull/327) [`5c31d36`](https://github.com/single-spa/create-single-spa/commit/5c31d3639e8663be97e435366615f7553341d453) Thanks [@joeldenning](https://github.com/joeldenning)! - Update all dependencies

### Patch Changes

- Updated dependencies [[`f004685`](https://github.com/single-spa/create-single-spa/commit/f004685810e7634ccb1598b8c3cf8321b6833951), [`5c31d36`](https://github.com/single-spa/create-single-spa/commit/5c31d3639e8663be97e435366615f7553341d453)]:
  - webpack-config-single-spa@5.1.0

## 4.0.0

### Major Changes

- [#315](https://github.com/single-spa/create-single-spa/pull/315) [`729c6b1`](https://github.com/single-spa/create-single-spa/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to standalone-single-spa-webpack-plugin@3. For the majority of users, you can safely upgrade webpack-config-single-spa (-ts, -react, -react-ts) without any code changes.

  See https://github.com/single-spa/standalone-single-spa-webpack-plugin/releases/tag/v3.0.0 for details about what was changed. It only impacts running projects in standalone mode.

### Patch Changes

- Updated dependencies [[`729c6b1`](https://github.com/single-spa/create-single-spa/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84)]:
  - webpack-config-single-spa@5.0.0

## 3.0.0

### Major Changes

- [#310](https://github.com/single-spa/create-single-spa/pull/310) [`5dc82a6`](https://github.com/single-spa/create-single-spa/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9) Thanks [@alexristich](https://github.com/alexristich)! - Upgrade to latest config from webpack-dev-server v4.0.0-rc.0

  The [release candidate](https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-rc.0) introduced some breaking changes which prevented the local server from running in new applications created with `create-single-spa`.

  This also simplfies the configuration to take advantage of new default values.

### Patch Changes

- Updated dependencies [[`5dc82a6`](https://github.com/single-spa/create-single-spa/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9)]:
  - webpack-config-single-spa@4.0.0

## 2.2.4

### Patch Changes

- Updated dependencies [[`a380ce4`](https://github.com/single-spa/create-single-spa/commit/a380ce4d381c651d5df671aee4826bf0dcca9004)]:
  - webpack-config-single-spa@3.1.0

## 2.2.3

### Patch Changes

- [#300](https://github.com/single-spa/create-single-spa/pull/300) [`0ca13bb`](https://github.com/single-spa/create-single-spa/commit/0ca13bb8de64b2329bae04f7bf92b1e9fcb5c47a) Thanks [@joeldenning](https://github.com/joeldenning)! - Breaking Changes

  - NodeJS >= 12.13.0 now required, as we're using [style-loader@3](https://github.com/webpack-contrib/style-loader/releases/tag/v3.0.0) in webpack-config-single-spa

  Projects generated by single-spa

  - New projects use Jest 27 (https://jestjs.io/blog/2021/05/25/jest-27#miscellaneous-breaking-changes), including jest-util and babel-jest
  - Newly generated projects use React 17 types
  - Newly generated projects now use concurrently 6. See https://github.com/kimmobrunfeldt/concurrently/releases/tag/v6.0.0
  - Newly generated root configs and util modules now execute `git init` during creation
  - Newly generated projects now use eslint-config-prettier 8. See https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21

  Internal changes

  - Upgrade yargs to 17 in create-single-spa, which parses the CLI args. See https://github.com/yargs/yargs/releases/tag/v17.0.0
  - Upgrade yeoman-environment to v3 and yeoman-generator to v5. This comes with changes to how packages are installed by yeoman, but those changes don't apply to create-single-spa because only committed package.jsons result in yeoman-environment installs. Manually installing dependencies the old way via yeoman-generator.

  Maintenance

  - Upgrade to jest 27 (https://jestjs.io/blog/2021/05/25/jest-27#miscellaneous-breaking-changes), including jest-util and babel-jest
  - Upgrade create-single-spa to husky 6. Upgrade newly generated projects to use husky 6
  - Add `scripts/update-dependencies.sh` script for maintainers to easily upgrade all dependencies at once

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
