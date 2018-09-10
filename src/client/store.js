import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const composeEnhancers = (...args) => (typeof window !== 'undefined' ? composeWithDevTools(...args) : compose(...args));

export default (history, initialState) => {
  const rootReducer = combineReducers({ example: () => null });
  const middleware = [routerMiddleware(history)];
  const enhancers = [];

  const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);
  const store = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers);

  return store;
};
