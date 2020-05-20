import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import("https://dist-qqbprggud.now.sh/single-spa-welcome.js"),
  activeWhen: isActive.always,
});

// registerApplication({
//   name: "@<%- orgName %>/navbar",
//   app: () => System.import("@<%- orgName %>/navbar"),
//   activeWhen: isActive.always,
// });

start({
  urlRerouteOnly: true,
});
