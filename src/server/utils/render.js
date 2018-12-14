import React from "react";
import { renderToString } from "react-dom/server";
import htmlescape from "htmlescape";
import { minify } from "html-minifier";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";

import StaticImportedApp from "../../client/components/App";
import config from "../config";

import getWebpackStats from "./webpack-stats";
import configureStore from "./store";

let App = StaticImportedApp;

const getScriptTags = scripts =>
  scripts
    .map(
      src =>
        `<script type="text/javascript" src="/${src}" rel="subresource" defer></script>`
    )
    .join("\n");

export default async (req, res) => {
  try {
    if (!config.isProduction) {
      App = require("../../client/components/App").default;
    }

    const store = await configureStore(req, res);
    if (!store) return;
    const state = htmlescape(store.getState());
    const helmetContext = {};

    const app = renderToString(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </Provider>
    );

    const { helmet } = helmetContext;

    const stats = getWebpackStats(res);
    const chunkNames = flushChunkNames();
    const { scripts } = flushChunks(stats, {
      before: ["runtime", "vendor"],
      after: ["client"],
      chunkNames
    });

    return minify(
      `
      <!DOCTYPE html>
      <html lang="en" ${helmet.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8" />
          ${helmet.title.toString()}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${helmet.meta.toString()}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="600x600" href="/icon.png" />
          ${helmet.link.toString()}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          ${getScriptTags(scripts)}
          <script id="initial-state" type="application/json">${state}</script>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${app}</div>
        </body>
      </html>
    `,
      {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    );
  } catch (error) {
    res.status(500);
    return "Internal Server Error";
  }
};
