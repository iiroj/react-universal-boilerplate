import express from "express";

import paths from "../paths";

import config from "./config";
import applyMiddleware from "./services/middleware";
import withCache from "./services/cache";
import render from "./utils/render";

const { isProduction, version } = config;

const app = express();
applyMiddleware(app);

const renderer = isProduction ? withCache(render) : render;

if (!isProduction) {
  const webpack = require("webpack");
  const webpackConfig = require("../../webpack.config.babel.js");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      logLevel: "silent",
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));

  // Invalidate renderer's module cache after Webpack Compilation
  compiler.hooks.compilation.tap("done", () => {
    Object.keys(require.cache).forEach(id => {
      if (/[/\\]client[/\\]/.test(id)) delete require.cache[id];
    });
  });
}

app.use(
  "/static/",
  express.static(
    paths.static,
    isProduction ? { maxAge: "30 days", immutable: true } : { maxAge: 0 }
  )
);

app.use("/", express.static(paths.publicPath));

app.get("/ping", (_req, res) => {
  res.json({ version });
});

app.get("*", async (req, res, next) => {
  const html = await renderer(req, res, next);
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Surrogate-Control", "max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send(html);
});

export default app;
