import { LocationState } from 'redux-first-router';
import React from 'react';
import { connect } from 'react-redux';

import { Route } from '../routes';
import Layout from './Layout';
import UniversalComponent from './UniversalComponent';

type Props = {
  location?: LocationState;
  page?: Route;
};

type State = {
  loading: boolean;
};

class App extends React.Component<Props, State> {
  state = {
    loading: false
  };

  setLoading = () => this.setState({ loading: true });

  setNotLoading = () => this.setState({ loading: false });

  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { page } = this.props;

    const src = () => import(`../pages/${page!.component}`);
    
    return (
      <Layout>
        <UniversalComponent
          onBefore={this.setLoading}
          onAfter={this.setNotLoading}
          page={page!}
          src={src}
        />
      </Layout>
    );
  }
}

export default connect(state => state)(App);
