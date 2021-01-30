import Product from '../models/productModel.js';
import AppError from '../utils/AppError.js';

// @description - Fetch all producs
// @route - GET/api/products
// @access - public

export async function getAllProducts(req, res, next) {
	try {
		const products = await Product.find();

		res.status(200).json({
			status: 'sucess',
			data: { products },
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
}

// @description - Fetch one producs
// @route - GET/api/products/:id
// @access - public

export async function getProduct(req, res, next) {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			res.status(404).json({
				status: 'error',
				message: 'Product not found',
			});
		} else {
			res.status(200).json({
				status: 'sucess',
				data: { product },
			});
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
}
