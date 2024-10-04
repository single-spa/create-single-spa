---
"generator-single-spa": major
"single-spa-welcome": major
"create-single-spa": major
---

Output to ESM format rather than SystemJS format. Upgrade webpack-config-single-spa.

Newly generated root-configs, single-spa applications, and utility modules will now output to ESM format rather than SystemJS format. To revert to SystemJS format, add the `outputSystemJS: true` option to options passed to webpack-config-single-spa within the webpack.config.js
