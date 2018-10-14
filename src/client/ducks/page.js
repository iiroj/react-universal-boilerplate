import { NOT_FOUND } from "redux-first-router";
import { produce } from "immer";

import routes from "../routes";

export default (state = routes.HOME, action) => {
  const { meta, type } = action;

  switch (type) {
    case NOT_FOUND:
      return produce(state, draft => {
        draft.path = meta.location.current.pathname;
        draft.title = "404 — Not Found";
        draft.component = "NotFound";
      });
    default:
      return routes[type] || state;
  }
};
