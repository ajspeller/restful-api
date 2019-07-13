const express = require('express');
const { ObjectId } = require('mongoose').Types;
const debug = require('debug')('app:order');

const Order = require('../models/Order.model');
const Product = require('../models/Product.model');

const router = express.Router();

router.get('/', (req, res) => {
  Order.find()
    .select('-__v')
    .populate('product', '-__v')
    .then((docs) => {
      const response = {
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}/orders/${doc._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res, next) => {
  const { productId: product, quantity } = req.body;
  const order = new Order({ quantity, product });

  Product.findById(product)
    .then((doc) => {
      if (!doc) {
        return res
          .status(404)
          .json({ message: `No product with the id => (${product})` });
      }

      order
        .save()
        .then((doc) => {
          res.status(201).json({
            message: 'Order stored',
            createdOrder: {
              id: doc._id,
              quantity: doc.quantity,
              productId: product
            },
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}/orders/${doc._id}`
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Order.findById(id)
    .select('-__v')
    .populate('product', '-__v')
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Order not found'
        });
      }
      const response = {
        order: {
          id: doc._id,
          quantity: doc.quantity,
          product: doc.product
        },
        request: {
          type: 'GET',
          url: `${req.protocol}://${req.get('host')}/orders`
        }
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Order.findByIdAndDelete(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Order not found'
        });
      }
      const response = {
        message: 'Order deleted',
        order: {
          id: doc._id,
          quantity: doc.quantity,
          product: doc.product
        },
        request: {
          type: 'POST',
          url: `${req.protocol}://${req.get('host')}/orders`,
          body: {
            productID: 'ObjectId',
            quantity: 'Number'
          }
        }
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
