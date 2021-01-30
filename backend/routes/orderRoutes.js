import express from 'express';
import protectMiddleware from '../middleware/protectMiddleware.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// @description - authenticate user and get a token
// @route - POST /api/users/login
// @access - public

router.route('/').post(protectMiddleware, createOrder);

export default router;
