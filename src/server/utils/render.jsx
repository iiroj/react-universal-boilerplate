import React from 'react';
import htmlescape from 'htmlescape';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderStylesToString } from 'emotion-server';
import Helmet from 'react-helmet';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { html } from 'common-tags';

import App from '../../client/components/App';

import config from '../config';
import getWebpackStats from './getWebpackStats';
import configureStore from './configureStore';

export default async (req, res) => {
  let app;
  let state = '{}';
  const context = {};

  if (config.isProduction || config.devSSR) {
    const { store, history } = configureStore(req.url);
    state = htmlescape(store.getState());

    app = renderStylesToString(
      renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App history={history} />
          </StaticRouter>
        </Provider>
      )
    );
  }

  if (context.url) {
    return res.redirect(302, context.url);
  }

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
