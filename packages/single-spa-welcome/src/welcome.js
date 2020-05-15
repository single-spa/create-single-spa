import React from "react";
import "./welcome.css";

export default function Root(props) {
  return (
    <section id="welcome">
      <img
        className="logo"
        src="https://single-spa.js.org/img/logo-white-bgblue.svg"
        alt=""
      />
      <h2 className="center" style={{ marginBottom: 0 }}>
        Welcome
      </h2>
      <p className="center" style={{ marginTop: 0 }}>
        to your single-spa root config!{" "}
        <span role="img" aria-label="Congrats!">
          🥳
        </span>
      </p>
      <p>
        This example single-spa application is being imported by your root
        config. Follow the next steps to grow your microfrontends architecture.
      </p>
      <h2 id="next-steps">Next steps</h2>
      <ol>
        <li>Create a your first single-spa application</li>
        <li>
          Update the importmap in <code>src/index.ejs</code>
        </li>
        <li>
          Open <code>src/root-config.js</code> and remove this parcel
        </li>
        <li>
          Uncomment the <code>registerApplication</code> code and update it with
          your new application's name
        </li>
      </ol>
      <p>
        After this, you should no longer see this welcome page but should
        instead see your new application!
      </p>
      <h2 id="learn-more">Learn more</h2>
      <ul>
        <li>Shared dependencies importmaps</li>
        <li>SystemJS</li>
        <li>Single-spa ecosystem</li>
      </ul>
      <h2 id="contribute">Contribute</h2>
      <ul>
        <li>
          <a href="https://opencollective.com/single-spa">
            Support single-spa by donating on OpenCollective!
          </a>
        </li>
        <li>
          Contribute to{" "}
          <a href="https://github.com/single-spa/single-spa">
            single-spa on GitHub
          </a>
          !
        </li>
        <li>Join the Slack group to engage in discussions</li>
        <li>
          Tweet <a href="https://twitter.com/Single_spa">@Single-spa</a> and
          show off the awesome work you've done!
        </li>
      </ul>
    </section>
  );
}
