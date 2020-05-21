import React from "react";
import { render } from "@testing-library/react";
import Welcome from "./welcome";

describe("Welcome component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Welcome />);
    expect(getByText("Welcome")).toBeTruthy();
  });
});
