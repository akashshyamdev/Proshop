import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, FormControl, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function Cart({ match, location, history }) {
	const productId = match.params.id;
	const quantity = location.search ? parseInt(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	function removeFromCartHandler(id) {
		dispatch(removeFromCart(id));
	}

	function checkoutHandler() {
		history.push('/login?redirect=shipping');
	}

	return (
		<Row>
			<Col md={8}>
				<h1 className="heading-primary my-3">Shopping Cart</h1>

				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty. <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush" className="cart">
						{cartItems.map((item, i) => (
							<ListGroupItem key={i} className="cart__product p-0">
								<Row className="m-0 p-0">
									<Col md={2} className="cart__product-image m-0 p-0">
										<Image src={item.cover} alt={item.name} fluid rounded className="py-2" />
									</Col>

									<Col md={3} className="cart__product-name p-0 ml-4">
										{item.name}
										<Link to={`/product/${item.product}`} />
									</Col>

									<Col md={2} className="cart__product-price p-0">
										${item.price}
									</Col>

									<Col md={2} className="cart__product-quantity pr-0">
										<FormControl as="select" value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)))}>
											{[...Array(item.countInStock).keys()].map((n) => (
												<option key={n + 1} value={n + 1}>
													{n + 1}
												</option>
											))}
										</FormControl>
									</Col>

									<Col md={2} className="text-center p-0">
										<button onClick={() => removeFromCartHandler(item.product)} className="cart__product-delete">
											<i className="fas fa-trash"></i>
										</button>
									</Col>
								</Row>
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={3}>
				<Card className="mt-3">
					<ListGroup variant="flush">
						<ListGroupItem>
							<h3 className="heading-ternary">
								Subtotal(
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)})
							</h3>
							<p className="lead">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
						</ListGroupItem>

						<ListGroupItem>
							<Button type="button" className="btn-block btn--rectangle btn--black" disabled={cartItems.length === 0} onClick={checkoutHandler}>
								Checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}

// <>
// 	<h1>Order {order._id}</h1>

// 	<Row>
// 		<Col md={8}>
// 			<ListGroup variant="flush">
// 				<ListGroupItem>
// 					<h2 className="heading-secondary">Shipping</h2>
// 					<p className="lead">
// 						<strong>Address: &nbsp;</strong>
// 						{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
// 					</p>
// 				</ListGroupItem>

// 				<ListGroupItem>
// 					<h2 className="heading-secondary">Payment Method</h2>
// 					<p className="lead">
// 						<strong>Method: &nbsp;</strong>
// 						{order.paymentMethod}
// 					</p>
// 				</ListGroupItem>

// 				<ListGroupItem>
// 					<h2 className="heading-secondary">Items</h2>
// 					{order.items.length === 0 ? (
// 						<Message children="">Your cart is empty</Message>
// 					) : (
// 						<ListGroup variant="flush" className="cart">
// 							{order.items.map((item, i) => (
// 								<ListGroupItem key={i} className="cart__product">
// 									<Row>
// 										<Col md={1} className="cart__product-image m-0 p-0">
// 											<Image src={item.cover} alt={item.name} fluid round />
// 										</Col>

// 										<Col md={3} className="cart__product-name ml-2" style={{ color: 'rgb(83, 83, 83)' }}>
// 											<Link to={`/products/${item.product}/`}>{item.name}</Link>
// 										</Col>

// 										<Col md={4}>
// 											<p className="lead">
// 												{item.quantity} x ${item.price} = ${item.price * item.quantity}
// 											</p>
// 										</Col>
// 									</Row>
// 								</ListGroupItem>
// 							))}
// 						</ListGroup>
// 					)}
// 				</ListGroupItem>
// 			</ListGroup>
// 		</Col>

// 		<Col md={3}>
// 			<Card>
// 				<ListGroup>
// 					<ListGroupItem>
// 						<h2 className="heading-secondary">Order Summary</h2>
// 					</ListGroupItem>

// 					<ListGroupItem>
// 						<Row>
// 							<Col>Items</Col>
// 							<Col>${order.cart.itemsPrice}</Col>
// 						</Row>
// 					</ListGroupItem>

// 					<ListGroupItem>
// 						<Row>
// 							<Col>Shipping</Col>
// 							<Col>${order.cart.shippingPrice}</Col>
// 						</Row>
// 					</ListGroupItem>

// 					<ListGroupItem>
// 						<Row>
// 							<Col>Tax</Col>
// 							<Col>${order.cart.taxPrice}</Col>
// 						</Row>
// 					</ListGroupItem>

// 					<ListGroupItem>
// 						<Row>
// 							<Col>Total</Col>
// 							<Col>${order.cart.totalPrice}</Col>
// 						</Row>
// 					</ListGroupItem>

// 					<ListGroupItem>{error && <Message variant="danger">{error}</Message>}</ListGroupItem>

// 					<ListGroupItem></ListGroupItem>
// 				</ListGroup>
// 			</Card>
// 		</Col>
// 	</Row>
// </>
