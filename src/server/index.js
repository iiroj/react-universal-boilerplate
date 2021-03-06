/* eslint-disable no-console */

import app from "./app";
import config from "./config";

const { port, version } = config;

console.log(`Starting app version ${version}`);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`App configuration: `, JSON.stringify(config, null, 2));
});
