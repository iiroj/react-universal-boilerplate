declare module "stats-webpack-plugin" {
  import { Plugin } from "webpack";

  class StatsWebpackPlugin extends Plugin {
    constructor(options: any);
  }

  export = StatsWebpackPlugin;
}
