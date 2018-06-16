import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import paths from '../../config/paths';
import config from './config';
import withCache from './services/withCache';
import render from './utils/render';

const { isProduction, version } = config;

const renderer = isProduction ? withCache(render) : render;

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(compression());
app.use(cookieParser());
app.enable('etag');

app.use(helmet());
app.use(helmet.hsts({ includeSubDomains: false }));

app.use(
  bodyParser.json({
    type: ['json', 'application/csp-report']
  })
);

if (!isProduction) {
  app.use(cors());

  app.use(helmet.noCache());

  const webpack = require('webpack');
  const webpackConfig = require('../../config/webpack.config.js');
  const compiler = webpack(webpackConfig);

  require('webpack-hot-client')(compiler, { hmr: true, port: 3001 });
  app.use(require('webpack-dev-middleware')(compiler, { serverSideRender: true }));

  app.use(morgan('dev'));
} else {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'https://fonts.gstatic.com'],
        reportUri: '/report-violation'
      },
      browserSniff: false
    })
  );

  app.post('/report-violation', (req, res) => {
    if (req.body) {
      console.warn('CSP Violation: ', req.body);
    } else {
      console.warn('CSP Violation: No data received!');
    }

    res.status(204).end();
  });

  app.use(morgan('tiny'));
}

app.use(
  '/static/',
  express.static(paths.static, isProduction ? { maxAge: '30 days', immutable: true } : { maxAge: 0 })
);
app.use('/', express.static(paths.publicPath));

app.get('/ping', (req, res) => {
  res.json({ version });
});

app.get('*', async (req, res, next) => {
  const html = await renderer(req, res, next);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Surrogate-Control', 'max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(html);
});

export default app;
