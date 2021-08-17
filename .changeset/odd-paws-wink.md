---
"generator-single-spa": major
"create-single-spa": major
---

Breaking changes:

Require new --framework option when creating utility microfrontends. This is a breaking change for CLI users who rely on non-interactivity when running create-single-spa, as there's a new option required when `--moduleType util-module` is set. For most cases, though (e.g. when a human can respond to CLI prompts), this change is not a breaking behavior.

Features:

React utility microfrontends are now supported. When you create a new utility microfrontend, it will now ask for which framework you want the framework to be authored in. See https://github.com/single-spa/create-single-spa/issues/264
