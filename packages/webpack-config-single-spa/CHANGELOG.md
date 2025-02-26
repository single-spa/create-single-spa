# webpack-config-single-spa

## 7.0.1

### Patch Changes

- [#440](https://github.com/single-spa/create-single-spa/pull/440) [`011ed65`](https://github.com/single-spa/create-single-spa/commit/011ed65c1c3e5758ebc39d56b5a4eb258f8b9909) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix bug where HMR was mistakenly enabled when outputSystemJS option was omitted

## 7.0.0

### Major Changes

- [#431](https://github.com/single-spa/create-single-spa/pull/431) [`f3fcb82`](https://github.com/single-spa/create-single-spa/commit/f3fcb8223ee42ba6912e5211ba4dd44e959244fb) Thanks [@joeldenning](https://github.com/joeldenning)! - Disable standalone mode unless explicitly set

## 6.0.3

### Patch Changes

- [#426](https://github.com/single-spa/create-single-spa/pull/426) [`b600a88`](https://github.com/single-spa/create-single-spa/commit/b600a88039d0f3ad0fbafc727751d81ce2b7c694) Thanks [@joeldenning](https://github.com/joeldenning)! - Disable hot reloading for native es modules

## 6.0.2

### Patch Changes

- [#416](https://github.com/single-spa/create-single-spa/pull/416) [`1cb1a10`](https://github.com/single-spa/create-single-spa/commit/1cb1a10e0f9ade39caaf868fea16dbcf8cd9dc66) Thanks [@joeldenning](https://github.com/joeldenning)! - Use webpack auto public path for native ES modules

## 6.0.1

### Patch Changes

- [#415](https://github.com/single-spa/create-single-spa/pull/415) [`4ad86d6`](https://github.com/single-spa/create-single-spa/commit/4ad86d642ac659c65d983e9cd62df82f6075774b) Thanks [@joeldenning](https://github.com/joeldenning)! - Disable SystemJSPublicPathPlugin when not outputting to SystemJS format

## 6.0.0

### Major Changes

- [#412](https://github.com/single-spa/create-single-spa/pull/412) [`f9edeef`](https://github.com/single-spa/create-single-spa/commit/f9edeef57e5230df78efe7deaea2dec159db89a3) Thanks [@joeldenning](https://github.com/joeldenning)! - Output to native ES modules by default. Add new outputSystemJS option.

  #### Upgrading

  To upgrade without switching to native ES modules, add the `outputSystemJS` option to your webpack.config.js:

  ```js
  const { merge } = require("webpack-merge");
  const singleSpaDefaults = require("webpack-config-single-spa");

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

### Minor Changes

- [#414](https://github.com/single-spa/create-single-spa/pull/414) [`5e19bc1`](https://github.com/single-spa/create-single-spa/commit/5e19bc1b9dd069de995b249e99d19a241b7c8f8c) Thanks [@joeldenning](https://github.com/joeldenning)! - Support for importMapUrl option, via import-map-externals-webpack-plugin

## 5.3.1

### Patch Changes

- [#393](https://github.com/single-spa/create-single-spa/pull/393) [`181da9a`](https://github.com/single-spa/create-single-spa/commit/181da9a5aecd7a9b8fc99dbb965d106d7b74b3de) Thanks [@ibacher](https://github.com/ibacher)! - Bump dependency versions to compatible versions without vulnerabilities

## 5.3.0

### Minor Changes

- [#353](https://github.com/single-spa/create-single-spa/pull/353) [`a34fad7`](https://github.com/single-spa/create-single-spa/commit/a34fad7766002fc81100ba8e818f732d3c94404f) Thanks [@filoxo](https://github.com/filoxo)! - Extract svg into own loader for easier overrides

### Patch Changes

- [#367](https://github.com/single-spa/create-single-spa/pull/367) [`a287602`](https://github.com/single-spa/create-single-spa/commit/a287602d59cd6227ea8216d8e44872d650ebd1c6) Thanks [@joeldenning](https://github.com/joeldenning)! - - Upgrade standalone-single-spa-webpack-plugin to version 4, for multiple importMapUrls support
  - Upgrade webpack to 5.75.0, for Node 18 support
  - Fix typescript error with root configs related to System.import

## 5.2.0

### Minor Changes

- [#338](https://github.com/single-spa/create-single-spa/pull/338) [`76d5857`](https://github.com/single-spa/create-single-spa/commit/76d585768b7625161d55c63663276845a7e9b1bb) Thanks [@joeldenning](https://github.com/joeldenning)! - Support for .module.css files

## 5.1.1

### Patch Changes

- [#335](https://github.com/single-spa/create-single-spa/pull/335) [`22c8fb9`](https://github.com/single-spa/create-single-spa/commit/22c8fb9f5a7056f1a24cc2c178897fefc7819843) Thanks [@joeldenning](https://github.com/joeldenning)! - Remove dependency on unused-files-webpack-plugin. Resolves #334

## 5.1.0

### Minor Changes

- [#327](https://github.com/single-spa/create-single-spa/pull/327) [`5c31d36`](https://github.com/single-spa/create-single-spa/commit/5c31d3639e8663be97e435366615f7553341d453) Thanks [@joeldenning](https://github.com/joeldenning)! - Update all dependencies

### Patch Changes

- [#326](https://github.com/single-spa/create-single-spa/pull/326) [`f004685`](https://github.com/single-spa/create-single-spa/commit/f004685810e7634ccb1598b8c3cf8321b6833951) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix util vue modules. Do not process .vue.html files.

## 5.0.0

### Major Changes

- [#315](https://github.com/single-spa/create-single-spa/pull/315) [`729c6b1`](https://github.com/single-spa/create-single-spa/commit/729c6b1b537457fe8ec801b40c86c9eb7fb0fa84) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to standalone-single-spa-webpack-plugin@3. For the majority of users, you can safely upgrade webpack-config-single-spa (-ts, -react, -react-ts) without any code changes.

  See https://github.com/single-spa/standalone-single-spa-webpack-plugin/releases/tag/v3.0.0 for details about what was changed. It only impacts running projects in standalone mode.

## 4.0.0

### Major Changes

- [#310](https://github.com/single-spa/create-single-spa/pull/310) [`5dc82a6`](https://github.com/single-spa/create-single-spa/commit/5dc82a6ce97a72a53dc2533fe45d2f02504be4e9) Thanks [@alexristich](https://github.com/alexristich)! - Upgrade to latest config from webpack-dev-server v4.0.0-rc.0

  The [release candidate](https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-rc.0) introduced some breaking changes which prevented the local server from running in new applications created with `create-single-spa`.

  This also simplfies the configuration to take advantage of new default values.

To upgrade, run one of the following commands:

```sh
npm install --save-dev webpack-dev-server@^4.0.0-rc.0

pnpm install --save-dev webpack-dev-server@^4.0.0-rc.0

yarn add --dev webpack-dev-server@^4.0.0-rc.0
```

## 3.1.0

### Minor Changes

- [#306](https://github.com/single-spa/create-single-spa/pull/306) [`a380ce4`](https://github.com/single-spa/create-single-spa/commit/a380ce4d381c651d5df671aee4826bf0dcca9004) Thanks [@joeldenning](https://github.com/joeldenning)! - Support for entry files with non .js extensions

## 3.0.0

### Major Changes

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

## 2.2.1

### Patch Changes

- [#276](https://github.com/single-spa/create-single-spa/pull/276) [`337d8dd`](https://github.com/single-spa/create-single-spa/commit/337d8dd103aee59c486d7f57cd4fa214d115fa21) Thanks [@PieterBoeren](https://github.com/PieterBoeren)! - Added support for images in the webpack config

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
