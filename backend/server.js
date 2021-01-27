import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import app from './app.js';

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
