import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';

dotenv.config();

mongoose
	.connect(process.env.DB_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log(`Database connected ${res.connection.host}`.yellow.bold);
	})
	.catch((err) => {
		console.error(err.message.red.underline.bold);
		process.exit(1);
	});

async function importData() {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUserId = createdUsers.find((user) => user.isAdmin === true)._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUserId };
		});

		await Product.insertMany(sampleProducts);

		console.log('Data Imported'.yellow.bold);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.bold);
		process.exit(1);
	}
}

async function deleteData() {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('Data Deleted'.yellow.bold);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.bold);
		process.exit(1);
	}
}

if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
	deleteData();
} else if (process.argv[2] === '-i' || process.argv[2] === '--import') {
	importData();
}
