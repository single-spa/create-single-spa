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

There are two kinds of tests - end-to-end (e2e) and package-specific tests. The package-specific tests reside inside of each package and can be run with `yarn test:packages`. The end-to-end tests can be run with `yarn test:e2e`. To run both, you can run `yarn test`.

Note that the end-to-end tests run create-single-spa several times to create several "fixture" directories, which takes a fair amount of time. To avoid having to recreate the fixtures every test run, the tests will reuse an existing fixtures directory if one is present. This means you only have to create the fixtures once. To clean out a specific fixture so that it is recreated, simply delete the directory. To clean out all fixtures, you can run `yarn clean-tests`.
