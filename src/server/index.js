import config from './config';
import app from './app';

const { port } = config;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`, JSON.stringify(config, null, 2));
});
