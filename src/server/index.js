require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx']
});

const config = require('./config').default;
const app = require('./app').default;

const { port, version } = config;

console.log(`Starting app version ${version}`);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`App configuration: `, JSON.stringify(config, null, 2));
});
