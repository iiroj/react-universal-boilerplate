/* eslint-disable no-console */

import config from "./config";
import app from "./app";

const { port, version } = config;

console.log(`Starting app version ${version}`);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`App configuration: `, JSON.stringify(config, null, 2));
});
