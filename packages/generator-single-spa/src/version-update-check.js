const chalk = require("chalk");

module.exports = function versionUpdateCheck(currentVersion, latestVersion) {
  try {
    const [latestMajor, latestMinor, latestPatch] = latestVersion.split(".");
    const [currentMajor, currentMinor, currentPatch] = currentVersion.split(
      "."
    );
    const majorUpdate = currentMajor < latestMajor;
    const minorUpdate = currentMinor < latestMinor;
    const patchUpdate = currentPatch < latestPatch;

    if (majorUpdate | minorUpdate | patchUpdate) {
      let updateType;
      let msg = `${currentVersion} → ${latestVersion}`;
      if (majorUpdate) {
        updateType = chalk.red("major update");
        msg = chalk.red(msg);
      } else if (minorUpdate) {
        updateType = chalk.yellow("minor update");
        msg = chalk.yellow(msg);
      } else {
        updateType = chalk.green("patch update");
        msg = chalk.green(msg);
      }
      console.log(
        chalk.underline(
          `\nA ${updateType} of create-single-spa is available: ${msg}\n`
        )
      );
    }
  } catch (e) {
    // Fail silently
  }
};
