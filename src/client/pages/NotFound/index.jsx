import React, { Fragment } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Head from 'react-helmet';

import Button from '../../components/Button';

const Container = styled.main`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    line-height: 1;
    margin-bottom: 2rem;
  }
`;

const NotFound = ({ page }) => (
  <Fragment>
    <Head>
      <title>{page.title}</title>
    </Head>
    <Container>
      <h1>Not Found</h1>
      <h2>
        The request page <strong>{page.path}</strong> does not exist.
      </h2>
      <Button href="/">Go Home</Button>
    </Container>
  </Fragment>
);

NotFound.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};

export default NotFound;
