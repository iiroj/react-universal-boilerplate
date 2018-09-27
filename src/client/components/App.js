import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Layout from './Layout';
import UniversalComponent from './UniversalComponent';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    page: PropTypes.shape({
      component: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    loading: false
  };

  setLoading = () => this.setState({ loading: true });

  setNotLoading = () => this.setState({ loading: false });

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { page } = this.props;

    return (
      <Layout>
        <UniversalComponent
          onBefore={this.setLoading}
          onAfter={this.setNotLoading}
          page={page}
          src={() => import(`../pages/${page.component}`)}
        />
      </Layout>
    );
  }
}

export default hot(module)(connect(state => state)(App));
