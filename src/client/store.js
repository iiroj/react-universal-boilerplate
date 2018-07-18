import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import routes from './routes';
import { page } from './ducks/page';

const state = {
  page
};

const composeEnhancers = (...args) => (typeof window !== 'undefined' ? composeWithDevTools(...args) : compose(...args));

export default (history, preLoadedState, sagaContext) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routes);

  const rootReducer = combineReducers({ ...state, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preLoadedState, enhancers);

  return { store, thunk };
};
