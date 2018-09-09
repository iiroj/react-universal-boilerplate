import React, { PureComponent } from 'react';
import { injectGlobal } from 'emotion';
import reset from 'css-wipe/js';
import FontFaceObserver from 'fontfaceobserver';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageLoader from '../pages';

const plex = new FontFaceObserver('IBM Plex Sans');

class App extends PureComponent {
  componentDidMount() {
    plex.load();
  }

  render() {
    return <PageLoader page={this.props.page} />;
  }
}

App.propTypes = {
  page: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired
  }).isRequired
};

injectGlobal(
  reset,
  {
    '@font-face': {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 300,
      src:
        'local("IBM Plex Sans Light"), local("IBMPlexSans-Light"), url(https://fonts.gstatic.com/s/ibmplexsans/v3/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2) format("woff2")',
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    '@font-face': {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'italic',
      fontWeight: 300,
      src:
        'local("IBM Plex Sans Light Italic"), local("IBMPlexSans-LightItalic"), url(https://fonts.gstatic.com/s/ibmplexsans/v3/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRcdvfuJGl18Q.woff2) format("woff2")',
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    '@font-face': {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 600,
      src:
        'local("IBM Plex Sans SemiBold"), local("IBMPlexSans-SemiBold"), url(https://fonts.gstatic.com/s/ibmplexsans/v3/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2) format("woff2")',
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    '@font-face': {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'italic',
      fontWeight: 600,
      src:
        'local("IBM Plex Sans SemiBold Italic"), local("IBMPlexSans-SemiBoldItalic"), url(https://fonts.gstatic.com/s/ibmplexsans/v3/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfuJGl18Q.woff2) format("woff2")',
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  },
  {
    html: {
      height: '100%'
    },

    '#root': {
      alignItems: 'center',
      backgroundImage: 'linear-gradient(-153deg, rgb(45, 45, 45) 0%, rgb(0, 0, 0) 95%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100%',
      padding: '2rem',
      width: '100%'
    },

    body: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: 20,
      fontWeight: 300,
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto'
    },

    '*': {
      lineHeight: '2rem'
    },

    strong: {
      fontWeight: 600
    },

    em: {
      fontStyle: 'italic'
    }
  }
);

export default connect(({ page }) => ({ page }))(App);
