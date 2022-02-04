import fetch from "node-fetch";
import _ from "lodash";
import { applyOverrides, getOverridesFromCookies } from "import-map-overrides";

let importMapPromises = {};
let intervals = [];

/**
 *
 * @typedef {{
 * url: string;
 * pollInterval?: number;
 * req?: import('http').IncomingMessage;
 * allowOverrides?: boolean;
 * nodeKeyFilter?(importSpecifier: string): boolean;
 * }} GetImportMapOptions
 *
 * @param {GetImportMapOptions} options
 */
export function getImportMaps({
  url,
  pollInterval = 30000,
  req,
  allowOverrides,
  nodeKeyFilter,
}) {
  if (!importMapPromises[url]) {
    importMapPromises[url] = fetchImportMap();
    const intervalId = setInterval(() => {
      importMapPromises[url] = fetchImportMap();
    }, pollInterval);

    intervals.push(intervalId);
  }

  return importMapPromises[url].then((originalMap) => {
    if (originalMap instanceof Error) {
      throw originalMap;
    }

    const browserImportMap = allowOverrides
      ? applyOverrides(originalMap, getOverridesFromCookies(req))
      : originalMap;
    const nodeImportMap = _.cloneDeep(browserImportMap);

    if (nodeKeyFilter) {
      Object.keys(nodeImportMap.imports).forEach((key) => {
        if (!nodeKeyFilter(key)) {
          delete nodeImportMap.imports[key];
        }
      });
    }

    return {
      browserImportMap,
      nodeImportMap,
    };
  });

  function fetchImportMap() {
    return (
      fetch(url)
        .then(
          (r) => {
            if (r.ok) {
              if (
                r.headers.get("content-type") &&
                r.headers.get("content-type").includes("json")
              ) {
                return r.json();
              } else {
                throw Error(
                  `Import Map at ${url} did not respond with correct content-type response header. Should be application/importmap+json, but was ${r.headers.get(
                    "content-type"
                  )}`
                );
              }
            } else {
              throw Error(
                `Import Map at ${url} responded with HTTP status ${r.status}`
              );
            }
          },
          (err) => {
            console.error(err);
            throw Error(`Failed to fetch import map at url ${url}`);
          }
        )
        // If we do not catch promise rejections here, they won't necessarily be caught at all,
        // which causes NodeJS to kill the entire program.
        // So we instead catch the error to turn it into a resolved promise, but
        // then check the promise result later on to see if it's an error
        // before proceeding
        .catch((err) => {
          return err;
        })
    );
  }
}

/**
 * This will stop all polling of import maps
 */
export function clearAllIntervals() {
  intervals.forEach(clearInterval);

  intervals = [];
}

/**
 * This will stop all polling of import maps, and also
 * discard any cached import maps that are still in memory
 */
export function reset() {
  clearAllIntervals();

  importMapPromises = {};
}
