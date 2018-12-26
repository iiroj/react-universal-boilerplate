import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";
import restoreScroll from "redux-first-router-restore-scroll";

import routes from "./routes";
import * as reducers from "./ducks";

const composeEnhancers = (...args) =>
  typeof window !== "undefined"
    ? composeWithDevTools(...args)
    : compose(...args);

export default (initialState = {}, initialEntries) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(routes, {
    initialEntries,
    restoreScroll: restoreScroll()
  });

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, initialState, enhancers);

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./ducks/index", () => {
      const reducers = require("./ducks/index");
      const rootReducer = combineReducers({ ...reducers, location: reducer });
      store.replaceReducer(rootReducer);
    });
  }

  return { store, thunk };
};
