import dotEnv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  dotEnv.config();
}

export default {
  renderCacheTTL: parseInt(process.env.RENDER_CACHE_TTL || "600", 10),
  isProduction,
  port: process.env.PORT || 3000,
  version: process.env.VERSION
};
