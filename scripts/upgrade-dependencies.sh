#!/bin/sh
pnpx npm-check-updates -iu --packageFile ./package.json
pnpx npm-check-updates -iu --packageFile ./packages/create-single-spa/package.json
pnpx npm-check-updates -iu --packageFile ./packages/single-spa-web-server-utils/package.json
pnpx npm-check-updates -iu --packageFile ./packages/single-spa-welcome/package.json
pnpx npm-check-updates -iu --packageFile ./packages/ts-config-single-spa/package.json
pnpx npm-check-updates -iu --packageFile ./packages/webpack-config-single-spa/package.json
pnpx npm-check-updates -iu --packageFile ./packages/webpack-config-single-spa-react/package.json
pnpx npm-check-updates -iu --packageFile ./packages/webpack-config-single-spa-react-ts/package.json
pnpx npm-check-updates -iu --packageFile ./packages/webpack-config-single-spa-ts/package.json

# generator-single-spa has a bunch of nested package jsons
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/common-templates/typescript/react.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/common-templates/typescript/typescript.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/react/templates/react.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/react/templates/typescript/typescript-react.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/root-config/templates/root-config.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/root-config/templates/root-config-layout.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/svelte/templates/svelte.package.json
pnpx npm-check-updates -iu --packageFile ./packages/generator-single-spa/src/util-module/templates/util-module.package.json
