const express = require('express');
const Order = require('../models/orderModel.js');
const stripe = require('stripe')('STRIPE_SECRET_KEY');
const protectMiddleware = require('../middleware/protectMiddleware.js');

const router = express.Router();

router.route('/new-session/:orderId').get(protectMiddleware, async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		const domain = `${req.protocol}://${req.get('host')}`;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: order.orderItems,
			mode: 'payment',
			success_url: `${domain}/`,
			cancel_url: `${domain}/order/${req.params.orderId}?error=paymentcancelled&message=an-error-occured`,
			customer_email: req.user.email,
			client_reference_id: req.params.orderId,
		});

		return res.status(200).json({ status: 'success', session });
	} catch (error) {
		console.log(error);
		res.send(error.message);
	}
});

module.exports = router;
