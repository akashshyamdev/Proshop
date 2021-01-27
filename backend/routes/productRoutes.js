import express from 'express';
import { getAllProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

// @description - Fetch all producs
// @route - GET/api/products
// @access - public

router.get('/', getAllProducts);

// @description - Fetch one producs
// @route - GET/api/products/:id
// @access - public

router.get('/:id', getProduct);

export default router;
