import fetch from "node-fetch";
import _ from "lodash";
import { applyOverrides, getOverridesFromCookies } from "import-map-overrides";

let importMapPromises = {};

export function getImportMaps({
  url,
  pollInterval = 30000,
  req,
  allowOverrides,
  nodeKeyFilter,
}) {
  if (!importMapPromises[url]) {
    importMapPromises[url] = fetchImportMap();
    setInterval(fetchImportMap, pollInterval);
  }

  return importMapPromises[url].then((originalMap) => {
    const browserImportMap = allowOverrides
      ? applyOverrides(originalMap, getOverridesFromCookies(req))
      : originalMap;
    const nodeImportMap = _.cloneDeep(browserImportMap);

    Object.keys(nodeImportMap.imports).forEach((key) => {
      if (!nodeKeyFilter(key)) {
        delete nodeImportMap.imports[key];
      }
    });

    return {
      browserImportMap,
      nodeImportMap,
    };
  });

  function fetchImportMap() {
    return fetch(url).then(
      (r) => {
        if (r.ok) {
          if (
            r.headers.get("content-type") &&
            r.headers.get("content-type").includes("json")
          ) {
            return r.json();
          } else {
            throw Error(
              `Import Map at ${url} did not respond with correct content-type response header. Should be application/importmap+json`
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
    );
  }
}
