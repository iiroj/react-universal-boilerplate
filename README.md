# react-universal-boilerplate

An example React/Redux application with SSR and code-splitting.

The code contains the bare minimum setup to have "working" application. For example, a single redux saga has been set up, but it's not really in use. There's some styling done with emotion, as an example.

Feel free to clone/fork this repository and build upon it.

## Technologies used

This project uses the latest and greatest for lazy-loading pages and code-splitting. You should read the listed packages' readmes to learn more:

* [react](https://github.com/facebook/react) — the basis
* [redux](https://github.com/reduxjs/redux) — state management
* [immer](https://github.com/mweststrate/immer) — for handling immutable state
* [redux-saga](https://github.com/redux-saga/redux-saga) — side-effects for redux
* [redux-first-router](https://github.com/faceyspacey/redux-first-router) — routing of pages
* [react-universal-component](https://github.com/faceyspacey/react-universal-component) — code-splitting and lazy-loading
* [emotion](https://github.com/emotion-js/emotion) — styling (css-in-js)
* [react-helmet](https://github.com/nfl/react-helmet) — manipulating the `<head>`from React
* [express](https://github.com/expressjs/express) — the server framework
* [memory-cache](https://github.com/ptarjan/node-cache) — for caching rendered pages
* [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks) — for deciding which bundles to include on which pages
* [@babel/babel](https://github.com/babel/babel) — for transpiling ECMAscript
* [@babel/presset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) — for transpiling based on browser/node targets
* [webpack](https://github.com/webpack/webpack) — for bundling the client-side code

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