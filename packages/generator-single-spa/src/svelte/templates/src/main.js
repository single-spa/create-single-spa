import singleSpaSvelte from "@single-spa/svelte";
import { mount as originalMount, unmount as originalUnmount } from "svelte";
import App from "./App.svelte";

const svelteLifecycles = singleSpaSvelte({
  component: App,
  mount: originalMount,
  unmount: originalUnmount,
});

export const { bootstrap, mount, unmount } = svelteLifecycles;
