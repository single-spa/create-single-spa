import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

export default function rollupConfigSingleSpa(opts) {
  if (typeof opts !== "object") {
    throw Error(`rollup-config-single-spa requires an opts object`);
  }

  if (typeof opts.orgName !== "string") {
    throw Error(`rollup-config-single-spa requires an opts.orgName string`);
  }

  if (typeof opts.projectName !== "string") {
    throw Error(`rollup-config-single-spa requires an opts.projectName string`);
  }

  const production =
    typeof opts.production === "boolean"
      ? opts.production
      : !process.env.ROLLUP_WATCH;
  const orgModule = new RegExp(`^@${opts.orgName}/`);

  return {
    input: "src/<%= orgName %>-<%= projectName %>.js",
    output: {
      sourcemap: true,
      format: "system",
      name: null, // ensure anonymous System.register
      file: "dist/<%= orgName %>-<%= projectName %>.js",
    },
    // Do not bundle in shared dependencies
    external: ["single-spa", (id) => id.search(orgModule) !== -1],
    plugins: [
      findUnused({
        exclude: [
          "**/*.test.*",
          "**/*.spec.*",
          "**/*.*.snap",
          "**/test-setup.*",
          "**/*.stories.*",
        ],
      }),
      // placeholder to be able to add
      false,
      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      !production && serve(),

      // Watch the `dist` directory and refresh the
      // browser on changes when not in production
      !production && livereload("dist"),

      // If we're building for production (npm run build
      // instead of npm run dev), minify
      production && terser(),
    ],
    watch: {
      clearScreen: false,
    },
  };
}

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "serve", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
