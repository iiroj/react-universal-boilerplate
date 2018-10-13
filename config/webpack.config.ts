import * as webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import paths from './paths';

const isProduction = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'eval',

  entry: {
    client: [require.resolve('./polyfills'), paths.clientEntry]
  },

  output: {
    chunkFilename: isProduction ? 'static/[chunkhash:8].js' : 'static/[name].js',
    filename: isProduction ? 'static/[chunkhash:8].js' : 'static/[name].js',
    path: paths.build,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.clientSrc,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            envName: isProduction ? 'webpack_production' : 'webpack_development'
          }
        }
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      async: !isProduction
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }
    }),
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        client: {
          chunks: 'initial',
          minChunks: 2,
          name: 'client'
        },
        vendor: {
          chunks: 'initial',
          enforce: true,
          name: 'vendor',
          priority: 10,
          test: /node_modules/
        }
      }
    }
  }
};

if (isProduction) {
  config.plugins.push(new StatsPlugin('stats.json', { chunkModules: true }));
} else {
  (config as any).entry.client.unshift('webpack-hot-middleware/client?reload=true&overlayWarnings=true');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
