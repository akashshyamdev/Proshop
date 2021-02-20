const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
const app = require('./app.js');

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold);
});

process.on('SIGTERM', (err) => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');

	server.close(() => {
		console.log('💥 Process terminated!');
	});
});

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
