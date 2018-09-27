import { css } from 'emotion';
import React from 'react';
import Head from 'react-helmet';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Button from '../components/Button';

const title = css({
  fontSize: '3rem',
  lineHeight: 1,
  marginBottom: '2rem'
});

const Home = ({ page }) => (
  <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <main>
      <h1 className={title}>{page.title}</h1>
      <Button href="https://gitlab.com/iiroj/react-universal-boilerplate" target="_blank" rel="noopener noreferrer">
        GitLab
      </Button>
      <Button to="/404">See 404 page</Button>
    </main>
  </>
);

Home.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired
};

export default hot(module)(Home);
