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

// @description - Get all orders
// @route - GET /api/orders
// @access - private

export async function getAllOrders(req, res, next) {
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
}

// @description - Get order
// @route - GET /api/orders/:id
// @access - private

export async function getOrder(req, res, next) {
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
}
