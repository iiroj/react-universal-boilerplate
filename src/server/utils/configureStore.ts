import { Request, Response } from 'express';

import createHistory from 'history/createMemoryHistory';
import { LocationState, NOT_FOUND } from 'redux-first-router';

import configureStore from '../../client/store';

const doesRedirect = ({ kind, pathname }: LocationState, res: Response) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname);
    return true;
  }
};

export default async (req: Request, res: Response) => {
  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = configureStore(history);

  let location = store.getState().location;
  if (doesRedirect(location, res)) return false;

  await thunk(store);

  location = store.getState().location;
  if (doesRedirect(location, res)) return false;

  if (location.type === NOT_FOUND) {
    res.status(404);
  }

  return store;
};
