import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';

export default function Home() {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			<h1 className="heading-primary text-primary text-center mt-3 mb-4">LATEST &nbsp; PRODUCTS</h1>

			{loading ? (
				<div>
					<Loader style={{ width: '150px', height: '150px', margin: 'auto', display: 'block' }} type="spinner" className="mt-5" />
				</div>
			) : error ? (
				<Message variant="danger" style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
					{error}
				</Message>
			) : (
				<Row style={{ marginLeft: '0' }} className="card__container">
					{products.length >= 1 &&
						products.map((product, i) => {
							return (
								<Col key={i}>
									<Product {...product} />
								</Col>
							);
						})}
				</Row>
			)}
		</div>
	);
}
