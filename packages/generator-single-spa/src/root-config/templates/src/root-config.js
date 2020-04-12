import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@<%- orgName %>/navbar",
  app: () => System.import("@<%- orgName %>/navbar"),
  activeWhen: isActive.navbar,
});

start();
