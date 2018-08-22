import { produce } from 'immer';

import routes from '../../routes';

import * as types from './types';

export default (state = routes.HOME, action = {}) =>
  produce(state, draft => {
    const { type } = action;

    if (type === types.NOT_FOUND)
      return {
        path: action.meta.location.current.pathname,
        title: '404 — Not Found',
        component: 'NotFound'
      };

    return routes[type] || draft;
  });
