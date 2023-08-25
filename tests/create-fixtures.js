const { createFixtureIfDoesntExist, ensureInstall } = require("./test-helpers");

module.exports = async () => {
  await createFixtureIfDoesntExist(
    "root-config-ts-webpack",
    `
      --moduleType root-config
      --packageManager pnpm
      --orgName org
      --typescript
      --layout=false
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "root-config-ts-webpack-layout",
    `
      --moduleType root-config
      --packageManager pnpm
      --orgName org
      --typescript
      --layout=true
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "react-app-js-webpack",
    `
      --framework react
      --packageManager pnpm
      --orgName org
      --projectName project
      --typescript=false
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "react-app-ts-webpack",
    `
      --framework react
      --packageManager pnpm
      --orgName org
      --projectName project
      --typescript
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "root-config-js-webpack-layout",
    `
      --moduleType root-config
      --packageManager pnpm
      --orgName org
      --typescript=false
      --layout=true
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "root-config-js-webpack",
    `
      --moduleType root-config
      --packageManager pnpm
      --orgName org
      --typescript=false
      --layout=false
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "svelte-app-js",
    `
      --framework svelte
      --packageManager pnpm
      --orgName org
      --projectName project
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "util-module-js-webpack",
    `
      --moduleType util-module
      --framework=none
      --packageManager pnpm
      --orgName org
      --projectName project
      --typescript=false
      --skipInstall
    `,
  );

  await createFixtureIfDoesntExist(
    "util-module-ts-webpack",
    `
    --moduleType util-module
    --framework=none
    --packageManager pnpm
    --orgName org
    --projectName project
    --typescript
    --skipInstall
  `,
  );

  await createFixtureIfDoesntExist(
    "util-react-js-webpack",
    `
    --moduleType util-module
    --framework=react
    --packageManager pnpm
    --orgName org
    --projectName project
    --typescript=false
    --skipInstall
  `,
  );

  await createFixtureIfDoesntExist(
    "util-react-ts-webpack",
    `
    --moduleType util-module
    --framework=react
    --packageManager pnpm
    --orgName org
    --projectName project
    --typescript
    --skipInstall
  `,
  );

  await ensureInstall();
};
