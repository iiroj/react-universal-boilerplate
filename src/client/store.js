import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";

import routesMap from "./routes";
import page from "./ducks/page";

const state = {
  page
};

const composeEnhancers = (...args) =>
  typeof window !== "undefined"
    ? composeWithDevTools(...args)
    : compose(...args);

export default (initialState = {}, initialEntries) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(routesMap, {
    initialEntries
  });

  const rootReducer = combineReducers({ ...state, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, initialState, enhancers);

  return { store, thunk };
};
