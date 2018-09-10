import dotEnv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  dotEnv.config();
}

export default {
  devSSR: process.env.DEV_SSR || false,
  isProduction,
  port: process.env.PORT || 3000,
  renderCacheTTL: process.env.RENDER_CACHE_TTL || 600,
  version: process.env.VERSION
};
