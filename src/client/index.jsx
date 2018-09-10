import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store';

import App from './components/App';

const history = createHistory();
const state = JSON.parse(document.getElementById('initial-state').innerHTML);
const store = configureStore(history, state);

const Application = (
  <AppContainer>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </AppContainer>
);

const isProduction = process.env.NODE_ENV === 'production';
const root = document.getElementById('root');

const render = () => (isProduction ? ReactDOM.hydrate(Application, root) : ReactDOM.render(Application, root));

render();

if (!isProduction && module.hot) {
  module.hot.accept('./components/App', () => {
    render();
  });
}
