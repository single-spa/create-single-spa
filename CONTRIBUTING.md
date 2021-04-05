# Local development

## Running the create-single-spa CLI

We're using [pnpm workspaces](https://pnpm.js.org/en/workspaces).

1. `pnpm install`
2. `node packages/create-single-spa/bin/create-single-spa.js ../some-test-dir`

Note that create-single-spa can run in the current directory by default, but you can provide a different destination directory through the CLI (as shown above with `some-test-dir`).

## Add changeset for each PR

This project uses [changesets](https://github.com/atlassian/changesets) to manage versioning of each of the packages. Before you create a pull request, run the following:

```sh
pnpmx changeset
```

## Tests

There are two kinds of tests - end-to-end (e2e) and package-specific tests. The package-specific tests reside inside of each package and can be run with `pnpm test --recursive`. The end-to-end tests can be run with `pnpm run test:e2e`.

Note that the end-to-end tests run create-single-spa several times to create several "fixture" directories, which takes a fair amount of time. To avoid having to recreate the fixtures every test run, the tests will reuse an existing fixtures directory if one is present. This means you only have to create the fixtures once. To clean out a specific fixture so that it is recreated, simply delete the directory. To clean out all fixtures, you can run `pnpm run clean-tests`.

You can also run only one e2e test by specifying the name of the test in the cli `pnpm run test:e2e react-app-js-webpack`. Also, you can add `--watch` to any pnpm test:e2e command to get the jest watcher.

If you're having trouble diagnosing why a test is failing, try running the tests manually in a command line. Change directories via `cd tests/fixtures/<fixture-name>` and then run `pnpm run build` (or whichever command is failing).
