import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { listProductDetails } from '../actions/productActions.js';
import Rating from '../components/Ratings';
import Loader from '../components/Loader';
import Message from '../components/Message.js';

export default function ProductDetails({ match, history }) {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	function addToCartHandler() {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	}

	console.log(product);

	return (
		<div className="product">
			<Link to="/" className="btn btn--primary product__back">
				GO BACK
			</Link>

			{loading ? (
				<div>
					<Loader style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }} type="spinner" className="mt-5" />
				</div>
			) : error ? (
				<Message variant="danger" style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
					{error}
				</Message>
			) : (
				<Row className="product" style={{ marginTop: '60px' }}>
					<Col md={6} style={{ height: '510px', width: 640 }}>
						<Image style={{ width: '100%' }} className="product__image" src={product.images} alt={product.name} id="zoomImage"></Image>
					</Col>

					<Col md={4} className="product__details">
						<ListGroup>
							<ListGroup.Item className="product__detail-row">
								<h3 className="product__name mb-2">{product.name}</h3>
							</ListGroup.Item>

							<ListGroup.Item className="product__detail-row">
								<p className="lead mt-2">Category: {product.category}</p>
								<p className="lead">Brand: {product.brand}</p>
								<p className="lead">Delivery: {product.delivery}</p>
								<p className="lead mb-2">Color: {product.color}</p>
							</ListGroup.Item>

							<ListGroup.Item className="product__detail-row">
								<p className="lead mt-2">In Stock: {product.countInStock}</p>

								<div className="lead mb-2">
									Rating out of {product.numReviews}: &nbsp; <Rating rating={product.rating} text={`${product.numReviews}`} style={{ display: 'inline-block' }} />
								</div>
							</ListGroup.Item>

							<ListGroup.Item className="product__detail-row mb-2">
								<p className="lead my-2">{product.description}</p>
							</ListGroup.Item>

							<ListGroup.Item className="product__detail-row">
								{product.specs &&
									Object.entries(product.specs).map(([key, value], i) => (
										<p className="lead product__specs" key={i}>
											{key.charAt(0).toUpperCase() + key.substring(1)}: {value}
										</p>
									))}
							</ListGroup.Item>
						</ListGroup>
					</Col>

					<Col md={2} className="product__cart">
						<ListGroup>
							<ListGroup.Item>
								<Row className="">
									<Col>Price:</Col>

									<Col>${product.price}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>

									<Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
								</Row>
							</ListGroup.Item>

							{product.countInStock > 0 && (
								<ListGroupItem>
									<Row>
										<Col>Quantity</Col>

										<Col>
											<Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
												{[...Array(product.countInStock).keys()].map((n) => (
													<option key={n + 1} value={n + 1}>
														{n + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroupItem>
							)}

							<ListGroup.Item>
								<Row>
									<Col className="fw-bold">
										<button onClick={addToCartHandler} className={`btn btn-block btn--rectangle ${product.countInStock === 0 ? 'btn--disabled' : ''}`}>
											Add To Cart
										</button>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</div>
	);
}
