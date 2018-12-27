import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const render = App =>
  ReactDOM.hydrate(
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./components/App"], () => {
    const App = require("./components/App").default;
    render(App);
  });
}

render(App);
