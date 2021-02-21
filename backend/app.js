const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const checkoutRoutes = require('./routes/checkoutRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

const dirname = path.resolve();

app.use(express.static(path.join(dirname, '/frontend/build')));
app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html')));

app.use(notFound);

app.use(errorHandler);

module.exports = app;
