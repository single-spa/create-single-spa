import { screen } from "@testing-library/dom";
import { mount } from "./<%= filename %>";

beforeAll(() => {
  return mount({ name: "<%= name %>" });
});

test("Application mounts to the document", () => {
  expect(screen.getByText("<%= name %> is mounted!")).toBeInTheDocument();
});
