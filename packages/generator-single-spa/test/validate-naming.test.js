const validateNaming = require("../src/validate-naming");

describe("validate-naming", () => {
  test("valid input", () => {
    expect(validateNaming("org")).toEqual(true);
    expect(validateNaming("org-name")).toEqual(true);
    expect(validateNaming("org-name-2")).toEqual(true);
    expect(validateNaming("project-name")).toEqual(true);
    expect(validateNaming("project-1")).toEqual(true);
    expect(validateNaming("orgName")).toEqual(true);
  });
  describe("invalid input", () => {
    test("cannot be empty", () => {
      const emptyMsg = expect.stringContaining("Cannot be empty");

      expect(validateNaming()).toEqual(emptyMsg);
      expect(validateNaming("")).toEqual(emptyMsg);
    });
    test("does not start with letter", () => {
      const invalidMsg = expect.stringContaining("Must begin with");

      expect(validateNaming("@org")).toEqual(invalidMsg);
      expect(validateNaming("1234")).toEqual(invalidMsg);
      expect(validateNaming("123-org")).toEqual(invalidMsg);
      expect(validateNaming("  org")).toEqual(invalidMsg);
    });
    test("contains invalid characters", () => {
      const invalidMsg = expect.stringContaining("May only contain");

      expect(validateNaming("org_123")).toEqual(invalidMsg);
      expect(validateNaming("org@123")).toEqual(invalidMsg);
      expect(validateNaming("org  ")).toEqual(invalidMsg);
    });
  });
});
