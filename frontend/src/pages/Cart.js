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

	console.log(cartItems);

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
