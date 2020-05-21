// import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Welcome from "./welcome";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Welcome,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return (
      <p role="alert">
        Oops! Something went wrong. Please help us fix this by submitting an
        <a href="https://github.com/single-spa/create-single-spa/issues/new?title=single-spa-welcome+encountered+an+error&body=Steps+to+reproduce">
          issue to our Github
        </a>{" "}
        with details on how you got here.
      </p>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
