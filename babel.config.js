module.exports = api => {
  const env = api.env();
  const isProduction = env === 'client_production' || env === 'server_production';

  const babelEnvOptions = {
    loose: true,
    shippedProposals: true
  };

  const plugins = [
    ['@babel/plugin-proposal-export-namespace-from'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['babel-plugin-transform-export-default-name'],
    ['babel-plugin-inline-react-svg'],
    [
      'babel-plugin-emotion',
      {
        autoLabel: !isProduction,
        hoist: isProduction,
        sourceMap: !isProduction
      }
    ]
  ];

  if (env.includes('client')) {
    babelEnvOptions.modules = false;
    babelEnvOptions.useBuiltIns = 'entry';
    babelEnvOptions.targets = {
      browsers: ['Last 2 versions', 'IE >= 11']
    };
    plugins.push('react-hot-loader/babel', 'babel-plugin-universal-import');
  }

  if (env === 'client_development') {
    plugins.push('@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source');
  }

  if (env === 'client_production') {
    plugins.push('@babel/plugin-transform-react-inline-elements', '@babel/plugin-transform-react-constant-elements');
  }

  if (env.includes('server')) {
    babelEnvOptions.targets = {
      node: 'current'
    };
    plugins.push(['babel-plugin-universal-import', { babelServer: true }]);
  }

  if (env === 'server_development') {
    plugins.push('react-hot-loader/babel');
  }

  const config = {
    presets: [['@babel/preset-env', babelEnvOptions], ['@babel/preset-react']],
    plugins
  };

  return config;
};
