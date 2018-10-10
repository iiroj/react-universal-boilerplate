import '@babel/polyfill';

import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';

import App from './components/App';

const renderer = process.env.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;
const history = createHistory();
const stateNode = document.getElementById('initial-state');
const state = stateNode ? JSON.parse(stateNode.innerHTML) : {};
const store = configureStore(history, state).store;

const render = (App: any) =>
  renderer(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept(['./components/App', './store'], () => {
    const App = require('./components/App').default;
    render(App);
  });
}

render(App);
