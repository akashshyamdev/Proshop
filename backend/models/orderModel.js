const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				cover: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			postalCode: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
		},
		itemsPrice: { type: Number, required: true },
		shippingPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: Date,
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: Date,
		paymentMethod: { type: String, required: true },
		paymentResult: {
			id: String,
			status: String,
			update_time: String,
			email_address: String,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

module.exports = mongoose.model('Order', orderSchema);
