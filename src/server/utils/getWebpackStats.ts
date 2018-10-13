import { Stats } from 'webpack'; 
import { Response } from 'express';

import paths from '../../paths';
import config from '../config';

const { isProduction } = config;

let state: Stats;

export default (res: Response) => {
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
