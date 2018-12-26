import React from "react";
import { connect } from "react-redux";

import Layout from "./Layout";
import UniversalComponent from "./UniversalComponent";

const App = ({ page }) => (
  <Layout>
    <UniversalComponent page={page} />
  </Layout>
);

const mapStateToProps = state => ({
  page: state.page
});

export default connect(mapStateToProps)(App);
