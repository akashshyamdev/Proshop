import Order from '../models/orderModel.js';
import AppError from '../utils/AppError.js';

// @description - Create new order
// @route - POST /api/orders
// @access - private

export async function createOrder(req, res, next) {
	try {
		const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

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
			user: req.user,
		});

		const createdOrder = await order.save();

		res.status(201).json({
			status: 'sucess',
			data: { createdOrder },
		});
	} catch (error) {
		next(new AppError(error.message, 500));
	}
}
