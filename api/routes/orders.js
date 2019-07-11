const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Order was fetched'
  });
});

router.post('/', (req, res, next) => {
  const { productId, quantity } = req.body;
  const order = { productId, quantity };
  res.status(201).json({
    message: 'Order was created',
    order
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'Get a specific order',
    id
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'Delete a specific order',
    id
  });
});

module.exports = router;
