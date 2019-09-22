# React Universal Boilerplate

[![version](https://img.shields.io/github/tag/iiroj/react-universal-boilerplate.svg)](https://github.com/iiroj/react-universal-boilerplate/releases)
[![dependencies](https://img.shields.io/david/iiroj/react-universal-boilerplate.svg)](https://github.com/iiroj/react-universal-boilerplate/blob/master/package.json)
[![devDependencies](https://img.shields.io/david/dev/iiroj/react-universal-boilerplate.svg)](https://github.com/iiroj/react-universal-boilerplate/blob/master/package.json)
[![license](https://img.shields.io/github/license/iiroj/react-universal-boilerplate.svg)](https://github.com/iiroj/react-universal-boilerplate/blob/master/LICENSE)

An example React client/server application with SSR and code-splitting.

----

This reposity contains a bare minimum starter setup to have a working application.

Feel free to clone/fork this repository and build upon it.

## Technologies used

This project uses the latest and greatest for lazy-loading pages and code-splitting. You should read the listed packages' readmes to learn more:

* [react](https://github.com/facebook/react) — A JavaScript library for building user interfaces
* [react-router](https://github.com/ReactTraining/react-router) — routing of pages
* [@loadable/component](https://github.com/smooth-code/loadable-components) — code-splitting and lazy-loading
* [emotion](https://github.com/emotion-js/emotion) — styling (css-in-js)
* [react-helmet-async](https://github.com/staylor/react-helmet-async) — manipulating the `<head>` from React
* [express](https://github.com/expressjs/express) — the server framework
* [memory-cache](https://github.com/ptarjan/node-cache) — caching rendered pages
* [@babel/core](https://github.com/babel/babel) — transpiling ECMAscript
* [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) — transpiling based on browser/node targets
* [webpack](https://github.com/webpack/webpack) — bundling the client-side code

## Developing

To start a local development server, run

```bash
npm run dev
```

and open http://127.0.0.1:3000/ in your browser of choise.

There's hot-reloading for react code, and the express server will restart on changes to files in `./src/server`. In this case the client will reload automatically after reconnecting.

## Building and production mode

To build the application, run

```bash
npm run build
```

To take a look at and analyze the built bundles, run

```bash
npm run stats
```

This will open the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) in your browser.

To start the built application in production mode, run

```bash
npm start
```

In production mode, all rendered pages will be cached, based on the `request`'s `path`, `query` and `cookies`. The default TTL is 10 minutes.
