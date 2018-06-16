import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import routes from './routes';
import options from './options';

import { page, pageActions, forkPageSagas } from './ducks/page';

const actions = {
  ...pageActions
};

const state = {
  page
};

function* configureSagas(context) {
  yield all([...forkPageSagas(context)]);
}

const composeEnhancers = (...args) =>
  typeof window !== 'undefined' ? composeWithDevTools({ actions })(...args) : compose(...args);

export default (history, preLoadedState, sagaContext) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routes, options);
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({ ...state, location: reducer });
  const middlewares = applyMiddleware(middleware, sagaMiddleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = {
    ...createStore(rootReducer, preLoadedState, enhancers),
    runSaga: sagaMiddleware.run(configureSagas, sagaContext)
  };

  return { store, thunk };
};
