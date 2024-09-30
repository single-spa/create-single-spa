---
"webpack-config-single-spa": major
---

Output to native ES modules by default. Add new outputSystemJS option.

## Upgrading

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

To switch to native ES modules, see the full migration guide on single-spa.js.org
