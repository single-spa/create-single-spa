# Create single-spa
A project to make creating single-spa applications easy as `yarn create single-spa`. The spa builder extraordinaire.

[Full Documentation](https://single-spa.js.org/docs/create-single-spa)

## Developing

### Running the create-single-spa CLI

We're using [lerna](https://lerna.js.org/).

1. `yarn install`
2. `yarn bootstrap`
3. `node packages/create-single-spa/bin/create-single-spa.js`

Note that create-single-spa **runs in the current directory**. For development purposes, you may want to create a test directory outside of the create-single-spa folder to run it on. There is no compilation / build step. You may continuously run the command in 3) to re-run after code changes.

### Tests

`yarn test`
