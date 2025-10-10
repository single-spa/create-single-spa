---
"generator-single-spa": major
---

- Breaking: Upgrade svelte to v5. Mount and unmount need to be passed to the `singleSpaSvelte` function.
- Breaking: Rollup now outputs using the ESM format rather than the System format.
- Breaking: Set `"type": "module"` in package.json to avoid performance overhead during rollup.
- Replace jest with vitest to simplify test setup.
