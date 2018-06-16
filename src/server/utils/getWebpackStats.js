import paths from '../../../config/paths';
import config from '../config';

const { isProduction } = config;

let state = undefined;

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
