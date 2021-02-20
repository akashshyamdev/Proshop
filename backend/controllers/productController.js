const Product = require('../models/productModel.js');
const AppError = require('../utils/AppError.js');

// @description - Fetch all producs
// @route - GET/api/products
// @access - public

module.exports.getAllProducts = async function (req, res, next) {
	try {
		const products = await Product.find();

		res.status(200).json({
			status: 'success',
			data: { products },
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Fetch one producs
// @route - GET/api/products/:id
// @access - public

module.exports.getProduct = async function (req, res, next) {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			res.status(404).json({
				status: 'error',
				message: 'Product not found',
			});
		} else {
			res.status(200).json({
				status: 'success',
				data: { product },
			});
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};
