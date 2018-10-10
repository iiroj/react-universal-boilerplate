import * as webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
            envName: isProduction ? 'client_production' : 'client_development'
          }
        }
      }
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
      }
    })
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          maxInitialRequests: 5,
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  }
};

if (isProduction) {
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        mangle: true,
        output: {
          beautify: false,
          comments: false
        }
      }
    })
  ];

  config.plugins.push(new StatsPlugin('stats.json', { chunkModules: true }));
} else {
  (config as any).entry.client.unshift('webpack-hot-middleware/client?reload=true&overlayWarnings=true');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
