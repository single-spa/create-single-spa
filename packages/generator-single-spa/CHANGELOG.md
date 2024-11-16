# generator-single-spa

## 5.0.2

### Patch Changes

- [#422](https://github.com/single-spa/create-single-spa/pull/422) [`f14cfa1`](https://github.com/single-spa/create-single-spa/commit/f14cfa1fcf3ad7a779bc668f9a4ca67316203e14) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix react typescript webpack config version

- [#422](https://github.com/single-spa/create-single-spa/pull/422) [`f14cfa1`](https://github.com/single-spa/create-single-spa/commit/f14cfa1fcf3ad7a779bc668f9a4ca67316203e14) Thanks [@joeldenning](https://github.com/joeldenning)! - Remove unused webpack-config-single-spa-ts from react typescript package.json

## 5.0.1

### Patch Changes

- [#419](https://github.com/single-spa/create-single-spa/pull/419) [`56da695`](https://github.com/single-spa/create-single-spa/commit/56da695c5e18c34f51f0b084a91c42f7aac05479) Thanks [@joeldenning](https://github.com/joeldenning)! - Load layout root config microfrontends with browser rather than SystemJS

## 5.0.0

### Major Changes

- [#417](https://github.com/single-spa/create-single-spa/pull/417) [`d518ae4`](https://github.com/single-spa/create-single-spa/commit/d518ae43fe67e71245a9245367fa2bba6b019c91) Thanks [@joeldenning](https://github.com/joeldenning)! - Output to ESM format rather than SystemJS format. Upgrade webpack-config-single-spa.

  Newly generated root-configs, single-spa applications, and utility modules will now output to ESM format rather than SystemJS format. To revert to SystemJS format, add the `outputSystemJS: true` option to options passed to webpack-config-single-spa within the webpack.config.js

## 4.1.6

### Patch Changes

- [#410](https://github.com/single-spa/create-single-spa/pull/410) [`a9735bc`](https://github.com/single-spa/create-single-spa/commit/a9735bcf2bb5e443f9e11b1c3eaaaa95bfdf274f) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix typescript error in generated root configs

## 4.1.5

### Patch Changes

- [#393](https://github.com/single-spa/create-single-spa/pull/393) [`181da9a`](https://github.com/single-spa/create-single-spa/commit/181da9a5aecd7a9b8fc99dbb965d106d7b74b3de) Thanks [@ibacher](https://github.com/ibacher)! - Bump dependency versions to compatible versions without vulnerabilities

## 4.1.4

### Patch Changes

- [#383](https://github.com/single-spa/create-single-spa/pull/383) [`b3ed702`](https://github.com/single-spa/create-single-spa/commit/b3ed7021b4928bb3798e9f8e51aa8eb3e0a306bb) Thanks [@robmosca](https://github.com/robmosca)! - Updated webpack-cli to 4.10.0, pnpm to 8.6.1 and corresponding adjustments

## 4.1.3

### Patch Changes

- [#367](https://github.com/single-spa/create-single-spa/pull/367) [`a287602`](https://github.com/single-spa/create-single-spa/commit/a287602d59cd6227ea8216d8e44872d650ebd1c6) Thanks [@joeldenning](https://github.com/joeldenning)! - - Upgrade standalone-single-spa-webpack-plugin to version 4, for multiple importMapUrls support
  - Upgrade webpack to 5.75.0, for Node 18 support
  - Fix typescript error with root configs related to System.import

## 4.1.2

### Patch Changes

- [#336](https://github.com/single-spa/create-single-spa/pull/336) [`fb19896`](https://github.com/single-spa/create-single-spa/commit/fb198960f07c007373e7b66e0230f16c47d2b8d8) Thanks [@joeldenning](https://github.com/joeldenning)! - Use single-spa-layout@1 until single-spa@6 is ready

## 4.1.1

### Patch Changes

- [#333](https://github.com/single-spa/create-single-spa/pull/333) [`133e580`](https://github.com/single-spa/create-single-spa/commit/133e5803aebd1b205e9547e9bf02d89326fd94f5) Thanks [@joeldenning](https://github.com/joeldenning)! - Fix package manager used in util module build script. Resolves #329

## 4.1.0

### Minor Changes

- [#327](https://github.com/single-spa/create-single-spa/pull/327) [`5c31d36`](https://github.com/single-spa/create-single-spa/commit/5c31d3639e8663be97e435366615f7553341d453) Thanks [@joeldenning](https://github.com/joeldenning)! - Update all dependencies

## 4.0.2

### Patch Changes

- [#319](https://github.com/single-spa/create-single-spa/pull/319) [`10c089d`](https://github.com/single-spa/create-single-spa/commit/10c089dc80675487a7f67a959311c24e9c8dfdf0) Thanks [@PieterBoeren](https://github.com/PieterBoeren)! - Fix quotes issue in babel config file

## 4.0.1

### Patch Changes

- [#320](https://github.com/single-spa/create-single-spa/pull/320) [`ecf5885`](https://github.com/single-spa/create-single-spa/commit/ecf58858b4188ed4e0f67710560cf8ca243dcd30) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade to ts-config-single-spa@3

## 4.0.0

### Major Changes

- [#316](https://github.com/single-spa/create-single-spa/pull/316) [`6ca8cbc`](https://github.com/single-spa/create-single-spa/commit/6ca8cbcdd43748261e60372f4582ae28cda5302c) Thanks [@joeldenning](https://github.com/joeldenning)! - For typescript projects, automatically emit types during `build`.

  # Migrating

  The create-single-spa api for generating new typescript projects did not change. However, to upgrade existing projects, do the following:

  1. Update your package.json. Make sure to replace `<%= packageManager %>` with either `npm`, `yarn`, or `pnpm`

  ```diff
  {
    "scripts": {
  -     "build": "webpack --mode=production",
  +     "build": "concurrently <%= packageManager %>:build:*",
  +     "build:webpack": "webpack --mode=production",
  +     "build:types": "tsc"
    }
  }
  ```

  2. Update your tsconfig.json. Make sure to replace `<%= mainFile %>` with the proper value. This is in the format `org-project.ts`. React projects should have the `.tsx` file extension

  ```diff
  {
    "compilerOptions": {
  +     "declarationDir": "dist"
    },
  +   "files": ["src/<%= mainFile %>"]
  -   "include": ["src/**/*", "node_modules/@types"],
  +   "include": ["src/**/*"]
  }
  ```

  3. Add the `"types"` property to your package.json:

  ```diff
  {
  +  "types": "dist/<%= mainFile %>.d.ts"
  }
  ```

  4. Upgrade `ts-config-single-spa` to the latest 3.x release, which has new configuration for emitting types.

  ```sh
  npm install --save-dev ts-config-single-spa@^3.0.0

  pnpm install --save-dev ts-config-single-spa@^3.0.0

  yarn add --dev ts-config-single-spa@^3.0.0
  ```

  5. Now run `npm run build` or `npm run build:types` and verify that a typescript declaration file is outputted to your `dist` directory. Verify that the output file name is the same as the `"types"` property in your package.json.

* [#317](https://github.com/single-spa/create-single-spa/pull/317) [`9f5dfc8`](https://github.com/single-spa/create-single-spa/commit/9f5dfc8a4cbcc64d539f8e65c0f5077cdf59073f) Thanks [@joeldenning](https://github.com/joeldenning)! - Breaking changes:

  Require new --framework option when creating utility microfrontends. This is a breaking change for CLI users who rely on non-interactivity when running create-single-spa, as there's a new option required when `--moduleType util-module` is set. For most cases, though (e.g. when a human can respond to CLI prompts), this change is not a breaking behavior.

  Features:

  React utility microfrontends are now supported. When you create a new utility microfrontend, it will now ask for which framework you want the framework to be authored in. See https://github.com/single-spa/create-single-spa/issues/264

## 3.1.2

### Patch Changes

- [#313](https://github.com/single-spa/create-single-spa/pull/313) [`24bf588`](https://github.com/single-spa/create-single-spa/commit/24bf5886bf2f3e4e76f063abfe4d42eba4a2e9eb) Thanks [@joeldenning](https://github.com/joeldenning)! - Use latest version of webpack-config-single-spa-ts

## 3.1.1

### Patch Changes

- [`44f122b`](https://github.com/single-spa/create-single-spa/commit/44f122b6f8b0dd2f09b8965d39f085add2e2d07e) Thanks [@joeldenning](https://github.com/joeldenning)! - Upgrade webpack-config-single-spa versions

## 3.1.0

### Minor Changes

- [#312](https://github.com/single-spa/create-single-spa/pull/312) [`dcc5a02`](https://github.com/single-spa/create-single-spa/commit/dcc5a02b91b01418ee5304060b18f022763700ed) Thanks [@joeldenning](https://github.com/joeldenning)! - Use webpack-dev-server@4.0.0-rc.0

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

### Minor Changes

- [#299](https://github.com/single-spa/create-single-spa/pull/299) [`6c8ca4e`](https://github.com/single-spa/create-single-spa/commit/6c8ca4ebbb9a88e21a361a2f8f12935cfb790df3) Thanks [@joeldenning](https://github.com/joeldenning)! - Support --skipInstall option

* [#298](https://github.com/single-spa/create-single-spa/pull/298) [`0a485de`](https://github.com/single-spa/create-single-spa/commit/0a485def21ff6dc0946e5f7b45bb2cb860281b95) Thanks [@EduSantosBrito](https://github.com/EduSantosBrito)! - Minor changes in package.json and webpack. Migrate to the new JSX Transform with React 17

### Patch Changes

- [#294](https://github.com/single-spa/create-single-spa/pull/294) [`70226ef`](https://github.com/single-spa/create-single-spa/commit/70226ef075afa35c2cbe3e07071b3859796075ac) Thanks [@cejaramillof](https://github.com/cejaramillof)! - add noscript tag to html templates

* [#292](https://github.com/single-spa/create-single-spa/pull/292) [`8f1c94f`](https://github.com/single-spa/create-single-spa/commit/8f1c94fcff087ad45a0fd44dc006c826e6e901a5) Thanks [@gjhommersom](https://github.com/gjhommersom)! - fixed generated jest config for react unable to load parcels

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
