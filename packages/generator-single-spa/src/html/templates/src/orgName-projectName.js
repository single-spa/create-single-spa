import singleSpaHtml from "single-spa-html";
import template from "./template.html";
import "./styles.css";

const htmlLifecycles = singleSpaHtml({
  template,
});

export const { mount, unmount } = htmlLifecycles;

/* Can also execute JavaScript after application has been mounted
export const mount = (props) => htmlLifecycles.mount(props)
  .then(() => { console.log("js after mount"); });
*/
