import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import("https://dist-qqbprggud.now.sh/single-spa-welcome.js"),
  activeWhen: ["/"],
});

// registerApplication({
//   name: "@<%- orgName %>/navbar",
//   app: () => System.import("@<%- orgName %>/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
