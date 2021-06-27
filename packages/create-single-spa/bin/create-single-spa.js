#!/usr/bin/env node

checkNodeVersion();

const yeoman = require("yeoman-environment");
const argv = require("yargs").argv;

const env = yeoman.createEnv();
env.registerStub(require("generator-single-spa"), "single-spa");
env.run("single-spa " + argv._.join(" "), argv);

function checkNodeVersion() {
  const minVersion = "12.13.0";
  const [minMajor, minMinor, minPatch] = minVersion.split(".").map(Number);
  const [currentMajor, currentMinor, currentPatch] = process.versions.node
    .split(".")
    .map(Number);

  let validVersion = true;

  if (currentMajor < minMajor) {
    validVersion = false;
  } else if (currentMajor === minMajor) {
    if (currentMinor < minMinor) {
      validVersion = false;
    } else if (currentMinor === minMinor && currentPatch < minPatch) {
      validVersion = false;
    }
  }

  if (!validVersion) {
    throw Error(
      "create-single-spa requires NodeJS >= " +
        minVersion +
        ", but you are using NodeJS " +
        process.versions.node +
        "."
    );
  }
}
