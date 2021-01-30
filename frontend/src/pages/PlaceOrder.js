import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Image, Card, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

export default function PlaceOrder({ history }) {
	const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
	const dispatch = useDispatch();
	const createdOrder = useSelector((state) => state.orderCreate);
	const { order, error, success } = createdOrder;
	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;
	const { address, city, postalCode, country } = shippingAddress;

	cart.itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
	cart.shippingPrice = addDecimals(cart.itemsPrice > 200 ? 5 : 10);
	cart.taxPrice = addDecimals(parseFloat(0.15 * cart.itemsPrice).toFixed(2));
	cart.totalPrice = (parseInt(cart.itemsPrice) + parseInt(cart.shippingPrice) + parseInt(cart.taxPrice)).toFixed(2);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	useEffect(() => {
		console.log(order);
		if (success === true && order) {
			history.push(`/order/${order._id}`);
		}
	});

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 active="step4"></CheckoutSteps>

			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h2 className="heading-secondary">Shipping</h2>
							<p className="lead">
								<strong>Address: &nbsp;</strong>
								{address}, {city}, {postalCode}, {country}
							</p>
						</ListGroupItem>

						<ListGroupItem>
							<h2 className="heading-secondary">Payment Method</h2>
							<p className="lead">
								<strong>Method: &nbsp;</strong>
								{paymentMethod}
							</p>
						</ListGroupItem>

						<ListGroupItem>
							<h2 className="heading-secondary">Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message children="">Your cart is empty</Message>
							) : (
								<ListGroup variant="flush" className="cart">
									{cart.cartItems.map((item, i) => (
										<ListGroupItem key={i} className="cart__product">
											<Row>
												<Col md={1} className="cart__product-image m-0 p-0">
													<Image src={item.cover} alt={item.name} fluid round />
												</Col>

												<Col md={3} className="cart__product-name ml-2" style={{ color: 'rgb(83, 83, 83)' }}>
													<Link to={`/products/${item.product}/`}>{item.name}</Link>
												</Col>

												<Col md={4}>
													<p className="lead">
														{item.quantity} x ${item.price} = ${item.price * item.quantity}
													</p>
												</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup>
							<ListGroupItem>
								<h2 className="heading-secondary">Order Summary</h2>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>{error && <Message variant="danger">{error}</Message>}</ListGroupItem>

							<ListGroupItem>
								<Button type="button" className="btn--block btn--black btn--rectangle" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
									Place Order
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
