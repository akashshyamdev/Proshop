const Product = require('../models/productModel.js');
const AppError = require('../utils/AppError.js');

// @description - Fetch all products
// @route - GET /api/products
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

// @description - Fetch one products
// @route - GET /api/products/:id
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

// @description - Create  product
// @route - POST /api/products/:id
// @access - private @admin

module.exports.createProduct = async function (req, res, next) {
	try {
		const createdProduct = await Product.create({
			name: 'sample',
			price: 0,
			user: req.user._id,
			cover: '/images/sample.jpeg',
			brand: 'sample',
			category: 'sample',
			countInStock: 0,
			numReviews: 0,
			description: 'sample',
			delivery: 'sample',
			color: 'sample',
			images: ['sample'],
		});

		res.status(201).json({
			status: 'success',
			data: {
				createdProduct,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Update product
// @route - PATCH /api/products/:id
// @access - private @admin

module.exports.updateProduct = async function (req, res, next) {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false });

		if (!updatedProduct) {
			next(new AppError('Product not found', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				updatedProduct,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Delete product
// @route - DELETE /api/products/:id
// @access - private @admin

module.exports.deleteProduct = async function (req, res, next) {
	try {
		console.log('AA');
		const product = await Product.findById(req.params.id);

		if (!product) {
			console.log("There ain't no product");
			next(new AppError('Product not found', 404));
		} else {
			product.remove();
			console.log('There is a product');

			res.status(204).json({
				status: 'success',
				message: 'Product deleted',
			});
		}
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};
