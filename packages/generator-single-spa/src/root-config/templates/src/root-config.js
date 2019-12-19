import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication(
  "@<?- orgName ?>/navbar",
  () => System.import("@<?- orgName ?>/navbar"),
  isActive.navbar
);

start();