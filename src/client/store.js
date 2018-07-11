import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

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

export default (router, initialState, sagaContext) => {
  const { reducer: routerReducer, middleware: routerMiddleware, enhancer } = router;
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({ ...state, router: routerReducer });
  const middlewares = applyMiddleware(routerMiddleware, sagaMiddleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = {
    ...createStore(rootReducer, initialState, enhancers),
    runSaga: sagaMiddleware.run(configureSagas, sagaContext)
  };

  return store;
};
