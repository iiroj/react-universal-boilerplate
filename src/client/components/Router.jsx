import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import UniversalComponent from './UniversalComponent';

const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" render={() => <UniversalComponent src={() => import('../pages/Home')} />} />
      <Route render={() => <UniversalComponent src={() => import('../pages/NotFound')} />} />
    </Switch>
  </ConnectedRouter>
);

Router.propTypes = {
  history: PropTypes.object.isRequired
};

export default Router;
