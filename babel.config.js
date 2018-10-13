module.exports = api => {
  const env = api.env();
  const isProduction = env.endsWith("production");

  const babelEnvOptions = {
    loose: true,
    shippedProposals: true
  };

  const presets = [
    ["@babel/preset-env", babelEnvOptions],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ];

  const plugins = [
    ["@babel/plugin-proposal-export-namespace-from"],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["babel-plugin-transform-export-default-name"],
    [
      "babel-plugin-emotion",
      {
        autoLabel: !isProduction,
        hoist: isProduction,
        sourceMap: !isProduction
      }
    ]
  ];

  if (env.startsWith("webpack")) {
    babelEnvOptions.modules = false;
    babelEnvOptions.useBuiltIns = "entry";
    plugins.push("babel-plugin-universal-import");
  }

  if (env.startsWith("node")) {
    babelEnvOptions.targets = {
      node: "current"
    };
    plugins.push(["babel-plugin-universal-import", { babelServer: true }]);
  }

  if (isProduction) {
    presets.push(["babel-preset-minify", { builtIns: false }]);
  }

  return { presets, plugins };
};
