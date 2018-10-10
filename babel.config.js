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
    plugins.push('babel-plugin-universal-import');
  }

  if (env.includes('server')) {
    babelEnvOptions.targets = {
      node: 'current'
    };
    plugins.push(['babel-plugin-universal-import', { babelServer: true }]);
  }

  const config = {
    presets: [['@babel/preset-env', babelEnvOptions], '@babel/preset-typescript', '@babel/preset-react'],
    plugins
  };

  return config;
};
