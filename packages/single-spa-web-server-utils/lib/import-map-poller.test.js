import {
  reset,
  clearAllIntervals,
  getImportMaps,
} from "./import-map-poller.js";
import { jest } from "@jest/globals";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
);

const successResponse = Promise.resolve({
  ok: true,
  headers: {
    get() {
      return "application/json+importmap";
    },
  },
  json() {
    return Promise.resolve({
      imports: {},
    });
  },
});

describe("getImportMaps()", () => {
  beforeEach(reset);

  // https://github.com/single-spa/create-single-spa/issues/343
  it("retries to download if one attempt fails", async () => {
    jest.useFakeTimers();
    fetch.mockReturnValueOnce(successResponse);

    // Succeed
    let importMapPromise = getImportMaps({
      url: "https://example.com/doesntexist.importmap",
      allowOverrides: false,
      pollInterval: 50,
    });

    await expect(importMapPromise).resolves.toEqual({
      nodeImportMap: { imports: {} },
      browserImportMap: { imports: {} },
    });

    // Fail
    fetch.mockRejectedValue(Error("Failed to fetch"));
    jest.runOnlyPendingTimers();

    importMapPromise = getImportMaps({
      url: "https://example.com/doesntexist.importmap",
      allowOverrides: false,
      pollInterval: 50,
    });

    importMapPromise.catch(() => {});

    await expect(importMapPromise).rejects.toThrowError(/Failed to fetch/);

    // Succeed
    fetch.mockReturnValueOnce(successResponse);
    jest.runOnlyPendingTimers();

    importMapPromise = getImportMaps({
      url: "https://example.com/doesntexist.importmap",
      allowOverrides: false,
      pollInterval: 50,
    });

    await expect(importMapPromise).resolves.toEqual({
      nodeImportMap: { imports: {} },
      browserImportMap: { imports: {} },
    });
  });

  // https://github.com/single-spa/create-single-spa/issues/343
  it("allows you to clear all intervals", async () => {
    jest.useFakeTimers();
    fetch.mockReturnValue(successResponse);

    // this sets up the interval
    getImportMaps({
      url: "https://example.com/doesntexist.importmap",
      allowOverrides: false,
      pollInterval: 50,
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(fetch).toHaveBeenCalledTimes(2);

    clearAllIntervals();

    jest.runOnlyPendingTimers();

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
