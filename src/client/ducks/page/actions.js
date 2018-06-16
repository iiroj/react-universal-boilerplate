import * as types from './types';

export const goToPage = type => ({ type });

export const goHome = () => ({
  type: types.GO_HOME
});

export const notFound = () => ({
  type: types.NOT_FOUND
});
