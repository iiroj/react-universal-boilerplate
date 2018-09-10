import createHistory from 'history/createMemoryHistory';

import configureStore from '../../client/store';

export default url => {
  const history = createHistory({ initialEntries: [url] });
  const store = configureStore(history);

  return { store, history };
};
