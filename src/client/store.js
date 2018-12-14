import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";
import restoreScroll from "redux-first-router-restore-scroll";

import routes from "./routes";
import page from "./ducks/page";

const state = {
  page
};

const composeEnhancers = (...args) =>
  typeof window !== "undefined"
    ? composeWithDevTools(...args)
    : compose(...args);

export default (history, initialState = {}) => {
  const { reducer, middleware, enhancer, initialDispatch } = connectRoutes(
    history,
    routes,
    {
      restoreScroll: restoreScroll()
    }
  );

  const rootReducer = combineReducers({ ...state, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, initialState, enhancers);

  return { store, initialDispatch };
};
