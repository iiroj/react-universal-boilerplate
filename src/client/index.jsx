import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { initializeCurrentLocation, routerForBrowser } from 'redux-little-router';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { routesByPath } from './routes';
import configureStore from './store';

import App from './components/App';

const state = JSON.parse(document.getElementById('initial-state').innerHTML);

const router = routerForBrowser({ routes: routesByPath });
const store =
  module.hot && module.hot.data && module.hot.data.store ? module.hot.data.store : configureStore(router, state);

const initialLocation = state.router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

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
