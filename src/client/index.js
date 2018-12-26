import "@babel/polyfill";

import ReactDOM from "react-dom";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

import configureStore from "./store";

import App from "./components/App";

const stateNode = document.getElementById("initial-state");
const state = stateNode ? JSON.parse(stateNode.innerHTML) : {};
const { store } = configureStore(state);

const render = App =>
  ReactDOM.hydrate(
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./components/App", "./store"], () => {
    const App = require("./components/App").default;
    render(App);
  });
}

render(App);
