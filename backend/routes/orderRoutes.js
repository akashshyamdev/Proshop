const express = require('express');
const protectMiddleware = require('../middleware/protectMiddleware.js');
const { createOrder, getOrder, getAllOrders, updateOrder } = require('../controllers/orderController.js');

const router = express.Router();

router.route('/').get(protectMiddleware, getAllOrders).post(protectMiddleware, createOrder);

router.route('/:id').get(protectMiddleware, getOrder).patch(protectMiddleware, updateOrder);

module.exports = router;
