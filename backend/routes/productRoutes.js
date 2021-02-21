const express = require('express');
const protectMiddleware = require('../middleware/protectMiddleware.js');
const restrictMiddleware = require('../middleware/restrictMiddleware.js');
const { getAllProducts, getProduct, deleteProduct, createProduct, updateProduct } = require('../controllers/productController.js');

const router = express.Router();

router.route('/').get(getAllProducts).post(protectMiddleware, restrictMiddleware, createProduct);

router.route('/:id').get(getProduct).patch(protectMiddleware, restrictMiddleware, updateProduct).delete(protectMiddleware, restrictMiddleware, deleteProduct);

module.exports = router;
