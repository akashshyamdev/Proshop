import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		cover: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['Electronics', 'Clothing'],
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
			minlength: 30,
		},
		rating: {
			type: Number,
			max: 5,
			min: 0,
			required: true,
			default: 0,
		},
		numRatings: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		delivery: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: true,
			validate: [(val) => val.length > 0, 'Please provide atleast 1 image'],
		},
		specs: {
			type: Object,
			required: function () {
				return this.category === 'Electronics';
			},
		},
		reviews: [
			{
				name: {
					type: String,
					required: true,
				},
				rating: {
					type: Number,
					required: true,
					min: 0,
					max: 5,
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
