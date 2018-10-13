import {
  StoreEnhancer,
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";

import routesMap from "./routes";
import page from "./ducks/page";

const state = {
  page
};

const composeEnhancers = (...args: Function[]): StoreEnhancer<any, {}> =>
  typeof (window as Window | undefined) !== "undefined"
    ? composeWithDevTools(...args)
    : compose(...args);

export default (initialState: Object = {}, initialEntries: Array<string>) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(routesMap, {
    initialEntries
  });

  const rootReducer = combineReducers({ ...state, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, initialState, enhancers);

  return { store, thunk };
};
