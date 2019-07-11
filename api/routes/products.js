const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Handling GET' });
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const product = { name, price };
  res.status(201).json({ message: 'Handling POST', createdProduct: product });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ message: `Handling GET with product ${id}` });
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ message: `Handling PATCH with product ${id}` });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ message: `Handling DELETE with product ${id}` });
});

module.exports = router;
