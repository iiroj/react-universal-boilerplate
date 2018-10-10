import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const paths = {
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

export default paths;
 