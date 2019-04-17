import paths from "../../paths";

import config from "../config";

const { isProduction } = config;

let state;

export default res => {
  if (isProduction && state) {
    return state;
  }

  if (isProduction) {
    state = require(`${paths.build}/loadable-stats.json`);
  } else {
    const stats =
      res.locals.webpackStats.compilation.assets["loadable-stats.json"];
    state = JSON.parse(stats.source());
  }

  return state;
};
