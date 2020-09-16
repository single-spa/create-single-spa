const validateNaming = require("../src/validate-naming");

describe("validate-naming", () => {
  test("validates correctly", () => {
    expect(validateNaming("org")).toEqual(true);
    expect(validateNaming("org-name")).toEqual(true);
    expect(validateNaming("org-name-2")).toEqual(true);
    expect(validateNaming("project-name")).toEqual(true);
    expect(validateNaming("project-1")).toEqual(true);
  });
  test("returns error message on falsey input", () => {
    const emptyMsg = expect.stringContaining("Cannot be empty");

    expect(validateNaming()).toEqual(emptyMsg);
    expect(validateNaming("")).toEqual(emptyMsg);
  });
  describe("invalid input", () => {
    test("does not start with letter", () => {
      const invalidMsg = "Must begin with a letter";

      expect(validateNaming("@org")).toEqual(invalidMsg);
      expect(validateNaming("1234")).toEqual(invalidMsg);
      expect(validateNaming("123-org")).toEqual(invalidMsg);
    });
    test("contains invalid characters", () => {
      const invalidMsg = expect.stringContaining("May only use");

      expect(validateNaming("orgName")).toEqual(invalidMsg);
      expect(validateNaming("org_123")).toEqual(invalidMsg);
    });
  });
});
