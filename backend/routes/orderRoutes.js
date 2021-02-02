import express from 'express';
import protectMiddleware from '../middleware/protectMiddleware.js';
import { createOrder, getOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

// @description - authenticate user and get a token
// @route - POST /api/users/login
// @access - public

router.route('/').get(protectMiddleware, getAllOrders).post(protectMiddleware, createOrder);

router.route('/:id').get(protectMiddleware, getOrder);

export default router;
