import React from 'react';
import { renderToString } from 'react-dom/server';
import htmlescape from 'htmlescape';
import { html } from 'common-tags';
import { renderStylesToString } from 'emotion-server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../../client/components/App';

import getWebpackStats from './getWebpackStats';
import configureStore from './configureStore';

export default async (req, res) => {
  const store = await configureStore(req, res);
  const state = htmlescape(store.getState());

  const app = renderStylesToString(
    renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
  );

  const helmet = Helmet.renderStatic();

  const stats = getWebpackStats(res);
  const chunkNames = flushChunkNames();
  const { scripts } = flushChunks(stats, {
    before: ['runtime', 'vendor'],
    after: ['client'],
    chunkNames
  });

  return html`
    <!DOCTYPE html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charSet="utf-8" />
        ${helmet.title.toString()}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${helmet.meta.toString()}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="600x600" href="/icon.png" />
        ${helmet.link.toString()}
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        ${scripts.map(src => `<script type="text/javascript" src="/${src}" rel="subresource" defer></script>`)}
        <script id="initial-state" type="application/json">${state}</script>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${app}</div>
      </body>
    </html>
  `;
};
