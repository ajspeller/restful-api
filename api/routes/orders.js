const express = require('express');

const checkAuth = require('../auth/check-auth');

const OrdersController = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', checkAuth, OrdersController.orders_get_all);
router.post('/', checkAuth, OrdersController.orders_create_order);
router.get('/:id', checkAuth, OrdersController.orders_get_specific_order);
router.delete('/:id', checkAuth, OrdersController.orders_delete_order);

module.exports = router;
