import produce from 'immer';

import { routesByName, routesByPath } from '../../routes';

import * as types from './types';

const notFound = {
  title: '404 — Not Found'
};

export const initialState = routesByPath[routesByName.HOME];

export default (state = initialState, action = {}) =>
  produce(state, draft => {
    const { payload, type } = action;

    switch (type) {
      case types.LOCATION_CHANGED: {
        const route = routesByPath[payload.route] || notFound;
        draft.title = route.title;
      }
    }

    return draft;
  });
