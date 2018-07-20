import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store';

import App from './components/App';

const state = JSON.parse(document.getElementById('initial-state').innerHTML);

const history = createHistory();
const store =
  module.hot && module.hot.data && module.hot.data.store ? module.hot.data.store : configureStore(history, state).store;

const root = document.getElementById('root');

ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(data => {
    data.store = store;
  });
}
