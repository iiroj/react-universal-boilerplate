import paths from "../../paths";

import config from "../config";

const { isProduction } = config;

let state;

export default res => {
  if (isProduction && state) {
    return state;
  }

  if (isProduction) {
    state = require(`${paths.build}/stats.json`);
  } else {
    state = res.locals.webpackStats.toJson();
  }

  return state;
};
