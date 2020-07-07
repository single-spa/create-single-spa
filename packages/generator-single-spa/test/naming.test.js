const isValidName = require("../src/naming");

describe("generator-single-spa naming convention", () => {
  it("enforces naming convention correctly", () => {
    expect(isValidName("org")).toEqual(true);
    expect(isValidName("org-name")).toEqual(true);

    expect(isValidName("@org")).toEqual(false);
    expect(isValidName("orgName")).toEqual(false);
    expect(isValidName("1234")).toEqual(false);
  });
});
