import React from "react";
import { connect } from "react-redux";

import Layout from "./Layout";
import UniversalComponent from "./UniversalComponent";

class App extends React.Component {
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

    const src = () => import(`../views/${page.component}`);

    return (
      <Layout>
        <UniversalComponent
          onBefore={this.setLoading}
          onAfter={this.setNotLoading}
          page={page}
          src={src}
        />
      </Layout>
    );
  }
}

export default connect(state => state)(App);
