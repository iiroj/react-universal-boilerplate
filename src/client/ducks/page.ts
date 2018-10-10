import { AnyAction } from 'redux';
import { NOT_FOUND } from 'redux-first-router';
import { produce } from 'immer';

import routes from '../routes';

export default (state = routes.HOME, action: AnyAction) =>
  produce(state, draft => {
    const { type } = action;

    if (type === NOT_FOUND) {
      return {
        path: action.meta.location.current.pathname,
        title: '404 — Not Found',
        component: 'NotFound'
      };
    }

    return routes[type] || draft;
  });
