import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { html } from "common-tags";
import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";

import config from "../config";
import StaticImportedApp from "../../client/components/App";

import getLoadableStats from "./loadable-stats";

let App = StaticImportedApp;

export default async (req, res) => {
  try {
    if (!config.isProduction) {
      App = require("../../client/components/App").default;
    }

    const extractor = new ChunkExtractor({
      entrypoints: ["client"],
      stats: getLoadableStats(res)
    });
    const routerContext = {};
    const helmetContext = {};

    const app = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StaticRouter location={req.originalUrl} context={routerContext}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </ChunkExtractorManager>
    );

    const { status, url } = routerContext;

    if (url) {
      return res.redirect(301, url);
    }

    const { helmet } = helmetContext;

    res.status(status === 404 ? 404 : 200);

    /* eslint-disable prettier/prettier */
    return html`
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
          ${extractor.getScriptTags().replace(/async/g, "defer")}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${app}</div>
        </body>
      </html>
    `.replace(/^\s*$(?:\r\n?|\n)/gm, "");
  } catch (error) {
    console.error(error);
    res.status(500);
    return "Internal Server Error";
  }
};
