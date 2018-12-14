import { NOT_FOUND } from "redux-first-router";
import createHistory from "history/createMemoryHistory";

import configureStore from "../../client/store";

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === "redirect") {
    res.redirect(302, pathname);
    return true;
  }
};

export default async (req, res) => {
  const history = createHistory({ initialEntries: [req.path] });

  const { store, initialDispatch } = configureStore(history);

  initialDispatch();

  const { location } = store.getState();
  if (doesRedirect(location, res)) return false;

  res.status(location.type === NOT_FOUND ? 404 : 200);

  return store;
};
