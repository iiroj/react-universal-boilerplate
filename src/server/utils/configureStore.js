import { routerForExpress } from 'redux-little-router';

import { routesByPath } from '../../client/routes';
import configureStore from '../../client/store';

export default async (request, response) => {
  const router = routerForExpress({ routes: routesByPath, request });
  const store = configureStore(router);

  return store;
};
