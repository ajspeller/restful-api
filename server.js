require('dotenv').config();
require('./db');

const express = require('express');
const chalk = require('chalk');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:server');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  debug(
    `Webserver started successfully on port ${chalk.inverse.bold.green(PORT)}`
  );
});
