const mongoose = require('mongoose');
const debug = require('debug')('app:db');

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then((result) => {
    debug(`Database connection established!`);
  })
  .catch((err) => {
    console.error(err);
  });
