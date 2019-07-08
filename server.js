require('dotenv').config();
require('./db');

const debug = require('debug')('app:server');
const http = require('http');
const chalk = require('chalk');

const app = require('./app');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  debug(
    `Webserver started successfully on port ${chalk.inverse.bold.green(PORT)}`
  );
});
