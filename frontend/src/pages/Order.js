import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { Fragment } from 'react';

const stripePromise = loadStripe('pk_test_51ILka5FaFBl2jLKV9wEmI3rDH9ZkVJRypTGPGw8kcP8ie2sAgte5evF19OrPM2yMdyV2bjNxR313qHmIrRulBa8m00WAiIC0oi');

const OrderScreen = ({ match }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPayment = useSelector((state) => state.orderPayment);
	const { loadingPay, successPay } = orderPayment;

	window.order = order;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
	}

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');

			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&enable-funding=credit,paylater,venmo,bancontact,blik,eps,giropay,ideal,mercadopago,mybank,p24,sepa,sofort`;
			script.async = true;

			script.onload = () => {
				setSdkReady(true);
			};

			document.body.appendChild(script);
		};

		dispatch(getOrderDetails(orderId));

		if (!order?.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		} else if (!order || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
		}

		// eslint-disable-next-line
	}, [successPay, orderId, dispatch]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);

		dispatch(payOrder(orderId, paymentResult));
	};

	const handleClick = async (e) => {
		const stripe = await stripePromise;

		const { error } = stripe.redirectToCheckout({
			lineItems: order.orderItems.map((item, i, array) => {
				return {
					quantity: array[i].quantity,
					price: toString(array[i].price),
				};
			}),
			mode: 'payment',
			successUrl: `${window.location.origin}/redirect=true,message=Payment-successful-check-your-email-to-know-more`,
			cancelUrl: `${window.location.href}?error=true,message=There-was-an-error-in-payment,redirect=true/`,
		});

		if (error) {
			console.error(error);
			console.error(error.message);
		}
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Fragment>
			<h1 className="heading-primary mt-3 mb-2">Order</h1>

			<Row className="order-details">
				<Col md={6} className="order-details__details">
					<div className="order-details__address-container">
						<h5 className="order-details__heading">Shipping</h5>

						<div className="order-details__address">
							<img src="https://i.pinimg.com/564x/72/30/36/723036ba0e241c1eb9513689ddbd2dd9.jpg" alt="Location" className="order-details__address-image mr-2" />

							<div className="order-details__location">
								<p className="order-details__address-primary m-0">{order.shippingAddress.address}</p>

								<p className="order-details__address-secondary">
									{order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country}
								</p>
							</div>
						</div>
					</div>

					<div className="order-details__payment">
						<h5 className="order-details__heading">Payment Method</h5>

						<div>
							{order.paymentMethod === 'paypal' ? (
								<div>
									<img src="https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-2.png" alt="paypal" className="order-details__payment-image mr-2" />

									<p className="lead m-0 text-capitalize order-details__payment-method">{order.paymentMethod}</p>
								</div>
							) : (
								order.paymentMethod
							)}
							<p className="m-0 lead order-details__payment-status">{order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}</p>
						</div>
					</div>

					<div className="order-details__items">
						<h5 className="order-details__heading">Order Items</h5>
						{order.orderItems.length === 0 ? (
							<Message>Order is empty</Message>
						) : (
							<ul className="order-details__product-container">
								{order.orderItems.map((item, index) => (
									<li key={index} className="order-details__product">
										<Col md={2} className="px-0">
											<img src={item.cover} alt={item.name} className="order-details__product-image" />
										</Col>

										<Col md={4} className="px-0">
											<Link to={`/product/${item.product}`} className="order-details__product-name">
												{item.name}
											</Link>
										</Col>

										<Col md={4} className="px-0 order-details__product-price">
											{item.quantity} x ${item.price} = ${item.quantity * item.price}
										</Col>
									</li>
								))}
							</ul>
						)}
					</div>
				</Col>

				<Col md={2}></Col>

				<Col md={4} className="order-details__info">
					<h5 className="order-details__heading">Order Info</h5>

					<Row>
						<Col className="order-details__info-title mb-1">Items</Col>
						<Col className="order-details__info-value">${order.itemsPrice}</Col>
					</Row>

					<Row>
						<Col className="order-details__info-title mb-1">Shipping</Col>
						<Col className="order-details__info-value">+ ${order.shippingPrice}</Col>
					</Row>

					<Row>
						<Col className="order-details__info-title mb-1">Tax</Col>
						<Col className="order-details__info-value">+ ${order.taxPrice}</Col>
					</Row>

					<Row className="d-flex align-items-center mt-2">
						<Col className="order-details__info-title text-bold font-weight-bold">Total</Col>
						<Col className="order-details__info-total">${order.totalPrice}</Col>
					</Row>

					{!order.isPaid && (
						<>
							<Row className="order-details__paypal ml-0 mt-3">
								{loadingPay && <Loader />}

								{!sdkReady ? (
									<Loader />
								) : (
									<>
										<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
									</>
								)}
							</Row>
						</>
					)}
				</Col>
			</Row>
		</Fragment>
	);
};

export default OrderScreen;
