# Create single-spa

A project to make creating single-spa applications easy as `yarn create single-spa`. The spa builder extraordinaire.

[Full Documentation](https://single-spa.js.org/docs/create-single-spa)

## Developing

### Running the create-single-spa CLI

We're using [lerna](https://lerna.js.org/).

1. `yarn install`
2. `yarn bootstrap`
3. `node packages/create-single-spa/bin/create-single-spa.js ../some-test-dir`

Note that create-single-spa can run in the current directory by default, but you can provide a different destination directory through the CLI (as shown above with `some-test-dir`).

### Tests

`yarn test`
