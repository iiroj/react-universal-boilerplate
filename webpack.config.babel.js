import LoadablePlugin from "@loadable/webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import StatsPlugin from "stats-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";

import paths from "./src/paths";

const isProduction = process.env.NODE_ENV === "production";

const config = {
  mode: isProduction ? "production" : "development",

  devtool: isProduction ? "source-map" : "eval",

  entry: {
    client: [require.resolve("./src/polyfills"), paths.clientEntry]
  },

  output: {
    chunkFilename: isProduction
      ? "static/[chunkhash:8].js"
      : "static/[name].js",
    filename: isProduction ? "static/[chunkhash:8].js" : "static/[name].js",
    path: paths.build,
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.clientSrc,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            envName: isProduction ? "webpack_production" : "webpack_development"
          }
        }
      }
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(isProduction ? "production" : "development")
      }
    }),
    new LoadablePlugin()
  ],

  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        client: {
          chunks: "initial",
          minChunks: 2,
          name: "client"
        },
        vendor: {
          chunks: "initial",
          enforce: true,
          name: "vendor",
          priority: 10,
          test: /node_modules/
        }
      }
    }
  }
};

if (isProduction) {
  config.plugins.push(
    new StatsPlugin("stats.json", { chunkModules: true, defaultSizes: "gzip" })
  );
  config.optimization.minimizer = [
    new TerserPlugin({
      parallel: true
    })
  ];
} else {
  config.entry.client.unshift(
    "webpack-hot-middleware/client?reload=true&overlayWarnings=true"
  );
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin()
  );
}

module.exports = config;
