import React from 'react';
import ReactDOM from 'react-dom/server';
import htmlescape from 'htmlescape';
import { renderStylesToString } from 'emotion-server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../../client/components/App';
import getWebpackStats from './getWebpackStats';
import configureStore from './configureStore';
import getHtml from '../view/html';

const createScriptTags = scripts =>
  scripts.map(src => `<script type="text/javascript" src="/${src}" rel="subresource" defer></script>`).join('');

export default async (req, res) => {
  const stats = getWebpackStats(res);
  const store = await configureStore(req, res);
  if (!store) return;

  const app = renderStylesToString(
    ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
  );

  const helmet = Helmet.renderStatic();

  const chunkNames = flushChunkNames();
  const { scripts } = flushChunks(stats, {
    before: ['runtime', 'vendor'],
    after: ['client'],
    chunkNames
  });
  const js = createScriptTags(scripts);

  const state = htmlescape(store.getState());

  return getHtml({ app, helmet, js, state });
};
