const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:app');

const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  res.status(200).json({ message: 'It works!' });
  next();
});

module.exports = app;
