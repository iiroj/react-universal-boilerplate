import { css } from 'emotion';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'react-helmet';
import { hot } from 'react-hot-loader';

import Button from '../components/Button';

const h1 = css({
  fontSize: '3rem',
  marginBottom: '1rem'
});

const h2 = css({
  lineHeight: 1,
  marginBottom: '2rem'
});

const NotFound = ({ page }) => (
  <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <main>
      <h1 className={h1}>Not Found</h1>
      <h2 className={h2}>
        The request page <strong>{page.path}</strong> does not exist.
      </h2>
      <Button to="/">Go Home</Button>
    </main>
  </>
);

NotFound.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};

export default hot(module)(NotFound);
