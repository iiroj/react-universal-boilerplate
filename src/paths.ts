import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export default {
  build: resolveApp('build'),
  static: resolveApp('build/static'),
  clientEntry: resolveApp('src/client/index.tsx'),
  clientSrc: resolveApp('src/client'),
  dotenv: resolveApp('.env'),
  nodeModules: resolveApp('node_modules'),
  packageJson: resolveApp('package.json'),
  publicPath: resolveApp('public'),
  root: resolveApp(''),
  serverEntry: resolveApp('src/server/index.js'),
  serverSrc: resolveApp('src/server')
};
