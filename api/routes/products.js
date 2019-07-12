const express = require('express');
const { ObjectId } = require('mongoose').Types;
const debug = require('debug')('app:product.model');

const Product = require('../models/Product.model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Product.find()
    .then((docs) => {
      debug(docs);
      res.status(200).json({ products: docs });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const productFields = { name, price };
  const product = new Product(productFields);

  product
    .save()
    .then((doc) => {
      debug(doc);
      res.status(201).json({ createdProduct: doc });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      message: `ObjectId (${id}) is invalid`
    });
  }
  Product.findById(id)
    .then((doc) => {
      debug(doc);
      if (doc) {
        return res.status(200).json(doc);
      }
      res
        .status(404)
        .json({ message: `No product found with the specified id => ${id}` });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.findByIdAndUpdate(id, {
    $set: updateOps
  })
    .then((doc) => {
      debug(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((doc) => {
      debug(doc);
      if (doc) {
        return res.status(202).json({ product: doc });
      }
      res.status(400).json({ message: 'Product not found' });
    })
    .catch((err) => {
      debug(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
