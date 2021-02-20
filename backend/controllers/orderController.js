const Order = require('../models/orderModel.js');
const AppError = require('../utils/AppError.js');

// @description - Get all orders
// @route - GET /api/orders
// @access - private

module.exports.getAllOrders = async function (req, res, next) {
	try {
		const orders = await Order.find().populate('user', 'name email');

		res.status(200).json({
			status: 'success',
			data: {
				orders,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Get order
// @route - GET /api/orders/:id
// @access - private

module.exports.getOrder = async function (req, res, next) {
	try {
		const order = await Order.findById(req.params.id).populate('user', 'name email');

		if (!order) {
			next(new AppError('Order not found', 401));
		}

		status: 'success',
			res.status(200).json({
				data: {
					order,
				},
			});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Create new order
// @route - POST /api/orders
// @access - private

module.exports.createOrder = async function (req, res, next) {
	try {
		const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, countInStock } = req.body;

		if (!orderItems || orderItems.length === 0) {
			next(new AppError('No order items', 401));
		}

		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			countInStock,
			user: req.user,
		});

		const createdOrder = await order.save();

		res.status(201).json({
			status: 'success',
			data: { createdOrder },
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Update Order to Paid
// @route - PATCH /api/orders/:id
// @access - private

module.exports.updateOrder = async function ({ body, params }, res, next) {
	try {
		const { id, status, update_time, payer } = body;

		const order = await Order.findById(params.id);

		if (!order) {
			next(new AppError('Order not found', 401));
		}

		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id,
			status: status,
			update_time,
			email_address: payer.email_address,
		};

		const updatedOrder = await order.save();

		status: 'success',
			res.status(200).json({
				data: {
					updatedOrder,
				},
			});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

// @description - Update Order to Paid
// @route - PATCH /api/orders/:id
// @access - private

module.exports.getMyOrders = async function ({ user }, res, next) {
	try {
		const orders = await Order.find({ user: user._id });

		res.status(200).json({
			status: 'success',
			data: {
				orders,
			},
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};
