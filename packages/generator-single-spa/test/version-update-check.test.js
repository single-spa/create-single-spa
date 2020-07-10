const checkForVersionUpdate = require("../src/version-update-check");

describe("Checks for version update", () => {
  const log = console.log;
  const currentVersion = "1.1.1";

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  test("no update", () => {
    checkForVersionUpdate(currentVersion, currentVersion);
    expect(console.log).not.toHaveBeenCalled();
  });

  test("patch update", () => {
    const patchVersionUpdate = "1.1.2";
    checkForVersionUpdate(currentVersion, patchVersionUpdate);
    expect(console.log).toHaveBeenCalled();
    const message = console.log.mock.calls[0][0];
    expect(message).toEqual(expect.stringContaining("patch update"));
    expect(message).toEqual(expect.stringContaining(currentVersion));
    expect(message).toEqual(expect.stringContaining(patchVersionUpdate));
  });

  test("minor update", () => {
    const minorVersionUpdate = "1.2.1";
    checkForVersionUpdate(currentVersion, minorVersionUpdate);
    expect(console.log).toHaveBeenCalled();
    const message = console.log.mock.calls[0][0];
    expect(message).toEqual(expect.stringContaining("minor update"));
    expect(message).toEqual(expect.stringContaining(currentVersion));
    expect(message).toEqual(expect.stringContaining(minorVersionUpdate));
  });

  test("major update", () => {
    const majorVersionUpdate = "2.1.1";
    checkForVersionUpdate(currentVersion, majorVersionUpdate);
    expect(console.log).toHaveBeenCalled();
    const message = console.log.mock.calls[0][0];
    expect(message).toEqual(expect.stringContaining("major update"));
    expect(message).toEqual(expect.stringContaining(currentVersion));
    expect(message).toEqual(expect.stringContaining(majorVersionUpdate));
  });
});
