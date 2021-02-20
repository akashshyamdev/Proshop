const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
const User = require('./models/userModel.js');
const Product = require('./models/productModel.js');
const Order = require('./models/orderModel.js');
const users = require('./data/users.js');
const products = require('./data/products.js');

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
